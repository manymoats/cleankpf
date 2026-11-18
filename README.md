# manymoats

One person and a crew of AI models built this between 2026-06-18 and 2026-11-18. The author had never written code before 2026-06-18. He directs; the models write the code; automated gates decide what is kept, and every accepted change lands with a receipt.

## Results you can check

| Result | Where |
|---|---|
| GPU kernels for NVIDIA H200 in the Open Kernel Challenge, team `dogfoodarchitect`. Attention decode placed 61st of 1,380 entries. The other four kernels placed 84th of 896 entries (prefill), 136th of 1,741 entries (bf16 projection), 189th of 1,423 entries (MoE) and 220th of 1,297 entries (decode layer), each faster than the SGLang baseline. | https://openkernelchallenge.dev |
| Amazon Alexa+ hackathon: an agent governance console and MCP server. Attempts to tamper with the tests that judge the agent are refused, and the tests are restored. | [Devpost](https://devpost.com/software/alexa-autonomous-agent-governance-console-mcp-2025-11-25) · [walkthrough video](https://www.youtube.com/watch?v=Fp5rXegEDLg) |
| Meta AI hackathon: a receipted physics agent. The model proposes; limits held outside the model decide. | [code and releases](https://github.com/brennandec/meta-ai-hackathon-2026) |
| Import Repair: a model proposes field mappings; a separate check rejects malformed batches. MIT licensed. | [code](https://github.com/brennandec/import-repair) · [live demo](https://brennandec.github.io/import-repair/) |
| FlagOS kernel track: four tasks passed all seven chip checks. | organizer portal (account needed) |
| A 35-hour autonomous physics-engine run, public in this repository (see below). | `hackathon/` |

Other filed entries: [PatchCrowd](https://devpost.com/software/patchcrowd) (OpenAI Codex x TwitchCon) and [Invoice Evidence Review](https://devpost.com/software/invoice-evidence-review) (UGREEN).

## The September autonomous run

From 2026-09-26T03:05:45Z to 2026-09-27T14:18:08Z, about 35 hours, model seats ran the physics engine in autonomous loops: 652 distinct loops in all. Its test suite grew from 16 passing tests to 62 passing tests over the run. The summary also lists the loop numbers that are missing from the record and the few that appear twice. The record is `hackathon/loop-record-2026-09.summary.json` in this repository.

## Scale and pace

On 2026-11-18 the private repository held 137,580 commits and 150,321 files, with 6,294,439 lines of code at the 2026-11-15 count. That is about 1,400 commits a day.

The count is high because of how changes land. The gatekeeper (the door) makes one commit per file it writes. By 2026-11-18 it had landed 99,804 work orders as 136,087 commits, 98.9% of all commits. About 70% of those commits carry code, tests, records and documents; about 30% are routine coordination records between model seats.

Commits record when work was saved, not when it was done. The git history starts on 2026-08-12, and work began on 2026-06-18, before there was a repository. Before the door existed, work piled up uncommitted: by the author's count, more than 8 million lines at the peak, carried for months. The door was the fix: every change checked, recorded and given a receipt. The jump in commits in September and the peak in October are that backlog being recorded, not the work beginning.

## How it works

- **The door.** Every file change goes through one gatekeeper. It runs the task's acceptance checks once, then writes each file with its SHA-256 hash and a receipt, one commit per file. It had issued 584,529 receipts by 2026-11-18.
- **The ledger.** Receipts and a hash-chained event log record what changed, when, and which checks passed.
- **Gates.** Scripts refuse rule breaks: a behaviour built outside its engine, a completion claim without evidence, a file in the wrong place.
- **Engines.** One behaviour, one engine: physics, GPU kernels, a legal engine, a local inference runtime, video and more.
- **The crew.** Model seats (Claude, Gemini, DeepSeek, GLM and Qwen-family models, some running on three local Macs) take work orders from one channel. A model from a second family checks each claim before it is accepted.

## Not finished

- The source is private. A daily timestamped commitment of its size (the commit id, the counts and the list of commit times, with no code) starts with the next update.
- Resident State, the local runtime, is built and not yet released.
- No revenue yet.

## More

- The full dated record of results, failing checks and corrections is the previous version of this page (2026-11-16), in this repository's commit history.
- `hackathon/` holds the run records from the September physics runs.
- Site: manymoats.com
- Licence: MIT, in `LICENSE`.
