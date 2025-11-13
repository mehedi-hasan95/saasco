import {
  getCurrentUserDetails,
  verifyAndAcceptInvitation,
} from "@/action/agency";
import { redirect } from "next/navigation";
import { Plan } from "../../../../generated/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { AgencyForm } from "./_components/agency-form";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ plan: Plan; state: string; code: string }>;
}) => {
  const { code, plan, state } = await searchParams;
  const agencyId = await verifyAndAcceptInvitation();
  const user = await getCurrentUserDetails();
  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");
    } else if (user?.role === "AGENCY_ADMIN" || user?.role === "AGENCY_OWNER") {
      if (plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${plan}`);
      }
      if (state) {
        const statePath = state.split("__")[0];
        const stateAgencyId = state.split("___")[1];
        if (!stateAgencyId) {
          return <p>Not Authorized</p>;
        }

        return redirect(`/agency/${stateAgencyId}/${statePath}?code=${code}`);
      } else {
        return redirect(`/agency/${agencyId}`);
      }
    } else {
      return <div>Not Authorize</div>;
    }
  }
  const authuser = await currentUser();
  return (
    <div className="flex justify-center items-center my-4">
      <div className="max-w-4xl border p-4 rounded-xl space-y-5 w-full">
        <h1 className="text-4xl text-center">Create an Agency</h1>
        <AgencyForm
          data={{ companyEmail: authuser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  );
};

export default Page;
