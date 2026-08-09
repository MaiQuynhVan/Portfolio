import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const out = path.join(root, 'dist', 'qa')
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const preview = spawn(process.execPath, [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--host', '127.0.0.1', '--port', '4173'], { stdio: 'ignore' })
let chrome

try {
  await waitForUrl('http://127.0.0.1:4173/')
  await mkdir(out, { recursive: true })
  chrome = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--remote-debugging-port=9222',
    '--remote-allow-origins=*',
    `--user-data-dir=${path.join(out, 'cdp-profile')}`,
    'about:blank',
  ], { stdio: 'ignore' })
  await waitForUrl('http://127.0.0.1:9222/json/version')

  const targets = await fetch('http://127.0.0.1:9222/json/list').then((response) => response.json())
  const page = targets.find((target) => target.type === 'page')
  if (!page) throw new Error('Chrome did not expose a page target')
  const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  const results = {}
  await setViewport(cdp, 390, 844, true)
  await navigate(cdp, 'http://127.0.0.1:4173/')
  results.mobileHome = await inspect(cdp)
  await capture(cdp, 'home-mobile-390.png')

  await evaluate(cdp, "document.querySelector('.menu-toggle').click()")
  await delay(150)
  results.mobileMenuOpen = await evaluate(cdp, "({ expanded: document.querySelector('.menu-toggle').getAttribute('aria-expanded'), visible: document.querySelector('.site-nav').classList.contains('is-open') })")
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' })
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' })
  await delay(150)
  results.mobileMenuClosed = await evaluate(cdp, "({ expanded: document.querySelector('.menu-toggle').getAttribute('aria-expanded'), visible: document.querySelector('.site-nav').classList.contains('is-open') })")

  await evaluate(cdp, "location.hash = '#about'")
  await delay(900)
  results.mobileAbout = await inspect(cdp, 'about')
  await capture(cdp, 'about-mobile-390.png')

  await setViewport(cdp, 918, 966, false)
  await navigate(cdp, 'http://127.0.0.1:4173/')
  await evaluate(cdp, "window.scrollTo({ left: 9999, top: 0, behavior: 'instant' })")
  await delay(120)
  results.tabletHome = await inspect(cdp)
  await capture(cdp, 'home-tablet-918.png')

  await setViewport(cdp, 1440, 1000, false)
  await navigate(cdp, 'http://127.0.0.1:4173/')
  await evaluate(cdp, "location.hash = '#work'")
  await delay(900)
  results.desktopWork = await inspect(cdp, 'work')
  await capture(cdp, 'work-desktop-1440.png')

  await evaluate(cdp, "location.hash = '#project-xuan-ai'")
  await delay(1000)
  results.desktopProject = await inspect(cdp)
  await capture(cdp, 'project-desktop-1440.png')

  await evaluate(cdp, "document.querySelector('.case-hero__image').click()")
  await delay(180)
  results.lightboxOpen = await evaluate(cdp, "({ dialog: Boolean(document.querySelector('[role=dialog]')), focused: document.activeElement?.getAttribute('aria-label') })")
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' })
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight' })
  await delay(120)
  results.lightboxNext = await evaluate(cdp, "document.querySelector('.lightbox__top > span')?.textContent")
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' })
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' })
  await delay(180)
  results.lightboxClosed = await evaluate(cdp, "!document.querySelector('[role=dialog]')")

  results.projectRoutes = {}
  for (const slug of ['upvise', 'xuan-ai', 'media', 'competitions', 'hypothetical']) {
    await evaluate(cdp, `location.hash = '#project-${slug}'`)
    await delay(260)
    results.projectRoutes[slug] = await evaluate(cdp, "({ title: document.title, h1: document.querySelector('.case-hero h1')?.textContent?.trim() })")
  }

  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  results.reducedMotion = await evaluate(cdp, "matchMedia('(prefers-reduced-motion: reduce)').matches")

  console.log(JSON.stringify(results, null, 2))
  await cdp.send('Browser.close')

  async function capture(client, file) {
    const { data } = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true })
    await writeFile(path.join(out, file), Buffer.from(data, 'base64'))
  }
} finally {
  preview.kill()
  chrome?.kill()
}

async function waitForUrl(url) {
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {}
    await delay(100)
  }
  throw new Error(`Timed out waiting for ${url}`)
}

async function connect(url) {
  const socket = new WebSocket(url)
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })
  let id = 0
  const pending = new Map()
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (!message.id || !pending.has(message.id)) return
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(message.error.message))
    else resolve(message.result)
  })
  return {
    send(method, params = {}) {
      const messageId = ++id
      return new Promise((resolve, reject) => {
        pending.set(messageId, { resolve, reject })
        socket.send(JSON.stringify({ id: messageId, method, params }))
      })
    },
  }
}

async function setViewport(cdp, width, height, mobile) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height,
  })
}

async function navigate(cdp, url) {
  await cdp.send('Page.navigate', { url })
  await delay(900)
  await evaluate(cdp, 'document.fonts.ready', true)
  await delay(350)
}

async function inspect(cdp, targetId) {
  const target = targetId ? `document.getElementById('${targetId}')` : 'null'
  return evaluate(cdp, `(() => { const target = ${target}; return { innerWidth, innerHeight, scrollWidth: document.documentElement.scrollWidth, horizontalOverflow: document.documentElement.scrollWidth > innerWidth, scrollX, scrollY, targetTop: target ? Math.round(target.getBoundingClientRect().top) : null, title: document.title, h1: document.querySelector('h1')?.textContent?.trim() }; })()`)
}

async function evaluate(cdp, expression, awaitPromise = false) {
  const result = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise })
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
  return result.result.value
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
