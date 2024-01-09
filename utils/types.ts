export type User = {
  id: string;
  vendor: string;
  vendorUserId: string;
  displayName: string;
  createdAt: string;
};

export function emptyUser(): User {
  return {
    id: "",
    vendor: "",
    vendorUserId: "",
    displayName: "",
    createdAt: "",
  };
}
