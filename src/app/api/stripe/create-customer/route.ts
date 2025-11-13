import { StripeCustomerType } from "@/constants/types";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { address, email, name, shipping }: StripeCustomerType =
    await req.json();

  if (!address || !email || !name || !shipping) {
    return new NextResponse("Missing Data", { status: 400 });
  }

  try {
    const customer = await stripe.customers.create({
      email,
      name,
      address,
      shipping,
    });

    return Response.json({ customerId: customer.id });
  } catch (error) {
    console.log("stripe create-customer api", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
