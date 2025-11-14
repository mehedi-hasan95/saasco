"use server";

import { db } from "@/lib/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Agency, User } from "../../generated/prisma";
import z from "zod";
import { agencyFormSchema } from "@/schema/forms-schema";

export const getCurrentUserDetails = async () => {
  const user = await currentUser();
  if (!user) return;

  const userDetails = await db.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress },
    include: {
      Agency: {
        include: {
          SidebarOption: true,
          SubAccount: {
            include: { SidebarOption: true },
          },
        },
      },
      Permissions: true,
    },
  });

  return userDetails;
};

export const createTeamUser = async (agencyId: string, user: User) => {
  if (user.role === "AGENCY_OWNER") {
    return null;
  }
  const response = await db.user.create({ data: { ...user } });
  return response;
};

export const saveActivityLogsNotification = async ({
  agencyId,
  description,
  subaccountId,
}: {
  agencyId?: string;
  description: string;
  subaccountId?: string;
}) => {
  const authUser = await currentUser();
  let userData;
  if (!authUser) {
    const response = await db.user.findFirst({
      where: {
        Agency: { SubAccount: { some: { id: subaccountId } } },
      },
    });
    if (response) {
      userData = response;
    }
  } else {
    userData = await db.user.findUnique({
      where: { email: authUser.emailAddresses[0].emailAddress },
    });
  }
  if (!userData) {
    return;
  }

  let foundAgencyId = agencyId;
  if (!foundAgencyId) {
    if (!subaccountId) {
      throw new Error(
        "You need to provide atlist an agencyId or subAccount ID"
      );
    }
  }
  const response = await db.subAccount.findUnique({
    where: { id: subaccountId },
  });
  if (response) {
    foundAgencyId = response.agencyId;
  }

  if (subaccountId) {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: { id: userData.id },
        },
        Agency: {
          connect: { id: foundAgencyId },
        },
        SubAccount: {
          connect: { id: subaccountId },
        },
      },
    });
  } else {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: { id: userData.id },
        },
        Agency: { connect: { id: foundAgencyId } },
      },
    });
  }
};

export const verifyAndAcceptInvitation = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const invitationExists = await db.invitation.findUnique({
    where: { email: user.emailAddresses[0].emailAddress, status: "PENDING" },
  });

  if (invitationExists) {
    const userDetails = await createTeamUser(invitationExists.agencyId, {
      email: invitationExists.email,
      agencyId: invitationExists.agencyId,
      avatarUrl: user.imageUrl,
      id: user.id,
      name: `${user?.firstName} ${user?.lastName}`,
      role: invitationExists.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await saveActivityLogsNotification({
      agencyId: invitationExists.agencyId,
      description: `Joined`,
      subaccountId: undefined,
    });

    if (userDetails) {
      const userData = await clerkClient();
      await userData.users.updateUserMetadata(user.id, {
        privateMetadata: {
          role: userDetails.role || "SUBACCOUNT_USER",
        },
      });

      await db.invitation.delete({ where: { email: userDetails.email } });
      return userDetails.agencyId;
    } else return null;
  } else {
    const agency = await db.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    });
    return agency ? agency.agencyId : null;
  }
};

export const deleteAgency = async (agencyId: string) => {
  try {
    const user = await currentUser();
    if (!user || !agencyId)
      throw new Error(!user ? "Unauthorize user" : "Agency ID is required");
    await db.agency.delete({ where: { id: agencyId } });
  } catch (error) {
    console.error(error);
    throw new Error("Soemething went wrong:");
  }
};

export const upsertAgency = async (user: Partial<User>, agency: Agency) => {
  try {
    const userDetails = await currentUser();
    if (!userDetails) return;
    await db.user.upsert({
      where: {
        email: userDetails.emailAddresses[0].emailAddress,
      },
      update: { ...user },
      create: {
        name: `${userDetails?.firstName} ${userDetails?.lastName}`,
        avatarUrl: userDetails?.imageUrl as string,
        email: userDetails?.emailAddresses[0].emailAddress as string,
        id: userDetails?.id,
        role: user.role || "SUBACCOUNT_USER",
      },
    });

    const userData = await clerkClient();
    await userData.users.updateUserMetadata(userDetails?.id, {
      privateMetadata: {
        role: user.role || "SUBACCOUNT_USER",
      },
    });

    if (!agency.companyEmail) return null;
    const agencyUpsert = await db.agency.upsert({
      where: {
        id: agency.id,
      },
      create: {
        users: {
          connect: { email: agency.companyEmail },
        },
        ...agency,
        SidebarOption: {
          create: [
            {
              name: "Dashboard",
              icon: "category",
              link: `/agency/${agency.id}`,
            },
            {
              name: "Launchpad",
              icon: "clipboardIcon",
              link: `/agency/${agency.id}/launchpad`,
            },
            {
              name: "Billing",
              icon: "payment",
              link: `/agency/${agency.id}/billing`,
            },
            {
              name: "Settings",
              icon: "settings",
              link: `/agency/${agency.id}/settings`,
            },
            {
              name: "Sub Accounts",
              icon: "person",
              link: `/agency/${agency.id}/all-subaccounts`,
            },
            {
              name: "Team",
              icon: "shield",
              link: `/agency/${agency.id}/team`,
            },
          ],
        },
      },
      update: { ...agency },
    });
    return agencyUpsert;
  } catch (error) {
    console.error(error);
  }
};

export const createAgency = async (
  user: Partial<User>,
  agency: z.infer<typeof agencyFormSchema>,
  customerId: string
) => {
  try {
    const userDetails = await currentUser();
    if (!userDetails) return;
    await db.user.upsert({
      where: {
        email: userDetails.emailAddresses[0].emailAddress,
      },
      update: { ...user },
      create: {
        name: `${userDetails?.firstName} ${userDetails?.lastName}`,
        avatarUrl: userDetails?.imageUrl as string,
        email: userDetails?.emailAddresses[0].emailAddress as string,
        id: userDetails?.id,
        role: user.role || "SUBACCOUNT_USER",
      },
    });

    const userData = await clerkClient();
    await userData.users.updateUserMetadata(userDetails?.id, {
      privateMetadata: {
        role: user.role || "SUBACCOUNT_USER",
      },
    });

    if (!agency.companyEmail) return null;
    const data = await db.agency.create({
      data: {
        users: { connect: { email: agency.companyEmail } },
        ...agency,
        customerId,
      },
    });
    return data.id;
  } catch (error) {
    console.error(error);
  }
};

export const updateAgency = async (
  agencyId: string,
  agency: Partial<Agency>
) => {
  try {
    const user = await currentUser();
    if (!user) return;
    await db.agency.update({
      where: {
        id: agencyId,
        companyEmail: user.emailAddresses[0].emailAddress,
      },
      data: { ...agency },
    });
  } catch (error) {
    console.error(error);
  }
};
