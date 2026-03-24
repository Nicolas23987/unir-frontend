import { Skeleton } from "@/components/ui/skeleton"

export function ApartmentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Gallery Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Title and Info */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>

            {/* Landlord Card */}
            <div className="flex items-center gap-4 rounded-xl border border-border p-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border p-6 space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-12 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
