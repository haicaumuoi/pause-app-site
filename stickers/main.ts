// Mounts the fun-isometric stickers on the landing page. Build: `bun build stickers/main.ts --outfile stickers.js --minify` (from apps/landing).
import { play } from './fun'
import type { Palette, Player } from './fun'
import { PAUSE, breathe, bell, calendar, heart, padlock, plant, sleepy, tea } from './icons'

const ICONS = { breathe, bell, calendar, heart, padlock, plant, sleepy, tea }

// The app's theme packs (apps/ios/.../Themes/*.json, light) on the kit's slots. Kept in step with the CSS tokens in index.html.
const THEMES: Record<string, Palette> = {
  meadow: PAUSE,
  clay: { ...PAUSE, main: '#C67139', ok: '#C67139', gold: '#F2C66D', tint: '#F1DCCE', deep: '#774422', ink: '#201E1D' },
  lilac: { ...PAUSE, main: '#8B7BF7', ok: '#8B7BF7', gold: '#FFD66B', tint: '#E2DEFD', deep: '#534A94', ink: '#17142E' },
  tide: { ...PAUSE, main: '#29B3C9', ok: '#29B3C9', gold: '#FFE170', tint: '#CAECF2', deep: '#196B79', ink: '#0C1A1F' },
}

type Mounted = { el: HTMLElement; player: Player }
const mounted: Array<Mounted> = []
const reduce = matchMedia('(prefers-reduced-motion: reduce)')
let palette = THEMES[document.documentElement.dataset.pack ?? 'meadow'] ?? PAUSE

for (const el of document.querySelectorAll<HTMLElement>('[data-sticker]')) {
  const icon = ICONS[el.dataset.sticker as keyof typeof ICONS]
  if (!icon) continue
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  el.prepend(canvas)
  const once = el.dataset.once !== undefined
  const enter = el.dataset.enter === undefined ? undefined : +el.dataset.enter
  const player = play(canvas, icon, { palette, loop: !once, enter, offset: +(el.dataset.offset ?? 0) })
  mounted.push({ el, player })
  // the page calls this when the vine reaches a sticker
  ;(el as HTMLElement & { replay?: () => void }).replay = player.replay

  let lastHover = 0
  el.addEventListener('pointerenter', () => {
    if (performance.now() - lastHover > 1200) (lastHover = performance.now()), player.replay()
  })
  if (el.dataset.drag !== undefined) drag(el, player)
}

addEventListener('pause-theme', (e) => {
  palette = THEMES[(e as CustomEvent<string>).detail] ?? PAUSE
  for (const m of mounted) m.player.set({ palette }), m.player.replay()
})

// Grab a sticker and throw it: it follows the finger 1:1, then springs home carrying the release velocity, and replays its motion.
function drag(el: HTMLElement, player: Player) {
  let x = 0, y = 0, vx = 0, vy = 0, raf = 0, held = false
  let start = { x: 0, y: 0 }, last = { x: 0, y: 0, t: 0 }
  const paint = () => {
    const tilt = Math.max(-18, Math.min(18, vx * 0.6))
    el.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg) scale(${held ? 1.08 : 1})`
  }
  const settle = () => {
    // a lightly damped spring, so it overshoots once and comes to rest without wobbling on
    vx += -x * 0.08; vy += -y * 0.08
    vx *= 0.8; vy *= 0.8
    x += vx; y += vy
    paint()
    if (Math.abs(x) + Math.abs(y) + Math.abs(vx) + Math.abs(vy) > 0.3) raf = requestAnimationFrame(settle)
    else (x = y = vx = vy = 0), paint()
  }
  el.addEventListener('pointerdown', (e) => {
    held = true
    cancelAnimationFrame(raf)
    el.setPointerCapture(e.pointerId)
    start = { x: e.clientX - x, y: e.clientY - y }
    last = { x: e.clientX, y: e.clientY, t: performance.now() }
    el.classList.add('held')
    paint()
  })
  el.addEventListener('pointermove', (e) => {
    if (!held) return
    const now = performance.now()
    const dt = Math.max(1, now - last.t) / 16.7
    vx = (e.clientX - last.x) / dt; vy = (e.clientY - last.y) / dt
    last = { x: e.clientX, y: e.clientY, t: now }
    x = e.clientX - start.x; y = e.clientY - start.y
    paint()
  })
  const release = () => {
    if (!held) return
    held = false
    el.classList.remove('held')
    player.replay()
    if (reduce.matches) (x = y = vx = vy = 0), paint()
    else raf = requestAnimationFrame(settle)
  }
  el.addEventListener('pointerup', release)
  el.addEventListener('pointercancel', release)
}
