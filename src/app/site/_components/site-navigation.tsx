"use client";
import { Logo } from "@/components/common/logo";
import { SiteMenu } from "./site-menu";
import { AuthButton } from "./auth-button";
import { cn } from "@/lib/utils";
import { useScrollToTop } from "@/hooks/use-scroll-top";

export const SiteNavigation = () => {
  const { showScrollTop } = useScrollToTop();
  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-5 px-12 w-full mx-auto transition-all duration-500 ease-in-out",
        showScrollTop && "bg-black/50 w-[90%] rounded-b-2xl"
      )}
    >
      <div className="flex justify-between items-center text-white relative">
        <Logo />
        <SiteMenu />
        <AuthButton />
      </div>
    </div>
  );
};
