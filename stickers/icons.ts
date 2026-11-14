// Pause stickers for the landing page, drawn as fun-isometric slabs. padlock, heart, bell and calendar are the kit's worked icons;
// breathe, plant, tea and sleepy are new drawings on the same presets.
import { VIEWS, arc, ellipse, line, onFace, pill, poly, rect, ring, spark } from './fun'
import { bob, clasp, erase, float, hop, jolt, shackle, sparkle, twinkle, wiggle, wobble } from './motions'
import type { Icon, Layer, Motion, Palette, Shape, Vec } from './fun'

/** Meadow, the app's base theme (apps/ios/.../Themes/base.json), mapped onto the kit's slots. */
export const PAUSE: Palette = {
  main: '#1FBF6A', gold: '#D8F55E', tint: '#CBF2D9', ok: '#1FBF6A', hot: '#FF9EBB', deep: '#0B7A43',
  white: '#ffffff', grey: '#E6E3DA', paper: '#FAF7F0', ink: '#0E1511',
}

const LINE = 5
const { tilt: FACE, extrude: EXT } = VIEWS.right

const glow = (parent: string, p: Vec, r: number, m: Motion | ReadonlyArray<Motion>, extra: { ip?: number; op?: number } = {}): Layer => ({
  parent, a: p, p, m, ...extra, shapes: [{ d: spark(p[0], p[1], r), fill: 'white' }],
})

const inset = (d: string, k: number, [cx, cy]: Vec) =>
  d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (_, x: string, y: string) => `${+(cx + (+x - cx) * k).toFixed(2)} ${+(cy + (+y - cy) * k).toFixed(2)}`)

// ---- kit icons, recoloured by the palette ----

const KEYHOLE = ellipse(0, -4, 17) + poly([[-8, 6], [8, 6], [13, 42], [-13, 42]], 3)
const SHACKLE = 'M-74 -40L-74 -122A74 74 0 0 1 74 -122L74 -40L42 -40L42 -122A42 42 0 0 0 -42 -122L-42 -40Z'

export const padlock: Icon = {
  name: 'padlock', frames: 130, line: LINE, extrude: EXT,
  layers: [
    { id: 'lock', p: [256, 300], m: clasp, shapes: [] },
    { parent: 'body', a: [-58, -62], p: [-58, -62], m: shackle, shapes: [{ d: SHACKLE, fill: 'grey', depth: 0.7 }] },
    {
      id: 'body', parent: 'lock', tilt: FACE,
      shapes: [{ d: rect(-112, -80, 224, 176, 24), fill: 'ok', depth: 1 }, { d: ellipse(0, 8, 36, 50), fill: 'white', depth: 0.25 }, { d: KEYHOLE, fill: 'ink', line: false }],
    },
    glow('lock', [-142, -70], 30, twinkle(0, true), { op: 30 }),
    glow('lock', [-142, -70], 30, twinkle(75), { ip: 75 }),
  ],
}

const HEART = 'M0 92C-24 74 -132 8 -132 -48C-132 -94 -98 -122 -62 -122C-34 -122 -12 -106 0 -84C12 -106 34 -122 62 -122C98 -122 132 -94 132 -48C132 8 24 74 0 92Z'

export const heart: Icon = {
  name: 'heart', frames: 123, line: LINE, extrude: EXT,
  layers: [
    { id: 'heart', p: [250, 262], m: hop, shapes: [] },
    { parent: 'heart', tilt: [-14, 30], shapes: [{ d: HEART, fill: 'hot', depth: 1, edges: [[0, 92]] }, { d: inset(HEART, 0.7, [0, -22]) }] },
    glow('heart', [128, -112], 30, twinkle(0, true), { op: 30 }),
    glow('heart', [128, -112], 30, twinkle(48), { ip: 48 }),
    glow('heart', [-150, 10], 18, twinkle(4, true), { op: 34 }),
    glow('heart', [-150, 10], 18, twinkle(54), { ip: 54 }),
  ],
}

const BELL = 'M-96 40C-94 -20 -80 -96 0 -98C80 -96 94 -20 96 40C108 46 120 54 122 66Q0 96 -122 66C-120 54 -108 46 -96 40Z'
const LIP = 'M-122 66Q0 96 122 66A9 9 0 0 1 124 84Q0 116 -124 84A9 9 0 0 1 -122 66Z'

export const bell: Icon = {
  name: 'bell', frames: 180, line: LINE, extrude: EXT,
  layers: [
    { parent: 'bell', a: [0, 80], p: [0, 80], m: { ...wiggle, at: 6, k: 0.8 }, shapes: [{ d: ellipse(0, 112, 24), fill: 'deep', depth: 0.8 }] },
    {
      id: 'bell', a: [0, -112], p: [250, 136], r: -8, m: wiggle,
      shapes: [{ d: ring(0, -116, 22, 9), fill: 'gold', depth: 0.6 }, { d: BELL, fill: 'gold', depth: 1 }, { d: LIP, fill: 'gold', depth: 1 }],
    },
  ],
}

const BADGE = onFace(FACE, [100, 82])

export const calendar: Icon = {
  name: 'calendar', frames: 180, line: LINE, extrude: EXT,
  layers: [
    { id: 'cal', p: [244, 262], m: jolt(), shapes: [] },
    {
      parent: 'cal', tilt: FACE,
      shapes: [
        { d: rect(-122, -104, 244, 214, 26), fill: 'white', depth: 1 },
        { d: poly([[-122, -104], [122, -104], [122, -44], [-122, -44]], [26, 26, 0, 0]), fill: 'hot' },
        ...[-1, 1].map((s): Shape => ({ d: pill(s * 60 - 13, -128, 26, 50), fill: 'grey', depth: 0.5 })),
        ...[0, 1, 2, 3].flatMap((c) => [0, 1].map((r): Shape => ({ d: rect(-96 + c * 50, -22 + r * 52, 34, 34, 9), ...(c === 1 && r === 1 ? { fill: 'tint' } : { fill: 'ok' }) }))),
      ],
    },
    {
      parent: 'cal', a: BADGE, p: BADGE, m: [twinkle(14), twinkle(100, true)],
      shapes: [
        { d: ellipse(BADGE[0], BADGE[1], 40), fill: 'gold', depth: 0.7 },
        { d: line([BADGE[0] - 18, BADGE[1]], [BADGE[0] - 5, BADGE[1] + 13], [BADGE[0] + 20, BADGE[1] - 14]), line: 7 },
      ],
    },
  ],
}

// ---- new Pause stickers ----

// The app's "air" sticker: a cloud with wind curling off it. The cloud floats; the gusts are erased and blown back in, one after another.
const CLOUD = 'M-112 64A54 54 0 0 1 -116 -38A72 72 0 0 1 20 -76A64 64 0 0 1 124 -18A44 44 0 0 1 112 64Z'
const GUSTS = [
  'M-150 96L40 96A30 30 0 1 0 12 64',
  'M-96 128L100 128A24 24 0 1 1 124 152',
  'M-170 158L-30 158',
]

export const breathe: Icon = {
  name: 'breathe', frames: 180, line: LINE, extrude: EXT,
  layers: [
    { id: 'sky', p: [256, 236], m: float, shapes: [] },
    { parent: 'sky', tilt: FACE, shapes: [{ d: CLOUD, fill: 'tint', depth: 1 }, { d: arc(-40, -20, 44, 200, 260) }, { d: arc(40, -4, 30, 210, 270) }] },
    { parent: 'sky', tilt: FACE, shapes: GUSTS.map((d, i): Shape => ({ d, line: 8, round: true, trim: erase(24 + i * 6, 96 + i * 6) })) },
    glow('sky', [132, -104], 22, sparkle(30)),
  ],
}

// A sprout in a pot: the pot hops like a reward and each leaf follows through a few frames late, so nothing moves in lockstep.
const LEAF = (m: 1 | -1) => `M0 -100C${-40 * m} -114 ${-66 * m} -162 ${-30 * m} -212C${2 * m} -184 ${18 * m} -140 0 -100Z`
const leaf = (at: number, k: number, turn: number, m: 1 | -1): Layer => ({
  parent: 'stem', a: [0, -100], p: [0, -100], r: turn, m: { r: hop.r, at, k: k * m },
  shapes: [{ d: LEAF(m), fill: 'main', depth: 0.6 }, { d: line([0, -100], [-24 * m, -160]), line: 4 }],
})
const POT = poly([[-96, -10], [96, -10], [74, 120], [-74, 120]], [10, 10, 18, 18])

export const plant: Icon = {
  name: 'plant', frames: 123, line: LINE, extrude: EXT, still: 0,
  layers: [
    { id: 'pot', a: [0, 120], p: [250, 380], m: hop, shapes: [] },
    { id: 'stem', parent: 'pot', a: [0, -10], p: [0, -10], m: { r: hop.r, at: 4, k: 0.6 }, shapes: [{ d: rect(-9, -110, 18, 104, 9), fill: 'deep', depth: 0.6 }] },
    leaf(8, 1.4, -14, 1),
    leaf(12, 1.2, 14, -1),
    {
      parent: 'pot', tilt: [-10, 24],
      shapes: [{ d: POT, fill: 'gold', depth: 1 }, { d: rect(-108, -34, 216, 40, 12), fill: 'gold', depth: 1 }, { d: rect(-84, 40, 168, 26, 6), fill: 'main', depth: 0.3 }],
    },
    glow('pot', [126, -150], 24, twinkle(36), { ip: 36, op: 110 }),
    glow('pot', [126, -150], 24, twinkle(84, true), { ip: 36, op: 115 }),
  ],
}

// A mug of tea: steam drawn up and erased in turn while the mug bobs, the tag swinging a beat behind.
const STEAM = (x: number) => `M${x} -96C${x - 20} -120 ${x + 20} -140 ${x} -164C${x - 20} -188 ${x + 16} -204 ${x} -226`

export const tea: Icon = {
  name: 'tea', frames: 160, line: LINE, extrude: EXT,
  layers: [
    { id: 'mug', p: [244, 300], m: bob, shapes: [] },
    { parent: 'mug', shapes: [-44, 0, 44].map((x, i): Shape => ({ d: STEAM(x), line: 7, round: true, trim: erase(10 + i * 8, 70 + i * 8) })) },
    {
      id: 'cup', parent: 'mug', tilt: FACE,
      shapes: [
        { d: ring(104, 6, 50, 26), fill: 'white', depth: 0.7 },
        { d: rect(-100, -76, 200, 180, 34), fill: 'white', depth: 1 },
        { d: rect(-100, -76, 200, 34, 0), fill: 'tint' },
        { d: line([-100, -42], [100, -42]) },
      ],
    },
    {
      parent: 'cup', a: [40, -76], p: [40, -76], m: { ...wiggle, k: 0.5, at: 6 },
      shapes: [{ d: line([40, -76], [40, 0]), line: 4 }, { d: rect(22, 0, 36, 44, 6), fill: 'hot', depth: 0.4 }],
    },
  ],
}

// The app's sleeping phone: it rocks like a dozing head while three Z's pop up one by one and pop away before the loop.
const Z = (cx: number, cy: number, s: number) =>
  poly([[cx - s, cy - s], [cx + s, cy - s], [cx + s, cy - s * 0.55], [cx - s * 0.2, cy + s * 0.55], [cx + s, cy + s * 0.55], [cx + s, cy + s], [cx - s, cy + s], [cx - s, cy + s * 0.55], [cx + s * 0.2, cy - s * 0.55], [cx - s, cy - s * 0.55]], 3)
const zed = (p: Vec, s: number, start: number): Layer => ({
  parent: 'nap', a: p, p, m: [twinkle(start), twinkle(132 + start / 4, true)], shapes: [{ d: Z(p[0], p[1], s), fill: 'gold', depth: 0.5 }],
})

export const sleepy: Icon = {
  name: 'sleepy', frames: 168, line: LINE, extrude: EXT, still: 100,
  layers: [
    { id: 'nap', a: [0, 140], p: [214, 430], m: wobble, shapes: [] },
    {
      parent: 'nap', tilt: [-30, 30],
      shapes: [
        { d: rect(-80, -140, 160, 280, 34), fill: 'ink', side: 'deep', depth: 1 },
        { d: rect(-62, -120, 124, 240, 20), fill: 'deep' },
        { d: ellipse(-24, -78, 14), fill: 'gold' },
        { d: ellipse(10, -64, 14), fill: 'gold' },
        { d: ellipse(-14, -44, 14), fill: 'gold' },
      ],
    },
    zed([96, -150], 22, 18),
    zed([140, -196], 28, 34),
    zed([72, -240], 18, 50),
  ],
}

export const ICONS: ReadonlyArray<Icon> = [breathe, plant, tea, sleepy, padlock, heart, bell, calendar]
