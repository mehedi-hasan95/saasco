import BackdropGradient from "@/components/common/ui/backdrop-gradient";
import { SiteDemosTab } from "./site-demos-tab";

export const SiteDemos = () => {
  return (
    <div className="relative md:px-6 lg:px-10 2xl:px-12 py-32" id="demos">
      <BackdropGradient
        containerClass="flex flex-col items-center"
        className="w-6/12 h-2/6 opacity-40 !bg-theme"
      >
        <div className="relative max-w-md mx-auto">
          <div className="text-7xl md:text-9xl lg:text-[200px] 2xl:text-[250px] font-bold text-center bg-gradient-to-br from-theme to-white relative bg-clip-text text-transparent">
            14+
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center space-y-5 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            Pre-Built Home Pages for Quick SaaS Launches
          </h1>
          <h4 className="text-xl">
            Prebuilt websites are designed to save you time. Import with a few
            clicks and customize it to suit your requirements.
          </h4>
        </div>
      </BackdropGradient>
      <SiteDemosTab />
    </div>
  );
};
