<script lang="ts" setup> // 'async' ကို ဖြုတ်လိုက်ပါ (Nuxt က အလိုလိုသိပါတယ်)

// ၁။ Middleware
definePageMeta({
  middleware: 'auth'
})

// ၂။ User Data ယူခြင်း (await ဖြုတ်လိုက်ပါ)
// useSupabaseUser() က ref() တစ်ခုပြန်ပေးတာမို့ await မလိုပါဘူး
const user = useSupabaseUser()

const counter = useState<number>('count', () => 0)

// ၃။ API Call (lazy: true ထည့်ပါ)
// ဒါမှ API စောင့်နေတုန်း Page က ချက်ချင်းပွင့်မှာပါ
const { data, pending, error, refresh } = await useFetch('/api/hello', {
  key: 'database',
  lazy: true // <--- Delay မဖြစ်အောင် ဒါလေး မဖြစ်မနေထည့်ပါ
})

useHead({
  title: 'linhtutkyaw',
  meta: [
    { name: 'description', content: 'My amazing site.' },
    { name: 'name', content: 'My amazing site.' },
  ],
})

</script>

<template>
  <div>
    <div>
      <h1 class="text-4xl font-black">index</h1>
      
      <template v-if="user">
        <h1 class="text-xl font-bold text-green-600">{{ user.email }}</h1>
      </template>
      <p v-else>Loading user data...</p>
    </div>

    <hr class="my-4">
    
    <div class="flex gap-4 my-2">
      <button class="border px-4 py-1 bg-gray-200 rounded" @click="counter++">+</button>
      <button class="border px-4 py-1 bg-gray-200 rounded" @click="counter--">-</button>
    </div>

    <p class="text-2xl font-bold">{{ counter }}</p>
    
    <hr class="my-4">

    <div v-if="pending" class="text-blue-500">
      Loading data from API...
    </div>
    
    <div v-else-if="error" class="text-red-500">
      {{ error.message }}
    </div>
    
    <ul v-else class="list-disc list-inside p-3">
      <li v-for="d in data?.data" :key="d">{{ d }}</li>
    </ul>

    <div class="flex gap-4 mt-5 text-blue-600 underline">
      <NuxtLink href="about">About</NuxtLink>
      <NuxtLink to="/auth/logout">Logout</NuxtLink>
    </div>
  </div>
</template>