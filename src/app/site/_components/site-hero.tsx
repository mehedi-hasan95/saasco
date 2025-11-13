import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
export const SiteHero = () => {
  return (
    <section className="relative h-full w-full flex flex-col justify-center items-center pt-60 bg-[url('/bg.webp')] bg-[center_17%] bg-no-repeat bg-cover">
      <div className="max-w-4xl space-y-5 py-20">
        <div className="relative bg-gradient-to-r from-theme to-theme/40 bg-clip-text text-transparent">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center">
            The Ultimate SaaS & Startup with Next.js
          </h1>
        </div>
        <p className="text-center text-white font-semibold max-w-xl mx-auto">
          Speed-optimized Next.js theme built for SaaS, startups, and modern
          tech brands ready to grow.
        </p>
        <Link href={"#"} className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="bg-theme hover:bg-theme/80 text-white hover:text-white font-semibold flex gap-3"
          >
            Explore Demo
            <ArrowRightCircle />
          </Button>
        </Link>
      </div>
    </section>
  );
};
