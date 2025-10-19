const Page = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default Page;
