import { Rocket, Zap, Type, Settings, LoaderCircle } from "lucide-react";

export const SiteFeature = () => {
  return (
    <div className="w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <div className="grid grid-rows-[2fr_1fr] gap-5">
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-transparent from-70% to-theme p-8 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative h-32 w-32">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                      <linearGradient
                        id="rocketGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                    {/* Rocket body */}
                    <path
                      d="M 50 10 L 60 40 L 50 50 L 40 40 Z"
                      fill="url(#rocketGradient)"
                    />
                    {/* Rocket flame */}
                    <path
                      d="M 45 50 Q 40 70 50 85 Q 60 70 55 50 Z"
                      fill="#a855f7"
                      opacity="0.8"
                    />
                    <path
                      d="M 48 55 Q 45 70 50 80 Q 55 70 52 55 Z"
                      fill="#ec4899"
                      opacity="0.6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  Super-Fast Speed Performance
                </h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-theme/50 to-transparent p-8 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center justify-center gap-6 text-center">
                <Type className="size-10 text-white" />
                <h3 className="text-lg font-bold text-white md:text-xl">
                  Google Free Fonts
                </h3>
              </div>
            </div>
          </div>
          {/* part 2  */}
          <div className="grid grid-rows-[1fr_3fr] gap-5">
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="group flex flex-col items-center justify-center relative border rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />
                <Zap className="size-10 text-theme" />
                <h3 className="text-md font-bold text-white text-center">
                  One-Click Quick Demo Import
                </h3>
              </div>
              <div className="group flex flex-col items-center justify-center relative border rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />
                <Settings className="size-10 text-theme/70" />
                <h3 className="text-md font-bold text-white text-center">
                  Customize everything in one place
                </h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-theme/30 to-primary/10 p-8 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center justify-center gap-6 text-center">
                <Rocket className="size-10 text-white" />
                <div>
                  <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">
                    SEO Optimization Made Simple
                  </h3>
                  <p className="text-sm text-white/50 md:text-base">
                    Our SEO optimization ensures your website gets discovered by
                    the right audience at the right time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 3rd part  */}
          <div className="grid grid-rows-[2fr_1fr] gap-5">
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-transparent from-30% via-theme-400/70 to-theme p-8 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative h-32 w-32">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                      <linearGradient
                        id="designGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#e0e7ff" />
                        <stop offset="100%" stopColor="#c7d2fe" />
                      </linearGradient>
                    </defs>
                    {/* Design mockup */}
                    <rect
                      x="20"
                      y="15"
                      width="60"
                      height="70"
                      fill="url(#designGradient)"
                      stroke="#a78bfa"
                      strokeWidth="2"
                      rx="4"
                    />
                    <rect
                      x="25"
                      y="20"
                      width="50"
                      height="15"
                      fill="#f3e8ff"
                      rx="2"
                    />
                    <line
                      x1="25"
                      y1="40"
                      x2="75"
                      y2="40"
                      stroke="#d8b4fe"
                      strokeWidth="2"
                    />
                    <line
                      x1="25"
                      y1="50"
                      x2="75"
                      y2="50"
                      stroke="#d8b4fe"
                      strokeWidth="2"
                    />
                    <line
                      x1="25"
                      y1="60"
                      x2="60"
                      y2="60"
                      stroke="#d8b4fe"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  Unique & High Quality Design
                </h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-tl from-theme/50 to-transparent p-8 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center justify-center gap-6 text-center">
                <LoaderCircle className="size-10 text-white animate-spin" />
                <h3 className="text-lg font-bold text-white md:text-xl">
                  Fast Loading Speed
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
