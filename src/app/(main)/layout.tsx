import { ClerkProvider } from "@clerk/nextjs";

const Page = async ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default Page;
