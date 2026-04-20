import sharp from "sharp";
import fs from "node:fs/promises";

const SRC = "public/assets/npcs/other/spritesheet format/smith_anvil-Sheet.png";
const DST = "public/assets/npcs/smith_no_anvil.png";

// Anvil occupies the left-half of each 32×32 frame, roughly:
//   local x: 0..16 (17 pixels wide — anvil head + base)
//   local y: 17..29 (13 pixels tall — anvil head to ground)
const ANVIL_X_START = 0;
const ANVIL_X_END = 17; // exclusive
const ANVIL_Y_START = 17;
const ANVIL_Y_END = 30; // exclusive

const FRAMES = 5;
const FRAME_W = 32;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const buf = Buffer.from(data);

for (let f = 0; f < FRAMES; f++) {
  const fx = f * FRAME_W;
  for (let y = ANVIL_Y_START; y < ANVIL_Y_END; y++) {
    for (let lx = ANVIL_X_START; lx < ANVIL_X_END; lx++) {
      const x = fx + lx;
      const idx = (y * width + x) * channels;
      buf[idx + 3] = 0; // alpha = 0 → transparent
    }
  }
}

await sharp(buf, { raw: { width, height, channels } }).png().toFile(DST);

// Also emit a 4x-upscaled preview for visual check
await sharp(DST).resize(width * 8, height * 8, { kernel: "nearest" }).png().toFile("/tmp/smith-no-anvil-preview.png");

const stat = await fs.stat(DST);
console.log(`wrote ${DST} (${stat.size} bytes), preview at /tmp/smith-no-anvil-preview.png`);
console.log(`anvil region stripped: x=${ANVIL_X_START}..${ANVIL_X_END - 1}, y=${ANVIL_Y_START}..${ANVIL_Y_END - 1} per frame`);
