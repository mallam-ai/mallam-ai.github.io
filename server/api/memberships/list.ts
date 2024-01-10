import { retrieveSessionUser } from "~/server/utils/user";

export default defineEventHandler(
  async (
    event
  ): Promise<
    Array<{
      id: string;
      teamId: string;
      userId: string;
      role: "admin" | "member" | "viewer";
      createdAt: string;
      userVendor: string;
      userVendorUserId: string;
      userDisplayName: string;
      userCreatedAt: string;
    }>
  > => {
    const user = await retrieveSessionUser(event);
    if (!user.id) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }

    const { teamId } = getQuery(event);

    const { memberships } = await invokeBackend(event, "membership_list", {
      teamId,
      userId: user.id,
    });

    return memberships;
  }
);
