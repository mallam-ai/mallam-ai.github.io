export const computedTitleLabel = () => {
  return computed((): string => {
    const route = useRoute();
    return (route.meta.titleLabel as string) || "noname";
  });
};

export const computedTitleIcon = () => {
  return computed((): string => {
    const route = useRoute();
    return (route.meta.titleIcon as string) || "i-heroicons-home";
  });
};
