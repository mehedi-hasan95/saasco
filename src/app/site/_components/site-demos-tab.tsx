import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SiteDemosTab = () => {
  return (
    <Tabs defaultValue="all" className="max-w-screen-2xl mx-auto pt-20">
      <TabsList className="grid w-full md:grid-cols-2 lg:grid-cols-4 bg-transparent gap-3 h-auto p-0 max-w-5xl mx-auto">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=inactive]:border data-[state=inactive]:border-slate-400 data-[state=inactive]:text-white data-[state=inactive]:bg-transparent rounded-full px-6 py-2 font-medium transition-all"
        >
          All Demos
        </TabsTrigger>
        <TabsTrigger
          value="new"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=inactive]:border data-[state=inactive]:border-slate-400 data-[state=inactive]:text-white data-[state=inactive]:bg-transparent rounded-full px-6 py-2 font-medium transition-all"
        >
          New Demos
        </TabsTrigger>
        <TabsTrigger
          value="light"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=inactive]:border data-[state=inactive]:border-slate-400 data-[state=inactive]:text-white data-[state=inactive]:bg-transparent rounded-full px-6 py-2 font-medium transition-all"
        >
          Light Demos
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=inactive]:border data-[state=inactive]:border-slate-400 data-[state=inactive]:text-white data-[state=inactive]:bg-transparent rounded-full px-6 py-2 font-medium transition-all"
        >
          Dark Demos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-8">
        <div className="grid grid-cols-3 gap-6">
          <DemoCard title="All Demos Card 1" />
          <DemoCard title="All Demos Card 2" />
          <DemoCard title="All Demos Card 3" />
        </div>
      </TabsContent>

      <TabsContent value="new" className="mt-8">
        <div className="grid grid-cols-3 gap-6">
          <DemoCard title="New Demos Card 1" />
          <DemoCard title="New Demos Card 2" />
          <DemoCard title="New Demos Card 3" />
        </div>
      </TabsContent>

      <TabsContent value="light" className="mt-8">
        <div className="grid grid-cols-3 gap-6">
          <DemoCard title="Light Demos Card 1" />
          <DemoCard title="Light Demos Card 2" />
          <DemoCard title="Light Demos Card 3" />
        </div>
      </TabsContent>

      <TabsContent value="dark" className="mt-8">
        <div className="grid grid-cols-3 gap-6">
          <DemoCard title="Dark Demos Card 1" />
          <DemoCard title="Dark Demos Card 2" />
          <DemoCard title="Dark Demos Card 3" />
        </div>
      </TabsContent>
    </Tabs>
  );
};

function DemoCard({ title }: { title: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 h-64 flex items-center justify-center">
      <p className="text-slate-300 text-center">{title}</p>
    </div>
  );
}
