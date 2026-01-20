<template>
  <div>
    <p>Logging out...</p>
  </div>
</template>

<script setup>
// This will run when the component is mounted
onMounted(async () => {
  try {
    const supabase = useSupabaseClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }

    // Clear any authentication tokens or user data
    const token = useCookie('auth_token')
    token.value = null
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigateTo('/auth/login')
    }, 1000)
  } catch (error) {
    console.error('Error during logout:', error)
    navigateTo('/')
  }
})
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
}
</style>
