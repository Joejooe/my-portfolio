<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Directive } from 'vue'
import { internship, links, projects, skillGroups } from './data'
import joePhoto from './assets/images/joe.jpeg'

const scrolled = ref(false)
const openCard = ref<number | null>(null)
const menuOpen = ref(false)
const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
]

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
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  desktop.removeEventListener('change', onBreakpoint)
})

const hidden = ['opacity-0', 'translate-y-6']
const motion = ['transition-all', 'duration-700', 'ease-out', 'motion-reduce:transition-none']
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
        }, 900 + (value ?? 0))
      },
      { threshold: 0.15 },
    )
    io.observe(el)
  },
}

const wrap = 'mx-auto w-full max-w-280 px-5 sm:px-6'
const eyebrow = 'mb-5 font-mono text-sm uppercase tracking-widest text-flame-soft'
const socialIcon = 'text-xl text-brand transition-colors group-hover:text-flame-soft'
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 -z-10 bg-size-[72px_72px] bg-[linear-gradient(var(--color-line-soft)_1px,transparent_1px),linear-gradient(90deg,var(--color-line-soft)_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_75%)]"
    aria-hidden="true"
  ></div>

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
        class="flex items-end gap-0.5 text-3xl leading-none font-bold text-brand no-underline"
        aria-label="Joe Abednego - home"
      >
        <span>J</span><span class="mb-1 size-1.75 rounded-full bg-flame"></span>
      </a>
      <nav aria-label="Primary" class="max-sm:hidden">
        <ul class="m-0 flex list-none items-center gap-8 p-0 text-sm">
          <li v-for="n in navItems" :key="n.href">
            <a :href="n.href" class="text-muted no-underline transition-colors hover:text-fg">{{ n.label }}</a>
          </li>
          <li>
            <a
              href="#contact"
              class="rounded-full border border-brand px-4.5 py-2 text-brand no-underline transition-colors hover:bg-brand hover:text-ink"
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
            class="absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300"
            :class="menuOpen ? 'top-1.5 rotate-45' : 'top-0'"
          ></span>
          <span
            class="absolute top-1.5 left-0 h-0.5 w-full rounded-full bg-current transition-opacity duration-300"
            :class="menuOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300"
            :class="menuOpen ? 'top-1.5 -rotate-45' : 'top-3'"
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
              class="block border-b border-line-soft py-3.5 text-lg text-fg no-underline"
              @click="menuOpen = false"
              >{{ n.label }}</a
            >
          </li>
          <li class="pt-4">
            <a
              href="#contact"
              class="block rounded-full bg-brand py-3 text-center font-semibold text-ink no-underline"
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
        'relative grid min-h-svh items-center gap-10 pt-24 pb-16 md:grid-cols-[1.35fr_1fr] md:gap-12 md:pt-28',
      ]"
    >
      <div
        class="absolute top-1/2 right-[-40%] -z-10 size-120 -translate-y-1/2 animate-drift rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand)_35%,transparent),transparent_65%)] blur-3xl md:right-[-10%] md:size-160"
        aria-hidden="true"
      ></div>

      <div>
        <p
          class="mb-7 inline-flex items-center gap-2.5 rounded-full border border-flame/35 bg-flame/7 px-3.5 py-1.5 font-mono text-xs tracking-wider text-flame-soft uppercase"
        >
          <span class="size-2 animate-pulse-ring rounded-full bg-flame"></span> Open to internships
        </p>
        <h1 class="flex flex-col gap-2.5">
          <span class="font-mono text-base font-normal text-brand">Hello, my name is</span>
          <span class="text-[clamp(2.75rem,12vw,7rem)] leading-[0.95] font-bold tracking-tighter">
            Joe<br />Abednego<span class="text-flame-soft">.</span>
          </span>
        </h1>
        <p class="mt-7 max-w-136 text-lg text-muted">
          Computer Science student at <strong class="font-medium text-fg">BINUS University</strong>,
          learning web development and passionate about building responsive, accessible websites -
          one personal project at a time.
        </p>
        <div class="mt-9 flex flex-wrap gap-3.5 max-[400px]:flex-col">
          <a
            href="#projects"
            class="inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-6.5 py-3.5 text-[0.95rem] font-semibold text-ink no-underline transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_color-mix(in_srgb,var(--color-brand)_70%,transparent)]"
          >
            See my work <span aria-hidden="true">↓</span>
          </a>
          <a
            href="#about"
            class="inline-flex items-center justify-center gap-2.5 rounded-full border border-line px-6.5 py-3.5 text-[0.95rem] font-semibold text-fg no-underline transition-colors hover:border-flame hover:text-flame-soft"
          >
            About me
          </a>
        </div>
      </div>

      <div class="relative w-[min(72%,280px)] max-md:order-first max-md:mx-auto md:w-[min(100%,360px)] md:justify-self-center">
        <div
          class="aspect-4/5 overflow-hidden rounded-[28px] border border-line bg-linear-to-br from-deep to-raise shadow-[18px_18px_0_-2px_color-mix(in_srgb,var(--color-brand)_16%,transparent),0_30px_80px_-30px_color-mix(in_srgb,var(--color-brand)_50%,transparent)]"
        >
          <img
            :src="joePhoto"
            alt="Portrait of Joe Abednego"
            class="block size-full object-cover object-top"
          />
        </div>
        <span
          class="absolute top-6 -left-2 rounded-full border border-line bg-ink/90 px-3.5 py-1.5 font-mono text-xs whitespace-nowrap text-brand backdrop-blur-sm sm:-left-6"
          >3rd year · CS</span
        >
        <span
          class="absolute -right-2 bottom-8 rounded-full border border-flame/40 bg-ink/90 px-3.5 py-1.5 font-mono text-xs whitespace-nowrap text-flame-soft backdrop-blur-sm sm:-right-5"
          >Vue ✦ Front-end</span
        >
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" :class="[wrap, 'py-16 md:py-24']">
      <p v-reveal :class="eyebrow">01 / About</p>
      <div class="grid items-start gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <h2 v-reveal class="text-[clamp(1.9rem,4vw,3rem)] leading-[1.12] font-semibold tracking-tight">
          Building interactive, user-friendly web experiences.
        </h2>
        <div v-reveal="120" class="grid gap-4.5 text-muted">
          <p>
            Hi! I'm Joe, a third-year Computer Science student at BINUS University who loves
            building interactive and user-friendly web experiences. Vue is my main framework, and I'm also learning React
            and exploring modern front-end development practices.
          </p>
          <p>
            I'm looking for internship opportunities where I can grow through hands-on experience
            and contribute to meaningful projects. Outside of coding, I enjoy traveling and keeping
            a healthy lifestyle through the gym.
          </p>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience" :class="[wrap, 'py-16 md:py-24']">
      <p v-reveal :class="eyebrow">02 / Experience</p>
      <div v-reveal class="mb-8 flex flex-wrap items-end md:mb-12 justify-between gap-x-8 gap-y-3">
        <h2 class="text-[clamp(1.9rem,4vw,3rem)] leading-[1.12] font-semibold tracking-tight">
          {{ internship.role }}
          <span class="text-brand">@{{ internship.company }}</span>
        </h2>
        <p class="font-mono text-sm text-muted">
          {{ internship.department }} <span class="text-flame-soft">/</span> <span class="whitespace-nowrap">{{ internship.duration }}</span>
        </p>
      </div>
      <p v-reveal class="max-w-180 text-lg text-muted">{{ internship.summary }}</p>

      <div class="mt-10 grid items-start gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
        <article
          v-for="(h, i) in internship.highlights"
          :key="h.title"
          v-reveal="i * 80"
          class="group relative overflow-hidden rounded-2xl border bg-raise/60 transition-colors duration-300 hover:border-flame/50"
          :class="[i === 0 ? 'md:col-span-2' : '', openCard === i ? 'border-flame/50' : 'border-line']"
        >
          <span
            class="absolute inset-y-0 left-0 w-0.75 origin-top bg-flame transition-transform duration-300 group-hover:scale-y-100"
            :class="openCard === i ? 'scale-y-100' : 'scale-y-0'"
            aria-hidden="true"
          ></span>

          <div v-if="i === 0" class="p-5 sm:p-7 md:p-9">
            <span class="font-mono text-sm text-flame-soft">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 mb-6 text-2xl leading-snug font-semibold tracking-tight md:text-3xl">
              {{ h.title }}
            </h3>
            <ul class="m-0 grid list-none gap-3 p-0 text-[0.95rem] text-muted md:grid-cols-2 md:gap-x-10">
              <li v-for="pt in h.points" :key="pt" class="flex gap-3">
                <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
                <span>{{ pt }}</span>
              </li>
            </ul>
            <p v-if="h.note" class="mt-6 mb-0 text-[0.95rem] text-muted">{{ h.note }}</p>
            <a
              v-if="h.link"
              :href="h.link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex items-center gap-2 font-medium text-flame-soft no-underline hover:underline"
            >
              {{ h.link.label }} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <template v-else>
            <button
              type="button"
              class="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
              :aria-expanded="openCard === i"
              :aria-controls="`exp-panel-${i}`"
              @click="openCard = openCard === i ? null : i"
            >
              <span class="font-mono text-sm text-flame-soft">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="m-0 flex-1 text-xl leading-snug font-semibold tracking-tight">{{ h.title }}</h3>
              <span
                class="text-xl text-brand transition-transform duration-300"
                :class="openCard === i ? 'rotate-180' : ''"
                aria-hidden="true"
                >⌄</span
              >
            </button>
            <div
              :id="`exp-panel-${i}`"
              class="grid transition-[grid-template-rows] duration-300 ease-out"
              :class="openCard === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden">
                <ul class="m-0 grid list-none gap-3 px-5 pt-1 pb-6 sm:px-7 sm:pb-7 text-[0.95rem] text-muted">
                  <li v-for="pt in h.points" :key="pt" class="flex gap-3">
                    <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
                    <span>{{ pt }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </article>
      </div>

      <div v-reveal class="mt-12 md:mt-16">
        <h3 class="mb-6 font-mono text-sm tracking-widest text-flame-soft uppercase">Technical skills</h3>
        <dl class="m-0 grid gap-x-10 gap-y-5 md:grid-cols-2">
          <div
            v-for="g in skillGroups"
            :key="g.label"
            class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line-soft pb-5"
          >
            <dt class="w-28 shrink-0 pt-1.5 text-sm text-muted">{{ g.label }}</dt>
            <dd class="m-0 flex min-w-0 flex-1 flex-wrap gap-2">
              <span
                v-for="s in g.items"
                :key="s"
                class="rounded-md border border-line bg-brand/6 px-3 py-1.5 font-mono text-xs text-brand"
                >{{ s }}</span
              >
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" :class="[wrap, 'py-16 md:py-24']">
      <p v-reveal :class="eyebrow">03 / Projects</p>
      <h2
        v-reveal
        class="mb-8 text-[clamp(1.9rem,4vw,3rem)] md:mb-12 leading-[1.12] font-semibold tracking-tight"
      >
        Selected work
      </h2>

      <ol class="m-0 list-none border-t border-line-soft p-0">
        <li v-for="(p, i) in projects" :key="p.title" v-reveal="i * 80" class="border-b border-line-soft">
          <div
            class="group relative grid gap-x-8 gap-y-4 px-1 py-8 md:gap-y-6 md:py-10 transition-[background-color,padding] duration-300 hover:bg-linear-to-r hover:from-brand/8 hover:to-transparent hover:to-70% hover:pl-3 md:grid-cols-[4rem_1fr_auto] md:px-4 md:hover:pl-7"
          >
            <span
              class="absolute inset-y-0 left-0 w-0.75 origin-top scale-y-0 bg-flame transition-transform duration-300 group-hover:scale-y-100"
              aria-hidden="true"
            ></span>
            <span class="font-mono md:pt-2 text-[0.95rem] text-brand">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <div>
              <h3 class="mb-3 text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-tight">
                {{ p.title }}
              </h3>
              <p class="max-w-160 text-base text-muted">{{ p.summary }}</p>
              <ul class="mt-5 flex list-none flex-wrap gap-2 p-0">
                <li
                  v-for="t in p.tags"
                  :key="t"
                  class="rounded-full bg-fg/6 px-3 py-1 font-mono text-xs text-fg"
                >
                  {{ t }}
                </li>
              </ul>
            </div>
            <div class="flex flex-row flex-wrap items-center gap-6 pt-1.5 text-[0.95rem] md:flex-col md:items-end md:gap-3">
              <a
                :href="p.live.href"
                target="_blank"
                rel="noopener"
                class="border-b border-current pb-0.5 font-semibold text-brand no-underline transition-colors hover:text-flame-soft"
              >
                {{ p.live.label }} <span aria-hidden="true">↗</span>
              </a>
              <a
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
  <footer
    id="contact"
    class="relative border-t border-line bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,color-mix(in_srgb,var(--color-brand)_28%,transparent),transparent_70%)] pt-20 pb-10 text-center md:pt-28"
  >
    <div :class="wrap">
      <p v-reveal :class="eyebrow">04 / Contact</p>
      <h2 v-reveal class="text-[clamp(2.4rem,7vw,5rem)] leading-[1.12] font-semibold tracking-tighter">
        Let's build something <span class="text-flame-soft">together.</span>
      </h2>
      <p v-reveal="80" class="mt-5 text-muted">
        Got an internship, a project, or just want to say hi? Reach out.
      </p>

      <div v-reveal="160" class="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
        <a
          v-for="s in [
            { href: links.whatsapp, icon: 'fa-whatsapp', label: 'WhatsApp' },
            { href: links.github, icon: 'fa-github', label: 'GitHub' },
            { href: links.linkedin, icon: 'fa-linkedin', label: 'LinkedIn' },
          ]"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener"
          class="group inline-flex items-center gap-3 rounded-full border border-line bg-brand/5 px-6 py-3.5 font-medium no-underline transition hover:-translate-y-0.75 hover:border-flame hover:bg-flame/10"
        >
          <i :class="['fa-brands', s.icon, socialIcon]" aria-hidden="true"></i>
          <span>{{ s.label }}</span>
        </a>
      </div>

      <p class="mt-16 font-mono md:mt-24 text-xs text-muted">© {{ year }} Joe Abednego</p>
    </div>
  </footer>
</template>
