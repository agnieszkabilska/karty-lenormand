import { SLIDE_H, SLIDE_W, type Block, type Line, type Rect } from '~/data/slides'

export const FULL: Rect = { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H }

const pct = (v: number, of: number) => `${(v / of) * 100}%`

/** Position of a PDF-space point inside a (cropped) view, as CSS percentages. */
export function placeIn(r: Rect, x: number, y: number, w?: number, h?: number) {
  const style: Record<string, string> = { left: pct(x - r.x, r.w), top: pct(y - r.y, r.h) }
  if (w !== undefined) style.width = pct(w, r.w)
  if (h !== undefined) style.height = pct(h, r.h)
  return style
}

/** Style for one text line drawn on top of a slide picture (or a crop of it). */
export function lineStyle(line: Line, r: Rect = FULL) {
  const style = placeIn(r, line.x, line.y)
  if (line.align === 'justify' && line.w) style.width = `calc(${line.w} * var(--u))`
  if (line.rot && line.align === 'center') {
    // Centred line: tilt around its own middle so it stays in place
    style.transform = `translate(-50%, calc(-1em * var(--asc))) rotate(${line.rot}deg)`
    style.transformOrigin = '50% 50%'
  } else if (line.rot) {
    // Left-aligned line: tilt around the start of the baseline (as in the PDF)
    style.transform = `rotate(${line.rot}deg) translateY(calc(-1em * var(--asc)))`
  }
  return style
}

/** The slide picture placed so that only rectangle `r` of it is visible. */
export function cropImageStyle(r: Rect) {
  return {
    width: pct(SLIDE_W, r.w),
    height: pct(SLIDE_H, r.h),
    left: pct(-r.x, r.w),
    top: pct(-r.y, r.h)
  }
}

/**
 * A block's lines joined into one flowing paragraph, with a non-breaking
 * space after one-letter words so they never end a line (Polish typography).
 */
export function blockText(block: Block) {
  return block.lines
    .map((l) => l.t)
    .join(' ')
    .replace(/(?<=^|\s)([aiouwzAIOUWZ]) /g, '$1 ')
}

export const isExternal = (href: string) => href.startsWith('http')
