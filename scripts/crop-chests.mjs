import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/assets/chests/Animated Chests/Chests.png";
const OUT = "public/assets/chests/frames";
const COLS = 5;
const ROWS = 8;
const FW = 48;
const FH = 32;

await fs.mkdir(OUT, { recursive: true });

const manifest = [];
for (let r = 1; r <= ROWS; r++) {
  for (let k = 1; k <= COLS; k++) {
    const left = (k - 1) * FW;
    const top = (r - 1) * FH;
    const file = path.join(OUT, `frame_rij${r}_kol${k}.png`);
    await sharp(SRC)
      .extract({ left, top, width: FW, height: FH })
      .png()
      .toFile(file);
    manifest.push({ row: r, col: k, file: path.basename(file) });
  }
}
console.log(`wrote ${manifest.length} frames to ${OUT}`);
