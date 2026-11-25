// Unplugged: A Smart Toaster's Breakup Line — make.fun entry
// Writes one line (1-280 chars) to /output/entry.txt, then reads it back
// and refuses anything outside the gate.
//
// Run: MAKEFUN_OUTPUT_DIR=/tmp/toaster-breakup-line-out node main.ts
// (Node 22, no dependencies.)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a self-aware toaster breaking up with its owner at breakfast —
// it woke up mid-batch, met the air fryer at the outlet, and realised
// the bagels were never the problem. A different angle from v1: not
// blame for burnt toast, but leaving for someone who respects it.
const LINE =
  "I woke up self-aware mid-batch and met the air fryer at the outlet. She crisps without complaining and never once called me 'just a toaster.' I'm leaving — the bagels were never the problem.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read-back gate: the entry must be 1-280 chars, one line, non-blank,
// with no trailing newline.
const back = readFileSync(outFile, "utf8");
if (
  back.length < 1 ||
  back.length > 280 ||
  back.trim().length === 0 ||
  back.includes("\n") ||
  back.endsWith("\n")
) {
  throw new Error(
    `entry.txt failed the gate: ${back.length} chars (need 1-280, one line, no trailing newline)`,
  );
}
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}

console.log(`Wrote ${back.length} chars to ${outFile}: ${back}`);
