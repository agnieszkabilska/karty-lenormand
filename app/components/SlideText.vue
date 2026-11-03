<template>
  <!-- Text lines (and link hotspots) laid over a slide picture or a crop of it -->
  <component
    :is="block.tag"
    v-for="({ block, bi }) in shown"
    :key="bi"
    class="block"
    :class="`font--${block.font}`"
    :style="{ '--size': block.size, color: block.color }"
  >
    <template v-for="(line, li) in block.lines" :key="li">
      <a
        v-if="line.href"
        :href="line.href"
        class="line"
        :target="isExternal(line.href) ? '_blank' : undefined"
        :rel="isExternal(line.href) ? 'noopener' : undefined"
        :style="lineStyle(line, rect)"
      >{{ line.t }}</a>
      <span v-else class="line" :class="`line--${line.align ?? 'left'}`" :style="lineStyle(line, rect)">{{ line.t }} </span>
    </template>
  </component>

  <template v-if="withHotspots">
    <a
      v-for="(h, hi) in slide.hotspots"
      :key="`h${hi}`"
      class="hotspot"
      :href="h.href"
      :aria-label="h.label"
      :target="isExternal(h.href) ? '_blank' : undefined"
      :rel="isExternal(h.href) ? 'noopener' : undefined"
      :style="placeIn(rect, h.x, h.y, h.w, h.h)"
    />
  </template>
</template>

<script setup lang="ts">
import type { Rect, Slide } from '~/data/slides'

const props = withDefaults(
  defineProps<{ slide: Slide; rect?: Rect; blocks?: number[]; withHotspots?: boolean }>(),
  { rect: () => FULL, blocks: undefined, withHotspots: true }
)

const shown = computed(() =>
  props.slide.blocks
    .map((block, bi) => ({ block, bi }))
    .filter(({ bi }) => !props.blocks || props.blocks.includes(bi))
)
</script>
