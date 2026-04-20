import sharp from "sharp";

// Upscale the whole sheet to 4x so small frames are readable at a glance
const SRC = "public/assets/chests/Animated Chests/Chests.png";
const OUT = "/tmp/chests-4x.png";

await sharp(SRC)
  .resize(240 * 4, 256 * 4, { kernel: "nearest" })
  .png()
  .toFile(OUT);

console.log(OUT);
