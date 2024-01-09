export default defineNuxtRouteMiddleware(async (to, from) => {
  const app = useNuxtApp();

  const { data: user } = await useUser();

  if (user.value && !user.value.id) {
    app.runWithContext(() => {
      navigateTo({ name: "index" });
    });
  }
});
