export function toastError(toast: ReturnType<typeof useToast>, e: any) {
  toast.add({
    icon: "i-heroicons-x-circle",
    title: "Error",
    color: "red",
    description: `${e}`,
  });
}
