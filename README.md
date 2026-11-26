# manymoats

This repository is the public record of an AI-orchestrated engineering harness with a deterministic external verification pipeline: one person directs AI models that write the code, and each result below names a check that runs outside the models, or says that it rests on the author's word. The technical thesis under test is that keeping working data resident in binary form, instead of converting it to text and back (serialization), removes that conversion cost, and the research argument carries the idea through four models: memory, communication, energy and facility water. One piece has a public test, a browser benchmark that measures processing time on your own device; binary typed arrays are established tools, the energy and water figures are scenario models, and the research notes that argue the larger case are being withdrawn for correction.

## Quick machine verification

- `audit-manifest.json`: every result on this page as JSON, each with its mark.
- `verify-public-record.mjs`: needs Node.js v18 or later and no packages. It re-reads the five organizer boards below, checks that two manymoats.com pages answer as stated (Battlegrounds, and the research notes page, which reads "Withdrawn"), and recounts the September record's 656 row hashes and its counts.

```
git clone https://github.com/manymoats/cleankpf && cd cleankpf
node verify-public-record.mjs
```

Expected last line: `RESULT: PASS (54 of 54 checks)`. Each FAIL line names the check, the expected value and the value found. House results have no machine check, and the script does not run the interactive tests.

## In brief

One person, who by his own account directs AI models that write the code, has an entry in the top 4.4% to 17% of about 900 to 1,700 teams on each of the five per-problem boards of a GPU-code speed contest; the organizers' final overall top 100 list does not include it.

In the Open Kernel Challenge, a public contest to make the GPU code behind Meta's Muse Spark Open model run faster on NVIDIA H200 chips, the organizers' boards rank the author's entry 61st of 1,379 teams on gated attention decode (top 4.4%) and inside the top 17% on all five problems, faster than the median team each time. No top-10 place.

Not yet: no contest win and no revenue. The main code is private. The research notes on manymoats.com are being withdrawn for correction; nothing on this page rests on them.

## How each result is marked

This repository is the public record of software one person builds by directing AI models that write the code, written for anyone who wants to check that work before relying on it. Each result below is marked with how it can be checked.

| Mark | Meaning |
|---|---|
| **Outside** | A third party published the result. |
| **Try** | A live page anyone can use now, with no account. |
| **Rerun** | Public code, run on your own machine, prints the stated result. |
| **Recount** | Public files whose numbers anyone can recount. A match shows only that the file agrees with itself. |
| **Entered** | The contest page shows the entry and its status. The write-up on it is the author's own. |
| **House** | Rests on the author's word alone. |

The sections below run from the strongest check to the weakest: Outside, Try and Rerun, Entered, Recount, House and Scale; then what would show a row is wrong, and the changes.

## Outside: Open Kernel Challenge, kernel track

Entrants wrote faster versions of five pieces of the GPU code that serves Meta's Muse Spark Open model. Each submission was checked against a reference on fresh inputs and timed on an NVIDIA H200 against the open-source SGLang server's own kernel in the same run. Kernel submissions closed at the end of 2026-11-04, Pacific time. The organizers reported more than 300,000 kernel-track submissions by 2026-11-03.

Board status, from the organizers' [updates page](https://openkernelchallenge.dev/updates): on 2026-11-05 they wrote that the scores on the leaderboard were not final, and on 2026-11-11 that their review of the kernel track was finished and that the leaderboard's Kernels (Overall) tab shows the final top 100 list. The author's entry is not in that top 100 list. The updates page does not say whether the per-problem boards below are final; the ranks below are those boards as they read on 2026-11-21, and they were the same when read again on 2026-11-23.

The contest signs in only with GitHub, and the author's entry on its boards, `dogfoodarchitect`, is his GitHub account ([dogfoodarchitect on GitHub](https://github.com/dogfoodarchitect), which also holds the PatchCrowd code listed below). The contest was built for AI coding agents as well as people: its command-line tool writes an AGENTS.md file for each problem, and its rules speak to agents directly. Other entrants could use AI too.

| Problem | Rank on the organizer's board | Speed against SGLang | Median team | First place | Organizer's pages |
|---|---|---|---|---|---|
| Gated attention decode | 61st of 1,379 teams (top 4.4%) | 2.79 times | 1.91 times | 3.34 times | [board](https://openkernelchallenge.dev/leaderboard?problem=muse_attention_decode) · [data](https://openkernelchallenge.dev/api/leaderboard/muse_attention_decode) |
| Prefill layer | 84th of 895 teams (top 9.4%) | 1.92 times | 1.60 times | 2.15 times | [board](https://openkernelchallenge.dev/leaderboard?problem=muse_prefill_layer) · [data](https://openkernelchallenge.dev/api/leaderboard/muse_prefill_layer) |
| Dense projections (BF16) | 136th of 1,740 teams (top 7.8%) | 1.58 times | 1.25 times | 1.73 times | [board](https://openkernelchallenge.dev/leaderboard?problem=muse_bf16_proj) · [data](https://openkernelchallenge.dev/api/leaderboard/muse_bf16_proj) |
| Routed experts (MoE) | 189th of 1,422 teams (top 13.3%) | 2.40 times | 1.91 times | 2.84 times | [board](https://openkernelchallenge.dev/leaderboard?problem=muse_moe_w4a16) · [data](https://openkernelchallenge.dev/api/leaderboard/muse_moe_w4a16) |
| Whole decoder layer | 220th of 1,296 teams (top 17.0%) | 2.26 times | 1.78 times | 2.61 times | [board](https://openkernelchallenge.dev/leaderboard?problem=muse_decode_layer) · [data](https://openkernelchallenge.dev/api/leaderboard/muse_decode_layer) |

The speed figure is how many times as fast as SGLang's own kernel the entry ran, in the same timed run. Every team on every board beats that reference, so rank and the median team are the comparisons that matter. Team counts leave out the SGLang reference row that each board also lists. The kernel track carried no prize money; the contest pays its prizes on a separate serving track.

To check without code: open a board link. The board starts with 10 rows, and each "Show 40 more" click adds 40 rows; the author's row, the 61st on gated attention decode, appears after two clicks.

## Try it or rerun it

| What | Mark | Links | What you should see |
|---|---|---|---|
| **Import Repair.** An AI model may only propose how a supplier's catalog columns map to product fields. A separate check, with no model in it, converts every price to whole cents or refuses the whole batch. | Try · Rerun | [live demo](https://brennandec.github.io/import-repair/) · [code](https://github.com/brennandec/import-repair) | The demo opens with the preset `base-repair` chosen. Click **Execute Ingestion Contract**: `ACCEPTED — 2 ROWS VERIFIED`, with $12.50 stored as `1250` cents. Choose the preset `subcent-refusal`, whose price is 1.005 dollars, and click it again: `REFUSED — ZERO PARTIAL ROWS ACCEPTED`, refusal code `INVALID_PRICE_PRECISION`, no partial rows kept. **Suggest Mapping (Nemotron)** needs a server and an API key that the public page does not have, so there it shows `MAPPING REQUEST FAILED`. |
| **Battlegrounds.** Two tests in the browser of the thesis above. A cellular field evolves in two workers: one sends its state through JSON text at every step, the other updates resident typed arrays, and checksums confirm that both reach the same state. A 3D Gaussian scene of up to 131,078 points is deformed the same way in two linked views. | Try | [live page](https://manymoats.com/battlegrounds) | Press **Run comparison** under either test: the page reports what it measured on your device in that session, so results differ by device. By the page's own words it measures processing time in this browser and does not measure battery life, electricity or water use; binary data and typed arrays are established tools; and its energy and water calculator ("Projected Enterprise Scale") is a scenario model, not measured water saved. The page also maps the research notes that are being withdrawn for correction; nothing on this page rests on them. |

The demo page's footer names the Nebius × NVIDIA hackathon that Import Repair was built for. By the author's record, no entry was filed there.

### Check it yourself

You need git and Node.js v18 or later.

Kernel ranks, read from the organizer's data:

```
node -e '
const boards = ["muse_attention_decode", "muse_prefill_layer", "muse_bf16_proj", "muse_moe_w4a16", "muse_decode_layer"];
(async () => {
  for (const b of boards) {
    const rows = (await (await fetch("https://openkernelchallenge.dev/api/leaderboard/" + b)).json()).rows;
    const teams = rows.filter(r => r.team !== "sglang");
    const i = teams.findIndex(r => r.team === "dogfoodarchitect");
    const s = teams.map(r => r.speedup).sort((x, y) => x - y);
    const mid = s.length / 2;
    const median = s.length % 2 ? s[Math.floor(mid)] : (s[mid - 1] + s[mid]) / 2;
    console.log(b, "| rank", i + 1, "of", teams.length, "| speedup", teams[i].speedup.toFixed(2), "| median", median.toFixed(2), "| first", teams[0].speedup.toFixed(2));
  }
})();
'
```

Output on 2026-11-23:

```
muse_attention_decode | rank 61 of 1379 | speedup 2.79 | median 1.91 | first 3.34
muse_prefill_layer | rank 84 of 895 | speedup 1.92 | median 1.60 | first 2.15
muse_bf16_proj | rank 136 of 1740 | speedup 1.58 | median 1.25 | first 1.73
muse_moe_w4a16 | rank 189 of 1422 | speedup 2.40 | median 1.91 | first 2.84
muse_decode_layer | rank 220 of 1296 | speedup 2.26 | median 1.78 | first 2.61
```

Import Repair self-check. It confirms that the repository holds exactly its 7 files, scans them for secret patterns, runs the 7 JSON example catalogs through the price check, and confirms that the model call is refused when its required setting is missing:

```
git clone https://github.com/brennandec/import-repair && cd import-repair
node verify-stage.mjs
```

Expected: `ALL 7 FILES VERIFIED (0 secrets detected, clone=pass)`.

The September run record: see the recount commands in its section below.

## Entered: contest entries

Status as the contest pages read on 2026-11-23. Participant counts are the pages' own.

| Entry | Contest | Status on the contest page |
|---|---|---|
| [Alexa+ Agent Governance Console & MCP Server](https://devpost.com/software/alexa-autonomous-agent-governance-console-mcp-2025-11-25): an agent governance console and MCP server; the entry describes refusing attempts to tamper with the tests that judge the agent. [Walkthrough video, 171 s](https://www.youtube.com/watch?v=Fp5rXegEDLg). | [Build, Ship, Shape: Amazon Developer Hackathon](https://amazonappdev2026.devpost.com/) (35,422 participants) | "This hackathon has ended" and "Winners announced soon". The code repository the entry links to is private, so the code cannot be checked here. |
| [PatchCrowd](https://devpost.com/software/patchcrowd) · [code](https://github.com/dogfoodarchitect/patchcrowd) | [Codex x TwitchCon Hackathon](https://twitchcon-codex.devpost.com/) (2,216 participants) | "This hackathon has ended" and "View the winners". PatchCrowd is not among the five [winners](https://twitchcon-codex.devpost.com/project-gallery). |
| [Invoice Evidence Review](https://devpost.com/software/invoice-evidence-review) | [UGREEN Hackathon on AI NAS](https://ugreenhackathon.devpost.com/) (2,794 participants) | Round 1 entry. "This hackathon has ended" and "Winners announced soon". The page says UGREEN will invite up to 30 finalists to the second round by email on 2026-11-21. The entry states that it has not been tested on a NAS. |
| [Self-Scores Fail](https://www.kaggle.com/competitions/gemma-4-developer-agent-paper/writeups/new-writeup-1794237163374): a paper on how Gemma 4 grades its own code. By the write-up's own count, the model gave itself full marks on 370 of 371 answers, including all 84 answers that failed their checks. | Google - The Gemma 4 Developer Agent Paper Track, on Kaggle | The write-up is public at that link. A signed-out reading of the competition page on 2026-11-23 named no winners. |

No contest win so far. Entries that no contest page can show are listed under House below.

## Recount: the September autonomous run

From 2026-09-26T03:05:45Z to 2026-09-27T14:18:08Z (35 h 12 min between the first and last recorded post), AI model sessions worked in loops on a soft-body physics engine and its test suite (called "slap-face" in the record, after the demo it drives), posting after each loop. The public record has 656 posts covering 652 of 722 loop numbers; the summary file lists the 70 missing loops and the four loop numbers that appear twice.

The suite tested a browser demo in which a simulated hand slaps a soft-body model of a pair of buttocks (the record's "cheeks"), built from skin, fat, muscle and bone layers, and reports peak force, ripple speed and jiggle frequency; the model wears a painted garment in one of three cuts (cheeky, string, sport); 22 posts name the waistband, hip or crotch.

- The posts are the agent's own reports. The first post reports 16/16 tests passing and the last reports 62/62 tests. The posts first report 62/62 tests at the 409th loop, and the suite did not grow after that.
- 164 of 656 posts give a suite count with at least one failing test; the recount below finds them. Two posts from the rebuild say in words that the suite was still broken: the post for the 689th loop, which gives no count, and the post for the 692nd loop, whose count of 6/6 tests covers one part. The post for the 13th loop says that the 12th loop's post gave 23/23 tests while one of them was failing. From the 528th to the 684th loop (156 posts) one test stayed red after another agent changed a hosting configuration file outside the loop's own files; the loop left that change alone.
- At the 685th loop the physics engine file was found replaced, from outside the loop, by a 64-line stub, and the suite dropped to 0/1 tests. The loop rebuilt the engine in the 689th to 699th loops (the posts for the 693rd, 694th, 696th and 698th loops are missing) and reported 62/62 tests again 86 minutes after the stub was found.
- The run stopped when the model provider refused further requests (`HTTP 429`). A screenshot is in `hackathon/`.

What the record does not show: the row hashes were computed when the record was exported on 2026-10-20, so a match proves only that each row agrees with its own hash. It does not date the rows to September. The engine and test code are not public, so the run itself cannot be rerun.

The hackathon application in `hackathon/HACKATHON-APPLICATION.md` (2026-10-13) gives larger figures than this record supports: "51 hours 35 minutes", "722 receipted iterations" and "no passing test broken". Use the record above; `hackathon/README.md` lists each correction.

Recount from a fresh copy:

```
git clone https://github.com/manymoats/cleankpf && cd cleankpf
F=hackathon/loop-record-2026-09.public.jsonl
wc -l < $F
grep -o '"loop":[0-9]*' $F | sort -u | wc -l
head -n 1 $F | grep -o '"suite":"[^"]*"'
tail -n 1 $F | grep -o '"suite":"[^"]*"'
node -e '
const fs = require("fs"), crypto = require("crypto");
const rows = fs.readFileSync("hackathon/loop-record-2026-09.public.jsonl", "utf8").trim().split("\n").map(JSON.parse);
const same = rows.filter(r => crypto.createHash("sha256").update(r.public_block_text).digest("hex") === r.public_block_sha256).length;
const failing = rows.filter(r => { const [pass, total] = String(r.suite).split("/").map(Number); return pass < total; }).length;
console.log(same, "of", rows.length, "rows match their hash |", failing, "posts with a failing test | first 62/62 at loop", rows.find(r => r.suite === "62/62").loop);
'
```

Expected: `656`, `652`, `"suite":"16/16"`, `"suite":"62/62"`, then `656 of 656 rows match their hash | 164 posts with a failing test | first 62/62 at loop 409`.

## House: rests on the author's word

| Claim | Why it cannot be checked yet |
|---|---|
| The author had never written code before 2026-06-18. | Nothing public proves it. His GitHub account `brennandec` was created on 2021-05-02 and has no public repository created before 2026-07-03. |
| Meta Global AI Developer Hackathon entry: a physics agent whose code changes are accepted only by checks held outside the model. The earlier public record of this page dates a 2026-10-28 submission; release `v1.1.0` is dated 2026-11-03. | The code is public ([repository](https://github.com/brennandec/meta-ai-hackathon-2026); its two tags, `v1.0.0` and `v1.1.0`, point at one commit). It has no README or licence file, its launcher states that it is not standalone, and it serves interface files that are not in the repository. It does not run from a fresh copy yet. |
| ARC Prize on Kaggle: the solver's rules were written by studying public ARC-AGI-2 tasks. By the author's own check its two attempts matched 237 of 259 outputs (91.5%) on the competition's public test file; on the hidden tasks behind the public leaderboard it scored zero, so the 91.5% does not show it solves new tasks. | The notebook is not public. |
| Contract review on public contracts (below). | The run records are private. |
| Resident State, a local runtime: built, not yet released. The idea it rests on, keeping working data in binary form instead of converting it to text, has a browser test anyone can run: [Battlegrounds](https://manymoats.com/battlegrounds) (Try, above). That page tests the idea, not the runtime. | No public build or recording. |
| Verified programs (below). | No public page shows the acceptances. |
| How the work is done (below). | The repository that would show it is private. |

**Verified programs.** Manymoats llc has been reviewed and accepted into:

- **Microsoft for Startups** — business verification approved
  2026-11-24; $5,000 in Azure startup credits.
- **AWS Activate** — approved 2026-11-06; $1,100 in AWS
  credits across two credits.

Program credits are not investment. Manymoats llc has raised no
outside capital; it is bootstrapped by its founder, Brennan DeCrow.

**Contract review on public contracts.** A local model on one Mac (Qwen3.8 27B at 4-bit precision), with outside network access blocked, answered five clause questions (governing law, cap on liability, exclusivity, non-compete, covenant not to sue) on 100 contracts drawn with a fixed seed from CUAD v1, a public set of contracts labelled by legal experts (CC BY 4.0 licence). Under a strict rule it got 331 of 500 answers right (66.2%): an answer counts only if its quoted text contains every passage the experts marked, and the 12 contracts too long for the model's input limit count as wrong. Of the 331 right answers, 215 answers said, correctly, that a clause was not present (out of 267 questions whose clause was absent); when the clause was present, the model found it 116 of 233 times (49.8%). The CUAD paper uses a different measure, so the two numbers do not compare. Scored on 2026-11-20.

**How the work is done.**

- The author directs; AI models from several companies write the code, some of them running on the author's own computers.
- A gatekeeper script outside the models writes a change only if the task's checks pass, and records each file's SHA-256 hash with a receipt. When a file it is about to write already holds changes made outside it, it first commits those as found, marked "prior drift", with no check.
- The receipts are recorded in a hash-chained log, so anyone who holds a later hash can detect a deleted or reordered entry before it. No receipt hash has been deliberately anchored outside the project yet; a few receipt files on manymoats.com show chain hashes from September 2026 log entries. The repository fingerprint under Scale covers the receipt files only as last committed, on 2026-11-13, and can be checked only once the private repository is open. The version of this page committed on 2026-11-15 recorded that the live integrity checks on this log had failed since 2026-09-29, with 3 receipt rows missing and the cause not established, and that nine private test suites failed when rerun that day. This page has no later check of those findings.
- A model from a second company reviews each claim before it is accepted. That review is itself by an AI model.

## Scale (House; last of the claims on purpose)

At commit `2766acb5b7d8cb942d8749ece029211a4e5e54af` of the private repository, committed on 2026-11-21 at 13:27 UTC, the repository held 141,205 commits and 151,399 files, with 6,374,166 lines in code-type files. These numbers rest on the author's word, and they measure volume: 139,700 commits (98.9%) are automatic, made by the gatekeeper script, and 40,017 commits among them record changes made outside it as found. Each number counts exactly this:

| Number | What it counts |
|---|---|
| 141,205 commits | every commit reachable from that commit |
| 139,700 automatic commits | commits whose subject starts with `door wo_`, the prefix the gatekeeper script gives its commits |
| 40,017 drift commits | gatekeeper commits whose subject continues `: prior drift` after the work-order id: changes made outside the gatekeeper that it committed as found, unchecked, before its own write |
| 151,399 files | every path tracked at that commit, of any type |
| 6,374,166 lines in code-type files | newline characters in the 18,007 tracked files whose names end in .mjs, .js, .ts, .tsx, .jsx, .py, .swift, .c, .h, .m, .mm, .css, .scss, .html, .sh, .rs or .go. A symlink counts as the file it points to; one points to a path outside the repository that did not exist on the counting machine, and counted zero. The files include copied third-party libraries, generated pages, files saved with run records, and code written for the products. About 56% of these lines are in files saved with run records. |

Fingerprint: the commit hash above, and `d1f4fdb1ed8c383ef3fc0eedcae8fb9c45fdd6d9bb28351edf935bd48635bc46`, the SHA-256 of the list of files tracked at that commit. GitHub's record of the push that added this page dates both: the counts existed no later than that push. Anyone later given the private repository can recount in a clean checkout of that commit:

```
git rev-parse HEAD
git -c core.quotePath=true ls-files | shasum -a 256
git rev-list --count HEAD
git log --format=%s HEAD | grep -c '^door wo_'
git log --format=%s HEAD | grep -c '^door wo_[0-9a-f]*: prior drift'
git ls-files | wc -l
git ls-files -z -- '*.mjs' '*.js' '*.ts' '*.tsx' '*.jsx' '*.py' '*.swift' '*.c' '*.h' '*.m' '*.mm' '*.css' '*.scss' '*.html' '*.sh' '*.rs' '*.go' | xargs -0 cat | wc -l
```

Expected: the two hashes above, then `141205`, `139700`, `40017`, `151399` and `6374166`. In the last command, `cat` also reports the symlink whose target is missing.

The previous version of this page gave 139,610 commits, 150,919 files and 6,353,123 lines for 2026-11-20, counted the same way at an earlier commit, with no fingerprint.

## What would show a row is wrong

| Claim | It is wrong if |
|---|---|
| Machine verification | `node verify-public-record.mjs` prints a FAIL line on a fresh copy with network access |
| Kernel ranks | the organizer's board or data shows `dogfoodarchitect` at other places, or not at all |
| Entered rows | the contest pages show a different status |
| Import Repair | the demo accepts a price with a fraction of a cent, or `node verify-stage.mjs` prints anything else on a fresh copy |
| Battlegrounds | the page does not load, or **Run comparison** does not run both paths to the same checksum |
| September run | the recount commands print anything else |
| House rows | a later public record contradicts them |
| Scale counts | the private repository, once open, has no commit `2766acb5b7d8`, or the commands under Scale print other values in a clean checkout of it |

## Changes

### In this version

- The page is reordered for a reader with no context: a three-sentence summary, a quick machine verification, then sections from the strongest check to the weakest. No figure is changed.
- New files: `audit-manifest.json` (every result as JSON, each with its mark), `verify-public-record.mjs` (the checker) and `llms.txt` (an index for language-model crawlers).
- Verified programs moved from the top of the page to House, because no public page shows the acceptances.
- Added Battlegrounds as a Try row, and linked it from the Resident State row under House.

### Corrections listed in the version of 2026-11-25

- Kernel board sizes now leave out the SGLang reference row (1,379 teams; the earlier page counted 1,380 entries, which included that reference row), and "faster than the SGLang baseline", which every team is, is replaced by rank and the median team.
- The September run moved from Rerun to Recount: its engine and tests are not public, so it cannot be rerun.
- The Meta hackathon code moved from Rerun to House: it does not run from a fresh copy.
- The Alexa+ entry moved from Outside to Entered: a contest listing shows the author's own write-up.
- The October gate runs in `hackathon/` were described as runs of a local model. Three of the four used pre-written proposals and called no model; `hackathon/README.md` now says so.
- Removed: "one commit per file" for the gatekeeper script, which was wrong (of its 139,700 commits, 8,808 commits change more than one file), and "File changes go through one gatekeeper", which left out the 40,017 commits in which it records changes made outside it.
- Removed: "about 1,400 commits a day" and "more than 8 million lines at the peak", which had no public check.

Earlier versions of this page remain in the commit history. Figures they carry that this page does not repeat are superseded.

## More

- `hackathon/`: the September run record, the October gate runs and the hackathon application as submitted on 2026-10-13, with a guide to checking each file.
- `llms.txt`: an index of this record for language-model crawlers, grouped by mark.
- Earlier copy of this repository: [brennandec/cleankpf](https://github.com/brennandec/cleankpf), now a move notice with its history kept.
- Accounts used by the author: GitHub `manymoats`, `brennandec` and `dogfoodarchitect`; Devpost `dogfoodarchitect`; YouTube [@manymoats](https://www.youtube.com/@manymoats).
- Site (House): [manymoats.com](https://manymoats.com), a 3D hub of 21 named destinations. It does not yet link to this record.
- Licence: MIT, in `LICENSE`. The copyright holder it names is the author.
