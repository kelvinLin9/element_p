<template>
  <component :is="currentLayout" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Layout 組件映射 - 使用動態導入
const layoutComponents = {
  'sidebar': defineAsyncComponent(() => import('./SidebarLayout.vue')),
  'card': defineAsyncComponent(() => import('./CardLayout.vue'))
}

// 根據路由 meta 中的 layout 屬性動態選擇 layout
const currentLayout = computed(() => {
  const layoutName = route.meta?.layout as string || 'sidebar'
  return layoutComponents[layoutName as keyof typeof layoutComponents] || layoutComponents.sidebar
})
</script>
