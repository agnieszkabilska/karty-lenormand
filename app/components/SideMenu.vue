<template>
  <aside class="side">
    <a href="#start" class="brand">
      <span class="brand__top">Karty</span>
      <span class="brand__main">Lenormand</span>
    </a>

    <span class="stars" aria-hidden="true">✦ ✧ ✦</span>

    <nav ref="navEl" aria-label="Menu">
      <ul>
        <li v-for="s in slides" :key="s.id">
          <a
            :href="`#${s.id}`"
            :class="{ active: active === s.id }"
            :aria-current="active === s.id ? 'true' : undefined"
          >
            {{ s.label }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="contact">
      <a :href="WHATSAPP" target="_blank" rel="noopener">{{ PHONE_DISPLAY }}</a>
      <a :href="MAIL">{{ EMAIL }}</a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { EMAIL, MAIL, PHONE_DISPLAY, WHATSAPP, slides } from '~/data/slides'

const active = ref(slides[0]!.id)
const navEl = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined

// On phones the menu is a horizontally scrolling bar: slide it sideways so the
// current section's link is always in view (centred where possible).
watch(active, (id) => {
  const nav = navEl.value
  if (!nav || nav.scrollWidth <= nav.clientWidth) return // desktop: nothing to scroll
  const link = nav.querySelector<HTMLElement>(`a[href="#${id}"]`)
  if (!link) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  nav.scrollTo({
    left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2,
    behavior: reduce ? 'auto' : 'smooth'
  })
})

onMounted(() => {
  // A slide counts as current while it crosses the middle of the viewport
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = e.target.id
      onEdges()
    },
    { rootMargin: '-50% 0px -50% 0px' }
  )
  for (const s of slides) {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  }
  window.addEventListener('scroll', onEdges, { passive: true })
  onEdges()
})
onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onEdges)
})

// At the very top / bottom of the page the first / last slide is current,
// even when short slides never reach the middle of the screen.
function onEdges() {
  const el = document.documentElement
  if (el.scrollTop < 8) active.value = slides[0]!.id
  else if (el.scrollTop + window.innerHeight >= el.scrollHeight - 8) active.value = slides.at(-1)!.id
}
</script>

<style scoped>
.side {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 20;
  width: var(--sidebar);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2.5rem 1.25rem 2rem;
  background: linear-gradient(180deg, #1d1d37 0%, #2a2244 50%, #3d2038 100%);
  border-right: 1px solid rgba(213, 177, 99, 0.45);
  color: #f0eac2;
  font-family: 'Josefin Sans', sans-serif;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  font-family: 'Quintessential', serif;
  line-height: 1.1;
}

.brand__top {
  font-size: 1.1rem;
  color: #d5b163;
}

.brand__main {
  font-size: 1.85rem;
}

.stars {
  color: #d5b163;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
}

nav ul {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

nav a {
  position: relative;
  display: block;
  padding: 0.55rem 0.9rem 0.45rem 1.4rem;
  border-radius: 6px;
  font-size: 0.98rem;
  letter-spacing: 0.03em;
  text-decoration: none;
  opacity: 0.75;
  transition: opacity 0.2s, color 0.2s, background 0.2s;
}

nav a::before {
  content: '✦';
  position: absolute;
  left: 0.2rem;
  top: 50%;
  font-size: 0.7rem;
  color: #d5b163;
  opacity: 0;
  transform: translateY(-55%) scale(0.5);
  transition: opacity 0.2s, transform 0.2s;
}

nav a:hover,
nav a:focus-visible {
  opacity: 1;
}

nav a.active {
  opacity: 1;
  color: #d5b163;
  background: rgba(213, 177, 99, 0.08);
}

nav a.active::before {
  opacity: 1;
  transform: translateY(-55%) scale(1);
}

.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(213, 177, 99, 0.3);
  font-size: 0.85rem;
  opacity: 0.85;
}

.contact a {
  text-decoration: none;
}

.contact a:hover {
  color: #d5b163;
}

/* Phones / narrow tablets: the menu becomes a slim bar pinned to the top */
@media (max-width: 820px) {
  .side {
    inset: 0 0 auto 0;
    width: auto;
    height: var(--topbar);
    flex-direction: row;
    gap: 0.75rem;
    padding: 0 0.75rem;
    border-right: 0;
    border-bottom: 1px solid rgba(213, 177, 99, 0.45);
    background: linear-gradient(90deg, #1d1d37, #3d2038);
  }

  .brand__top,
  .stars,
  .contact {
    display: none;
  }

  .brand__main {
    font-size: 1.3rem;
  }

  nav {
    position: relative; /* links' offsetLeft is measured from the bar */
    overflow-x: auto;
    scrollbar-width: none;
    /* soft fade where links slide under the edges */
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%);
    mask-image: linear-gradient(90deg, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%);
  }

  nav ul {
    flex-direction: row;
    gap: 0.1rem;
  }

  nav a {
    padding: 0.45rem 0.6rem 0.35rem;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  nav a::before {
    display: none;
  }
}
</style>
