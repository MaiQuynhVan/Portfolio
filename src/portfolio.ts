export type ProjectSlug = 'tfa-intern' | 'upvise' | 'xuan-ai' | 'media' | 'data-analysis' | 'competitions' | 'hypothetical'

export type MediaAsset = {
  id: string
  alt: string
  ratio?: string
  position?: string
  // Optional title and one-line note shown under document screenshots.
  caption?: string
  note?: string
  // Where a document card links to; falls back to the project's first link.
  link?: string
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
  // Optional case-study layout content. Wrap words in **double asterisks** to render them bold.
  org?: string
  // Opening paragraphs beside the photo grid (defaults to intro + overview).
  story?: string[]
  // "What was done?" points (defaults to the metrics).
  done?: string[]
  // Event photos for the grid (defaults to cover + gallery).
  photos?: MediaAsset[]
  // Screenshots of plans and documents shown beside "my role".
  documents?: MediaAsset[]
  // Teams under the role, drawn as a small org chart.
  teams?: string[]
  // Screenshots of social posts about the project, introduced by one sentence.
  social?: { intro: string; posts: MediaAsset[] }
  // Creative concept: the big-idea statement, the programme name and what the name means.
  bigIdea?: { statement: string; name: string; meaning: string[] }
  // Event video; poster is an image URL shown before playback.
  video?: { src: string; poster: string; label: string }
  // A favourite line from the project, with a short lead-in.
  quote?: { intro: string; text: string }
  // Heading overrides for the "What was done?" and learning sections.
  doneHeading?: string
  doneSubheading?: string
  learnedHeading?: string
  // Programmes worked on, each with its poster and optional results.
  programs?: { intro: string; items: { name: string; description: string; poster: MediaAsset; stats?: Metric[] }[] }
  // Content not written yet: cards say "coming soon" and the page shows placeholder frames.
  draft?: boolean
  // Hides the Role / Organiser / When row under the hero copy.
  hideMeta?: boolean
  // Competitions, each with its proposal deck.
  competitions?: Competition[]
  // Recognition images introduced by one sentence.
  recognition?: { intro: string; images: MediaAsset[] }
  // Individual briefs, each with its own visuals and links.
  showcases?: Showcase[]
  // Portfolio pieces grouped by type; items with href open the original post.
  works?: { intro: string; note: string; links?: ProjectLink[]; groups: { title: string; intro?: string; frame?: string; items?: { asset: MediaAsset; href?: string; label?: string }[]; videos?: { src: string; poster: string; label: string }[] }[] }
}

export type Competition = {
  name: string
  // Headline result, e.g. "Top 70", with the field it came from.
  badge?: string
  badgeNote?: string
  organiser: string
  brand: string
  intro: string[]
  reflection: { lead?: string; points?: string[]; text?: string[] }
  roles: string[]
  slides: MediaAsset[]
  score?: { text: string; image: MediaAsset }
  feedback?: ProjectLink
}

export type Showcase = {
  name: string
  // Shown as "<name> for <client>"; leave out for a course or a skill.
  client?: string
  kicker: string
  // Heading of the "What was done?" card.
  doneTitle?: string
  // Line under the slide deck, e.g. what the dashboard covers.
  caption?: string
  // Deck on top and the "What was done?" card underneath, instead of side by side.
  stacked?: boolean
  // Files to download, shown as buttons under the deck.
  downloads?: { label: string; href: string; note: string }[]
  // Transition sentence shown above the block.
  lead?: string
  brief: string
  done: { title?: string; points: string[] }[]
  learned?: string[]
  // Main visual beside "What was done?"; featureScreen frames it as a screenshot.
  feature?: MediaAsset
  featureScreen?: boolean
  videos?: { src: string; poster: string; label: string }[]
  deck?: MediaAsset[]
  brandKit?: { logos: MediaAsset[]; colors: string[]; fonts: { name: string; use: string }[] }
  // Shared frame ratio for gallery screenshots, so they sit at one size with rounded corners.
  galleryFrame?: string
  // Supporting images; with href they open the linked document and show the label.
  // screen: a flat screenshot, framed with a border; other images are cut-out mockups.
  gallery?: { asset: MediaAsset; href?: string; label?: string; screen?: boolean }[]
  links?: ProjectLink[]
}

// Proposal slides are optimised as <key>-01, <key>-02, … (see scripts/optimize-assets.mjs).
const deck = (key: string, count: number, title: string, ratio = '16 / 9'): MediaAsset[] =>
  Array.from({ length: count }, (_, index) => ({ id: `${key}-${String(index + 1).padStart(2, '0')}`, alt: `${title}, slide ${index + 1} of ${count}`, ratio }))

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
    'As a final-year Digital Marketing student, I have hands-on experience in social media, content strategy, audience growth and marketing campaigns.',
    'I enjoy developing audience-focused content, coordinating marketing activities and using performance insights to refine how a brand communicates.',
    'Responsibility and a strong growth mindset guide my journey—I bring creativity and adaptability to every team while growing my expertise in marketing communications and brand building.',
  ],
}

export const projects: Project[] = [
  {
    slug: 'tfa-intern',
    index: '00',
    title: 'Digital Marketing Intern',
    shortTitle: 'TFA Intern',
    category: 'Growth · Social Media',
    role: 'Digital Marketing Intern',
    org: 'The Future Analyst',
    period: 'Apr – Sep 2026',
    hideMeta: true,
    intro: 'Growing social channels and supporting the funnel at The Future Analyst.',
    overview: [],
    story: [
      'From April to September 2026, I worked as a **Digital Marketing Intern** at **The Future Analyst**,\ngrowing its social channels and supporting the funnel from acquisition to conversion.',
    ],
    metrics: [
      { value: '10M+', label: 'organic views in 6 months' },
      { value: '0 → 15K', label: 'Facebook followers' },
      { value: '0 → 10K', label: 'TikTok followers' },
      { value: '3,000+', label: 'email leads' },
    ],
    done: [
      'Grew one channel from **0 to 15K (Facebook)** and **0 to 10K (TikTok)**, and supported a second from **29K to 52K**—**10M+ organic views** in 6 months.',
      'Contributed to the funnel from acquisition to conversion: **3,000+ email leads** and **500 leads per month**.',
      'Coordinated **6+ campaigns**, including promotions and workshops, with the Product team.',
      'Used **Claude, GA4 and Apps Script** to track, analyse and report marketing performance.',
    ],
    responsibilities: [],
    deliverables: [],
    learning: '',
    photos: [],
    works: {
      intro: 'Here is some of the work behind those numbers',
      note: 'Click on an image to view it larger',
      groups: [
        { title: 'Channels', intro: 'The three channels I worked on. **Nguyen Analytics** grew from 0 to 15K followers on Facebook and 0 to 10K on TikTok, while **Maz The Analyst** grew from 29K to 52K.', frame: '3 / 4', items: [
          { asset: { id: 'tfa-channel-1', alt: 'Nguyen Analytics Facebook fanpage', ratio: '880 / 1861' }, href: 'https://www.facebook.com/nguyenwithdata', label: 'Nguyen Analytics on Facebook' },
          { asset: { id: 'tfa-channel-2', alt: 'Nguyen Analytics TikTok profile with 9,894 followers', ratio: '1080 / 1920' }, href: 'https://www.tiktok.com/@nguyenanalytics', label: 'Nguyen Analytics on TikTok' },
          { asset: { id: 'tfa-channel-3', alt: 'Maz The Analyst Facebook fanpage', ratio: '880 / 1861' }, href: 'https://www.facebook.com/maztheanalysts', label: 'Maz The Analyst on Facebook' },
        ] },
        { title: 'Performance', intro: 'Reach and engagement across the channels over six months, adding up to more than **10M organic views**.', frame: '4 / 3', items: [
          { asset: { id: 'tfa-perf-maz', alt: 'Maz The Analyst channel performance charts', ratio: '630 / 673' } },
          { asset: { id: 'tfa-perf-nguyen-fb', alt: 'Nguyen Analytics Facebook performance charts', ratio: '862 / 730' } },
          { asset: { id: 'tfa-perf-nguyen-tiktok', alt: 'Nguyen Analytics TikTok view performance', ratio: '1269 / 729' } },
        ] },
        { title: 'Content', intro: 'Posts that turn Excel, Google Sheets, Power BI and AI know-how into practical tips, templates and free resources for learners.', items: [
          { asset: { id: 'tfa-viral-02', alt: 'Post: free set of 6 Excel dashboard templates', ratio: '809 / 1280' } },
          { asset: { id: 'tfa-viral-03', alt: 'Post: Claude in Excel update', ratio: '705 / 1280' } },
          { asset: { id: 'tfa-viral-10', alt: 'Post: Agentic AI in Power BI registration', ratio: '828 / 1280' } },
          { asset: { id: 'tfa-viral-11', alt: 'Post: Excel and Claude ebook', ratio: '705 / 1280' } },
          { asset: { id: 'tfa-viral-05', alt: 'Post: 6 core function groups in Google Sheets', ratio: '975 / 1280' } },
          { asset: { id: 'tfa-viral-01', alt: 'Post: 7 layout principles for a more professional dashboard', ratio: '980 / 1280' } },
          { asset: { id: 'tfa-viral-09', alt: 'Post: 7 colour palettes for Power BI dashboards', ratio: '975 / 1280' } },
          { asset: { id: 'tfa-viral-06', alt: 'Post: 7 Google Sheets features you should know', ratio: '977 / 1280' } },
          { asset: { id: 'tfa-viral-07', alt: 'Post: 7 Claude prompts that save hours of analysis in Excel', ratio: '976 / 1280' } },
          { asset: { id: 'tfa-viral-08', alt: 'Post: 9 Excel features to master', ratio: '978 / 1280' } },
        ] },
        { title: 'Videos', intro: 'Short-form videos, from a workshop call-to-action to a before-and-after Excel demo.', videos: [
          { src: '/assets/video/tfa-cta-workshop.mp4', poster: '/assets/portfolio/tfa-cta-workshop-poster-480.webp', label: 'Call-to-action video for a The Future Analyst workshop' },
          { src: '/assets/video/tfa-short-video.mp4', poster: '/assets/portfolio/tfa-short-video-poster-480.webp', label: 'Short demo video: an Excel dashboard before and after' },
          { src: '/assets/video/tfa-video-editing.mp4', poster: '/assets/portfolio/tfa-video-editing-poster-480.webp', label: 'Edited talking-head video for Nguyen Analytics' },
        ] },
        { title: 'Funnel & campaigns', intro: 'Behind the content: tracking the leads that free resources brought in, planning what to post, and timing workshop campaigns with the Product team.', frame: '4 / 3', items: [
          { asset: { id: 'tfa-leads', alt: 'Lead dashboard showing 3,159 leads', ratio: '381 / 174' } },
          { asset: { id: 'tfa-content-plan', alt: 'Content planning board', ratio: '1344 / 732' } },
          { asset: { id: 'tfa-ws-timeline', alt: 'Workshop campaign timeline', ratio: '1000 / 1064' } },
        ] },
      ],
    },
    cover: { id: 'tfa-cover', alt: 'The Future Analyst logo', ratio: '4 / 3' },
    gallery: [],
    links: [],
    accent: 'aqua',
  },
  {
    slug: 'upvise',
    index: '00',
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
      { value: '4', label: 'teams coordinated' },
    ],
    responsibilities: [
      { title: 'Strategic Planning', body: 'Planned the overall programme structure and built a detailed timeline for each activity.' },
      { title: 'Team Coordination', body: 'Divided members into four main teams—Content, Media & Technical, External Relations and Production. Assigned specific tasks, monitored progress and ensured smooth collaboration across all teams.' },
      { title: 'Quality Control & Evaluation', body: 'Reviewed deliverables, tracked performance and supported team members to achieve goals.' },
    ],
    deliverables: ['Programme structure', 'Action plan', 'Interview skills session', 'One-on-one CV review', 'Team operations'],
    learning: 'Through this project, I learned how to plan better, communicate clearly and stay calm when things didn’t go as planned. Leading a team taught me that it’s **not just about giving directions, but about listening, supporting and helping**.',
    org: 'FBA Presents',
    teams: ['Content', 'Media & Technical', 'External Relations', 'Production'],
    story: [
      'At the beginning of 2025, I led **“Upvise”**—a collaborative workshop by FBA Presents and our faculty partners, created to help UEL students rediscover and refine their CVs.',
    ],
    done: [
      'We received over **170 CVs** from UEL students and welcomed more than **150 participants**.',
      '**8 HR professionals and industry experts** joined us as guest speakers, sharing their insights and experience throughout the workshop.',
      'The workshop was divided into two sessions: an **interview skills sharing session** and a **one-on-one CV review session**. This structure allowed students not only to gain practical tips from experts but also to receive personalised feedback to refine their own CVs.',
    ],
    photos: [
      { id: '34e353add1aa655c48911a5621bad4e6', alt: 'Upvise organisers and guest speakers on stage', ratio: '16 / 10', position: 'center bottom' },
      { id: '6f5cacd5a2c2a262cafcbf6807eac03e', alt: 'Guests and students seated at the Upvise workshop', ratio: '3 / 2', position: 'center bottom' },
      { id: '153b02e8291cd4c10631324a0e25303c', alt: 'One-on-one CV review at Upvise', ratio: '3 / 2', position: 'center bottom' },
      { id: '0831081ae2d470b138156771bda082ef', alt: 'Interview skills session at Upvise', ratio: '3 / 2', position: 'center bottom' },
      { id: '073c27dad466da2c9b9fddbf81a35c8c', alt: 'Upvise workshop team photo', ratio: '3 / 2', position: 'center bottom' },
      { id: '5c2a34fd1c97e590889af8b9704e1b95', alt: 'Participants attending the Upvise workshop', ratio: '3 / 2', position: 'center bottom' },
    ],
    documents: [
      { id: 'ca335635beb01c5dd212e909a1e2e0f8', alt: 'Upvise action plan spreadsheet', ratio: '16 / 9', caption: 'Action plan', note: 'Every task with its owner, deadline and status.', link: 'https://docs.google.com/spreadsheets/d/1fB3n-Sp3Y5hYH8Lq98cLek2J8iX51CfCEvy1hUbkg4g/edit?gid=1295744249#gid=1295744249' },
      { id: '180da7d1229ff36a8e511549e1c14202', alt: 'Upvise programme timeline', ratio: '16 / 9', caption: 'Programme timeline', note: 'Three phases mapped day by day, February–March 2025.', link: 'https://docs.google.com/spreadsheets/d/1fB3n-Sp3Y5hYH8Lq98cLek2J8iX51CfCEvy1hUbkg4g/edit?gid=1033753631#gid=1033753631' },
    ],
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
      { label: 'More details here', href: 'https://docs.google.com/spreadsheets/d/1fB3n-Sp3Y5hYH8Lq98cLek2J8iX51CfCEvy1hUbkg4g/edit?gid=1295744249#gid=1295744249', note: 'Google Sheets' },
    ],
    accent: 'pink',
  },
  {
    slug: 'xuan-ai',
    index: '00',
    title: 'Xuân Ai Hồn Việt',
    shortTitle: 'Xuân Ai Hồn Việt',
    category: 'Cultural Preservation · Creative Direction',
    role: 'Creative Team Leader',
    period: 'November – December 2024',
    intro: 'A cultural preservation programme that brought the beauty of hát bội—Vietnamese classical theatre—closer to students.',
    overview: [
      'Through stories, activities and performances, the programme connected traditional values with a young university audience.',
    ],
    story: [
      'At the end of 2024, I led the **Creative Team** for the Cultural Preservation Program **“Xuân Ai Hồn Việt”**. Through stories, activities and performances, we brought the beauty of hát bội—a Vietnamese classical theatre—closer to students, hoping to rekindle their love for traditional values.',
    ],
    metrics: [
      { value: '450+', label: 'participants' },
      { value: '10+', label: 'creative team members' },
      { value: 'Hybrid', label: 'online & offline activities' },
    ],
    done: [
      'Welcomed **450+ participants**, creating an engaging and meaningful cultural experience.',
      'Earned **strong positive feedback** from students, faculty and the university, including **shout-outs on the school confession page**.',
      'Worked directly with **experienced professional artists in hát bội**, ensuring authenticity and giving students rare, valuable interactions.',
      'Curated a **hybrid activity series**, blending entertainment and learning through both online and offline activities.',
      'Secured partnerships with **multiple sponsor brands**, helping elevate the program’s scale and overall quality.',
    ],
    responsibilities: [
      { title: 'Leadership & Team Management', body: 'Led and supported a creative team of 10+ members throughout the entire project.' },
      { title: 'Concept Planning', body: 'Developed the big idea, main concept and shaped the overall creative vision for the entire program.' },
      { title: 'Relationship Management', body: 'Coordinated with traditional artists to ensure cultural accuracy and authentic representation.' },
      { title: 'Scriptwriting', body: 'Wrote the program timeline & script, MC script.' },
      { title: 'Event Coordination', body: 'Managed backstage operations, making sure every segment ran smoothly and followed the planned flow.' },
    ],
    deliverables: ['Big idea', 'Programme identity', 'Main script', 'MC script', 'Task allocation', 'Programme timeline'],
    learning: 'Working closely with traditional artists taught me to listen carefully, stay humble and ensure every creative choice honoured the original spirit of hát bội.\nMost importantly, this project reminded me that preserving traditional values is **not about making them old-fashioned or distant, but about telling their stories in a way that feels closer and more relatable to younger generations**.',
    photos: [
      { id: 'b718deeb8441c0399099406cfa60ddaf', alt: 'Hát bội artists performing in front of the bronze-drum backdrop', ratio: '3 / 2' },
      { id: '86551a4856488825196eb98a81944635', alt: 'Xuân Ai Hồn Việt programme poster', ratio: '2 / 3' },
      { id: '376e99722c54d6e16a27916ef4fe6825', alt: 'Hát bội performance on the Xuân Ai Hồn Việt stage', ratio: '3 / 2' },
      { id: 'ec46df08b052311eb6c100ef08fc2dd6', alt: 'Students filling the hall for the programme', ratio: '3 / 2' },
      { id: '8427a9fd20c2f25231a7b0613765475e', alt: 'Artists meeting the audience during the exchange session', ratio: '3 / 2' },
      { id: 'bfa76a5bc96dd9de15bf7e77cee31e8b', alt: 'Students posing with hát bội masks and programme props', ratio: '4 / 3' },
      { id: '92ac364c8703d89c7a30b93bd3e46bbc', alt: 'A hát bội artist performing for students on stage', ratio: '3 / 2' },
      { id: 'b60b9bfc038972e03d845b2fe98482d6', alt: 'Audience cheering in the hall', ratio: '3 / 2' },
      { id: '8a93c570ce92b0ad3bc1eeab4925d268', alt: 'Quynh Van at Xuân Ai Hồn Việt', ratio: '16 / 10' },
    ],
    social: {
      intro: 'Here are a few confession posts praising the program, which received lots of interaction and positive agreement from students of UEL.',
      posts: [
        { id: 'ae804c86fe4c748d233d900f460fae5d', alt: 'UEL confession post praising Xuân Ai Hồn Việt, with a photo of the full hall', ratio: '852 / 823' },
        { id: '3d9ca1b590e9cf7ab253604cad30af90', alt: 'Confession post hoping the university hosts more programmes like Xuân Ai Hồn Việt', ratio: '846 / 748' },
        { id: 'f8e71985a8e1932f2b028689e6d04bca', alt: 'Confession post sharing a photo of the hát bội performance', ratio: '853 / 814' },
      ],
    },
    documents: [
      { id: 'b6ea7cb9817a6a20e271245ffd228341', alt: 'Xuân Ai Hồn Việt task allocation spreadsheet', ratio: '16 / 10', position: 'center top', caption: 'Task allocation table', note: 'Every task with its owner, status and deadline.' },
      { id: '6d606d1bb3e9b64a3a1730f939724d39', alt: 'Xuân Ai Hồn Việt programme timeline', ratio: '16 / 10', position: 'center top', caption: 'Program timeline', note: 'The running order of the day, from check-in to the final photo.' },
      { id: '886367cc1287fe0b463f9d8a116eb6ab', alt: 'Xuân Ai Hồn Việt programme script', ratio: '16 / 10', position: 'center top', caption: 'Program script', note: 'Segment-by-segment script with sound, lighting and visual cues.', link: 'https://docs.google.com/document/d/1Fxp8cOh06IGHVUIcs-msliNauIFkrvhDHHB6RHAcRw8/edit?tab=t.0' },
      { id: '1e4a65b13c37834201eed21aa66dac37', alt: 'Xuân Ai Hồn Việt MC script', ratio: '16 / 10', position: 'center top', caption: 'MC script', note: 'Every line for the MCs, from the welcome to the closing.', link: 'https://docs.google.com/document/d/18a2_glSNS9pdU0LSMOaCbRc1AmdkhDDbzB9NcwQwvGM/edit?tab=t.0' },
    ],
    bigIdea: {
      statement: 'Truyền tải vẻ đẹp của nghệ thuật hát bội, người nghệ sĩ hát bội nhằm xây dựng ý thức gìn giữ và bảo tồn một loại hình nghệ thuật của dân tộc với sinh viên. Giữa dòng chảy sôi động của văn hóa hiện đại, hãy để hát bội trở thành nhịp cầu dẫn lối ta về với cội nguồn và bản sắc dân tộc.',
      name: 'Xuân Ai Hồn Việt',
      meaning: [
        '**“Xuân”** nghĩa là vui tươi, **“ai”** nghĩa là bi thương, ảo não. Trong tiến trình lịch sử, dân tộc ta đã trải qua nhiều giai đoạn, có hưng có thịnh, có suy có tàn, nghĩa là vừa có xuân vừa có ai. Trong một vở hát bội cũng vậy, nghệ sĩ dẫn dắt người xem qua nhiều cung bậc cảm xúc, thăng có trầm có, vui có buồn có, mà tựu chung cũng là xuân và ai.',
        'Mặt khác, ca điệu của hát bội có **“nói lối”**—tức là nói một lúc rồi hát, là quan trọng nhất. Và “nói lối” thì có 2 giọng chính là “xuân” và “ai”.',
        '“Văn hóa là hồn cốt dân tộc, văn hóa còn thì dân tộc còn”. Hát bội là một trong những văn hóa phi vật thể của Việt Nam, bởi vậy nên nói nó là **“hồn Việt”** cũng là điều hợp lý. Cụm từ này nó cũng phần nào thể hiện được big idea được đặt ra.',
      ],
    },
    video: { src: '/assets/video/xuan-ai-hon-viet.mp4', poster: '/assets/portfolio/xuan-ai-video-poster-1600.webp', label: 'Xuân Ai Hồn Việt event video: the whole audience and team together in the hall' },
    quote: {
      intro: 'A sentence that I really like, taken from the MC script:',
      text: '“Mong rằng những âm vang của hát bội không chỉ ngân lên trong khoảnh khắc này mà sẽ hòa quyện vào dòng chảy văn hóa và mãi trường tồn trong trái tim của các thế hệ mai sau…”',
    },
    cover: { id: 'b718deeb8441c0399099406cfa60ddaf', alt: 'Hát bội artists performing in front of the bronze-drum backdrop', ratio: '3 / 2' },
    gallery: [],
    links: [
      { label: 'Read the programme script', href: 'https://docs.google.com/document/d/1Fxp8cOh06IGHVUIcs-msliNauIFkrvhDHHB6RHAcRw8/edit?tab=t.0', note: 'Google Docs' },
      { label: 'Read the MC script', href: 'https://docs.google.com/document/d/18a2_glSNS9pdU0LSMOaCbRc1AmdkhDDbzB9NcwQwvGM/edit?tab=t.0', note: 'Google Docs' },
    ],
    accent: 'gold',
  },
  {
    slug: 'media',
    index: '00',
    title: 'Media Collaborator',
    shortTitle: 'Media Collaborator',
    category: 'Social Media · Content',
    role: 'Media Collaborator at FBA Presents',
    period: 'October 2023 – November 2024',
    intro: 'Creating useful, approachable content and visual materials for student programmes across the Faculty of Business Administration at UEL.',
    overview: [
      'FBA Presents is a social and political student organisation that provides information and organises events for students in the Faculty of Business Administration at UEL.',
    ],
    org: 'FBA Presents',
    story: [
      'In October 2023, I became a member of **FBA Presents**—a socio and political student organization that provides information and organizes events for students in the Faculty of Business Administration and the wider UEL community. This was where I first built my foundation in **content creation and social media communication**.',
    ],
    metrics: [],
    doneHeading: 'So, what did I do here?',
    doneSubheading: 'As a Media Collaborator',
    done: [
      'Managed the **Facebook fanpage**, created content, developed **communication video scripts** and designed **visual materials**.',
      'Captured **photos**, filmed and **edited videos**.',
      'Supported the execution of **on-site events and activities**.',
      'Participated in organizing **internal training sessions** for organizational members.',
    ],
    responsibilities: [],
    deliverables: ['Fanpage content', 'Campaign visuals', 'Live posts', 'Photography', 'Video editing', 'Internal training'],
    learnedHeading: 'And here’s what I achieved…',
    learning: 'During my time at FBA Presents as a media collaborator, I:\n- Gained my first foundational understanding of **social media and how it works in practice**.\n- Learned how to **work effectively with others** and collaborate within the organization.\n- Most importantly, built **meaningful relationships** with people who supported me not only in work, but also became a valuable part of my life.',
    photos: [
      { id: 'cf61901df90ca92c0ffb044f2f5c9868', alt: 'Quynh Van on the FBA Presents media team', ratio: '1 / 1' },
    ],
    programs: {
      intro: 'Here are some programs I had the chance to shape, create, and grow with…',
      items: [
        { name: 'Sang Trang', description: 'Reading Culture Development Program', poster: { id: 'fcf065906e5d3a92e5ee2c650b6ef62b', alt: 'Sang Trang programme poster', ratio: '3 / 4' }, stats: [{ value: '16,663', label: 'total interactions' }, { value: '33,807', label: 'total reach' }] },
        { name: 'Flourish', description: 'Welcome Ceremony for New Students of the Faculty of Business Administration', poster: { id: 'd5805ea4b6bdd26f6cc5db6f64c6982a', alt: 'Flourish welcome ceremony poster', ratio: '3 / 4' }, stats: [{ value: '17,833', label: 'total interactions' }, { value: '36,132', label: 'total reach' }] },
        { name: 'Crystal', description: 'Recruitment Program for New Collaborators', poster: { id: 'fcf7d140b4428ade68ac281d61c62e62', alt: 'Crystal recruitment programme poster', ratio: '3 / 4' } },
        { name: 'Darya', description: '17th Anniversary Celebration of FBA Presents', poster: { id: 'a1b5a3a34f936c5419ba326419788a2d', alt: 'Darya 17th anniversary poster', ratio: '3 / 4' } },
      ],
    },
    works: {
      intro: 'Some of my work in content creation and design is here',
      note: 'Click on an image for more details',
      groups: [
        { title: 'Content', items: [
          { asset: { id: 'bd23e839d9216192c45561a97cbe32cb', alt: 'FBA Presents post celebrating Vietnamese Teachers’ Day', ratio: '431 / 770' }, href: 'https://www.facebook.com/photo?fbid=816292137173029&set=a.455282519940661' },
          { asset: { id: 'b47a04e5c7980fadea0487e04f9351f3', alt: 'FBA Presents post with photos from a campus activity', ratio: '551 / 817' }, href: 'https://www.facebook.com/share/p/17zycReqv2/' },
          { asset: { id: 'd11258f4beecaa1e3ed56cc20c687eee', alt: 'FBA Presents post announcing ticket sales for Flourish', ratio: '429 / 785' } },
          { asset: { id: 'b73ce6f946e98c08769e9c71a5e7f405', alt: 'FBA Presents post launching the Crystal recruitment programme', ratio: '570 / 747' }, href: 'https://www.facebook.com/share/p/1DhpiamqAZ/' },
        ] },
        { title: 'Design', items: [
          { asset: { id: 'e538ee7f2a9a95e504ded2ba0bf7b755', alt: 'Cơm tấm Sài Gòn illustrated post design', ratio: '680 / 746' }, href: 'https://www.facebook.com/share/p/1ABoPB46kg/' },
          { asset: { id: '0d6303449d74c6296cd7a881d5f5ea22', alt: 'Rừng Sác Cần Giờ post design', ratio: '678 / 749' }, href: 'https://www.facebook.com/share/p/1YbUSsQULs/' },
          { asset: { id: 'c2a63db229713ff74bfe1b2f92ed8a0d', alt: 'Illustrated post design about the benefits of reading', ratio: '683 / 721' }, href: 'https://www.facebook.com/share/p/1EUoAoCSt5/' },
        ] },
        { title: 'Live posts', items: [
          { asset: { id: 'bf0e3414833aacf929cb0f29dda53537', alt: 'Live post with photos from an FBA Presents event', ratio: '504 / 872' }, href: 'https://www.facebook.com/share/p/18vxUvjkXZ/' },
          { asset: { id: '4f66517ffc9f0d90056392d6f0bc9a05', alt: 'Live post covering a speaker at an FBA Presents event', ratio: '505 / 869' }, href: 'https://www.facebook.com/share/p/1ADbFkcWEH/' },
          { asset: { id: 'ee68d2987c038853af0caff823f7bfd0', alt: 'Live post with group photos from an FBA Presents event', ratio: '446 / 826' }, href: 'https://www.facebook.com/share/p/17AufZ3oBX/' },
          { asset: { id: 'cd61f3be825b469e477806229f5576bb', alt: 'Live post from an FBA Presents congress', ratio: '569 / 814' }, href: 'https://www.facebook.com/share/p/1D6tBwuX32/' },
        ] },
      ],
    },
    cover: { id: 'd5805ea4b6bdd26f6cc5db6f64c6982a', alt: 'Flourish welcome ceremony poster', ratio: '3 / 4', position: 'center 22%' },
    gallery: [],
    links: [],
    accent: 'aqua',
  },
  {
    slug: 'data-analysis',
    index: '00',
    title: 'Data Analysis',
    shortTitle: 'Data Analysis',
    category: 'Data · Analytics',
    role: 'Data Analysis',
    org: 'The Future Analyst',
    period: '2026',
    hideMeta: true,
    intro: 'Building a data-driven habit with Excel and Power BI at The Future Analyst.',
    overview: [],
    story: [
      'As a marketer, I want my decisions to come from data rather than guesswork.\nSo at **The Future Analyst**, I took two courses to build that habit: **Excel** and **Power BI**.',
    ],
    metrics: [],
    done: [],
    responsibilities: [],
    deliverables: [],
    learnedHeading: 'Why it matters to me…',
    learning: 'These courses did not turn me into a data analyst, and that was never the goal. What they gave me is a habit: **checking the numbers before making a marketing decision**, and being able to build the report myself whenever I need one.',
    photos: [],
    recognition: {
      intro: 'Two certificates from The Future Analyst',
      images: [
        { id: 'cert-power-bi', alt: 'Master Analytical Thinking & Data Analysis with Power BI certificate', ratio: '2000 / 1414' },
        { id: 'cert-ai-agent', alt: 'AI Agent for Data Analytics & Decision Making certificate', ratio: '2000 / 1414' },
      ],
    },
    showcases: [
      {
        name: 'Excel for Data Analytics',
        kicker: 'Course · The Future Analyst',
        brief: 'Eight modules that took me from raw spreadsheets to interactive dashboards: cleaning data properly first, then summarising it, and finally letting AI speed up the routine work.',
        doneTitle: 'What I learned',
        done: [
          { title: 'Clean & prepare data', points: ['Data types, data normalization and Power Query, to turn messy exports into tidy tables I can trust.'] },
          { title: 'Calculate & summarise', points: ['Basic and advanced functions, data manipulation and Pivot Tables, to answer a question in minutes.'] },
          { title: 'Model & visualise', points: ['Power Pivot, DAX and interactive dashboards that update when the data changes.'] },
          { title: 'Work faster with AI', points: ['AI-assisted Excel for drafting formulas, checking results and getting a first read of the data.'] },
        ],
        deck: [
          { id: 'da-excel-1', alt: 'Food delivery operations dashboard: KPIs, order trend, hourly volume and delivery pipeline', ratio: '1917 / 945' },
          { id: 'da-excel-2', alt: 'Food delivery dashboard: orders view', ratio: '1919 / 944' },
          { id: 'da-excel-3', alt: 'Food delivery dashboard: drivers view', ratio: '1919 / 947' },
        ],
        stacked: true,
        caption: '**Practice project:** an operations dashboard for a food-delivery dataset of **45,000+ orders**, tracking order volume, delivery time, refunds and tips.',
      },
      {
        name: 'Power BI',
        kicker: 'Course · The Future Analyst',
        brief: 'A course about thinking like an analyst before building anything: start from the business question, shape the data into a clean model, then let the dashboard tell the story.',
        doneTitle: 'What I learned',
        done: [
          { title: 'Consultant-style analytical thinking', points: ['Breaking a business question into the few metrics that actually answer it.'] },
          { title: 'Automated Power BI dashboards', points: ['Connecting the data once, so reports refresh on their own instead of being rebuilt by hand.'] },
          { title: 'DAX, data modeling & data storytelling', points: ['Linking tables into a clear model, writing DAX measures and ordering pages so the key insight comes first.'] },
        ],
        deck: [
          { id: 'da-pbi-1', alt: 'Voltex Sales Performance Dashboard: growth page', ratio: '1053 / 588' },
          { id: 'da-pbi-2', alt: 'Voltex Sales Performance Dashboard: operations page', ratio: '1053 / 583' },
          { id: 'da-pbi-3', alt: 'Voltex Sales Performance Dashboard: region and returns page', ratio: '1051 / 588' },
        ],
        stacked: true,
        downloads: [{ label: 'Download the Power BI file', href: '/files/Voltex-Sales-Performance-Dashboard.pbix', note: '.pbix · 14 MB · opens in Power BI Desktop' }],
        caption: '**Practice project:** the Voltex Sales Performance Dashboard, with growth, operation, product and customer pages covering **55,000+ orders** from April to September 2024.',
      },
    ],
    cover: { id: 'da-pbi-1', alt: 'Voltex Sales Performance Dashboard built in Power BI', ratio: '4 / 3', position: 'left center' },
    gallery: [],
    links: [],
    accent: 'lavender',
  },
  {
    slug: 'competitions',
    index: '00',
    title: 'Academic Competitions',
    shortTitle: 'Academic Competitions',
    category: 'Research · Strategy',
    role: 'Competitor & Marketing Planner',
    period: '2024 – 2025',
    intro: 'A learning journey through economics, product strategy, marketing proposals and brand thinking.',
    overview: [],
    story: [
      'As I continued to grow, **academic competitions** also became a part of my learning journey.',
    ],
    metrics: [],
    done: [],
    responsibilities: [],
    deliverables: ['Competitor analysis', 'Customer insight', 'Segmentation', 'Big idea', 'Key message', 'Deployment plan'],
    learning: '',
    photos: [],
    hideMeta: true,
    competitions: [
      {
        name: 'E!Contest 12.0',
        badge: 'Top 70',
        badgeNote: 'among 140+ teams',
        organiser: 'YEC, FTU Campus II',
        brand: 'Style by PNJ × Superego',
        intro: [
          'The first competition I ever joined was Econtest—annual economics competition by YEC, FTU Campus II.',
          'Among more than 140 teams, my teammates and I made it to the **Top 70**.',
        ],
        reflection: {
          lead: 'Even though we didn’t go further, I walked away with so many valuable lessons…',
          points: [
            'How to conduct proper research and analyze data.',
            'How to understand customers and uncover meaningful insights.',
            'How to analyze competitors effectively.',
            'How to develop strategic recommendations based on research.',
          ],
        },
        roles: ['Competitor analysis', 'Customer insight analysis', 'Strategic approach', 'Key hooks for the deployment plan'],
        slides: deck('comp-econtest', 15, 'E!Contest proposal “Back to School, Get to Style”'),
        score: {
          text: 'Our team earned **72/100 points**, along with the following feedback from the judges…',
          image: { id: 'a1edc69ae46355dbbd754d9b126b6aae', alt: 'Overall feedback from the E!Contest judges', ratio: '1590 / 305' },
        },
        feedback: { label: 'More details here', href: 'https://drive.google.com/file/d/1kjLk4pdSdkpJ6dNgNoao3xD778561wWU/view?usp=sharing', note: 'Google Drive' },
      },
      {
        name: 'Marketing Arena 2025',
        organiser: 'Creatio, FTU Campus II',
        brand: 'Cetaphil',
        intro: [
          'The second competition I joined was Marketing Arena 2025 by Creatio, FTU Campus II.',
          'This time, my two teammates and I developed a proposal for the launch of a **new product for Cetaphil**.',
        ],
        reflection: {
          lead: 'Through the judges’ feedback and my own reflection, I realized that I still need to learn more about',
          points: [
            'Developing a clear and complete Go-to-Market strategy.',
            'Conducting deeper audience insight analysis to build a stronger big idea and key message.',
            'Creating more innovative and differentiated marketing mix activities.',
            'Defining the brand’s role more effectively within the overall plan.',
          ],
        },
        roles: ['Segmentation', 'Target audience analysis', 'Insight development', 'Big idea development', 'Go-to-Market strategy'],
        slides: deck('comp-arena', 17, 'Marketing Arena proposal for Cetaphil Gentle Exfoliating SA Cleanser'),
        feedback: { label: 'More details about the judges’ feedback can be found here', href: 'https://docs.google.com/spreadsheets/d/1q-Q-v9IwlfC7-UmRcWbWp2C3IACuAtJqtplaWG1sj2c/edit?gid=0#gid=0', note: 'Google Sheets' },
      },
      {
        name: 'Marketing Challengers 2025',
        organiser: 'RMIT University',
        brand: 'LG',
        intro: [
          'After that, I continued participating in the Marketing Challengers by RMIT University.',
          'This time, we developed an **integrated marketing proposal for LG**.',
          'The brief focused on building a brand communication strategy that helps consumers perceive AI not only as Artificial Intelligence but also as **“Affectionate Intelligence”**—a human-centered, emotionally supportive form of technology.',
        ],
        reflection: {
          text: [
            'We invested a great deal of time and effort into this proposal, but once again, our team did not make it to the next round. After reflecting on the competition, I realized that I had overlooked the cultural dimension emphasized in the brief, and our proposal lacked the distinctiveness needed to stand out from other teams.',
            'This became a valuable lesson for all of us moving forward.',
          ],
        },
        roles: ['Market research', 'Segmentation', 'Customer persona & insight', 'Strategic approach', 'Key activities for the IMC plan'],
        slides: deck('comp-challengers', 17, 'Marketing Challengers proposal for LG “Life’s Good”'),
      },
      {
        name: 'Tầm Nhìn Thương Hiệu 2025',
        badge: 'Top 25',
        badgeNote: 'semi-finalists among 300+ teams',
        organiser: 'NEU',
        brand: 'Xanh SM',
        intro: [
          'Not giving up, I continued with “Tầm Nhìn Thương Hiệu 2025” by NEU.',
          'This time, my team made it through more than 300 competing teams and became one of the **Top 25 semi-finalists**.',
        ],
        reflection: {
          text: ['Through this competition, I not only strengthened my marketing knowledge but also learned how to manage my time effectively—balancing my midterm exams at university while preparing for TOEIC test.'],
        },
        roles: ['Market research', 'Customer research', 'Customer insight', 'Strategic approach', 'Big idea & key message', 'Deployment plan'],
        slides: deck('comp-tam-nhin', 23, 'Tầm Nhìn Thương Hiệu proposal for Xanh SM “Tưởng XA, hóa ra lại GẦN”'),
      },
    ],
    cover: { id: 'comp-econtest-01', alt: 'E!Contest marketing proposal cover: Back to School, Get to Style', ratio: '16 / 9' },
    gallery: [],
    links: [],
    accent: 'lavender',
  },
  {
    slug: 'hypothetical',
    index: '00',
    title: 'Hypothetical Projects',
    shortTitle: 'Hypothetical Projects',
    category: 'Marketing Practice · Creative',
    role: 'Marketing Mentee at QCC Mastery Hub',
    period: '2024',
    intro: 'A collection of practical briefs spanning Instagram, TikTok, influencer marketing, brand identity and PR.',
    overview: [],
    story: [
      'In 2024, I became a mentee at **QCC Mastery Hub**, where I gained valuable skills in content creation and social media.',
    ],
    metrics: [],
    done: [],
    responsibilities: [],
    deliverables: ['Instagram strategy', 'TikTok strategy', 'Influencer proposal', 'Brand identity', 'PR campaign'],
    learning: '',
    photos: [],
    hideMeta: true,
    recognition: {
      intro: 'Along the way, my progress was acknowledged twice on QCC Mastery Hub’s Outstanding Mentee Board',
      images: [
        { id: '56031105d8b801f29be66ed63c1bf3ab', alt: 'QCC Mastery Hub Outstanding Mentee Board featuring Quynh Van for Dreamy Art Supplies', ratio: '3 / 2' },
        { id: '96d2f4cd032e64f18cb0b04d860df5a2', alt: 'QCC Mastery Hub Outstanding Mentee Board, Social Media Starter, August', ratio: '1 / 1' },
        { id: '4b0176a25269d69e07281c633fea6945', alt: 'QCC Mastery Hub Outstanding Mentee Board featuring Quynh Van for IDA Academy', ratio: '3 / 2' },
      ],
    },
    showcases: [
      {
        name: 'Instagram Strategy',
        client: 'IDA Academy',
        kicker: 'Hypothetical project · QCC Mastery Hub',
        brief: 'A hypothetical project for IDA Academy—an online education brand specializing in Data Analytics. Develop marketing and content ideas, build strategic direction, design social posts, write content, and create an Instagram posting plan.',
        done: [
          { title: 'Research & Strategize', points: ['Conducted audience and competitor research, identified key insights, and mapped out a strategic direction.', 'From insights, implemented a big idea based on pain points, and developed it into content themes related to the marketing strategy.'] },
          { title: 'Creating & Writing', points: ['Wrote hypothetical content for 12 Instagram posts.'] },
          { title: 'Visual Concept', points: ['Designed 12 images for Instagram platform.'] },
        ],
        feature: { id: '16683442c2e324203fb11b231a28c209', alt: 'IDA Academy Instagram profile on a phone mockup', ratio: '1800 / 1292' },
        galleryFrame: '1.9',
        gallery: [
          { asset: { id: '7bf9165d2f72a13fc7b6e4018191d9bc', alt: 'IDA Academy Instagram channel direction sheet', ratio: '1678 / 911' }, href: 'https://docs.google.com/spreadsheets/d/1dQx1RvUkJ7JluNFgdiAXVhuw26r-GBmRtS2KXMHVRag/edit?gid=1252244145#gid=1252244145', label: 'More details here' },
          { asset: { id: 'cafc6df45e2a6967db6090f1bacdd3eb', alt: 'IDA Academy Instagram content plan sheet', ratio: '1884 / 913' }, href: 'https://docs.google.com/spreadsheets/d/1dQx1RvUkJ7JluNFgdiAXVhuw26r-GBmRtS2KXMHVRag/edit?gid=1252244145#gid=1252244145', label: 'More details here' },
        ],
        links: [{ label: 'Visit IDA Academy’s Instagram here', href: 'https://www.instagram.com/ida.academy_/', note: 'Instagram' }],
      },
      {
        name: 'TikTok Strategy',
        client: 'Dreamy Art Supplies',
        kicker: 'Hypothetical project · QCC Mastery Hub',
        brief: 'A hypothetical project for Dreamy Art Supplies—an art supplies brand. Develop marketing and content ideas, plan the overall strategy, design video thumbnails, write video scripts, and build a posting plan for the TikTok platform.',
        done: [
          { title: 'Research & Strategize', points: ['Conducted audience and competitor research, identified key insights, and mapped out a strategic direction.', 'From insights, implemented a big idea based on pain points, and developed it into content themes related to the marketing strategy.'] },
          { title: 'Creating & Writing', points: ['Built content pillars and content angles following TikTok guidelines.', 'Wrote hypothetical scripts for 3 TikTok videos.'] },
          { title: 'Visual Concept', points: ['Designed a cohesive TikTok brand identity.', 'Created video thumbnails and visual concepts based on the moodboard.'] },
        ],
        feature: { id: 'dreamy-mockup-cutout', alt: 'Dreamy Art Supplies TikTok profile and video cover on phone mockups', ratio: '557 / 727' },
        videos: [
          { src: '/assets/video/dreamy-1.mp4', poster: '/assets/portfolio/dreamy-video-1-480.webp', label: 'Dreamy TikTok video: easy painting ideas' },
          { src: '/assets/video/dreamy-2.mp4', poster: '/assets/portfolio/dreamy-video-2-480.webp', label: 'Dreamy TikTok video: a 48 to 60 colour marker set' },
          { src: '/assets/video/dreamy-3.mp4', poster: '/assets/portfolio/dreamy-video-3-480.webp', label: 'Dreamy TikTok video: art tools every artist needs' },
        ],
        gallery: [
          { asset: { id: '1aea9c16d938870f3072ab6c06f9b70f', alt: 'Dreamy TikTok guideline moodboard on a monitor', ratio: '1800 / 1758' }, href: 'https://drive.google.com/file/d/14AAZALM7TaKm3KGM3OMR1BrrtiHPSq-C/view?usp=sharing', label: 'TikTok guideline moodboard here' },
          { asset: { id: 'c79ec9a33edf85436cbc971ee38f2aed', alt: 'Dreamy TikTok content pillar sheet', ratio: '1128 / 913' }, screen: true, href: 'https://docs.google.com/spreadsheets/d/1uJocqvgcGnXndcdyaNjYuOdAoun9aLCU/edit?gid=503169176#gid=503169176', label: 'More details here' },
        ],
        links: [{ label: 'Visit Dreamy’s TikTok here', href: 'https://www.tiktok.com/@dreamy_artsupplies', note: 'TikTok' }],
      },
      {
        name: 'Influencers Marketing',
        client: 'Cocoon Vietnam',
        kicker: 'Hypothetical project · QCC Mastery Hub',
        brief: 'A hypothetical project for Cocoon—a Vietnamese vegan cosmetic brand. Developed a basic influencer marketing proposal to support brand communication objectives.',
        done: [
          { title: 'Research & Planning', points: ['Researched the brand, products, past campaigns, and target audience.', 'Defined campaign objectives, key messages, and overall timeline.'] },
          { title: 'Influencer Strategy', points: ['Built a list of potential influencers with clear selection criteria.', 'Outlined influencer roles, responsibilities, and deliverables.', 'Planned influencer activities and estimated budget.'] },
          { title: 'Proposal Development', points: ['Prepared influencer proposals for outreach and collaboration.'] },
        ],
        feature: { id: 'fb4f435eb28f53c73eeef2fdda774cb7', alt: 'Cocoon influencer marketing plan sheet', ratio: '1472 / 915' },
        featureScreen: true,
        gallery: [
          { asset: { id: '5bba0c8a556004c9e7435a9c2fcaf737', alt: 'Cocoon content brief on a monitor', ratio: '1800 / 1758' }, href: 'https://drive.google.com/file/d/1b-SYLtgWnEaHDVvoiI32SSwagCd_60-e/view?usp=sharing', label: 'Cocoon’s Content Brief here' },
          { asset: { id: '252fb14ff2d2b6cbce42d83b30be90d2', alt: 'Cocoon influencer marketing proposal on a monitor', ratio: '1800 / 1758' }, href: 'https://drive.google.com/file/d/1tds8oUMG6S74Q6d2Nqi7PfDgoUx6bUKD/view?usp=sharing', label: 'Influencer Marketing Proposal here' },
        ],
        links: [{ label: 'More details here', href: 'https://docs.google.com/spreadsheets/d/1jr4WLkDZLe1wIbQpH9xFhrGDfzlThcGtp4GfwZjgkNg/edit?gid=0#gid=0', note: 'Google Sheets' }],
      },
      {
        name: 'Brand Identity Design',
        client: 'NOMNOM',
        kicker: 'Academic project · Adobe Illustrator',
        lead: 'Besides that, I also worked on several **academic projects** during my time at university…',
        brief: 'Using Adobe Illustrator to develop a complete brand identity system and related visual assets for NOMNOM—a fresh food brand for pets.',
        done: [
          { points: ['Defined brand personality and visual direction.'] },
          { points: ['Designed the logo and core brand elements.'] },
          { points: ['Built a basic brand identity system, including: color palette, typography, icon & graphic style.'] },
        ],
        learned: ['How to translate a brand concept into visual elements.', 'Basic understanding of brand identity systems.', 'Improved skills in Adobe Illustrator and layout design.'],
        deck: deck('hypo-nomnom', 27, 'NOMNOM brand identity book', '1414 / 2000'),
        brandKit: {
          logos: [
            { id: 'aa82627f22fba4fa0c8ce55b7361964f', alt: 'NOMNOM logo on the brand blue', ratio: '1 / 1' },
            { id: 'bbdf57877c89f9c2e0cec35c001071a4', alt: 'NOMNOM logo on the brand cream', ratio: '1 / 1' },
          ],
          colors: ['#0F2C91', '#F4B41C', '#FFF4DC'],
          fonts: [{ name: 'DFVN Some Time Later', use: 'Tiêu đề, sáng tạo' }, { name: 'DFVN Boris', use: 'Văn bản' }],
        },
      },
      {
        name: 'PR Campaign',
        client: 'VNVC',
        kicker: 'Academic project',
        brief: 'Developed a PR campaign for VNVC Vaccination Center with the objective of raising awareness and encouraging HPV vaccination among men.',
        done: [
          { points: ['Analyzed the brand and campaign context.'] },
          { points: ['Conducted environment analysis.'] },
          { points: ['Defined target audience, key insight and developed a creative idea.'] },
          { points: ['Outlined phase-based tactics aligned with the given budget.'] },
        ],
        deck: deck('hypo-vnvc', 50, 'VNVC PR campaign on HPV vaccination among men'),
      },
    ],
    cover: { id: 'f13d131dcff6ca6cbc2eb8352c6ee783', alt: 'IDA Academy Instagram strategy presentation', ratio: '16 / 9' },
    gallery: [],
    links: [],
    accent: 'pink',
  },
]

projects.forEach((project, position) => { project.index = String(position + 1).padStart(2, '0') })

// Projects page timeline: newest first, grouped by the year each project ended.
export const projectTimeline: { year: string; slugs: ProjectSlug[] }[] = [
  { year: '2026', slugs: ['tfa-intern', 'data-analysis'] },
  { year: '2025', slugs: ['upvise', 'competitions'] },
  { year: '2024', slugs: ['xuan-ai', 'media', 'hypothetical'] },
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

export const cvFile = {
  href: '/files/Mai-Quynh-Van-CV.pdf',
  downloadName: 'Mai-Quynh-Van-CV.pdf',
}

export type Brand = {
  name: string
  // Path to a logo inside site-public, e.g. '/assets/brands/the-future-analyst.webp'
  logo?: string
  href?: string
  // Logo artwork that ships on its own coloured panel and should fill the tile edge to edge.
  fill?: boolean
}

// Source logos live in other-materials/brand; the optimised copies are in site-public/assets/brands.
export const brands: Brand[] = [
  { name: 'The Future Analyst', logo: '/assets/brands/the-future-analyst.webp' },
  { name: 'LG Electronics', logo: '/assets/brands/lg.webp' },
  { name: 'PNJ', logo: '/assets/brands/pnj.webp', fill: true },
  { name: 'Xanh SM', logo: '/assets/brands/xanh-sm.webp' },
  { name: 'Cocoon Vietnam', logo: '/assets/brands/cocoon.webp' },
  { name: 'Cetaphil', logo: '/assets/brands/cetaphil.webp' },
  { name: 'VNVC', logo: '/assets/brands/vnvc.webp' },
  { name: 'KiotViet', logo: '/assets/brands/kiotviet.webp' },
]

export type WorkItem = {
  key: string
  title: string
  category: string
  role: string
  cover: MediaAsset
  accent: Project['accent']
  // Leave undefined until the case study exists; the card then shows "coming soon".
  href?: string
}

export const latestWork: WorkItem[] = [
  ...projects.map((project) => ({
    key: project.slug,
    title: project.title,
    category: project.category,
    role: project.slug === 'tfa-intern' ? `${project.org} · ${project.period}` : project.role,
    cover: project.cover,
    accent: project.accent,
    href: `#project-${project.slug}`,
  })),
]

export type Certificate = {
  title: string
  issuer: string
  note?: string
  image: MediaAsset
}

export const certificates: Certificate[] = [
  {
    title: 'Master Analytical Thinking & Data Analysis with Power BI',
    issuer: 'The Future Analyst',
    image: { id: 'cert-power-bi', alt: 'Power BI course certificate from The Future Analyst', ratio: '2000 / 1414' },
  },
  {
    title: 'AI Agent for Data Analytics & Decision Making',
    issuer: 'The Future Analyst',
    image: { id: 'cert-ai-agent', alt: 'AI Agent for Data Analytics course certificate from The Future Analyst', ratio: '2000 / 1414' },
  },
  {
    title: 'Social Media Starter',
    issuer: 'QCC Mastery Hub',
    note: 'Ranking: Excellent',
    image: { id: 'cert-social-media', alt: 'Social Media Starter course certificate from QCC Mastery Hub', ratio: '2970 / 2100' },
  },
  {
    title: 'Top 25 “Tầm nhìn thương hiệu” 2025',
    issuer: 'National Economics University',
    note: 'Green SM’s case',
    image: { id: 'cert-tam-nhin-thuong-hieu', alt: 'Top 25 Tầm nhìn thương hiệu 2025 certificate', ratio: '4500 / 3181' },
  },
]

export type JourneyItem = {
  kind: 'Work experience' | 'Leadership' | 'Education'
  date: string
  role: string
  place: string
  highlights: string[]
}

// Newest first. The first item starts expanded on the home page.
export const journey: JourneyItem[] = [
  {
    kind: 'Work experience',
    date: 'Apr – Sep 2026',
    role: 'Digital Marketing Intern',
    place: 'The Future Analyst',
    highlights: [
      'Grew one channel from 0 to 15K (Facebook) and 0 to 10K (TikTok), and supported a second from 29K to 52K—10M+ organic views in 6 months.',
      'Contributed to the funnel from acquisition to conversion: 3,000+ email leads and 500 leads per month.',
      'Coordinated 6+ campaigns, including promotions and workshops, with the Product team.',
      'Used Claude, GA4 and Apps Script to track, analyse and report marketing performance.',
    ],
  },
  {
    kind: 'Leadership',
    date: 'Jan – Mar 2025',
    role: 'Head of Organising Committee',
    place: 'CV Review Workshop “Upvise” · FBA Presents',
    highlights: [
      'Organised a free 1:1 CV review workshop for 150+ students with 8 HR professionals.',
      'Led 4 teams with 40+ members from 5 student organisations.',
      'Developed the master plan and supervised full programme execution.',
    ],
  },
  {
    kind: 'Leadership',
    date: 'Nov – Dec 2024',
    role: 'Creative Team Leader',
    place: 'Cultural Programme “Xuân Ai Hồn Việt” · FBA Presents',
    highlights: [
      'Attracted 450+ students to celebrate Vietnamese traditional art.',
      'Led a team of 8 members alongside the Media, Produce and External Relations teams.',
      'Created the big idea, MC script and full run-down with traditional artists.',
    ],
  },
  {
    kind: 'Education',
    date: 'Sep 2023 – 2027',
    role: 'Bachelor of Digital Marketing',
    place: 'University of Economics and Law, VNU-HCM',
    highlights: [
      'GPA 8.67/10 and an academic encouragement scholarship.',
      // Lines after the first are listed beneath it, one per line.
      'Training:\nPower BI (The Future Analyst)\nAI Agent for Data Analytics (The Future Analyst)\nSocial Media Starter (QCC Mastery Hub, Excellent)',
    ],
  },
]

export const skillGroups = [
  {
    title: 'Hard skills',
    items: ['Content Strategy', 'Social Media Management', 'Copywriting', 'Campaign Planning', 'Marketing Analytics'],
  },
  {
    title: 'Soft skills',
    items: ['Communication', 'Detail-oriented', 'Teamwork', 'Leadership', 'Planning & Organisation', 'Time & Task Management', 'Adaptability', 'Problem-solving'],
  },
]

export type Tool = {
  name: string
  logo: string
  ring: 'inner' | 'outer'
}

// Logos live in site-public/assets/tools. 'inner' tools orbit closest to the centre.
export const tools: Tool[] = [
  { name: 'Google Workspace', logo: '/assets/tools/google-workspace.webp', ring: 'inner' },
  { name: 'Apps Script', logo: '/assets/tools/apps-script.webp', ring: 'inner' },
  { name: 'Claude AI', logo: '/assets/tools/claude.webp', ring: 'inner' },
  { name: 'Canva', logo: '/assets/tools/canva.webp', ring: 'inner' },
  { name: 'CapCut', logo: '/assets/tools/capcut.webp', ring: 'outer' },
  { name: 'Photoshop', logo: '/assets/tools/photoshop.webp', ring: 'outer' },
  { name: 'Illustrator', logo: '/assets/tools/illustrator.webp', ring: 'outer' },
  { name: 'Power BI', logo: '/assets/tools/power-bi.webp', ring: 'outer' },
  { name: 'Excel', logo: '/assets/tools/excel.webp', ring: 'outer' },
  { name: 'PowerPoint', logo: '/assets/tools/powerpoint.webp', ring: 'outer' },
]
