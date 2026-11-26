#!/usr/bin/env node
// verify-public-record.mjs: checks audit-manifest.json against live sources and local files.
// Node.js v18 or later. No dependencies: node:fs, node:crypto and the built-in fetch only.
// Usage, from the repository root: node verify-public-record.mjs
// Exit code: 0 when every check passes, 1 when any check fails, 2 when Node.js lacks fetch.
//
// What it checks:
//   Outside  - the five Open Kernel Challenge boards: rank, team count, percentile and the
//              three speedups of team dogfoodarchitect, recomputed from the organizer's data.
//   Try      - manymoats.com pages answer with the stated HTTP status and still carry the stated text.
//   Recount  - hackathon/loop-record-2026-09.public.jsonl: the file hash, every row's
//              SHA-256 over its public_block_text, and the counts the record supports.
// House entries have no machine check; the summary lists them.

import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

if (typeof fetch !== 'function') {
  console.error('verify-public-record: needs Node.js v18 or later (built-in fetch).');
  process.exit(2);
}

const ROOT = new URL('./', import.meta.url);
const readText = (rel) => readFileSync(new URL(rel, ROOT), 'utf8');
const sha256 = (data) => createHash('sha256').update(data).digest('hex');

const manifest = JSON.parse(readText('audit-manifest.json'));
const results = [];

function check(tier, name, expected, observed) {
  const exp = String(expected);
  const obs = String(observed);
  results.push({ status: exp === obs ? 'PASS' : 'FAIL', tier, name, expected: exp, observed: obs });
}

async function fetchWithTimeout(url) {
  return fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(30000) });
}

function pageText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ');
}

// Outside: the organizer's leaderboard data, counted the same way as the README's check.
async function checkBoards() {
  for (const board of manifest.verified_external_benchmarks) {
    const id = board.board_id;
    let rows;
    try {
      const res = await fetchWithTimeout(board.live_api_url);
      check('Outside', `${id} HTTP status`, 200, res.status);
      if (!res.ok) continue;
      rows = (await res.json()).rows;
    } catch (err) {
      check('Outside', `${id} fetch`, 'JSON rows', `error: ${err.message}`);
      continue;
    }
    if (!Array.isArray(rows)) {
      check('Outside', `${id} rows`, 'array', typeof rows);
      continue;
    }
    const teams = rows.filter((r) => r.team !== 'sglang');
    const i = teams.findIndex((r) => r.team === board.team);
    if (i < 0) {
      check('Outside', `${id} ${board.team} on board`, 'present', 'absent');
      continue;
    }
    const sorted = teams.map((r) => r.speedup).sort((x, y) => x - y);
    const mid = sorted.length / 2;
    const median = sorted.length % 2 ? sorted[Math.floor(mid)] : (sorted[mid - 1] + sorted[mid]) / 2;
    check('Outside', `${id} rank`, board.rank, i + 1);
    check('Outside', `${id} total teams`, board.total_teams, teams.length);
    check('Outside', `${id} percentile`, board.percentile, `top ${((100 * (i + 1)) / teams.length).toFixed(1)}%`);
    check('Outside', `${id} speedup vs SGLang`, board.speedup_vs_sglang.toFixed(2), teams[i].speedup.toFixed(2));
    check('Outside', `${id} median team speedup`, board.median_team_speedup.toFixed(2), median.toFixed(2));
    check('Outside', `${id} first place speedup`, board.first_place_speedup.toFixed(2), teams[0].speedup.toFixed(2));
  }
}

// Try: page status and the stated text, as served.
async function checkPages() {
  for (const page of manifest.page_checks) {
    let res, text;
    try {
      res = await fetchWithTimeout(page.url);
      text = pageText(await res.text());
    } catch (err) {
      check('Try', `${page.id} fetch`, `HTTP ${page.expect_status}`, `error: ${err.message}`);
      continue;
    }
    check('Try', `${page.id} HTTP status`, page.expect_status, res.status);
    const found = page.expect_text.filter((t) => text.includes(t)).length;
    check('Try', `${page.id} stated text present`, `${page.expect_text.length} of ${page.expect_text.length}`, `${found} of ${page.expect_text.length}`);
  }
}

// Recount: the September loop record. Each row's public_block_sha256 is the SHA-256 of its
// public_block_text (block_sha256 points at the private raw record and cannot be checked here).
function checkLoopRecord() {
  const run = manifest.autonomous_telemetry_and_scale.september_run;
  const bytes = readFileSync(new URL(run.record_file, ROOT));
  const fileHash = sha256(bytes);
  const bundle = JSON.parse(readText('hackathon/MANIFEST.json'));
  const listed = bundle.files.find((f) => `hackathon/${f.path}` === run.record_file);
  check('Recount', 'record file SHA-256 vs audit-manifest.json', run.record_file_sha256, fileHash);
  check('Recount', 'record file SHA-256 vs hackathon/MANIFEST.json', listed ? listed.sha256 : 'listed', fileHash);

  const rows = bytes.toString('utf8').trim().split('\n').map((line) => JSON.parse(line));
  let match = 0;
  let mismatch = 0;
  for (const row of rows) {
    if (sha256(row.public_block_text) === row.public_block_sha256) match += 1;
    else mismatch += 1;
  }
  console.log(`Row hashes: ${match} pass, ${mismatch} fail, ${rows.length} rows`);
  check('Recount', 'rows in record', run.posts, rows.length);
  check('Recount', 'rows matching their own SHA-256', run.rows_matching_own_hash, match);
  check('Recount', 'rows not matching their own SHA-256', 0, mismatch);

  const loops = rows.map((r) => r.loop);
  const distinct = new Set(loops);
  const maxLoop = Math.max(...loops);
  let missing = 0;
  for (let n = 1; n <= maxLoop; n += 1) if (!distinct.has(n)) missing += 1;
  const counts = new Map();
  for (const n of loops) counts.set(n, (counts.get(n) || 0) + 1);
  const duplicates = [...counts.values()].filter((c) => c > 1).length;
  const failing = rows.filter((r) => {
    const [pass, total] = String(r.suite).split('/').map(Number);
    return pass < total;
  }).length;
  const first62 = rows.find((r) => r.suite === '62/62');
  check('Recount', 'distinct loop numbers', run.distinct_loop_numbers, distinct.size);
  check('Recount', 'highest loop number', run.loop_numbers_in_range, maxLoop);
  check('Recount', 'loop numbers missing', run.missing_loop_numbers, missing);
  check('Recount', 'loop numbers posted twice', run.duplicate_loop_numbers, duplicates);
  check('Recount', 'posts with a failing test', run.posts_with_failing_test, failing);
  check('Recount', 'first post suite', run.first_suite, rows[0].suite);
  check('Recount', 'last post suite', run.last_suite, rows[rows.length - 1].suite);
  check('Recount', 'first 62/62 at loop', run.first_62_of_62_at_loop, first62 ? first62.loop : 'none');
  check('Recount', 'first post time', run.first_post_utc, rows[0].utc);
  check('Recount', 'last post time', run.last_post_utc, rows[rows.length - 1].utc);
}

function printTable() {
  const head = { status: 'STATUS', tier: 'TIER', name: 'CHECK', expected: 'EXPECTED', observed: 'OBSERVED' };
  const cols = ['status', 'tier', 'name', 'expected', 'observed'];
  const width = Object.fromEntries(cols.map((c) => [c, Math.max(head[c].length, ...results.map((r) => r[c].length))]));
  const line = (r) => cols.map((c) => r[c].padEnd(width[c])).join('  ').trimEnd();
  console.log('');
  console.log(line(head));
  console.log(cols.map((c) => '-'.repeat(width[c])).join('  '));
  for (const r of results) console.log(line(r));
  console.log('');
  const failed = results.filter((r) => r.status === 'FAIL').length;
  console.log(`Not machine-checked (House or interactive): ${manifest.not_machine_checked.join('; ')}.`);
  console.log(failed === 0
    ? `RESULT: PASS (${results.length} of ${results.length} checks)`
    : `RESULT: FAIL (${failed} of ${results.length} checks failed)`);
  return failed;
}

await checkBoards();
await checkPages();
checkLoopRecord();
process.exitCode = printTable() === 0 ? 0 : 1;
