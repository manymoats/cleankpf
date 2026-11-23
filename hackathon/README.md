# Receipted Physics Agent: run record

This folder is the run record behind the Receipted Physics Agent: the September 2026 standing loop on Muse Code, as recorded in the project's internal message log, and the October 2026 runs of the gate that accepts or refuses each proposed change: one standing run and three timed rehearsals, three of the four with pre-written proposals and one with a local model. Nothing here is live; every number cites a file in this folder.

## How to check each file

Run the commands from the root of a fresh copy of this repository (`git clone https://github.com/manymoats/cleankpf && cd cleankpf`). They need Node.js v18 or later.

| File | How to check | What a match shows | What it does not show |
| --- | --- | --- | --- |
| every file | the manifest check below | the file has the bytes and the sha256 listed in MANIFEST.json, made on 2026-10-20, with its README.md entry updated for this version of the page | whether what the file says is true |
| loop-record-2026-09.public.jsonl, loop-record-2026-09.summary.json | the recount commands in the repository's main README | the counts, and that each row agrees with its own hash | that the rows were written in September: the hashes were computed at export on 2026-10-20 |
| LEDGER.jsonl, r1-ledger.jsonl, r2-ledger.jsonl, r3-ledger.jsonl | the chain check below | each row's receipt hash follows the scheme under Bounds and points at the row before it | when the rows were written, or that a model wrote the proposals: in three of the four ledgers, none did (see Bounds) |
| COMMITTED-STATE.json, COMMITTED-STATE.sha256 | the state check below | the state file agrees with its own hash and with the last row of LEDGER.jsonl | anything beyond the agreement of these files |
| dram-sim-20260929T114147Z.json, .png, .svg | open the JSON; the plots are drawn from it | the recorded measurements and how they were combined | a rerun: the benchmark code is not public |
| faults/*.json | read them | the four faults a judge can inject, each with its expected failing test | that the repairs work: the engine and tests are not public |
| HACKATHON-PROMPT.md, open-invariants.json, REHEARSAL-1.md to REHEARSAL-3.md | read them | what the runs were told, and what the author recorded about them | anything the ledgers do not also show; two of the rehearsal files name the wrong model (see Bounds) |
| HACKATHON-APPLICATION.md | compare it with the records here | the application as submitted on 2026-10-13 | its larger figures: see Corrections to the application |
| muse-time-of-death-loop723.png | look at it | the terminal capture of the run's end | anything outside the capture |

Manifest check:

```
node -e '
const fs = require("fs"), c = require("crypto");
const m = JSON.parse(fs.readFileSync("hackathon/MANIFEST.json", "utf8"));
for (const f of m.files) { const b = fs.readFileSync("hackathon/" + f.path); console.log(b.length === f.bytes && c.createHash("sha256").update(b).digest("hex") === f.sha256 ? "ok  " : "DIFF", f.path); }
'
```

Expected: `ok` on every line.

Chain check:

```
node -e '
const fs = require("fs"), c = require("crypto");
const keys = ["iteration","invariant","diff_sha256","test_added","result","tests_pass","tests_total","elapsed_ms","tokens_in","tokens_out","reason","prev_sha256"];
for (const f of ["LEDGER.jsonl","r1-ledger.jsonl","r2-ledger.jsonl","r3-ledger.jsonl"]) {
  const rows = fs.readFileSync("hackathon/" + f, "utf8").trim().split("\n").map(JSON.parse);
  let prev = "GENESIS", ok = 0;
  for (const r of rows) { const o = {}; for (const k of keys) o[k] = r[k]; const h = c.createHash("sha256").update(JSON.stringify(o)).digest("hex"); if (r.prev_sha256 === prev && h === r.receipt_sha256) ok++; prev = r.receipt_sha256; }
  console.log(f, ok, "of", rows.length, "rows chain");
}
'
```

Expected: `LEDGER.jsonl 14 of 14 rows chain`, `r1-ledger.jsonl 7 of 7 rows chain`, `r2-ledger.jsonl 5 of 5 rows chain`, `r3-ledger.jsonl 6 of 6 rows chain`.

State check:

```
node -e '
const fs = require("fs"), c = require("crypto");
const s = JSON.parse(fs.readFileSync("hackathon/COMMITTED-STATE.json", "utf8"));
const { state_sha256, ...rest } = s;
const h = c.createHash("sha256").update(JSON.stringify(rest)).digest("hex");
const last = fs.readFileSync("hackathon/LEDGER.jsonl", "utf8").trim().split("\n").map(JSON.parse).pop();
console.log(h === state_sha256 && h === fs.readFileSync("hackathon/COMMITTED-STATE.sha256", "utf8").trim() ? "state hash matches" : "state hash differs", "|", last.receipt_sha256 === s.last_receipt_sha256 ? "last receipt matches" : "last receipt differs");
'
```

Expected: `state hash matches | last receipt matches`.

## Files

| File | What it is | Class | Bytes | sha256 (first 12 characters; full value in MANIFEST.json) |
| --- | --- | --- | --- | --- |
| COMMITTED-STATE.json | the committed state after the last iteration of the October standing run: iteration, model label, suite and accepted-test hashes, baseline counts, tokens used, accepted count, regressions, last receipt hash, state hash. Its "model": "muse-spark" is a label; no model ran (see Bounds). | hash-chained-ledger | 1154 bytes | `cb3d69688626` |
| COMMITTED-STATE.sha256 | the state hash the runner wrote: sha256 of COMMITTED-STATE.json without its state_sha256 field (see the state check). | hash-chained-ledger | 65 bytes | `dd0a8124d986` |
| HACKATHON-APPLICATION.md | the hackathon application as submitted on 2026-10-13, two answers, with its header of dated numbers. Several figures are larger than the records here support: see Corrections to the application. | plan | 6841 bytes | `6c1cea3725c2` |
| HACKATHON-PROMPT.md | the standing order the physics agent runs under; public copy with two redactions (listed in MANIFEST.json). | plan (public copy, redacted) | 2598 bytes | `e4bc644340d9` |
| LEDGER.jsonl | the October standing run: 14 hash-chained receipt rows, 12 accepted, 2 refused, budget stop at the 14th row. Its proposals were pre-written; no model was called (see Bounds). | hash-chained-ledger | 8478 bytes | `a9c3bbbde36e` |
| REHEARSAL-1.md | the author's receipt for the first timed rehearsal of 2026-10-14. Its counts and token total match r1-ledger.jsonl; its token split does not: it gives `tokens_in=8880` and `tokens_out=1720`, and the ledger's rows sum to 7980 and 2620 tokens. It names qwen3-coder:30b as the model; for this run that is wrong (see Bounds). | derived-receipt | 1324 bytes | `b3863d8440af` |
| REHEARSAL-2.md | the author's receipt for the second timed rehearsal of 2026-10-14; its counts and token total match r2-ledger.jsonl. It names qwen3-coder:30b as the model; for this run that is wrong (see Bounds). | derived-receipt | 1349 bytes | `36461872c1ad` |
| REHEARSAL-3.md | the author's receipt for the third timed rehearsal, the one run with a local model; numbers corrected on 2026-10-20 from its ledger; public copy with one redaction (listed in MANIFEST.json). | derived-receipt (public copy, redacted) | 1609 bytes | `2b3790a3b7f8` |
| dram-sim-20260929T114147Z.json | the Resident State byte-efficiency receipt of 2026-09-29: four workloads, seven repetitions, Node with forced garbage collection on one M5 Max; the three aggregations and the adversarial cases. | derived-receipt | 110284 bytes | `7b491499d153` |
| dram-sim-20260929T114147Z.png | the plots rendered from that receipt. | derived-receipt | 120645 bytes | `acc803b4662b` |
| dram-sim-20260929T114147Z.svg | the plots rendered from that receipt. | derived-receipt | 9962 bytes | `f8730606d125` |
| faults/energy.json | a judge-fault fixture: the one-line patch, the invariant with units, the threshold, the expected red test. | source | 574 bytes | `b91ced3157e0` |
| faults/instability.json | a judge-fault fixture: the one-line patch, the invariant with units, the threshold, the expected red test. | source | 583 bytes | `261a5568cc5a` |
| faults/momentum.json | a judge-fault fixture: the one-line patch, the invariant with units, the threshold, the expected red test. | source | 667 bytes | `9075ec40e07e` |
| faults/nan.json | a judge-fault fixture: the one-line patch, the invariant with units, the threshold, the expected red test. | source | 589 bytes | `871bda335d9f` |
| loop-record-2026-09.public.jsonl | the September standing loop as recorded in the project's message log: one row per post, 656 posts for 652 loops, redacted text and its sha256, the work-order id of each post. | observed-record | 4453547 bytes | `fa21e76aa0f3` |
| loop-record-2026-09.summary.json | counts, first and last post, the 70 missing loops, the four duplicates, provenance and redaction rule. | observed-record | 1436 bytes | `3fe29bb8e9bb` |
| muse-time-of-death-loop723.png | the terminal capture: LOOP722 green at 07:18 PDT, then `HTTP 429` on the next deliveries. | observed-record | 323380 bytes | `69366f36ca6b` |
| open-invariants.json | the list of physical invariants the standing run works through. | hash-chained-ledger | 618 bytes | `e055fbd23418` |
| r1-ledger.jsonl | the first rehearsal's ledger: 7 rows, hash-chained, pre-written proposals, no model. | hash-chained-ledger | 4216 bytes | `6cb04ea34f97` |
| r2-ledger.jsonl | the second rehearsal's ledger: 5 rows, hash-chained, pre-written proposals, no model. | hash-chained-ledger | 2994 bytes | `4d182c9d77de` |
| r3-ledger.jsonl | the third rehearsal's ledger: 6 rows, hash-chained, local model qwen3-coder:30b by the author's record; the 4th row is a simulated network cut. | hash-chained-ledger | 3473 bytes | `917a1d2fc5c0` |

MANIFEST.json is the file index with byte counts and hashes, made on 2026-10-20; its entry for README.md was updated for this version of the page. It omits its own hash to avoid a circular digest.

## Bounds

The raw session log was not kept. The archive has 652 of 722 loops in 656 posts; the 70 missing loops are listed in the summary. Public block hashes were computed at export over redacted text: home paths and the account name were replaced before hashing, public_block_sha256 is over the redacted text, and block_sha256 points at the private raw record.

Quoted records keep their original words except home paths and the account name. Repository folder and file names appear as they were recorded. A few style words the project now avoids occur inside quoted September posts and are left as evidence.

Two public copies are redacted: HACKATHON-PROMPT.md omits the author's email parenthetical and uses "the work-order door"; REHEARSAL-3.md uses "a review seat (P-H3)" for the review mention. Every other copy is byte-identical to the private record.

The October ledgers. LEDGER.jsonl, r1-ledger.jsonl and r2-ledger.jsonl came from the runner applying a fixed list of pre-written proposals and running the test suite on each; no model was called. Their tokens_in and tokens_out are fixed numbers from that list, not measurements, which is why the same pairs repeat across the three files, and their elapsed_ms is the time to apply a proposal and run the tests. The "model": "muse-spark" in COMMITTED-STATE.json is a label, and REHEARSAL-1.md and REHEARSAL-2.md are wrong to name qwen3-coder:30b for these runs. These three ledgers show the gate accepting and refusing changes; they do not show a model proposing them. r3-ledger.jsonl is the one run with a model, qwen3-coder:30b on a local Ollama server by the author's record; its 4th row is a simulated network cut.

The receipt hash scheme is sha256 of JSON.stringify of iteration, invariant, diff_sha256, test_added, result, tests_pass, tests_total, elapsed_ms, tokens_in, tokens_out, reason, prev_sha256 in that key order. The first row has prev_sha256 "GENESIS". elapsed_ms is in milliseconds.

## Corrections to the application

HACKATHON-APPLICATION.md is kept as submitted on 2026-10-13. Its figures that can be checked against this folder:

| The application says | The record in this folder |
| --- | --- |
| "51 hours 35 minutes" | 35 h 12 min between the first and last recorded posts (loop-record-2026-09.summary.json) |
| "722 receipted iterations" | 652 of 722 loop numbers appear in the record; 70 loops are missing |
| "took the suite from 15/15 to 62/62 green" | consistent: the first recorded post reports 16/16 tests, up from 15/15 tests, and the last reports 62/62 tests |
| "No drift, no invented dependencies, no passing test broken" | 164 of 656 posts give a failing suite count, including 156 posts at 61/62 tests (the 528th to 684th loops) and 6 posts at 0/1 tests after the engine file was replaced by a stub at the 685th loop; 2 more posts from the rebuild say in words that the suite was still broken; 62/62 tests returned at the 699th loop |
| "52.82% fewer bytes than equivalent JavaScript object graphs across four deterministic workloads" | consistent: dram-sim-20260929T114147Z.json gives a byte-weighted reduction of 52.82% |
| "Receipts for every claim above at github.com/brennandec/cleankpf" | that repository now holds a move notice to this one, and receipts for the application's other figures are not public |

The application's other figures, such as the 17.1 GB model opening in 138 ms, the 136 parity checks, the 234 of 600 approvals that did not survive re-verification and the 31 provisional patent applications, are not backed by any file in this repository and are House (the main README's mark): they rest on the author's word alone.

## Not included

- ACCEPTED-TESTS.json: engine and test source are not released here.
- Every file under suite/: engine and test source are not released here.
- xpbd-soft.mjs: engine source is not released here.
- xpbd-fault-invariants.test.mjs: test source is not released here.
- WO-HACKATHON-*.md: internal work orders.
- DEMO-SCRIPT.md: internal operator script.
- VM-BOOTSTRAP-RECEIPT.md: internal operator record.
- TIME-OF-DEATH-MUSE.md: internal notes; the terminal capture PNG carries the fact.
- VDC.md: internal notes; the terminal capture PNG carries the fact.
- cleankpf-README.md: already the public page.
- ONESHOT-PROMPT-ORIGINAL.md: a build prompt, not evidence.
