"use client";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { useScrollToTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

interface Props {
  threshold?: number;
  className?: string;
}
export const ScrollToTopButton = ({ className, threshold = 200 }: Props) => {
  const { scrollToTop, showScrollTop } = useScrollToTop(threshold);
  return (
    <>
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          variant="ghost"
          className={cn(
            "fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg z-50",
            className
          )}
        >
          <ArrowUp />
        </Button>
      )}
    </>
  );
};
