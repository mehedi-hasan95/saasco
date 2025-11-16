import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { customerId, priceId } = await req.json();

  if (!customerId || !priceId) {
    return new NextResponse("Customer Id or Price Id is missing", {
      status: 400,
    });
  }

  const subscriptionExists = await db.agency.findFirst({
    where: { customerId },
    include: { Subscription: true },
  });

  try {
    if (
      subscriptionExists?.Subscription?.subscritiptionId &&
      subscriptionExists.Subscription.active
    ) {
      if (!subscriptionExists.Subscription.subscritiptionId) {
        throw new Error("Subscription Id is missing");
      }

      const currentSubsriptionDetails = await stripe.subscriptions.retrieve(
        subscriptionExists.Subscription.subscritiptionId
      );

      const subscription = await stripe.subscriptions.update(
        subscriptionExists.Subscription.subscritiptionId,
        {
          items: [
            {
              id: currentSubsriptionDetails.items.data[0].id,
              deleted: true,
            },
            {
              price: priceId,
            },
          ],
        }
      );

      // Get the invoice ID
      const invoiceId = subscription.latest_invoice as string;
      const invoice = await stripe.invoices.retrieve(invoiceId, {
        expand: ["confirmation_secret"],
      });
      const clientSecret = invoice.confirmation_secret?.client_secret;

      return NextResponse.json({
        subscriptionId: subscription.id,
        clientSecret,
      });
    } else {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: {
          save_default_payment_method: "on_subscription",
        },
      });

      // Get the invoice ID
      const invoiceId = subscription.latest_invoice as string;
      const invoice = await stripe.invoices.retrieve(invoiceId, {
        expand: ["confirmation_secret"],
      });
      const clientSecret = invoice.confirmation_secret?.client_secret;

      return NextResponse.json({
        subscriptionId: subscription.id,
        clientSecret,
      });
    }
  } catch (error) {
    console.error("Stripe subscription api error: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
