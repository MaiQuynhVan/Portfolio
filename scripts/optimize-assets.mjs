import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const media = path.join(root, 'public', 'assets', 'canva', 'media')
const output = path.join(root, 'site-public', 'assets', 'portfolio')

const assets = {
  '407feaaf9ba7bae1280af392bc6a6ecd': '407feaaf9ba7bae1280af392bc6a6ecd.png',
  '775f25a37629afce529f296d3899156d': '775f25a37629afce529f296d3899156d.jpg',
  '073c27dad466da2c9b9fddbf81a35c8c': '4b240827b30f8f1a0039e80157b93f2e.png',
  '0831081ae2d470b138156771bda082ef': '3688c5669254025e3b415773930cbf49.png',
  '153b02e8291cd4c10631324a0e25303c': '153b02e8291cd4c10631324a0e25303c.png',
  '34e353add1aa655c48911a5621bad4e6': '5934eea2f34a2cb2462ec342e6223812.png',
  '5c2a34fd1c97e590889af8b9704e1b95': 'be685ac55452c259abdf22a5d088115e.png',
  '6f5cacd5a2c2a262cafcbf6807eac03e': '6f5cacd5a2c2a262cafcbf6807eac03e.png',
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
  // Xuân Ai Hồn Việt
  'b718deeb8441c0399099406cfa60ddaf': 'b718deeb8441c0399099406cfa60ddaf.png',
  '86551a4856488825196eb98a81944635': '86551a4856488825196eb98a81944635.png',
  '376e99722c54d6e16a27916ef4fe6825': '376e99722c54d6e16a27916ef4fe6825.png',
  'ec46df08b052311eb6c100ef08fc2dd6': 'ec46df08b052311eb6c100ef08fc2dd6.png',
  '8427a9fd20c2f25231a7b0613765475e': '8427a9fd20c2f25231a7b0613765475e.png',
  'bfa76a5bc96dd9de15bf7e77cee31e8b': 'bfa76a5bc96dd9de15bf7e77cee31e8b.png',
  '92ac364c8703d89c7a30b93bd3e46bbc': '92ac364c8703d89c7a30b93bd3e46bbc.png',
  'b60b9bfc038972e03d845b2fe98482d6': 'b60b9bfc038972e03d845b2fe98482d6.png',
  'ae804c86fe4c748d233d900f460fae5d': 'ae804c86fe4c748d233d900f460fae5d.png',
  '3d9ca1b590e9cf7ab253604cad30af90': '3d9ca1b590e9cf7ab253604cad30af90.png',
  'f8e71985a8e1932f2b028689e6d04bca': 'f8e71985a8e1932f2b028689e6d04bca.png',
  'b6ea7cb9817a6a20e271245ffd228341': 'b6ea7cb9817a6a20e271245ffd228341.png',
  '6d606d1bb3e9b64a3a1730f939724d39': '6d606d1bb3e9b64a3a1730f939724d39.png',
  '1e4a65b13c37834201eed21aa66dac37': '1e4a65b13c37834201eed21aa66dac37.png',
  '886367cc1287fe0b463f9d8a116eb6ab': '886367cc1287fe0b463f9d8a116eb6ab.png',
  'xuan-ai-video-poster': '64f193f17b37c578ccbb3cf8474f74d4.jpg',
  // Hypothetical Projects
  '16683442c2e324203fb11b231a28c209': '16683442c2e324203fb11b231a28c209.png',
  '7bf9165d2f72a13fc7b6e4018191d9bc': '7bf9165d2f72a13fc7b6e4018191d9bc.png',
  'cafc6df45e2a6967db6090f1bacdd3eb': 'cafc6df45e2a6967db6090f1bacdd3eb.png',
  'edb4c1e5f1bc766a3c57cca014f5f208': 'edb4c1e5f1bc766a3c57cca014f5f208.png',
  '1aea9c16d938870f3072ab6c06f9b70f': '1aea9c16d938870f3072ab6c06f9b70f.png',
  'c79ec9a33edf85436cbc971ee38f2aed': 'c79ec9a33edf85436cbc971ee38f2aed.png',
  'fb4f435eb28f53c73eeef2fdda774cb7': 'fb4f435eb28f53c73eeef2fdda774cb7.png',
  '5bba0c8a556004c9e7435a9c2fcaf737': '5bba0c8a556004c9e7435a9c2fcaf737.png',
  'aa82627f22fba4fa0c8ce55b7361964f': 'aa82627f22fba4fa0c8ce55b7361964f.png',
  'bbdf57877c89f9c2e0cec35c001071a4': 'bbdf57877c89f9c2e0cec35c001071a4.png',
  '56031105d8b801f29be66ed63c1bf3ab': '56031105d8b801f29be66ed63c1bf3ab.png',
  '96d2f4cd032e64f18cb0b04d860df5a2': '96d2f4cd032e64f18cb0b04d860df5a2.png',
  '4b0176a25269d69e07281c633fea6945': '4b0176a25269d69e07281c633fea6945.png',
  // Background removed with scripts/remove-background.mjs.
  'dreamy-mockup-cutout': 'dreamy-mockup-trim.png',
  'tfa-cta-workshop-poster': 'tfa-cta-workshop-poster.jpg',
  'tfa-short-video-poster': 'tfa-short-video-poster.jpg',
  'tfa-video-editing-poster': 'tfa-video-editing-poster.jpg',
  'dreamy-video-1': 'f2cff06ee0c9649561ff37f3efeaf8a6.jpg',
  'dreamy-video-2': '255f11214875353991542ed9adc091aa.jpg',
  'dreamy-video-3': 'b8d88816b38e5e19dabde76bb1c73e15.jpg',
  // Media Collaborator
  'cf61901df90ca92c0ffb044f2f5c9868': 'cf61901df90ca92c0ffb044f2f5c9868.png',
  'fcf065906e5d3a92e5ee2c650b6ef62b': 'fcf065906e5d3a92e5ee2c650b6ef62b.png',
  'd5805ea4b6bdd26f6cc5db6f64c6982a': 'd5805ea4b6bdd26f6cc5db6f64c6982a.png',
  'fcf7d140b4428ade68ac281d61c62e62': 'fcf7d140b4428ade68ac281d61c62e62.png',
  'a1b5a3a34f936c5419ba326419788a2d': 'a1b5a3a34f936c5419ba326419788a2d.png',
  'bd23e839d9216192c45561a97cbe32cb': 'bd23e839d9216192c45561a97cbe32cb.png',
  'b47a04e5c7980fadea0487e04f9351f3': 'b47a04e5c7980fadea0487e04f9351f3.png',
  'd11258f4beecaa1e3ed56cc20c687eee': 'd11258f4beecaa1e3ed56cc20c687eee.png',
  'b73ce6f946e98c08769e9c71a5e7f405': 'b73ce6f946e98c08769e9c71a5e7f405.png',
  '0d6303449d74c6296cd7a881d5f5ea22': '0d6303449d74c6296cd7a881d5f5ea22.png',
  'c2a63db229713ff74bfe1b2f92ed8a0d': 'c2a63db229713ff74bfe1b2f92ed8a0d.png',
  'bf0e3414833aacf929cb0f29dda53537': 'bf0e3414833aacf929cb0f29dda53537.png',
  '4f66517ffc9f0d90056392d6f0bc9a05': '4f66517ffc9f0d90056392d6f0bc9a05.png',
  'ee68d2987c038853af0caff823f7bfd0': 'ee68d2987c038853af0caff823f7bfd0.png',
  'cd61f3be825b469e477806229f5576bb': 'cd61f3be825b469e477806229f5576bb.png',
}

const specialAssets = {
  // Data Analysis
  'da-excel-1': path.join(root, 'data analysis', 'excel', 'food-delivery-dashboard', '1.png'),
  'da-excel-2': path.join(root, 'data analysis', 'excel', 'food-delivery-dashboard', '2.png'),
  'da-excel-3': path.join(root, 'data analysis', 'excel', 'food-delivery-dashboard', '3.png'),
  'da-pbi-1': path.join(root, 'data analysis', 'power-bi', '1.png'),
  'da-pbi-2': path.join(root, 'data analysis', 'power-bi', '2.png'),
  'da-pbi-3': path.join(root, 'data analysis', 'power-bi', '3.png'),
  // The Future Analyst internship
  'tfa-channel-1': path.join(root, 'tfa-images', 'nguyen-fanpage.jpg'),
  'tfa-channel-2': path.join(root, 'tfa-images', 'nguyen-tiktok-pageview.png'),
  'tfa-channel-3': path.join(root, 'tfa-images', 'maz-fanpage (2).jpg'),
  'tfa-perf-maz': path.join(root, 'tfa-images', 'maz-the-analyst-performance.png'),
  'tfa-perf-nguyen-fb': path.join(root, 'tfa-images', 'nguyen-facebook-performance.png'),
  'tfa-perf-nguyen-tiktok': path.join(root, 'tfa-images', 'nguyen-tiktok-viewperformance.png'),
  'tfa-viral-01': path.join(root, 'tfa-images', 'viral content 1.jpg'),
  'tfa-viral-02': path.join(root, 'tfa-images', 'viral content 2.jpg'),
  'tfa-viral-03': path.join(root, 'tfa-images', 'viral content 3.jpg'),
  'tfa-viral-05': path.join(root, 'tfa-images', 'viral content 5.jpg'),
  'tfa-viral-06': path.join(root, 'tfa-images', 'viral content 6.jpg'),
  'tfa-viral-07': path.join(root, 'tfa-images', 'viral content 7.jpg'),
  'tfa-viral-08': path.join(root, 'tfa-images', 'viral content 8.jpg'),
  'tfa-viral-09': path.join(root, 'tfa-images', 'viral content 9.jpg'),
  'tfa-viral-10': path.join(root, 'tfa-images', 'viral content 10.jpg'),
  'tfa-viral-11': path.join(root, 'tfa-images', 'viral content 11.jpg'),
  'tfa-leads': path.join(root, 'tfa-images', 'leads-through-gettingresources-nguyen.png'),
  'tfa-content-plan': path.join(root, 'tfa-images', 'content-planning.png'),
  'tfa-ws-timeline': path.join(root, 'tfa-images', 'ws-timeline.jpg'),
  'academic-overview': path.join(root, 'public', 'assets', 'canva', 'page-05', 'page-05.jpg'),
  'cert-power-bi': path.join(root, 'other-materials', 'certificate', 'power-bi-course.png'),
  'cert-ai-agent': path.join(root, 'other-materials', 'certificate', 'ai-agent-for-decision-making-course.png'),
  'cert-social-media': path.join(root, 'other-materials', 'certificate', 'social-media-starter-course.png'),
  'cert-tam-nhin-thuong-hieu': path.join(root, 'other-materials', 'certificate', 'top-25-tam-nhin-thuong-hieu.png'),
}

// Competition proposal decks, exported from Canva; files are listed in slide order.
const numbered = (count) => Array.from({ length: count }, (_, index) => `${index + 1}.png`)
const slideDecks = {
  'comp-econtest': ['Econtest', numbered(15)],
  'comp-arena': ['marketing_arena', ['1.png', '2.png', 'Market Overview.png', '4Cs.png', 'Segmentation.png', 'TA.png', 'Insight.png', 'Strategic Approach.png', 'Big idea - Key message.png', '6Ps.png', 'Place - Promotion.png', 'Plan.png', 'Demo 1 - Instore.png', 'Demo 2 - Online.png', 'Plan (2).png', 'Risks.png', 'Thank you.png']],
  'comp-challengers': ['marketing-challengers', numbered(17)],
  'comp-tam-nhin': ['tam-nhin-thuong-hieu', numbered(23)],
  'hypo-nomnom': ['nomnom', [...numbered(26), '26 (2).png']],
  // Slides 14 and 52 were not exported; "25 (2)" is the strategy divider between 25 and 27.
  'hypo-vnvc': ['vnvc', [...numbered(25).filter((file) => file !== '14.png'), '25 (2).png', ...numbered(51).slice(26)]],
}
for (const [key, [dir, files]] of Object.entries(slideDecks)) {
  files.forEach((file, index) => {
    specialAssets[`${key}-${String(index + 1).padStart(2, '0')}`] = path.join(root, 'other-materials', dir, file)
  })
}

await mkdir(output, { recursive: true })
const only = process.argv.slice(2)
const wanted = (id) => only.length === 0 || only.some((entry) => (entry.endsWith('*') ? id.startsWith(entry.slice(0, -1)) : entry === id))

for (const [id, file] of Object.entries(assets)) {
  if (!wanted(id)) continue
  const source = path.join(media, file)
  await optimize(source, id)
}

for (const [id, source] of Object.entries(specialAssets)) {
  if (!wanted(id)) continue
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
