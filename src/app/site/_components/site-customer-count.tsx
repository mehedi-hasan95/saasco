import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const SiteCustomerCount = () => {
  return (
    <div className="relative max-w-screen-2xl mx-auto bg-[url('/bg-text.svg')] bg-[center_70px] bg-no-repeat  bg-[#ffffff0d] py-32 bg-gradient-to-br from-theme-secondery to-theme mb-10 border border-black/80 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bottom-0 top-1/2 overflow-hidden bg-gradient-to-b from-transparent to-theme/30 pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
          Trusted by Over 17.000+ Happy{" "}
          <span className="text-theme">Customers</span>
        </h1>
        <p className="text-white/80">
          With a growing community of over 17,000+ happy customers worldwide,
          our platform has become a trusted choice for businesses of all sizes.
        </p>
        <Link href="#">
          <Button className="bg-theme hover:bg-theme/90 text-white">
            Buy Now
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};
