<script setup lang="ts">
const { site } = useAppConfig()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  titleTemplate: title => title && title !== site.name ? `${title} · ${site.name}` : site.name
})

useSeoMeta({
  description: site.description,
  ogTitle: site.name,
  ogDescription: site.description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader :title="site.name">
      <template #title>
        <AppLogo class="w-auto h-6 shrink-0" />
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} {{ site.name }}
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
