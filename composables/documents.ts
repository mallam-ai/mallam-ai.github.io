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

export const useCurrentDocument = () => {
  const documentId = useRoute().params.document_id as string;
  return useDocument(documentId);
};
