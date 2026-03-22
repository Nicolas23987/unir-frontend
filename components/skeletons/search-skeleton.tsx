import { Skeleton } from "@/components/ui/skeleton"
import { ApartmentCardSkeleton } from "./apartment-card-skeleton"

export function SearchSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Filters Skeleton */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-28" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Listings Grid */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="grid gap-4">
              {[...Array(6)].map((_, i) => (
                <ApartmentCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Map Skeleton */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Skeleton className="h-[calc(100vh-8rem)] w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
