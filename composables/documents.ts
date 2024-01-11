export const useDocument = (id: string) => {
  return useAsyncData(
    `document-${id}`,
    () =>
      $fetch("/api/documents/get", {
        query: {
          documentId: id,
        },
        headers: decorateHeaders(),
      }),
    {
      default() {
        return emptyDocument();
      },
    }
  );
};
