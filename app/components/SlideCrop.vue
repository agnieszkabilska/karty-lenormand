<template>
  <!-- A rectangle cut out of a slide picture, with the slide text that sits on it -->
  <div
    class="crop"
    :style="{ aspectRatio: `${rect.w} / ${rect.h}`, width, '--u': `calc(100cqw / ${rect.w})` }"
    :aria-hidden="!blocks?.length && !withHotspots ? 'true' : undefined"
  >
    <img class="crop__img" :src="slide.art" alt="" loading="lazy" :style="cropImageStyle(rect)" />
    <SlideText
      v-if="blocks?.length || withHotspots"
      :slide="slide"
      :rect="rect"
      :blocks="blocks ?? []"
      :with-hotspots="withHotspots"
    />
  </div>
</template>

<script setup lang="ts">
import type { Rect, Slide } from '~/data/slides'

withDefaults(
  defineProps<{ slide: Slide; rect: Rect; blocks?: number[]; withHotspots?: boolean; width?: string }>(),
  { blocks: undefined, withHotspots: false, width: '100%' }
)
</script>

<style scoped>
.crop__img {
  position: absolute;
  max-width: none;
  user-select: none;
}

/* The art has a transparent background, so cut-outs sit cleanly on the page */
.crop {
  position: relative;
  overflow: hidden;
  container-type: inline-size;
  margin: 0 auto;
}
</style>
