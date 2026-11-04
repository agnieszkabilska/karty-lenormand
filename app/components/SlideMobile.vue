<template>
  <!-- Phone layout: the slide re-flowed into a column, using pieces of the PDF art -->
  <div class="mobile">
    <div
      v-for="(d, di) in slide.mobile?.decos"
      :key="`d${di}`"
      class="deco"
      :class="`deco--${d.at}`"
      :style="{ width: d.width, opacity: d.opacity ?? 0.6 }"
      aria-hidden="true"
    >
      <SlideCrop :slide="slide" :rect="d.r" />
    </div>

    <MobilePiece v-for="(p, pi) in slide.mobile?.pieces" :key="pi" :piece="p" />
  </div>
</template>

<script setup lang="ts">
import { h, type FunctionalComponent } from 'vue'
import type { MPiece, Slide } from '~/data/slides'
import SlideCrop from './SlideCrop.vue'

const props = defineProps<{ slide: Slide }>()

const MobilePiece: FunctionalComponent<{ piece: MPiece }> = ({ piece }) => render(piece)

function render(p: MPiece): ReturnType<typeof h> {
  const slide = props.slide
  switch (p.k) {
    case 'crop':
      return h(SlideCrop, {
        class: 'piece',
        slide,
        rect: p.r,
        blocks: p.blocks,
        withHotspots: p.hotspots ?? false,
        width: p.width,
        style: p.clip ? { clipPath: p.clip } : undefined
      })
    case 'block': {
      const block = slide.blocks[p.i]!
      return h(block.tag, { class: ['piece', 'm', ...p.cls.split(' ')], style: { color: block.color } }, blockText(block))
    }
    case 'panel':
      return h('div', { class: ['piece', 'panel', `panel--${p.tone}`] }, p.items.map(render))
    case 'bullet':
      return h('div', { class: 'bullet' }, [
        h('div', { class: 'bullet__icon', 'aria-hidden': 'true' }, [h(SlideCrop, { slide, rect: p.icon })]),
        render({ k: 'block', i: p.i, cls: 'body' })
      ])
    case 'sep':
      return h('span', { class: 'sep', 'aria-hidden': 'true' }, '✦ ✧ ✦')
  }
}
</script>

<style scoped>
.mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}

.deco {
  position: absolute;
  z-index: 0;
  pointer-events: none;
}

.deco--tl { top: 0.5rem; left: 0; }
.deco--tr { top: 0.5rem; right: 0; }
.deco--bl { bottom: 0.5rem; left: 0; }
.deco--br { bottom: 0.5rem; right: 0; }

:deep(.piece) {
  position: relative;
  z-index: 1;
}

/* ---- Text ---- */
:deep(.m) {
  margin: 0;
  width: 100%;
  text-wrap: pretty;
}

:deep(.h1) {
  font-family: 'Quintessential', serif;
  font-weight: 400;
  font-size: clamp(2rem, 9vw, 2.6rem);
  line-height: 1.2;
  text-align: center;
}

:deep(.sub) {
  font-family: 'Quintessential', serif;
  font-size: clamp(1.4rem, 6.5vw, 1.8rem);
  line-height: 1.25;
  text-align: center;
}

:deep(.h2) {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: clamp(1.9rem, 8.5vw, 2.4rem);
  line-height: 1.1;
  text-align: center;
}

:deep(.h3) {
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
}

:deep(.pad) {
  padding-inline: 3.25rem;
}

:deep(.lead) {
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 700;
  font-size: 1.08rem;
  line-height: 1.5;
}

:deep(.body) {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

:deep(.serif) {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: 1.22rem;
  line-height: 1.35;
  text-align: center;
}

:deep(.center) {
  text-align: center;
}

/* ---- Framed panels, same colours and gold border as the PDF ---- */
:deep(.panel) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1.4rem 1.2rem;
  border: 2px solid #b8860b;
  border-radius: 14px;
}

:deep(.panel--plum) {
  background: #5a2a3b;
}

:deep(.panel--navy) {
  background: #2a2a4a;
}

:deep(.bullet) {
  display: grid;
  grid-template-columns: 2.6rem 1fr;
  align-items: start;
  gap: 0.4rem;
}

:deep(.bullet__icon) {
  margin-top: -0.55rem;
}

:deep(.sep) {
  color: #d5b163;
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  text-align: center;
}
</style>
