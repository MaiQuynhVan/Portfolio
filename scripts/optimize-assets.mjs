import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const media = path.join(root, 'public', 'assets', 'canva', 'media')
const output = path.join(root, 'site-public', 'assets', 'portfolio')

const assets = {
  '407feaaf9ba7bae1280af392bc6a6ecd': '407feaaf9ba7bae1280af392bc6a6ecd.png',
  '775f25a37629afce529f296d3899156d': '775f25a37629afce529f296d3899156d.jpg',
  '073c27dad466da2c9b9fddbf81a35c8c': '073c27dad466da2c9b9fddbf81a35c8c.png',
  '0831081ae2d470b138156771bda082ef': '0831081ae2d470b138156771bda082ef.png',
  '153b02e8291cd4c10631324a0e25303c': '153b02e8291cd4c10631324a0e25303c.png',
  '34e353add1aa655c48911a5621bad4e6': '34e353add1aa655c48911a5621bad4e6.png',
  '5c2a34fd1c97e590889af8b9704e1b95': '5c2a34fd1c97e590889af8b9704e1b95.png',
  'ca335635beb01c5dd212e909a1e2e0f8': 'ca335635beb01c5dd212e909a1e2e0f8.png',
  '180da7d1229ff36a8e511549e1c14202': '180da7d1229ff36a8e511549e1c14202.png',
  '0211a132ae9c04c4c38b3df666966958': '0211a132ae9c04c4c38b3df666966958.png',
  '1a9d9d8dd3733ab5385132ca550c7a37': '1a9d9d8dd3733ab5385132ca550c7a37.png',
  '55bcc562c09d6df55d56831974429430': '55bcc562c09d6df55d56831974429430.png',
  '73583abb6405279649b202ae7918cac5': '73583abb6405279649b202ae7918cac5.png',
  '7decbeed5081b0aa338fd418f06a4391': '7decbeed5081b0aa338fd418f06a4391.png',
  '8a93c570ce92b0ad3bc1eeab4925d268': '8a93c570ce92b0ad3bc1eeab4925d268.png',
  '6df91d173a7da2c2b31e4ebad3d180f6': '6df91d173a7da2c2b31e4ebad3d180f6.png',
  '12962171f84de4879e5af695fd50aa72': '12962171f84de4879e5af695fd50aa72.png',
  '5e4518ebd30c19239c1d29afc26f242e': '5e4518ebd30c19239c1d29afc26f242e.png',
  '3f385b3f98c522390b664a9681c939ed': '3f385b3f98c522390b664a9681c939ed.png',
  '161f232ffd755700a8e3c60f933f4285': '161f232ffd755700a8e3c60f933f4285.png',
  '7e7e177481b8518335c1a4bddd87e8cf': '7e7e177481b8518335c1a4bddd87e8cf.png',
  'cb46067cd13e45d1fc18bccad7d7d817': 'cb46067cd13e45d1fc18bccad7d7d817.png',
  'e538ee7f2a9a95e504ded2ba0bf7b755': 'e538ee7f2a9a95e504ded2ba0bf7b755.png',
  'a1edc69ae46355dbbd754d9b126b6aae': 'a1edc69ae46355dbbd754d9b126b6aae.png',
  'f13d131dcff6ca6cbc2eb8352c6ee783': 'f13d131dcff6ca6cbc2eb8352c6ee783.png',
  '16683442c2e324203fb11b231a28c209': '16683442c2e324203fb11b231a28c209.png',
  '56031105d8b801f29be66ed63c1bf3ab': '56031105d8b801f29be66ed63c1bf3ab.png',
  '0c90c7e398b14bb86749fa2cc3b6ccb1': '0c90c7e398b14bb86749fa2cc3b6ccb1.png',
  '6329450836f5c63e533c4e17ccbaac68': '6329450836f5c63e533c4e17ccbaac68.png',
  '1ccccd7d4ea319d392cc3a94a8614c53': '1ccccd7d4ea319d392cc3a94a8614c53.png',
  '252fb14ff2d2b6cbce42d83b30be90d2': '252fb14ff2d2b6cbce42d83b30be90d2.png',
  '908513fbf4059637e62154c2ca692ff9': '908513fbf4059637e62154c2ca692ff9.jpg',
  '1b80c311fd9e09da2e5f3fbe9e327298': '1b80c311fd9e09da2e5f3fbe9e327298.jpg',
  'd6cfe1b180f045b834ec2ce63d6f418f': 'd6cfe1b180f045b834ec2ce63d6f418f.jpg',
  '7b0af560a655411f42c86722d257e7ad': '7b0af560a655411f42c86722d257e7ad.jpg',
  '75977dfbab8ae9e1a345e5c4ce95f726': '75977dfbab8ae9e1a345e5c4ce95f726.jpg',
  'c037869df02817c7830112c8b38bf5c6': 'c037869df02817c7830112c8b38bf5c6.png',
  '0deb8e3396570413076dc324f0ac248f': '0deb8e3396570413076dc324f0ac248f.png',
}

const specialAssets = {
  'academic-overview': path.join(root, 'public', 'assets', 'canva', 'page-05', 'page-05.jpg'),
}

await mkdir(output, { recursive: true })

for (const [id, file] of Object.entries(assets)) {
  const source = path.join(media, file)
  await optimize(source, id)
}

for (const [id, source] of Object.entries(specialAssets)) {
  await optimize(source, id)
}

async function optimize(source, id) {
  for (const width of [480, 960, 1600]) {
    const pipeline = sharp(source).rotate().resize({ width, withoutEnlargement: true })
    await Promise.all([
      pipeline.clone().webp({ quality: 82, effort: 5 }).toFile(path.join(output, `${id}-${width}.webp`)),
      pipeline.clone().avif({ quality: 64, effort: 5 }).toFile(path.join(output, `${id}-${width}.avif`)),
    ])
  }
}

console.log(`Optimised ${Object.keys(assets).length + Object.keys(specialAssets).length} source images into ${output}`)
