import { PageHeader } from "@/components/page-header";

export default function ResourcesPage() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Resources</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </div>
    </div>
  );
}
