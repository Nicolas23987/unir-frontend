import { Skeleton } from "@/components/ui/skeleton"

export function MessagesSkeleton() {
  return (
    <div className="flex h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)]">
      {/* Conversations List Skeleton */}
      <div className="w-full border-r border-border md:w-80">
        <div className="border-b border-border p-4">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
        <div className="divide-y divide-border">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Thread Skeleton */}
      <div className="hidden flex-1 flex-col md:flex">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <Skeleton className={`h-16 ${i % 2 === 0 ? "w-64" : "w-48"} rounded-2xl`} />
            </div>
          ))}
        </div>
        <div className="border-t border-border p-4">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  )
}
