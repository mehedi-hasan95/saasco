import { SiteBanner } from "./_components/site-banner";
import { SiteCustomerCount } from "./_components/site-customer-count";
import { SiteDemos } from "./_components/site-demos";
import { SiteFeature } from "./_components/site-feature";
import { SiteHero } from "./_components/site-hero";
import { SitePrice } from "./_components/site-price";

const Page = async () => {
  return (
    <div className="bg-[#100e17]">
      <SiteHero />
      <SiteBanner />
      <SiteFeature />
      <SiteDemos />
      <SiteCustomerCount />
      <SitePrice />
    </div>
  );
};

export default Page;
