<template>
  <div>
    <NuxtLink href="/">back</NuxtLink>
    <br>
    {{ profileId }}
  </div>
</template>

<script setup>
    const profileId = useRoute().params.profileId

</script>

<style scoped>

</style>