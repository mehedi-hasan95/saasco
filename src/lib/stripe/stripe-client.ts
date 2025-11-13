import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = (connectedAccountId?: string) => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBILI_STRIPE_PUBLISHABLE_KEY!,
      { stripeAccount: connectedAccountId }
    );
  }
  return stripePromise;
};
