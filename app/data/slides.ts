// Text layer for each slide, positioned in the PDF's own coordinate space
// (1440 × 810 pt). Backgrounds in /public/slides are the original PDF pages
// rendered without their text. `y` is the text baseline.

export const SLIDE_W = 1440
export const SLIDE_H = 810

export type FontKey = 'script' | 'serif' | 'serif-bold' | 'sans' | 'sans-bold'

export interface Line {
  t: string
  x: number // left edge, or centre when align = 'center'
  y: number // baseline
  w?: number // width for justified lines
  align?: 'left' | 'center' | 'justify'
  rot?: number // degrees, around the start of the baseline
  href?: string
}

export interface Block {
  tag: 'h1' | 'h2' | 'h3' | 'p'
  font: FontKey
  size: number
  color: string
  lines: Line[]
}

export interface Hotspot {
  x: number
  y: number
  w: number
  h: number
  href: string
  label: string
}

export interface Slide {
  id: string
  label: string
  bg: string // whole PDF page without text (desktop)
  art: string // PDF page artwork only, transparent background (phone crops)
  fill: string // colour used around the slide when the screen ratio differs
  blocks: Block[]
  hotspots?: Hotspot[]
  // Optional heading + text shown on the page background above the slide
  intro?: { title: string; text: Array<string | { t: string; href: string }> }
  // Phone layout (≤ 700px wide), see `mobileLayouts` below
  mobile?: SlideMobile
}

/** A rectangle of the slide, in PDF units. */
export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

/** One element of the phone layout, stacked top to bottom. */
export type MPiece =
  | { k: 'crop'; r: Rect; blocks?: number[]; hotspots?: boolean; width?: string; clip?: string } // piece of the PDF art (+ its text); `clip` = CSS clip-path
  | { k: 'block'; i: number; cls: string } // slide block `i` as flowing text
  | { k: 'panel'; tone: 'plum' | 'navy'; items: MPiece[] } // gold-framed box
  | { k: 'bullet'; icon: Rect; i: number } // block `i` with an art icon in front
  | { k: 'sep' } // small ✦ ✧ ✦ divider

/** Decoration from the PDF art pinned to a corner of the section. */
export interface Deco {
  r: Rect
  at: 'tl' | 'tr' | 'bl' | 'br'
  width: string
  opacity?: number
}

export interface SlideMobile {
  pieces: MPiece[]
  decos?: Deco[]
}

const CREAM = '#f0eac2'
const GOLD = '#d5b163'
const WHITE = '#ffffff'
const PLUM = '#5b2c3c'

export const PHONE_DISPLAY = '+48 729 995 196'
export const EMAIL = 'justyna109a@onet.pl'
export const WHATSAPP = 'https://wa.me/48729995196'
export const MAIL = `mailto:${EMAIL}`

const c = (t: string, x: number, y: number): Line => ({ t, x, y, align: 'center' })
const j = (t: string, x: number, y: number, w: number): Line => ({ t, x, y, w, align: 'justify' })
const l = (t: string, x: number, y: number): Line => ({ t, x, y })

export const slides: Slide[] = [
  {
    id: 'start',
    label: 'Start',
    bg: '/slides/slide-1.jpg',
    art: '/slides/art-1.webp',
    fill: '#232340',
    blocks: [
      {
        tag: 'h1',
        font: 'script',
        size: 66,
        color: CREAM,
        lines: [c('Odkryj odpowiedzi, które', 994.55, 329.7), c('już w sobie nosisz', 994.55, 395)]
      },
      {
        tag: 'p',
        font: 'script',
        size: 50,
        color: CREAM,
        lines: [c('Profesjonalne czytanie z kart', 994.55, 646.5), c('Lenormand', 994.55, 701.3)]
      }
    ]
  },
  {
    id: 'o-mnie',
    label: 'O mnie',
    bg: '/slides/slide-2.jpg',
    art: '/slides/art-2.webp',
    fill: '#512635',
    blocks: [
      { tag: 'h2', font: 'serif-bold', size: 70, color: CREAM, lines: [c('O mnie', 773.85, 157.6)] },
      {
        tag: 'p',
        font: 'sans-bold',
        size: 32.86,
        color: CREAM,
        lines: [
          j('Mam na imię Justyna, od 8 lat pracuję z kartami', 358.7, 272.0, 871.4),
          j('Lenormand, pomagając spojrzeć na trudne sytuacje', 358.7, 307.9, 871.4),
          j('z boku, poukładać codzienne sprawy oraz otrzymać', 358.7, 343.8, 871.4),
          l('odpowiedź na nurtujące pytania.', 358.7, 379.8)
        ]
      },
      {
        tag: 'p',
        font: 'sans',
        size: 28.99,
        color: CREAM,
        lines: [
          c('Jeśli stoisz przed ważnym wyborem, masz mętlik w głowie lub', 796.8, 500.7),
          c('poszukujesz odpowiedzi na nurtujące Cię pytania, zapraszam Cię', 796.8, 535.2),
          c('na indywidualną sesję. Wspólnie przyjrzymy się temu, co przynosi', 796.8, 569.7),
          c('przyszłość i jakie kroki warto podjąć.', 796.8, 604.2)
        ]
      }
    ]
  },
  {
    id: 'karty',
    label: 'Karty Lenormand',
    bg: '/slides/slide-3.jpg',
    art: '/slides/art-3.webp',
    fill: '#232340',
    blocks: [
      {
        tag: 'h2',
        font: 'serif-bold',
        size: 65.67,
        color: CREAM,
        lines: [c('Czym są karty Lenormand?', 726.35, 96.4)]
      },
      {
        tag: 'p',
        font: 'sans-bold',
        size: 33,
        color: GOLD,
        lines: [
          c('To wyjątkowa talia 36 kart, której historia sięga przełomu XVIII', 726.35, 160.5),
          c('i XIX wieku, nazwana na cześć słynnej francuskiej wróżki Marie', 726.35, 196.5),
          c('Anne Lenormand.', 726.35, 232.5)
        ]
      },
      {
        tag: 'p',
        font: 'serif-bold',
        size: 35.08,
        color: GOLD,
        lines: [
          c('Wielu osobom karty kojarzą się głównie z Tarotem, jednak świat Lenormand działa', 726.4, 316.3),
          c('zupełnie inaczej. Zamiast skomplikowanych filozoficznych warstw i ezoterycznych', 726.4, 350.8),
          c('zagadek, otrzymujesz tu konkret, jasność i bezpośredniość.', 726.4, 385.3)
        ]
      },
      {
        tag: 'p',
        font: 'sans',
        size: 28.94,
        color: CREAM,
        lines: [
          j('Mówią wprost - symbole są czytelne i bliskie codziennemu życiu. Zamiast', 222, 450.3, 1096.5),
          j('metafizycznych metafor, karty pokazują realne sytuacje, zamiary ludzi i namacalne', 222, 481.8, 1096.5),
          l('fakty.', 222, 513.3)
        ]
      },
      {
        tag: 'p',
        font: 'sans',
        size: 28.94,
        color: CREAM,
        lines: [
          j('Mniejsza talia, większa precyzja – tradycyjny zestaw liczy 36 kart, które rzadko', 222, 565.0, 1096.5),
          j('interpretuje się w pojedynkę. Ich prawdziwa siła tkwi w łączeniu w pary i dłuższe', 222, 596.5, 1096.5),
          j('sekwencje, gdzie jedna karta dopełnia drugą, tworząc spójną, logiczną opowieść', 222, 628.0, 1096.5),
          l('o tym, co było, jest lub dopiero się wydarzy.', 222, 659.5)
        ]
      },
      {
        tag: 'p',
        font: 'serif-bold',
        size: 33.08,
        color: GOLD,
        lines: [
          c('To idealny wybór, gdy potrzebujesz szybkich, trzeźwych odpowiedzi i drogowskazu', 747.1, 723.0),
          c('w codziennych, życiowych wyborach', 747.1, 756.0)
        ]
      }
    ]
  },
  {
    id: 'oferta',
    label: 'Oferta i cennik',
    bg: '/slides/slide-4.jpg',
    art: '/slides/art-4.webp',
    fill: '#512635',
    blocks: [
      { tag: 'h2', font: 'serif-bold', size: 67, color: GOLD, lines: [c('Oferta i Cennik', 743.1, 102.4)] },
      {
        tag: 'p',
        font: 'sans-bold',
        size: 32,
        color: CREAM,
        lines: [c('Wybierz rodzaj sesji dopasowany do tego, czego w tej chwili potrzebujesz.', 723.7, 185)]
      },
      { tag: 'h3', font: 'serif-bold', size: 32, color: GOLD, lines: [c('POJEDYNCZE PYTANIE', 408.95, 441.1)] },
      { tag: 'p', font: 'sans', size: 55, color: CREAM, lines: [c('15 zł', 408.95, 515.3)] },
      { tag: 'h3', font: 'serif', size: 32, color: GOLD, lines: [c('PEŁNY ROZKŁAD', 1031, 441.1)] },
      { tag: 'p', font: 'sans', size: 55, color: CREAM, lines: [c('100 zł', 1052.4, 515.3)] }
    ]
  },
  {
    id: 'sesje',
    label: 'Rodzaje sesji',
    bg: '/slides/slide-5.jpg',
    art: '/slides/art-5.webp',
    fill: '#512635',
    blocks: [
      { tag: 'h3', font: 'sans-bold', size: 31, color: WHITE, lines: [c('Pojedyncze pytanie', 426.2, 240)] },
      {
        tag: 'p',
        font: 'sans',
        size: 31,
        color: WHITE,
        lines: [
          j('Masz konkretną, palącą kwestię', 205.3, 331.8, 491.8),
          j('i potrzebujesz jasnej odpowiedzi?', 205.3, 368.6, 491.8),
          j('Zadaj jedno precyzyjne pytanie', 205.3, 405.3, 491.8),
          j('(np. dotyczące najbliższych kroków,', 205.3, 442.1, 491.8),
          j('relacji lub konkretnej decyzji),', 205.3, 478.8, 491.8),
          l('a otrzymasz klarowną interpretację.', 205.3, 515.6)
        ]
      },
      { tag: 'h3', font: 'sans-bold', size: 31, color: WHITE, lines: [c('Pełny rozkład', 1021.6, 240)] },
      {
        tag: 'p',
        font: 'sans',
        size: 31,
        color: WHITE,
        lines: [
          j('Kompleksowa sesja, która pozwala', 768.3, 331.8, 499),
          j('głębiej spojrzeć na wybraną sferę', 768.3, 368.6, 499),
          j('życia (miłość, praca, finanse) lub', 768.3, 405.3, 499),
          j('ogólny stan rzeczy. To szersza', 768.3, 442.1, 499),
          j('perspektywa, która pokazuje ukryte', 768.3, 478.8, 499),
          j('tendencje, motywy ludzkich działań', 768.3, 515.6, 499),
          l('oraz wskazówki na najbliższy czas.', 768.3, 552.3)
        ]
      }
    ]
  },
  {
    id: 'kontakt',
    label: 'Kontakt',
    bg: '/slides/slide-6.jpg',
    art: '/slides/art-6.webp',
    fill: '#232340',
    intro: {
      title: 'Jak przebiega sesja?',
      text: [
        'Napisz wiadomość na ',
        { t: 'WhatsApp', href: WHATSAPP },
        ' lub ',
        { t: 'e-mail', href: MAIL },
        //   = non-breaking space, keeps one-letter words off the end of a line
        ', a następnie po ustaleniu szczegółów otrzymasz pełen opis wraz z rozkładem w wiadomości prywatnej.'
      ]
    },
    blocks: [
      {
        tag: 'h2',
        font: 'sans-bold',
        size: 65,
        color: PLUM,
        // Tilted 14.1° to run parallel to the top edge of the back card, centred
        // on the card's axis (card corners ≈ (681,15) and (1212,153))
        lines: [{ t: 'Skontaktuj się', x: 913.7, y: 226, align: 'center', rot: 14.1 }]
      },
      {
        tag: 'p',
        font: 'sans-bold',
        size: 36.76,
        color: PLUM,
        // The number opens a WhatsApp chat (not a phone call)
        lines: [{ t: PHONE_DISPLAY, x: 470.9, y: 466.1, rot: -2.9, href: WHATSAPP }]
      },
      {
        tag: 'p',
        font: 'sans-bold',
        size: 36.57,
        color: PLUM,
        lines: [{ t: EMAIL, x: 451.9, y: 578.5, rot: -2.91, href: MAIL }]
      }
    ],
    hotspots: [
      { x: 362, y: 424, w: 68, h: 68, href: WHATSAPP, label: 'Napisz na WhatsApp' },
      { x: 362, y: 532, w: 68, h: 68, href: MAIL, label: 'Wyślij e-mail' }
    ]
  }
]

// ---------------------------------------------------------------------------
// Phone layouts. Rectangles are pieces of the text-free PDF pages (PDF units);
// block numbers refer to each slide's `blocks` above.
// ---------------------------------------------------------------------------

const CORNER_TL: Rect = { x: 65, y: 40, w: 150, h: 140 }
const CORNER_TR: Rect = { x: 1225, y: 40, w: 150, h: 140 }

const mobileLayouts: Record<string, SlideMobile> = {
  start: {
    pieces: [
      { k: 'crop', r: { x: 560, y: 45, w: 870, h: 190 } },
      { k: 'block', i: 0, cls: 'h1' },
      { k: 'crop', r: { x: 560, y: 400, w: 870, h: 185 } },
      { k: 'block', i: 1, cls: 'sub' },
      { k: 'crop', r: { x: 40, y: 75, w: 520, h: 665 }, width: '62%' }
    ]
  },
  'o-mnie': {
    decos: [
      { r: { x: 0, y: 30, w: 250, h: 475 }, at: 'tl', width: '28%', opacity: 0.45 },
      { r: { x: 0, y: 530, w: 325, h: 280 }, at: 'bl', width: '32%', opacity: 0.45 },
      { r: { x: 1225, y: 635, w: 150, h: 140 }, at: 'br', width: '16%' }
    ],
    pieces: [
      { k: 'crop', r: { x: 460, y: 60, w: 640, h: 160 }, blocks: [0] },
      { k: 'block', i: 1, cls: 'lead center' },
      { k: 'sep' },
      { k: 'block', i: 2, cls: 'body center' }
    ]
  },
  karty: {
    decos: [
      { r: { x: 35, y: 22, w: 145, h: 145 }, at: 'tl', width: '17%', opacity: 0.85 },
      { r: { x: 1252, y: 10, w: 145, h: 145 }, at: 'tr', width: '17%', opacity: 0.85 }
    ],
    pieces: [
      { k: 'block', i: 0, cls: 'h2 pad' },
      { k: 'block', i: 1, cls: 'lead center' },
      {
        k: 'panel',
        tone: 'plum',
        items: [
          { k: 'block', i: 2, cls: 'serif' },
          { k: 'bullet', icon: { x: 113, y: 415, w: 117, h: 105 }, i: 3 },
          { k: 'bullet', icon: { x: 113, y: 415, w: 117, h: 105 }, i: 4 },
          { k: 'block', i: 5, cls: 'serif' }
        ]
      }
    ]
  },
  oferta: {
    decos: [
      { r: CORNER_TL, at: 'tl', width: '16%' },
      { r: CORNER_TR, at: 'tr', width: '16%' }
    ],
    pieces: [
      { k: 'block', i: 0, cls: 'h2 pad' },
      { k: 'block', i: 1, cls: 'lead center' },
      { k: 'crop', r: { x: 135, y: 193, w: 546, h: 405 }, blocks: [2, 3] },
      { k: 'crop', r: { x: 757, y: 201, w: 547, h: 400 }, blocks: [4, 5] },
      { k: 'crop', r: { x: 545, y: 598, w: 345, h: 212 }, width: '55%' }
    ]
  },
  sesje: {
    pieces: [
      { k: 'crop', r: { x: 290, y: 5, w: 870, h: 140 } },
      {
        k: 'panel',
        tone: 'navy',
        items: [
          { k: 'block', i: 0, cls: 'h3' },
          { k: 'block', i: 1, cls: 'body center' },
          { k: 'sep' },
          { k: 'block', i: 2, cls: 'h3' },
          { k: 'block', i: 3, cls: 'body center' }
        ]
      },
      { k: 'crop', r: { x: 290, y: 662, w: 870, h: 140 } }
    ]
  },
  kontakt: {
    // Sun and hourglass shown whole in the corners instead of sliced at the
    // edges of the cards picture
    decos: [
      { r: { x: 0, y: 0, w: 295, h: 382 }, at: 'tl', width: '30%', opacity: 0.4 },
      { r: { x: 1198, y: 424, w: 242, h: 386 }, at: 'br', width: '26%', opacity: 0.55 }
    ],
    pieces: [
      {
        k: 'crop',
        r: { x: 294, y: 6, w: 922, h: 730 },
        blocks: [0, 1, 2],
        hotspots: true,
        // cut away the bottom-right corner where the hourglass lid pokes in
        clip: 'polygon(0 0, 100% 0, 100% 56%, 94% 56%, 94% 100%, 0 100%)'
      }
    ]
  }
}

for (const s of slides) s.mobile = mobileLayouts[s.id]
