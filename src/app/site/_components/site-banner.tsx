import Image from "next/image";

export const SiteBanner = () => {
  return (
    <div className="grid lg:grid-cols-10 gap-2">
      <Image
        src="/banner2.webp"
        alt="Banner"
        height={1200}
        width={1200}
        className="h-full w-full lg:col-span-3"
      />
      <Image
        src="/banner1.webp"
        alt="Banner"
        height={1200}
        width={1200}
        className="h-full w-full lg:col-span-4"
      />
      <Image
        src="/banner3.webp"
        alt="Banner"
        height={1200}
        width={1200}
        className="h-full w-full lg:col-span-3"
      />
    </div>
  );
};
