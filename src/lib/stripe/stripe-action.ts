"use server";

import Stripe from "stripe";
import { db } from "../db";
import { Plan } from "../../../generated/prisma";
import { stripe } from ".";

export const subscriptionCreated = async (
  subscription: Stripe.Subscription,
  customerId: string
) => {
  try {
    const agency = await db.agency.findFirst({
      where: { customerId },
      include: { SubAccount: true },
    });

    if (!agency) {
      throw new Error("Could not fould any agency to upsert the subscription");
    }

    console.log("This is from stripe-action", subscription);

    const data = {
      active: subscription.status === "active",
      agencyId: agency.id,
      customerId,
      currentPeriodEndDate: new Date(
        subscription.items.data[0].current_period_end * 1000
      ),
      priceId: subscription.items.data[0].price.id,
      subscritiptionId: subscription.id,
      plan: subscription.items.data[0].plan.id as Plan,
    };

    await db.subscription.upsert({
      where: { agencyId: agency.id },
      create: data,
      update: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getConnectAccuntProducts = async (stripeAccount: string) => {
  const products = await stripe.products.list(
    {
      limit: 50,
      expand: ["data.default_price"],
    },
    { stripeAccount }
  );

  return products.data;
};
