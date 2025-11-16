import { Separator } from "@/components/ui/separator";
import { ADD_ONS_PRODUCT, PRICE_PLAN } from "@/constants/price";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import PricingCard from "./_components/pricing-card";

interface Props {
  params: Promise<{ agencyId: string }>;
}
const Page = async ({ params }: Props) => {
  const { agencyId } = await params;

  const addOns = await stripe.products.list({
    ids: ADD_ONS_PRODUCT.map((product) => product.id),
    expand: ["data.default_price"],
  });

  const agencySubscription = await db.agency.findUnique({
    where: { id: agencyId },
    select: { customerId: true, Subscription: true },
  });

  const prices = await stripe.prices.list({
    product: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID,
    active: true,
  });
  const currentPlanDetails = PRICE_PLAN.find(
    (c) => c.priceId === agencySubscription?.Subscription?.priceId
  );

  const charges = await stripe.charges.list({
    limit: 50,
    customer: agencySubscription?.customerId,
  });

  const allCharges = [
    ...charges.data.map((charge) => ({
      description: charge.description,
      id: charge.id,
      date: `${new Date(charge.created * 1000).toLocaleTimeString()} ${new Date(
        charge.created * 1000
      ).toLocaleDateString()}`,
      status: "Paid",
      amount: `$${charge.amount / 100}`,
    })),
  ];

  return (
    <>
      <h1 className="text-4xl p-4">Billing</h1>
      <Separator className=" mb-6" />
      <h2 className="text-2xl p-4">Current Plan</h2>
      <div className="flex flex-col lg:!flex-row justify-between gap-8">
        <PricingCard
          planExists={agencySubscription?.Subscription?.active === true}
          prices={prices.data}
          customerId={agencySubscription?.customerId || ""}
          amt={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.price || "$0"
              : "$0"
          }
          buttonCta={
            agencySubscription?.Subscription?.active === true
              ? "Change Plan"
              : "Get Started"
          }
          highlightDescription="Want to modify your plan? You can do this here. If you have
          further question contact support@zendo-app.com"
          highlightTitle="Plan Options"
          description={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.description || "Lets get started"
              : "Lets get started! Pick a plan that works best for you."
          }
          duration="/ month"
          features={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.features || []
              : currentPlanDetails?.features ||
                PRICE_PLAN.find((pricing) => pricing.title === "Starter")
                  ?.features ||
                []
          }
          title={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.title || "Starter"
              : "Starter"
          }
        />
        {addOns.data.map((addon) => (
          <PricingCard
            planExists={agencySubscription?.Subscription?.active === true}
            prices={prices.data}
            customerId={agencySubscription?.customerId || ""}
            key={addon.id}
            amt={
              //@ts-ignore
              addon.default_price.unit_amount
                ? //@ts-ignore
                  `$${addon.default_price.unit_amount / 100}`
                : "$0"
            }
            buttonCta="Subscribe"
            description="Dedicated support line & teams channel for support"
            duration="/ month"
            features={[]}
            title="24/7 priority support"
            highlightTitle="Get support now"
            highlightDescription="Get priority support and skip the long long with the click of a button"
          />
        ))}
      </div>
    </>
  );
};

export default Page;
