import { RoommateSkeleton } from "@/components/skeletons/roommate-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-6 flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Filters Skeleton */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <RoommateSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
