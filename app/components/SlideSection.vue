<template>
  <section
    :id="slide.id"
    class="slide"
    :class="{ 'slide--intro': slide.intro }"
    :style="ombre"
    :aria-label="slide.label"
  >
    <header v-if="slide.intro" class="intro">
      <span class="intro__stars" aria-hidden="true">✦ ✧ ✦</span>
      <h2 class="intro__title">{{ slide.intro.title }}</h2>
      <p class="intro__text">
        <template v-for="(part, pi) in slide.intro.text" :key="pi">
          <template v-if="typeof part === 'string'">{{ part }}</template>
          <a
            v-else
            :href="part.href"
            :target="part.href.startsWith('http') ? '_blank' : undefined"
            :rel="part.href.startsWith('http') ? 'noopener' : undefined"
          >{{ part.t }}</a>
        </template>
      </p>
    </header>

    <div class="stage">
      <img
        class="bg"
        :src="slide.bg"
        alt=""
        width="2880"
        height="1620"
        :fetchpriority="eager ? 'high' : 'auto'"
      />

      <component
        :is="block.tag"
        v-for="(block, bi) in slide.blocks"
        :key="bi"
        class="block"
        :class="`font--${block.font}`"
        :style="{ '--size': block.size, color: block.color }"
      >
        <template v-for="(line, li) in block.lines" :key="li">
          <a v-if="line.href" :href="line.href" class="line" :style="lineStyle(line)">{{ line.t }}</a>
          <span v-else class="line" :class="`line--${line.align ?? 'left'}`" :style="lineStyle(line)">{{ line.t }} </span>
        </template>
      </component>

      <a
        v-for="(h, hi) in slide.hotspots"
        :key="`h${hi}`"
        class="hotspot"
        :href="h.href"
        :aria-label="h.label"
        :target="h.href.startsWith('http') ? '_blank' : undefined"
        :rel="h.href.startsWith('http') ? 'noopener' : undefined"
        :style="{
          left: pctX(h.x),
          top: pctY(h.y),
          width: pctX(h.w),
          height: pctY(h.h)
        }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { SLIDE_H, SLIDE_W, type Line, type Slide } from '~/data/slides'

const props = defineProps<{ slide: Slide; prevFill: string; nextFill: string; eager?: boolean }>()

// Each section starts and ends on the halfway colour between itself and its
// neighbour, so the background flows from one slide into the next (ombre).
const ombre = computed(() => {
  const own = props.slide.fill
  const mid = (other: string) => `color-mix(in oklab, ${own} 50%, ${other})`
  return {
    background: `linear-gradient(180deg, ${mid(props.prevFill)} 0%, ${own} 30%, ${own} 70%, ${mid(props.nextFill)} 100%)`
  }
})

const pctX = (v: number) => `${(v / SLIDE_W) * 100}%`
const pctY = (v: number) => `${(v / SLIDE_H) * 100}%`

const lineStyle = (line: Line) => {
  const style: Record<string, string> = { left: pctX(line.x), top: pctY(line.y) }
  if (line.align === 'justify' && line.w) style.width = `calc(${line.w} * var(--u))`
  if (line.rot) style.transform = `rotate(${line.rot}deg) translateY(calc(-1em * var(--asc)))`
  return style
}
</script>

<style scoped>
.slide {
  --pad-y: clamp(1.5rem, 6vh, 4rem);
  --intro-h: 0px;
  position: relative;
  display: grid;
  place-items: center;
  padding: var(--pad-y) clamp(1rem, 4vw, 3.5rem);
  overflow: hidden;
  scroll-snap-align: center;
}

/* Heading + text above the slide, on the page background */
.slide--intro {
  --intro-h: clamp(8.5rem, 20vh, 11rem); /* space reserved so the slide still fits */
  gap: 0.5rem;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  max-width: 760px;
  color: #f0eac2;
  text-align: center;
}

.intro__stars {
  color: #d5b163;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
}

.intro__title {
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: clamp(1.7rem, 3vw, 2.6rem);
  line-height: 1.1;
}

.intro__text {
  margin: 0;
  font-family: 'Josefin Sans', sans-serif;
  font-size: clamp(0.95rem, 1.35vw, 1.15rem);
  line-height: 1.55;
}

.intro__text a {
  color: #d5b163;
  font-weight: 700;
  text-decoration: none;
}

.intro__text a:hover,
.intro__text a:focus-visible {
  text-decoration: underline;
}

/* 16:9 stage: never wider than 1040px and always fully inside the viewport */
.stage {
  position: relative;
  width: min(100%, calc((100svh - 2 * var(--pad-y) - var(--intro-h)) * 16 / 9), 1040px);
  aspect-ratio: 16 / 9;
  container-type: inline-size;
  --u: calc(100cqw / 1440);
}

/* Fade the picture's edges into the page so slides have no hard borders */
.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  --fade-x: linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%);
  --fade-y: linear-gradient(180deg, transparent 0%, #000 9%, #000 91%, transparent 100%);
  -webkit-mask-image: var(--fade-x), var(--fade-y);
  -webkit-mask-composite: source-in;
  mask-image: var(--fade-x), var(--fade-y);
  mask-composite: intersect;
}

@media (max-width: 820px) {
  .slide {
    --pad-y: 1.25rem;
    padding-inline: 0.75rem;
  }

  .stage {
    width: min(100%, calc((100svh - var(--topbar) - 2 * var(--pad-y) - var(--intro-h)) * 16 / 9));
  }
}

.block {
  display: contents;
  margin: 0;
}

.line {
  position: absolute;
  font-size: calc(var(--size) * var(--u));
  line-height: var(--lh);
  white-space: nowrap;
  transform: translateY(calc(-1em * var(--asc)));
  transform-origin: 0 0;
  text-decoration: none;
}

.line--center {
  transform: translate(-50%, calc(-1em * var(--asc)));
  text-align: center;
}

.line--justify {
  text-align: justify;
  text-align-last: justify;
}

a.line:hover,
a.line:focus-visible {
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.hotspot {
  position: absolute;
  border-radius: 50%;
}

.hotspot:focus-visible {
  outline: 2px solid currentColor;
}

/* Font metrics taken from the PDF so baselines land exactly where they were */
.font--script {
  font-family: 'Quintessential', serif;
  font-weight: 400;
  --asc: 1.143;
  --lh: 1.533;
}

.font--serif,
.font--serif-bold {
  font-family: 'Cormorant Garamond', serif;
  --asc: 0.924;
  --lh: 1.211;
}

.font--serif {
  font-weight: 400;
}

.font--serif-bold {
  font-weight: 700;
}

.font--sans,
.font--sans-bold {
  font-family: 'Josefin Sans', sans-serif;
  --asc: 0.75;
  --lh: 1;
}

.font--sans {
  font-weight: 400;
}

.font--sans-bold {
  font-weight: 700;
}
</style>
