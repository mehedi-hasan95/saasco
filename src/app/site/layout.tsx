import { ScrollToTopButton } from "@/components/common/scroll-to-top-button";
import { SiteNavigation } from "./_components/site-navigation";
import { ClerkProvider } from "@clerk/nextjs";

const Page = async ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <div className="flex flex-col">
        <SiteNavigation />
        <ScrollToTopButton threshold={500} />
        {children}
      </div>
    </ClerkProvider>
  );
};

export default Page;
