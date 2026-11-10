<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Directive } from 'vue'
import { contacts, internship, projects, skillGroups } from './data'
import SiteFrame from './components/SiteFrame.vue'
import joePhoto from './assets/images/joe.jpeg'

const scrolled = ref(false)
const menuOpen = ref(false)
const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
]
// which section is in the middle of the screen, for the red underline in the nav
const active = ref('')
let spy: IntersectionObserver | undefined

const year = new Date().getFullYear()

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') menuOpen.value = false
}
// close the mobile menu if the screen grows past the breakpoint
const desktop = window.matchMedia('(min-width: 40rem)')
const onBreakpoint = () => {
  if (desktop.matches) menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  desktop.addEventListener('change', onBreakpoint)

  spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = e.target.id ? `#${e.target.id}` : ''
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  // the hero (first section) clears the underline; the rest map to nav links
  const hero = document.querySelector('#top > section')
  if (hero) spy.observe(hero)
  for (const id of ['about', 'experience', 'projects', 'contact']) {
    const el = document.getElementById(id)
    if (el) spy.observe(el)
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  desktop.removeEventListener('change', onBreakpoint)
  spy?.disconnect()
})

const hidden = ['opacity-0', 'translate-y-3']
const motion = [
  'transition-[opacity,translate]',
  'duration-500',
  'ease-[cubic-bezier(0.22,1,0.36,1)]',
  'motion-reduce:transition-none',
]
const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    el.classList.add(...hidden, ...motion)
    if (value) el.style.transitionDelay = `${value}ms`
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        el.classList.remove(...hidden)
        io.disconnect()
        setTimeout(() => {
          el.classList.remove(...motion)
          el.style.transitionDelay = ''
        }, 600 + (value ?? 0))
      },
      { threshold: 0.15 },
    )
    io.observe(el)
  },
}

const wrap = 'mx-auto w-full max-w-280 px-5 sm:px-6'
const section = 'py-20 md:py-32'
const label = 'mb-6 font-mono text-sm text-brand'
const h2 = 'text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.02em]'
const btn =
  'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium no-underline transition-[background-color,border-color,scale] duration-150 active:scale-[0.98]'
const textLink =
  'inline-flex items-center gap-2 border-b border-current pb-0.5 font-medium text-brand no-underline transition-colors hover:text-fg'

// the hero shows the first live project next to the portrait
const featured = projects[0]!
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-10 border-b transition-colors duration-300"
    :class="
      scrolled || menuOpen
        ? 'border-line-soft bg-ink/80 backdrop-blur-md'
        : 'border-transparent bg-transparent'
    "
  >
    <div :class="[wrap, 'flex h-17 items-center justify-between']">
      <a
        href="#top"
        class="flex items-end gap-0.5 text-3xl leading-none font-semibold text-brand no-underline"
        aria-label="Joe Abednego - home"
      >
        <span>J</span><span class="mb-1 size-1.75 rounded-full bg-flame"></span>
      </a>
      <nav aria-label="Primary" class="max-sm:hidden">
        <ul class="m-0 flex list-none items-center gap-8 p-0 text-sm">
          <li v-for="n in navItems" :key="n.href">
            <a
              :href="n.href"
              class="relative no-underline transition-colors hover:text-fg"
              :class="active === n.href ? 'text-fg' : 'text-muted'"
              :aria-current="active === n.href ? 'location' : undefined"
            >
              {{ n.label }}
              <span
                class="absolute inset-x-0 -bottom-1.5 h-0.5 origin-left rounded-full bg-flame transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                :class="active === n.href ? 'scale-x-100' : 'scale-x-0'"
                aria-hidden="true"
              ></span>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              class="rounded-lg border border-line px-4 py-2 text-fg no-underline transition-colors hover:border-flame-fill hover:bg-flame-fill"
              >Contact</a
            >
          </li>
        </ul>
      </nav>

      <button
        type="button"
        class="-mr-2 grid size-11 cursor-pointer place-items-center rounded-full text-fg sm:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <span class="relative block h-3.5 w-5.5" aria-hidden="true">
          <span
            class="absolute top-1.5 left-0 h-0.5 w-full rounded-full bg-current transition-transform duration-200"
            :class="menuOpen ? 'rotate-45' : '-translate-y-1.5'"
          ></span>
          <span
            class="absolute top-1.5 left-0 h-0.5 w-full rounded-full bg-current transition-opacity duration-200"
            :class="menuOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="absolute top-1.5 left-0 h-0.5 w-full rounded-full bg-current transition-transform duration-200"
            :class="menuOpen ? '-rotate-45' : 'translate-y-1.5'"
          ></span>
        </span>
      </button>
    </div>

    <nav
      id="mobile-menu"
      aria-label="Mobile"
      class="grid transition-[grid-template-rows] duration-300 ease-out sm:hidden"
      :class="menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      :inert="!menuOpen"
    >
      <div class="overflow-hidden">
        <ul :class="[wrap, 'm-0 grid list-none gap-1 pt-2 pb-6']">
          <li v-for="n in navItems" :key="n.href">
            <a
              :href="n.href"
              class="flex items-center justify-between border-b border-line-soft py-3.5 text-lg text-fg no-underline"
              :aria-current="active === n.href ? 'location' : undefined"
              @click="menuOpen = false"
            >
              {{ n.label }}
              <span v-if="active === n.href" class="size-1.5 rounded-full bg-flame" aria-hidden="true"></span>
            </a>
          </li>
          <li class="pt-4">
            <a
              href="#contact"
              class="block rounded-lg bg-flame-fill py-3 text-center font-medium text-fg no-underline transition-colors hover:bg-flame-fill-hover"
              @click="menuOpen = false"
              >Contact</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <main id="top">
    <!-- HERO -->
    <section
      :class="[
        wrap,
        'grid items-center gap-12 pt-28 pb-20 md:min-h-svh md:grid-cols-[1fr_1.15fr] md:gap-12 md:pt-32 lg:gap-16',
      ]"
    >
      <div>
        <p class="mb-8 flex items-center gap-2 font-mono text-sm text-muted">
          <span class="size-2 rounded-full bg-flame" aria-hidden="true"></span> Open to internships
        </p>
        <h1 class="flex flex-col gap-4">
          <span class="font-mono text-sm font-normal text-brand">Front-end developer · CS student</span>
          <span class="text-[clamp(2.5rem,7vw,4rem)] leading-[1.02] font-medium tracking-[-0.03em]">
            Joe<br />Abednego<span class="text-flame-soft">.</span>
          </span>
        </h1>
        <p class="mt-6 max-w-xl text-lg text-muted">
          Computer Science student at <span class="text-fg">BINUS University</span>. I spent a year at
          <span class="text-fg">Superspring</span> building live websites with Vue, React, TypeScript and
          Tailwind CSS.
        </p>
        <div class="mt-8 flex flex-wrap gap-3 max-[400px]:flex-col">
          <a href="#projects" :class="[btn, 'bg-flame-fill text-fg hover:bg-flame-fill-hover']">
            See my work <span aria-hidden="true">↓</span>
          </a>
          <a href="#about" :class="[btn, 'border border-line text-fg hover:border-brand/50 hover:bg-fg/5']">
            About me
          </a>
        </div>
      </div>

      <div class="relative pb-10 pl-6 sm:pb-12 sm:pl-12">
        <a
          :href="featured.live.href"
          target="_blank"
          rel="noopener"
          class="block rounded-xl"
          :aria-label="`${featured.title}, live at ${featured.url}`"
        >
          <SiteFrame
            :image="featured.image!"
            :url="featured.url!"
            :alt="`Screenshot of ${featured.title}`"
            eager
          />
        </a>
        <figure
          class="absolute bottom-0 left-0 m-0 w-[34%] max-w-48 overflow-hidden rounded-2xl border-4 border-ink shadow-[0_16px_32px_-12px_rgb(0_0_0/0.6)]"
        >
          <img
            :src="joePhoto"
            alt="Portrait of Joe Abednego"
            class="block aspect-4/5 w-full object-cover object-top"
          />
        </figure>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" :class="[wrap, section]">
      <p v-reveal :class="label">01 / About</p>
      <div class="grid items-start gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <h2 v-reveal :class="h2">Building interactive, user-friendly web experiences</h2>
        <div v-reveal="60" class="grid gap-4 text-muted">
          <p>
            Hi! I'm Joe, a third-year Computer Science student at BINUS University who loves building
            interactive and user-friendly web experiences. Vue is my main framework, and I've also built with React while
            exploring modern front-end development practices.
          </p>
          <p>
            I'm looking for internship opportunities where I can grow through hands-on experience and
            contribute to meaningful projects. Outside of coding, I enjoy traveling and keeping a
            healthy lifestyle through the gym.
          </p>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience" :class="[wrap, section]">
      <p v-reveal :class="label">02 / Experience</p>
      <div class="grid items-start gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16">
        <div v-reveal class="md:sticky md:top-28">
          <h2 :class="h2">
            {{ internship.role }}
            <span class="text-brand">at {{ internship.company }}</span>
          </h2>
          <p class="mt-4 font-mono text-sm text-muted">
            {{ internship.department }}<br />{{ internship.duration }}
          </p>
          <p class="mt-6 text-muted">{{ internship.summary }}</p>
        </div>

        <ol class="m-0 list-none border-t border-line-soft p-0">
          <li
            v-for="(h, i) in internship.highlights"
            :key="h.title"
            v-reveal="i * 60"
            class="group relative grid gap-4 border-b border-line-soft py-8 sm:grid-cols-[3rem_1fr]"
          >
            <span
              class="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-flame transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              aria-hidden="true"
            ></span>
            <span class="font-mono text-sm text-muted tabular-nums transition-colors group-hover:text-flame-soft sm:pt-1.5">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <div>
              <h3 class="text-xl leading-snug font-medium">{{ h.title }}</h3>
              <ul class="m-0 mt-4 grid list-none gap-2 p-0 text-muted">
                <li v-for="pt in h.points" :key="pt" class="flex gap-3">
                  <span class="mt-2.5 size-1 shrink-0 rounded-full bg-muted" aria-hidden="true"></span>
                  <span>{{ pt }}</span>
                </li>
              </ul>
              <template v-if="h.note && h.link">
                <p class="mt-6 text-muted">{{ h.note }}</p>
                <a :href="h.link.href" target="_blank" rel="noopener noreferrer" :class="[textLink, 'mt-2']">
                  {{ h.link.label }} <span aria-hidden="true">↗</span>
                </a>
              </template>
            </div>
          </li>
        </ol>
      </div>

      <div v-reveal class="mt-20 md:mt-24">
        <h3 :class="label">Technical skills</h3>
        <dl class="m-0 border-t border-line-soft">
          <div
            v-for="g in skillGroups"
            :key="g.label"
            class="grid gap-3 border-b border-line-soft py-4 sm:grid-cols-[12rem_1fr] sm:items-center"
          >
            <dt class="text-muted">{{ g.label }}</dt>
            <dd class="m-0 flex flex-wrap gap-2">
              <span
                v-for="s in g.items"
                :key="s"
                class="rounded-md border border-line-soft bg-fg/4 px-2.5 py-1 font-mono text-xs text-fg"
                >{{ s }}</span
              >
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" :class="[wrap, section]">
      <p v-reveal :class="label">03 / Projects</p>
      <div v-reveal class="mb-12 grid gap-4 md:mb-16 md:grid-cols-[1fr_1.1fr] md:items-end md:gap-16">
        <h2 :class="h2">Selected work</h2>
        <p class="text-muted">
          Live websites I built and improved during my internship at Superspring. Each one is in
          production today, so you can open it and click around.
        </p>
      </div>

      <ol class="m-0 grid list-none gap-20 p-0 md:gap-24">
        <li
          v-for="(p, i) in projects"
          :key="p.title"
          v-reveal
          class="group/row grid items-center gap-8 md:grid-cols-12 md:gap-12"
        >
          <a
            v-if="p.image"
            :href="p.live.href"
            target="_blank"
            rel="noopener"
            tabindex="-1"
            aria-hidden="true"
            class="group block md:col-span-7"
          >
            <SiteFrame
              v-if="p.frame !== 'phone'"
              :image="p.image"
              :url="p.url ?? p.live.href"
              :alt="`Screenshot of ${p.title}`"
              class="transition-[border-color] duration-150 group-hover:border-brand/40"
            />
            <div
              v-else
              class="relative aspect-16/10 overflow-hidden rounded-xl border border-line-soft bg-raise/60 transition-[border-color] duration-150 group-hover:border-brand/40"
            >
              <SiteFrame
                :image="p.image"
                :url="p.url ?? p.live.href"
                :alt="`Screenshot of ${p.title}`"
                frame="phone"
                class="absolute top-[7%] left-1/2 h-[86%] -translate-x-1/2"
              />
            </div>
          </a>

          <div class="md:col-span-5">
            <p class="font-mono text-sm text-brand tabular-nums">
              <span class="transition-colors group-hover/row:text-flame-soft">{{
                String(i + 1).padStart(2, '0')
              }}</span><template v-if="p.context"> · {{ p.context }}</template>
            </p>
            <h3 class="mt-3 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-medium">{{ p.title }}</h3>
            <p class="mt-4 text-muted">{{ p.summary }}</p>
            <ul class="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
              <li
                v-for="t in p.tags"
                :key="t"
                class="rounded-md border border-line-soft bg-fg/4 px-2.5 py-1 font-mono text-xs text-fg"
              >
                {{ t }}
              </li>
            </ul>
            <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a :href="p.live.href" target="_blank" rel="noopener" :class="textLink">
                {{ p.live.label }} <span aria-hidden="true">↗</span>
              </a>
              <a
                v-if="p.repo"
                :href="p.repo.href"
                target="_blank"
                rel="noopener"
                class="text-muted no-underline transition-colors hover:text-fg"
              >
                {{ p.repo.label }}
              </a>
            </div>
          </div>
        </li>
      </ol>
    </section>
  </main>

  <!-- CONTACT -->
  <footer id="contact" class="border-t border-line-soft pt-20 pb-8 md:pt-28">
    <div :class="wrap">
      <div class="grid items-start gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div v-reveal>
          <p :class="label">04 / Contact</p>
          <h2 class="text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] font-medium tracking-[-0.03em]">
            Let's build something together<span class="text-flame-soft">.</span>
          </h2>
          <p class="mt-6 text-muted">Got an internship, a project, or just want to say hi? Reach out.</p>
        </div>

        <ul v-reveal="60" class="m-0 list-none border-t border-line-soft p-0 md:mt-10">
          <li v-for="c in contacts" :key="c.label" class="border-b border-line-soft">
            <a
              :href="c.href"
              target="_blank"
              rel="noopener"
              class="group flex items-center gap-4 py-5 text-fg no-underline transition-colors hover:text-brand"
            >
              <i :class="['fa-brands', c.icon, 'w-5 text-center text-lg text-muted transition-colors group-hover:text-brand']" aria-hidden="true"></i>
              <span class="font-medium">{{ c.label }}</span>
              <span class="ml-auto truncate font-mono text-sm text-muted">{{ c.handle }}</span>
              <span class="text-muted transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-20 flex items-center justify-between gap-4 border-t border-line-soft pt-6 font-mono text-xs text-muted md:mt-28">
        <p>© {{ year }} Joe Abednego</p>
        <a href="#top" class="text-muted no-underline transition-colors hover:text-fg">Back to top ↑</a>
      </div>
    </div>
  </footer>
</template>
