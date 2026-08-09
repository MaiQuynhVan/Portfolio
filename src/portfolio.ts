export type ProjectSlug = 'upvise' | 'xuan-ai' | 'media' | 'competitions' | 'hypothetical'

export type MediaAsset = {
  id: string
  alt: string
  ratio?: string
  position?: string
}

export type Metric = {
  value: string
  label: string
}

export type ProjectLink = {
  label: string
  href: string
  note: string
}

export type Project = {
  slug: ProjectSlug
  index: string
  title: string
  shortTitle: string
  category: string
  role: string
  period: string
  intro: string
  overview: string[]
  metrics: Metric[]
  responsibilities: { title: string; body: string }[]
  deliverables: string[]
  learning: string
  cover: MediaAsset
  gallery: MediaAsset[]
  links: ProjectLink[]
  accent: 'pink' | 'aqua' | 'gold' | 'lavender'
}

export const profile = {
  name: 'Quynh Van',
  email: 'vanmq.work@gmail.com',
  phone: '0353 214 267',
  phoneHref: '+84353214267',
  linkedin: 'https://www.linkedin.com/in/van-mai-quynh-37235a320/',
  instagram: 'https://www.instagram.com/ida.academy_/',
  tiktok: 'https://www.tiktok.com/@dreamy_artsupplies',
  headline: 'A marketing enthusiast at the beginning of her journey.',
  about: [
    'As a third-year student majoring in Digital Marketing, I am especially interested in copywriting, branding and digital marketing.',
    'Responsibility and a strong growth mindset are the values that guide my learning journey, motivating me to stay proactive and continuously improve.',
    'I am eager to gain my first professional experience through an internship opportunity—taking the first step toward building a solid and meaningful career in marketing.',
  ],
}

export const projects: Project[] = [
  {
    slug: 'upvise',
    index: '01',
    title: 'Workshop CV Upvise',
    shortTitle: 'Upvise',
    category: 'Leadership · Event Strategy',
    role: 'Head of Organising Committee',
    period: 'March 2025',
    intro: 'A collaborative workshop by FBA Presents and faculty partners, created to help UEL students rediscover and refine their CVs.',
    overview: [
      'At the beginning of 2025, I led “Upvise”, a practical workshop designed around interview skills and one-on-one CV reviews.',
      'The programme brought students, HR professionals and industry experts together for personalised feedback and practical career preparation.',
    ],
    metrics: [
      { value: '170+', label: 'CVs received' },
      { value: '150+', label: 'participants' },
      { value: '8', label: 'HR experts & speakers' },
    ],
    responsibilities: [
      { title: 'Strategic planning', body: 'Planned the overall programme structure and built a detailed timeline for every activity.' },
      { title: 'Team coordination', body: 'Organised four teams—Content, Media & Technical, External Relations and Production—and monitored progress across the programme.' },
      { title: 'Quality control', body: 'Reviewed deliverables, tracked performance and supported team members in meeting shared goals.' },
    ],
    deliverables: ['Programme structure', 'Action plan', 'Interview skills session', 'One-on-one CV review', 'Team operations'],
    learning: 'This project taught me to plan better, communicate clearly and stay calm when things did not go as planned. Leadership is not only about giving directions—it is about listening, supporting and helping.',
    cover: { id: '073c27dad466da2c9b9fddbf81a35c8c', alt: 'Upvise workshop team photo', ratio: '3 / 2' },
    gallery: [
      { id: '34e353add1aa655c48911a5621bad4e6', alt: 'Upvise organisers and guest speakers', ratio: '3 / 2' },
      { id: '153b02e8291cd4c10631324a0e25303c', alt: 'One-on-one CV review at Upvise', ratio: '3 / 2' },
      { id: '0831081ae2d470b138156771bda082ef', alt: 'A speaker receiving recognition at Upvise', ratio: '3 / 2' },
      { id: '5c2a34fd1c97e590889af8b9704e1b95', alt: 'Participants attending the Upvise workshop', ratio: '3 / 2' },
      { id: 'ca335635beb01c5dd212e909a1e2e0f8', alt: 'Upvise action plan spreadsheet', ratio: '16 / 9' },
      { id: '180da7d1229ff36a8e511549e1c14202', alt: 'Upvise programme timeline', ratio: '16 / 9' },
    ],
    links: [
      { label: 'View the action plan', href: 'https://docs.google.com/spreadsheets/d/1fB3n-Sp3Y5hYH8Lq98cLek2J8iX51CfCEvy1hUbkg4g/edit?gid=1295744249#gid=1295744249', note: 'Google Sheets' },
    ],
    accent: 'pink',
  },
  {
    slug: 'xuan-ai',
    index: '02',
    title: 'Xuân Ái Hồn Việt',
    shortTitle: 'Xuân Ái Hồn Việt',
    category: 'Culture · Creative Direction',
    role: 'Creative Team Leader',
    period: 'November – December 2024',
    intro: 'A cultural preservation programme that brought the beauty of hát bội—Vietnamese classical theatre—closer to students.',
    overview: [
      'Through stories, activities and performances, the programme connected traditional values with a young university audience.',
      'The creative direction blended entertainment and learning across online and offline touchpoints while working directly with experienced hát bội artists.',
    ],
    metrics: [
      { value: '450+', label: 'participants' },
      { value: '10+', label: 'creative team members' },
      { value: 'Hybrid', label: 'online & offline activities' },
    ],
    responsibilities: [
      { title: 'Leadership & team management', body: 'Led and supported a creative team of more than ten members throughout the project.' },
      { title: 'Concept planning', body: 'Developed the big idea, named the programme and shaped its creative vision.' },
      { title: 'Scriptwriting', body: 'Wrote the programme timeline, main script and MC script.' },
      { title: 'Artist & event coordination', body: 'Coordinated with traditional artists and managed backstage operations to keep the programme on plan.' },
    ],
    deliverables: ['Big idea', 'Programme identity', 'Main script', 'MC script', 'Task allocation', 'Programme timeline'],
    learning: 'Working closely with traditional artists taught me to listen carefully, stay humble and ensure every creative choice honoured the original spirit of hát bội.',
    cover: { id: '0211a132ae9c04c4c38b3df666966958', alt: 'Hát bội performance at Xuân Ái Hồn Việt', ratio: '3 / 2' },
    gallery: [
      { id: '55bcc562c09d6df55d56831974429430', alt: 'Xuân Ái Hồn Việt programme poster', ratio: '2 / 3' },
      { id: '73583abb6405279649b202ae7918cac5', alt: 'Creative team at the Xuân Ái Hồn Việt programme', ratio: '3 / 2' },
      { id: '1a9d9d8dd3733ab5385132ca550c7a37', alt: 'Traditional drum performance on stage', ratio: '3 / 2' },
      { id: '7decbeed5081b0aa338fd418f06a4391', alt: 'Guest artists on the programme stage', ratio: '3 / 2' },
      { id: '8a93c570ce92b0ad3bc1eeab4925d268', alt: 'Quynh Van at Xuân Ái Hồn Việt', ratio: '3 / 2' },
      { id: '6df91d173a7da2c2b31e4ebad3d180f6', alt: 'Hát bội artists performing together', ratio: '3 / 2' },
    ],
    links: [
      { label: 'Read the programme script', href: 'https://docs.google.com/document/d/1Fxp8cOh06IGHVUIcs-msliNauIFkrvhDHHB6RHAcRw8/edit?tab=t.0', note: 'Google Docs' },
      { label: 'Read the MC script', href: 'https://docs.google.com/document/d/18a2_glSNS9pdU0LSMOaCbRc1AmdkhDDbzB9NcwQwvGM/edit?tab=t.0', note: 'Google Docs' },
    ],
    accent: 'gold',
  },
  {
    slug: 'media',
    index: '03',
    title: 'Media Collaborator',
    shortTitle: 'Media Collaborator',
    category: 'Social Media · Content',
    role: 'Media Collaborator at FBA Presents',
    period: 'October 2023 – November 2024',
    intro: 'Creating useful, approachable content and visual materials for student programmes across the Faculty of Business Administration at UEL.',
    overview: [
      'FBA Presents is a social and political student organisation that provides information and organises events for students in the Faculty of Business Administration at UEL.',
      'This was where I first built a foundation in content creation and social media communication through real programmes and an active team environment.',
    ],
    metrics: [
      { value: '16,663', label: 'Sang Trang interactions' },
      { value: '17,833', label: 'Flourish interactions' },
      { value: '36,132', label: 'Flourish reach' },
    ],
    responsibilities: [
      { title: 'Content & visual design', body: 'Managed fanpage content, wrote copy, developed communication concepts and designed visual materials.' },
      { title: 'Photo & video', body: 'Captured photographs, filmed activities and edited video content for programme communication.' },
      { title: 'On-site execution', body: 'Supported events and activities while collaborating with other functional teams.' },
      { title: 'Internal contribution', body: 'Participated in organising training sessions for the organisation’s members.' },
    ],
    deliverables: ['Fanpage content', 'Campaign visuals', 'Live posts', 'Photography', 'Video editing', 'Internal training'],
    learning: 'I gained a practical understanding of how social media work happens inside an organisation, learned to collaborate effectively and built meaningful relationships with the people around me.',
    cover: { id: '5e4518ebd30c19239c1d29afc26f242e', alt: 'Sang Trang campaign artwork', ratio: '2 / 3' },
    gallery: [
      { id: '12962171f84de4879e5af695fd50aa72', alt: 'Quynh Van as an FBA Presents media collaborator', ratio: '4 / 5' },
      { id: '3f385b3f98c522390b664a9681c939ed', alt: 'Flourish welcome ceremony artwork', ratio: '2 / 3' },
      { id: '161f232ffd755700a8e3c60f933f4285', alt: 'Crystal recruitment campaign artwork', ratio: '2 / 3' },
      { id: '7e7e177481b8518335c1a4bddd87e8cf', alt: 'Darya anniversary programme artwork', ratio: '2 / 3' },
      { id: 'cb46067cd13e45d1fc18bccad7d7d817', alt: 'Flourish illustrated event poster', ratio: '2 / 3' },
      { id: 'e538ee7f2a9a95e504ded2ba0bf7b755', alt: 'FBA Presents content design', ratio: '2 / 3' },
    ],
    links: [
      { label: 'Open selected content', href: 'https://drive.google.com/file/d/1kjLk4pdSdkpJ6dNgNoao3xD778561wWU/view?usp=sharing', note: 'Google Drive' },
      { label: 'View a campaign design', href: 'https://www.canva.com/design/DAG6j95ER-c/_vs3OCvaNzIjQ1kOmSIA4g/edit', note: 'Canva' },
    ],
    accent: 'aqua',
  },
  {
    slug: 'competitions',
    index: '04',
    title: 'Academic Competitions',
    shortTitle: 'Academic Competitions',
    category: 'Research · Strategy',
    role: 'Competitor & Marketing Planner',
    period: '2024 – 2025',
    intro: 'A learning journey through economics, product strategy, marketing proposals and brand thinking.',
    overview: [
      'Academic competitions became an important part of my development, giving me repeated opportunities to research customers, structure strategic thinking and communicate an idea under pressure.',
      'Every competition offered a different lesson—from developing a complete go-to-market strategy to balancing university exams with a demanding proposal timeline.',
    ],
    metrics: [
      { value: 'Top 70', label: 'E!Contest 12.0' },
      { value: '72/100', label: 'E!Contest score' },
      { value: 'Top 25', label: 'Tầm nhìn thương hiệu' },
    ],
    responsibilities: [
      { title: 'Market & customer research', body: 'Gathered customer, competitor and category insights to define the opportunity.' },
      { title: 'Strategic planning', body: 'Contributed positioning, key messages, big ideas and deployment plans.' },
      { title: 'Go-to-market thinking', body: 'Worked on segmentation, target audience analysis and launch planning for proposed products.' },
      { title: 'Proposal development', body: 'Turned research into structured marketing proposals and presentation narratives.' },
    ],
    deliverables: ['Competitor analysis', 'Customer insight', 'Segmentation', 'Big idea', 'Key message', 'Deployment plan'],
    learning: 'These competitions strengthened my marketing knowledge while teaching me to recognise gaps, respond to feedback and keep improving the quality of my strategic thinking.',
    cover: { id: 'academic-overview', alt: 'Academic competition portfolio overview', ratio: '4 / 3', position: 'center 76%' },
    gallery: [
      { id: 'academic-overview', alt: 'Academic competition work and presentations', ratio: '4 / 3', position: 'center 78%' },
      { id: 'a1edc69ae46355dbbd754d9b126b6aae', alt: 'E!Contest judges feedback', ratio: '16 / 9' },
      { id: 'f13d131dcff6ca6cbc2eb8352c6ee783', alt: 'Digital analytics course project presentation', ratio: '16 / 9' },
    ],
    links: [
      { label: 'Read the judges’ feedback', href: 'https://docs.google.com/spreadsheets/d/1q-Q-v9IwlfC7-UmRcWbWp2C3IACuAtJqtplaWG1sj2c/edit?gid=0#gid=0', note: 'Google Sheets' },
      { label: 'View a competition proposal', href: 'https://www.canva.com/design/DAG66SdXS9M/bSyNLElgUy0GdAAR8yeBmQ/edit', note: 'Canva' },
    ],
    accent: 'lavender',
  },
  {
    slug: 'hypothetical',
    index: '05',
    title: 'Hypothetical Projects',
    shortTitle: 'Hypothetical Projects',
    category: 'Marketing Practice · Creative',
    role: 'Marketing Mentee at QCC Mastery Hub',
    period: '2024',
    intro: 'A collection of practical briefs spanning Instagram, TikTok, influencer marketing, brand identity and PR.',
    overview: [
      'As a mentee at QCC Mastery Hub, I worked through realistic marketing briefs and translated research into strategy, content direction and visual concepts.',
      'The collection includes work for IDA Academy, Dreamy Art Supplies, Cocoon Vietnam, NOMNOM and VNVC. My progress was recognised twice on QCC Mastery Hub’s Outstanding Mentee Board.',
    ],
    metrics: [
      { value: '5', label: 'practice briefs' },
      { value: '2×', label: 'outstanding mentee recognition' },
      { value: '5', label: 'marketing disciplines' },
    ],
    responsibilities: [
      { title: 'Research & strategy', body: 'Conducted audience, competitor and market research before defining key insights and direction.' },
      { title: 'Content planning', body: 'Created platform-appropriate pillars, angles, scripts and posting guidance.' },
      { title: 'Creative development', body: 'Translated concepts into Instagram layouts, TikTok visuals, influencer proposals and brand identity work.' },
      { title: 'Campaign planning', body: 'Outlined phases, key activities, supporting tactics and measurement approaches.' },
    ],
    deliverables: ['Instagram strategy', 'TikTok strategy', 'Influencer proposal', 'Brand identity', 'PR campaign'],
    learning: 'These projects helped me connect research with execution and become more deliberate about how each visual, message and channel supports a wider marketing objective.',
    cover: { id: 'f13d131dcff6ca6cbc2eb8352c6ee783', alt: 'IDA Academy Instagram strategy presentation', ratio: '16 / 9' },
    gallery: [
      { id: '16683442c2e324203fb11b231a28c209', alt: 'IDA Academy Instagram strategy phone mockup', ratio: '16 / 9' },
      { id: '56031105d8b801f29be66ed63c1bf3ab', alt: 'Dreamy Art Supplies strategy presentation', ratio: '16 / 9' },
      { id: '0c90c7e398b14bb86749fa2cc3b6ccb1', alt: 'TikTok content guideline', ratio: '16 / 9' },
      { id: '6329450836f5c63e533c4e17ccbaac68', alt: 'Cocoon influencer marketing proposal', ratio: '16 / 9' },
      { id: '1ccccd7d4ea319d392cc3a94a8614c53', alt: 'NOMNOM brand identity logo', ratio: '1 / 1' },
      { id: '252fb14ff2d2b6cbce42d83b30be90d2', alt: 'Cocoon influencer marketing presentation', ratio: '16 / 9' },
    ],
    links: [
      { label: 'IDA Academy on Instagram', href: 'https://www.instagram.com/ida.academy_/', note: 'Instagram' },
      { label: 'Dreamy Art Supplies on TikTok', href: 'https://www.tiktok.com/@dreamy_artsupplies', note: 'TikTok' },
      { label: 'View a strategy workbook', href: 'https://docs.google.com/spreadsheets/d/1dQx1RvUkJ7JluNFgdiAXVhuw26r-GBmRtS2KXMHVRag/edit?gid=1252244145#gid=1252244145', note: 'Google Sheets' },
    ],
    accent: 'pink',
  },
]

export const visualPlayground: MediaAsset[] = [
  { id: '908513fbf4059637e62154c2ca692ff9', alt: 'Warm cityscape photographed from above', ratio: '3 / 4' },
  { id: '1b80c311fd9e09da2e5f3fbe9e327298', alt: 'Spiral staircase detail', ratio: '3 / 4' },
  { id: 'd6cfe1b180f045b834ec2ce63d6f418f', alt: 'Sunlight and texture on a wooden wall', ratio: '3 / 4' },
  { id: '7b0af560a655411f42c86722d257e7ad', alt: 'Telecommunication tower against a blue sky', ratio: '3 / 4' },
  { id: '75977dfbab8ae9e1a345e5c4ce95f726', alt: 'Golden sunset over the sea', ratio: '3 / 4' },
  { id: 'c037869df02817c7830112c8b38bf5c6', alt: 'Friends posing together under a tree', ratio: '3 / 2' },
  { id: '0deb8e3396570413076dc324f0ac248f', alt: 'Friends in green uniforms', ratio: '3 / 2' },
  { id: '775f25a37629afce529f296d3899156d', alt: 'Portrait of Quynh Van in a garden', ratio: '3 / 4' },
]

export const heroPortrait: MediaAsset = {
  id: '407feaaf9ba7bae1280af392bc6a6ecd',
  alt: 'Quynh Van smiling in a white outfit',
  ratio: '4 / 5',
}

export const aboutPortrait: MediaAsset = {
  id: '775f25a37629afce529f296d3899156d',
  alt: 'Quynh Van standing in a garden',
  ratio: '3 / 4',
}

export const education = [
  {
    title: 'University of Economics and Law, Vietnam National University, HCMC',
    meta: 'September 2023 – 2027',
    detail: 'Bachelor of Digital Marketing · Cumulative GPA 8.60/10',
  },
  {
    title: 'QCC Mastery Hub · Social Media Starter Course',
    meta: 'June – September 2024',
    detail: 'Excellent in Social Media Starter Course',
  },
]

export const experience = [
  { date: 'Mar 2025', role: 'Head of Organising Committee', place: 'CV Review Workshop “Upvise”' },
  { date: 'Nov – Dec 2024', role: 'Creative Team Leader', place: 'Cultural Preservation Programme “Xuân Ái Hồn Việt”' },
  { date: 'Oct 2023 – Nov 2024', role: 'Media Collaborator', place: 'FBA Presents' },
]

export const skills = [
  'Content & Social Media Marketing',
  'Planning',
  'Creative Copywriting',
  'Branding',
  'Time Management',
  'Event Organisation',
  'Teamwork',
  'Leadership',
  'Detail-oriented',
]

export const tools = ['Google Workspace', 'Meta Business Suite', 'Canva', 'CapCut', 'Premiere Pro', 'Photoshop', 'Illustrator']
