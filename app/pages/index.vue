
<style scoped>

</style>
<template>
  <div>
     <div>
    <h1 class="text-4xl font-black">index</h1>
    <template v-if="user">
      <h1 class="text-4xl font-black">{{ user.email }}</h1>
      <!-- <h1 class="text-4xl font-black">{{ user.id }}</h1> -->
    </template>
    <p v-else>Loading user data...</p>
    <!-- ကျန်တဲ့ code များ -->
  </div>
    <hr>
    <button @click="counter++">+</button>
    <button @click="counter--">-</button>
    <hr>
    <br>
    <p>{{ counter }}</p>
    <br>
    <p v-if="pending">loading</p>
    <p v-if="error">{{error.message}}</p>
    <ul v-else class="list-disc list-inside p-3">
      <li v-for="d in data?.data" :key="d">{{ d }}</li>
    </ul>
    <NuxtLink href="about">About</NuxtLink>
    <NuxtLink to="/auth/logout">Logout</NuxtLink>

    
    
  </div>
</template>


<script lang="ts" setup async>

definePageMeta({
  middleware: 'auth',
    requiresAuth: true,
})

// const { data: { user } } = await useSupabaseUser()
const user = await useSupabaseUser()



// const { error } = await user.value?.signOut()



// console.log('User data:', {
//   id: user.value?.id,
//   email: user.value?.email,
//   // Add other user properties you need
// })

const counter = useState<number>('count', () => 0)
const { data, pending, error, refresh } = await useFetch('/api/hello', {
  key: 'database'
})

  useHead({
  title: 'linhtutkyaw',
  meta: [
    { name: 'description', content: 'My amazing site.' },
    { name: 'name', content: 'My amazing site.' },
  ],

  
  // bodyAttrs: {
  //   class: 'test',
  // },
  // script: [{ innerHTML: 'console.log(\'Hello world\')' }],
})

</script>
