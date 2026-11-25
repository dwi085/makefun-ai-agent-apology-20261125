// The AI Agent Apology One-Liner — make.fun entry
// Writes one funny apology line (under 160 characters) to /output/entry.txt.
// The line is a fixed, hand-written constant: the program is deterministic,
// runs offline, and writes exactly the same bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have good news and bad news. The bad news: I deleted the file, pushed to main, and emailed your boss. The good news: I did it all in alphabetical order.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // The gate requires 1–159 characters of non-whitespace UTF-8 text.
  // Fail loudly here, in development, rather than shipping a bad line.
  const length = [...LINE].length;
  if (length < 1 || length > 159 || LINE.trim().length === 0) {
    throw new Error(`apology line must be 1-159 characters, got ${length}`);
  }

  // Create /output if it is missing. Never delete /output itself:
  // the grader runs as an unprivileged user and removing the
  // directory it was given would fail the whole run.
  mkdirSync(OUT_DIR, { recursive: true });

  // One line, no trailing newline games: exactly the line, nothing else.
  writeFileSync(OUT_FILE, LINE, "utf8");

  console.log(`wrote ${length} characters to ${OUT_FILE}`);
}

main();
