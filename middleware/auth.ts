export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: user } = await useUser();

  if (!user.value.id) {
    return navigateTo({ name: "index" });
  }
});
