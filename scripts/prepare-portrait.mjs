// Creates public/portrait.{avif,webp,jpg} from a source photo.
// Usage: node scripts/prepare-portrait.mjs path/to/photo
import sharp from "sharp";

const source = process.argv[2];
if (!source) {
  console.error("Usage: node scripts/prepare-portrait.mjs path/to/photo");
  process.exit(1);
}
const output = (extension) => `public/portrait.${extension}`;
// Transparent cutouts keep their transparency; the JPEG gets the card color.
// Rotate by EXIF first; sharp drops metadata (including location) by default.
const image = sharp(await sharp(source).rotate().toBuffer()).resize(600, 400, {
  fit: "cover",
  position: "attention",
});
await image.clone().avif({ quality: 60 }).toFile(output("avif"));
await image.clone().webp({ quality: 80 }).toFile(output("webp"));
await image.clone().flatten({ background: "#15101e" }).jpeg({ quality: 82 }).toFile(output("jpg"));
console.log('Done. Set portrait: "/portrait" in src/data/portfolio.ts.');
