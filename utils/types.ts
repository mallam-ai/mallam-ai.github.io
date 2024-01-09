export interface Team {
  id: string;
  displayName: string;
  createdBy: string;
  createdAt: string;
  membershipId: string;
  membershipRole: string;
  membershipCreatedAt: string;
}

export interface User {
  id: string;
  vendor: string;
  vendorUserId: string;
  displayName: string;
  createdAt: string;
}

export function emptyUser(): User {
  return {
    id: "",
    vendor: "",
    vendorUserId: "",
    displayName: "",
    createdAt: "",
  };
}

export function createUserAvatarURL(
  user:
    | {
        vendor: string;
        vendorUserId: string;
      }
    | undefined
): string {
  if (user && user.vendor == "github" && user.vendorUserId) {
    return `https://avatars.githubusercontent.com/u/${user.vendorUserId}?v=4`;
  }
  return "https://avatars.githubusercontent.com/u/51222892?v=4";
}
