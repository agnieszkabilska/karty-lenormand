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
  bg: string
  fill: string // colour used around the slide when the screen ratio differs
  blocks: Block[]
  hotspots?: Hotspot[]
  // Optional heading + text shown on the page background above the slide
  intro?: { title: string; text: Array<string | { t: string; href: string }> }
}

const CREAM = '#f0eac2'
const GOLD = '#d5b163'
const WHITE = '#ffffff'
const PLUM = '#5b2c3c'

const PHONE = 'tel:+48729995196'
const MAIL = 'mailto:justyna109a@onet.pl'
const WHATSAPP = 'https://wa.me/48729995196'

const c = (t: string, x: number, y: number): Line => ({ t, x, y, align: 'center' })
const j = (t: string, x: number, y: number, w: number): Line => ({ t, x, y, w, align: 'justify' })
const l = (t: string, x: number, y: number): Line => ({ t, x, y })

export const slides: Slide[] = [
  {
    id: 'start',
    label: 'Start',
    bg: '/slides/slide-1.jpg',
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
      { tag: 'h2', font: 'sans-bold', size: 65, color: PLUM, lines: [l('Skontaktuj się', 678.8, 266.5)] },
      {
        tag: 'p',
        font: 'sans-bold',
        size: 36.76,
        color: PLUM,
        lines: [{ t: '+48 729 995 196', x: 470.9, y: 466.1, rot: -2.9, href: PHONE }]
      },
      {
        tag: 'p',
        font: 'sans-bold',
        size: 36.57,
        color: PLUM,
        lines: [{ t: 'justyna109a@onet.pl', x: 451.9, y: 578.5, rot: -2.91, href: MAIL }]
      }
    ],
    hotspots: [
      { x: 362, y: 424, w: 68, h: 68, href: WHATSAPP, label: 'Napisz na WhatsApp' },
      { x: 362, y: 532, w: 68, h: 68, href: MAIL, label: 'Wyślij e-mail' }
    ]
  }
]
