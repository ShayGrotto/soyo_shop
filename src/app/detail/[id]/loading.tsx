import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="container flex items-center space-x-4">
      <div className="w-64 space-y-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="flex-1 space-y-4"></div>
      <Skeleton className="h-48 w-full rounded-md" />
      <div className="w-80 space-y-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
}
