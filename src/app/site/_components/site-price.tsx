import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PRICE_PLAN } from "@/constants/price";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
export const SitePrice = () => {
  return (
    <div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-screen-2xl mx-auto"
      id="price"
    >
      {PRICE_PLAN.map((plan) => (
        <Card
          key={plan.title}
          className={cn(
            "bg-transparent relative",
            plan.featured === true && "border-theme"
          )}
        >
          <CardHeader>
            <div>
              <h3 className="text-lg font-medium text-white">{plan.title}</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-5xl font-bold tracking-tight text-white">
                  {plan.title !== "Starter" && "$"}
                  {plan.price}
                </span>
                {plan.duration && (
                  <span className="ml-1 text-sm font-medium text-zinc-400">
                    /{plan.duration}
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((item) => (
                <li className="flex items-center gap-2" key={item}>
                  <Check size={14} className="text-white/50" />
                  <span className="text-sm text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Link href={`/agency?plan=${plan.priceId}`} className="w-full">
              <Button
                className={cn(
                  "w-full bg-theme/20 hover:bg-theme/40 text-white/80",
                  plan.featured === true &&
                    "bg-theme hover:bg-theme/90 text-white"
                )}
              >
                Get {plan.title}
              </Button>
            </Link>
          </CardFooter>
          {plan.featured && (
            <Badge className="absolute -top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </Badge>
          )}
        </Card>
      ))}
    </div>
  );
};
