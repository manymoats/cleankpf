# manymoats

One person and a crew of AI models built this between 2026-06-18 and 2026-11-20. The author had never written code before 2026-06-18. He directs; the models write the code; automated gates decide what is kept, and accepted changes land with a receipt.

Each result below carries a mark that says how you can check it. **Outside** means someone else published it. **Rerun** means you can reproduce it from this repository. **Sealed** means it is private, with a published fingerprint. **House** means it rests on our word alone. No row is marked sealed yet, because no fingerprint has been published.

## Results you can check

| Result | Mark | Where |
|---|---|---|
| GPU kernels for NVIDIA H200 in the Open Kernel Challenge, team `dogfoodarchitect`. Attention decode placed 61st of 1,380 entries. The other four kernels placed 84th of 896 entries (prefill), 136th of 1,741 entries (bf16 projection), 189th of 1,423 entries (MoE) and 220th of 1,297 entries (decode layer), each faster than the SGLang baseline. | Outside | https://openkernelchallenge.dev |
| Amazon Alexa+ hackathon: an agent governance console and MCP server. Attempts to tamper with the tests that judge the agent are refused, and the tests are restored. | Outside | [Devpost](https://devpost.com/software/alexa-autonomous-agent-governance-console-mcp-2025-11-25) · [walkthrough video](https://www.youtube.com/watch?v=Fp5rXegEDLg) |
| Meta AI hackathon: a receipted physics agent. The model proposes; limits held outside the model decide. | Rerun | [code and releases](https://github.com/brennandec/meta-ai-hackathon-2026) |
| Import Repair: a model proposes field mappings; a separate check rejects malformed batches. MIT licensed. | Rerun | [code](https://github.com/brennandec/import-repair) · [live demo](https://brennandec.github.io/import-repair/) |
| FlagOS kernel track: four tasks passed all seven chip checks. | House | organizer portal (account needed) |
| A 35-hour autonomous physics-engine run, public in this repository (see below). | Rerun | `hackathon/` |

Other filed entries: [PatchCrowd](https://devpost.com/software/patchcrowd) (OpenAI Codex x TwitchCon) and [Invoice Evidence Review](https://devpost.com/software/invoice-evidence-review) (UGREEN).

## The September autonomous run

From 2026-09-26T03:05:45Z to 2026-09-27T14:18:08Z, about 35 hours, model seats ran the physics engine in autonomous loops: 652 distinct loops in all. Its test suite grew from 16 passing tests to 62 passing tests over the run. The summary also lists the loop numbers that are missing from the record and the few that appear twice. The record is `hackathon/loop-record-2026-09.summary.json` in this repository, and the rows behind it are in `hackathon/loop-record-2026-09.public.jsonl`.

## Scale and pace

Mark: house. On 2026-11-20 the private repository held 139,610 commits and 150,919 files, with 6,353,123 lines of code. That is about 1,400 commits a day since the git history began.

The count is high because of how changes land. The gatekeeper (the door) makes one commit per file it writes. By 2026-11-20 it had landed 101,210 work orders as 138,110 commits, 98.9% of all commits.

Commits record when work was saved, which can be long after it was done. The git history starts on 2026-08-12, and work began on 2026-06-18, before there was a repository. Before the door existed, work piled up uncommitted: by the author's count, more than 8 million lines at the peak, carried for months. The door was the fix: changes checked, recorded and given a receipt as they land. The jump in commits in September and the peak in October are that backlog being recorded.

## How it works

- **The door.** File changes go through one gatekeeper; 98.9% of all commits came through it. It runs the task's acceptance checks once, then writes each file with its SHA-256 hash and a receipt, one commit per file. The receipt log, as last committed on 2026-11-13, holds 584,529 receipts.
- **The ledger.** Receipts and a hash-chained event log record what changed, when, and which checks passed.
- **Gates.** Scripts refuse rule breaks: a behaviour built outside its engine, a completion claim without evidence, a file in the wrong place.
- **Engines.** One behaviour, one engine: physics, GPU kernels, a legal engine, a local inference runtime, video and more.
- **The crew.** Model seats (Claude, Gemini, Grok, DeepSeek, GLM and Qwen-family models, some running on three local Macs) take work orders from one channel. A model from a second family checks each claim before it is accepted.

## Check it yourself

Recount the September run from this repository with git, a shell and Node.js:

```
git clone https://github.com/manymoats/cleankpf && cd cleankpf
F=hackathon/loop-record-2026-09.public.jsonl
wc -l < $F
grep -o '"loop":[0-9]*' $F | sort -u | wc -l
head -n 1 $F | grep -o '"suite":"[^"]*"'
tail -n 1 $F | grep -o '"suite":"[^"]*"'
node -e 'const c=require("crypto");const r=require("fs") ["readFileSync"] ("hackathon/loop-record-2026-09.public.jsonl","utf8")["trim"] ()["split"] ("\n")["map"] (s=>JSON["parse"] (s));let n=0;for(const x of r)if(c["createHash"] ("sha256")["update"] (x["public_block_text"])["digest"] ("hex")===x["public_block_sha256"])n++;console["log"] (n,"of",r["length"])'
```

You should see 656 rows, 652 distinct loops, the suite at `16/16` on the first row and `62/62` on the last, and `656 of 656`: every public row matches the hash recorded beside it.

What would show a row is wrong:

| Claim | It is wrong if |
|---|---|
| Open Kernel placements | the leaderboard shows no team `dogfoodarchitect`, or other places |
| Alexa+ entry | the Devpost page does not list it, or the video shows no refused tamper attempt |
| Meta and Import Repair | the code does not run as its own README says |
| September run | the commands above print anything else |
| FlagOS | the organizer's records show fewer than four tasks passing all seven chips |
| Scale and pace | a later public commitment shows smaller counts for the same date |

What stays private, and why: the source, the receipts and the filing records sit in a private repository. Parts of the code are under patent filings, and other parts hold keys and personal records. Until a public commitment exists, the scale figures rest on our word.

## Not finished

- The source is private. A timestamped commitment of its size (the commit id, the counts and the list of commit times, with no code) is built and tested in private. It is not published yet, so nothing on this page fixes the counts to a public time.
- Resident State, the local runtime, is built and not yet released.
- No revenue yet.

## More

- The full dated record of results, failing checks and corrections is the version of this page published on 2026-11-16, in this repository's commit history.
- `hackathon/` holds the run records from the September physics runs.
- Site: manymoats.com
- Licence: MIT, in `LICENSE`.
