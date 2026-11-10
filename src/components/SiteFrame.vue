<script setup lang="ts">
// A screenshot of a live site, framed as a browser window (desktop sites)
// or a phone (mobile-first pages). Size the phone from the parent via class.
withDefaults(
  defineProps<{
    image: string
    url: string
    alt: string
    frame?: 'browser' | 'phone'
    eager?: boolean
  }>(),
  { frame: 'browser', eager: false },
)
</script>

<template>
  <div
    v-if="frame === 'browser'"
    class="overflow-hidden rounded-xl border border-line-soft bg-raise shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)]"
  >
    <div class="flex h-9 items-center gap-3 border-b border-line-soft px-3" aria-hidden="true">
      <span class="flex w-10.5 shrink-0 gap-1.5">
        <span class="size-2.5 rounded-full bg-fg/15"></span>
        <span class="size-2.5 rounded-full bg-fg/15"></span>
        <span class="size-2.5 rounded-full bg-fg/15"></span>
      </span>
      <span
        class="mx-auto flex h-6 min-w-0 max-w-[70%] flex-1 items-center justify-center rounded-md bg-ink/60 px-3 font-mono text-xs text-brand"
      >
        <span class="truncate">{{ url }}</span>
      </span>
      <span class="w-10.5 shrink-0"></span>
    </div>
    <img
      :src="image"
      :alt="alt"
      width="1440"
      height="900"
      :loading="eager ? 'eager' : 'lazy'"
      class="block aspect-16/10 w-full object-cover object-top"
    />
  </div>

  <div
    v-else
    class="aspect-5/9 rounded-[28px] border border-line-soft bg-raise p-2 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)]"
  >
    <div class="size-full overflow-hidden rounded-[20px]">
      <img
        :src="image"
        :alt="alt"
        width="500"
        height="900"
        :loading="eager ? 'eager' : 'lazy'"
        class="block size-full object-cover object-top"
      />
    </div>
  </div>
</template>
