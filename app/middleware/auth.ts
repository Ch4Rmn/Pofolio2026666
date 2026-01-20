export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  // console.log('user is'+ user.value)
  if (user.value && (to.path === '/auth/login' || to.path === '/auth/register')) {
    return navigateTo('/')
  }
  if (!user.value && to.meta.requiresAuth) {
    return navigateTo('/auth/login')
  }
})
