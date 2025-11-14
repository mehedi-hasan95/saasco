"use client";

import { Button } from "@/components/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Plan } from "../../../../../../../generated/prisma";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {
  selectedPriceId: string | Plan;
};

const SubscriptionForm = ({ selectedPriceId }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isComplete, setIsComplete] = useState(false); // payment form filled
  const [isProcessing, setIsProcessing] = useState(false); // submitting
  const [priceError, setPriceError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPriceId) {
      setPriceError("You need to select a plan to subscribe.");
      return;
    }

    if (!stripe || !elements) return;

    setPriceError("");
    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_URL}/agency`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      toast("Success", {
        description: "Your payment has been successfully processed",
      });
    } catch (error) {
      toast("Payment failed", {
        description:
          "We couldn't process your payment. Please try a different card",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <small className="text-destructive">{priceError}</small>

      {/* Track completeness */}
      <PaymentElement
        onChange={(event) => {
          setIsComplete(event.complete);
        }}
      />

      {isProcessing ? (
        <Button
          disabled
          className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          "Processing..." <Loader2 className="animate-spin" />
        </Button>
      ) : (
        <Button
          disabled={!stripe || !isComplete || isProcessing}
          className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Pay
        </Button>
      )}
    </form>
  );
};

export default SubscriptionForm;
