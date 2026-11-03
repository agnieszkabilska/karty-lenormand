<template>
  <div>
    <NuxtRouteAnnouncer />
    <SideMenu />
    <main class="main">
      <SlideSection
        v-for="(slide, i) in slides"
        :key="slide.id"
        :slide="slide"
        :prev-fill="slides[i - 1]?.fill ?? slide.fill"
        :next-fill="slides[i + 1]?.fill ?? slide.fill"
        :eager="i === 0"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { slides } from '~/data/slides'
</script>

<style>
.main {
  margin-left: var(--sidebar);
}

@media (max-width: 820px) {
  .main {
    margin-left: 0;
    padding-top: var(--topbar);
  }
}
</style>
