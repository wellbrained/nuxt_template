<script setup lang="ts">
const { site } = useAppConfig()
</script>

<template>
  <UPageHero
    :title="site.name"
    :description="site.description"
    :links="[{
      label: 'Nuxt UI docs',
      to: 'https://ui.nuxt.com/docs/components',
      target: '_blank',
      trailingIcon: 'i-lucide-arrow-right',
      size: 'xl'
    }]"
  />
</template>
