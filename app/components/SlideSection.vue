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
            :target="isExternal(part.href) ? '_blank' : undefined"
            :rel="isExternal(part.href) ? 'noopener' : undefined"
          >{{ part.t }}</a>
        </template>
      </p>
    </header>

    <!-- Desktop / tablet: the whole PDF slide, scaled to fit -->
    <div class="stage">
      <img
        class="bg"
        :src="slide.bg"
        alt=""
        width="2880"
        height="1620"
        :fetchpriority="eager ? 'high' : 'auto'"
      />
      <SlideText :slide="slide" />
    </div>

    <!-- Phones: the same content re-flowed into a readable column -->
    <SlideMobile v-if="slide.mobile" class="phone" :slide="slide" />
  </section>
</template>

<script setup lang="ts">
import type { Slide } from '~/data/slides'

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
  position: relative;
  z-index: 1;
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
  white-space: nowrap; /* keep "e-mail" in one piece */
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

.phone {
  display: none;
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

/* Phones: swap the scaled slide for the re-flowed column */
@media (max-width: 700px) {
  .slide {
    padding: 3rem 1.25rem;
    scroll-snap-align: none;
  }

  .slide--intro {
    gap: 1.5rem;
  }

  .intro__title {
    font-size: clamp(1.9rem, 8.5vw, 2.4rem);
  }

  .intro__text {
    font-size: 1rem;
    line-height: 1.6;
  }

  .stage {
    display: none;
  }

  .phone {
    display: flex;
  }
}
</style>
