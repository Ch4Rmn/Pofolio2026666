<template>
  <div>
    <h1>about page</h1>
    <NuxtLink href="/">Home</NuxtLink>
    {{ counter }}

   


  </div>
</template>

<script setup lang="ts">
  const counter = useState<number>('count', () => 0)
</script>

<style>

</style>