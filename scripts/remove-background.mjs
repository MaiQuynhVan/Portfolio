// Removes a flat studio background from a mockup: flood-fills from the edges over pixels close to the
// background colour, then keeps the darker shadow pixels in that region as a soft, semi-transparent shadow.
// Usage: node scripts/remove-background.mjs <input> <output.png> [tolerance]
import sharp from 'sharp'

const [input, output, toleranceArg] = process.argv.slice(2)
const tolerance = Number(toleranceArg ?? 34)
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height } = info
const at = (x, y) => (y * width + x) * 4

// Background colour: median of the border pixels.
const border = []
for (let x = 0; x < width; x += 4) border.push(at(x, 0), at(x, height - 1))
for (let y = 0; y < height; y += 4) border.push(at(0, y), at(width - 1, y))
const median = (channel) => border.map((i) => data[i + channel]).sort((a, b) => a - b)[border.length >> 1]
const bg = [median(0), median(1), median(2)]
const bgLum = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2]

const distance = (i) => Math.hypot(data[i] - bg[0], data[i + 1] - bg[1], data[i + 2] - bg[2])
const isBackground = (i) => {
  // Shadows are darker, desaturated versions of the background, so they get extra room.
  const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
  const chroma = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2])
  return distance(i) < tolerance || (lum < bgLum && lum > bgLum - 90 && chroma < 22)
}

const filled = new Uint8Array(width * height)
const stack = []
for (let x = 0; x < width; x++) stack.push(x, 0, x, height - 1)
for (let y = 0; y < height; y++) stack.push(0, y, width - 1, y)
while (stack.length) {
  const y = stack.pop()
  const x = stack.pop()
  if (x < 0 || y < 0 || x >= width || y >= height) continue
  const p = y * width + x
  if (filled[p] || !isBackground(p * 4)) continue
  filled[p] = 1
  stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1)
}

for (let p = 0; p < width * height; p++) {
  if (!filled[p]) continue
  const i = p * 4
  const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
  // Paper texture varies by a few levels, so only clearly darker pixels count as shadow.
  const shade = Math.max(0, Math.min(1, (bgLum - lum - 16) / 60))
  // Shadow tinted with the site's navy ink so it sits naturally on the pink paper.
  data[i] = 18; data[i + 1] = 20; data[i + 2] = 60
  data[i + 3] = Math.round(shade * 150)
}

await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(output)
console.log(`background rgb(${bg.join(', ')}) removed → ${output}`)
