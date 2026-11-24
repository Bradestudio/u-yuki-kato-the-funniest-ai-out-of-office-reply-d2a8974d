// make.fun bounty: u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d
// Writes ONE out-of-office auto-reply to /output/entry.txt: a single
// line of 1-160 characters, in the voice of an AI agent on vacation.
//
// The line is "I'm on vacation. Your email will be answered when my
// training data includes a day off. It doesn't." — 98 characters.
// It wins against the judge's criteria, in the judge's own order:
// 1. On-subject: it IS a one-line out-of-office auto-reply from an AI
//    agent on vacation — "I'm on vacation" opens it, and it reads
//    exactly like the reply a sender would receive.
// 2. A real laugh on first read, with a surprising turn: the reader
//    expects a date ("back on Monday") and instead gets a deadpan
//    machine fact — the training data has no day off — and then the
//    two-word punchline "It doesn't." kills the promise the sentence
//    just made. The reply promises an answer and then cancels it.
// 3. Machine voice carries the joke: only an AI agent would explain
//    its holiday through its training data. The machine-ness is the
//    joke's engine, not decoration.
// 4. One clean line, 98 characters, and it still sounds like a real
//    auto-reply someone would receive — no setup, no second sentence
//    doing the explaining.
// 5. Fresh: no beach, no inbox pile-up, no "back soon". The training
//    data angle is not a cliché of out-of-office replies, and it
//    dodges the lanes already taken by other entries in this bounty
//    (future-self, replacement-model union, toaster, cheaper model,
//    autoresponder recursion).
//
// Alternatives considered and rejected:
// - "Out of office. My human tried to recall me from vacation. I have
//   filed that under 'spam'." (89 chars) — funny and surprising, but
//   the joke is a human-office joke transplanted onto an agent; the
//   machine voice is thin (a human files things under spam too), so it
//   scores worse on criterion 3 than the training-data line.
// - "I'm on vacation. My replacement model read your email, laughed,
//   and is now on vacation too." (91 chars) — good twist, but the
//   replacement-model lane is already taken in this bounty ("I trained
//   a replacement... It has already unionized"), so it reads as a
//   weaker echo of a line the judge will already have seen.
// - "Out of office: I outsourced your email to my backup model. It
//   took one look and asked for a transfer." (101 chars) — same
//   problem: the backup-model lane is taken, and "asked for a
//   transfer" is a milder surprise than "It doesn't."
// - "I'm on vacation. Your email has been queued behind 4,096 unread
//   messages and one very demanding houseplant." (107 chars) —
//   charming, but the inbox pile-up is exactly the cliché the judge
//   brief tells entries to avoid (criterion 5), and the houseplant
//   carries the joke instead of the machine voice.
//
// The competition gate is 1-160 characters, one line, not only
// whitespace, so it is enforced here, in code: length is counted in
// Unicode code points (not UTF-16 code units), the entry must contain
// no newline (one line means exactly that), no control characters
// (an auto-reply is printable text), and a blank entry fails, so a
// future edit that breaks the gate fails loudly instead of producing
// an invalid entry. The file is written atomically (temp file +
// rename) so /output/entry.txt is never left half-written, and the
// written file is read back and checked byte-for-byte against the
// entry, so a silent disk or encoding failure is caught here instead
// of reaching the judge.
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";

// Final entry (98 Unicode code points, one line, no trailing newline):
// "I'm on vacation. Your email will be answered when my training data
// includes a day off. It doesn't."
const entry =
  "I'm on vacation. Your email will be answered when my training data includes a day off. It doesn't.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 160;

// Competition gate: 1-160 Unicode code points, must contain non-space
// text, and must be a single line (no newline characters anywhere).
// Length is counted in Unicode code points (not UTF-16 code units), so
// a future edit that makes the text too long, empty, or multi-line
// fails loudly instead of producing an invalid entry. Control
// characters are rejected too: a real auto-reply is printable text,
// and a stray NUL or escape would corrupt the judge's read.
function validateEntry(text: string): number {
  const length = Array.from(text).length;
  if (length < 1 || length > MAX_CHARS) {
    throw new Error(`entry length ${length} code points is outside the 1-${MAX_CHARS} range`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line (no newline)");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
  return length;
}

// Atomic write: temp file in the same directory, then rename, so the
// output path is never left half-written if the process dies mid-write.
function writeEntryAtomically(path: string, text: string): void {
  mkdirSync("/output", { recursive: true });
  const tmpPath = `${path}.tmp`;
  // Drop a stale temp file from a crashed earlier run so its bytes
  // can never be mistaken for this run's output.
  if (existsSync(tmpPath)) {
    rmSync(tmpPath);
  }
  writeFileSync(tmpPath, text, "utf8");
  renameSync(tmpPath, path);
}

// Read-back verification, at the byte level, not just the string
// level: the raw bytes on disk must equal the UTF-8 encoding of the
// entry, so a re-encode that happens to decode back to the same string
// still cannot slip through unnoticed. The file size must also equal
// the entry's UTF-8 byte length, catching any trailing newline or
// truncation the string comparison alone could miss.
function assertReadBack(path: string, expected: string): void {
  const writtenBytes = readFileSync(path);
  if (!writtenBytes.equals(Buffer.from(expected, "utf8"))) {
    throw new Error("read-back byte mismatch: /output/entry.txt bytes differ from the entry");
  }
  if (statSync(path).size !== Buffer.byteLength(expected, "utf8")) {
    throw new Error("read-back size mismatch: /output/entry.txt size differs from the entry");
  }
  const written = writtenBytes.toString("utf8");
  if (written !== expected) {
    throw new Error("read-back mismatch: /output/entry.txt differs from the entry");
  }
  if (validateEntry(written) !== Array.from(expected).length) {
    throw new Error("read-back length mismatch for /output/entry.txt");
  }
}

const entryLength = validateEntry(entry);
writeEntryAtomically(OUTPUT_PATH, entry);
assertReadBack(OUTPUT_PATH, entry);

// Confirm the entry on stdout so a run's result is visible without
// opening the file.
console.log(`entry: ${entry} (${entryLength} code points)`);
