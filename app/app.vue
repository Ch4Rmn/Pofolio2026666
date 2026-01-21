<template>
  <UApp>
    <NuxtLoadingIndicator color="#348feb" :height="5" />
    <div class="p-4">
      <UButton @click="showNotification">
        Test Nuxt UI Button
      </UButton>
      
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
    
    <UNotifications />
  </UApp>
</template>

<script setup>
const toast = useToast()

function showNotification() {
  toast.add({
    title: 'Success!',
    description: 'Nuxt UI is working!',
    icon: 'i-heroicons-check-circle',
    timeout: 3000
  })
}
</script>
