<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <br>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="rememberMe"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <div>
            <button
              type="button"
              @click="loginMethod = 'magicLink'"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 mb-4"
            >
              <span v-if="!loading || loginMethod !== 'magicLink'">Send magic link</span>
              <span v-else>Sending magic link...</span>
            </button>
            <button
              type="submit"
              @click="loginMethod = 'password'"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <span v-if="!loading || loginMethod !== 'password'">Sign in</span>
              <span v-else>Signing in...</span>
            </button>
        </div>
      </form>
      <div class="text-center text-sm">
        <p class="text-gray-600">
          Don't have an account?
          <NuxtLink to="/auth/register" class="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>


const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const error = ref('')
const loading = ref(false)
const loginMethod = ref('password') // 'password' or 'magicLink'

// Check if user is already logged in
const { data: { user } } = await supabase.auth.getUser()
if (user) {
  navigateTo('/')
}

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    if (loginMethod.value === 'password') {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })

      if (signInError) throw signInError
      // Redirect to home after successful login
      navigateTo('/')
    } else if (loginMethod.value === 'magicLink') {
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
          emailRedirectTo: 'http://localhost:3001/auth/confirm',
        }
      })

      if (magicLinkError) throw magicLinkError
      navigateTo('https://mail.google.com/mail/u/0/#inbox', { external: true })
    }
  } catch (err) {
    error.value = err.message || 'An error occurred during authentication'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
