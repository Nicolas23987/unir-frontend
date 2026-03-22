import { Star, Sparkles, MessageSquare, CheckCircle2, MapPin, DollarSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import type { Review } from "@/lib/types"

interface ApartmentReviewsProps {
  reviews: Review[]
  rating: number
}

const categoryLabels: Record<string, { label: string; icon: any }> = {
  cleanliness: { label: "Limpieza", icon: Sparkles },
  accuracy: { label: "Exactitud", icon: CheckCircle2 },
  checkin: { label: "Check-in", icon: MessageSquare },
  communication: { label: "Comunicación", icon: MessageSquare },
  location: { label: "Ubicación", icon: MapPin },
  value: { label: "Precio", icon: DollarSign },
}

export function ApartmentReviews({ reviews, rating }: ApartmentReviewsProps) {
  const averageCategories = reviews.reduce(
    (acc, review) => {
      Object.keys(review.categories).forEach((key) => {
        acc[key] = (acc[key] || 0) + review.categories[key as keyof typeof review.categories]
      })
      return acc
    },
    {} as Record<string, number>,
  )

  Object.keys(averageCategories).forEach((key) => {
    averageCategories[key] = averageCategories[key] / reviews.length
  })

  return (
    <div className="border-b border-border py-8">
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-2">
          <Star className="h-6 w-6 fill-accent text-accent" />
          <h2 className="text-2xl font-bold text-foreground">
            {rating} · {reviews.length} reseñas
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(averageCategories).map(([key, value]) => {
            const { label, icon: Icon } = categoryLabels[key] || { label: key, icon: Star }
            return (
              <div key={key} className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{label}</span>
                    <span className="text-muted-foreground">{value.toFixed(1)}</span>
                  </div>
                  <Progress value={value * 20} className="h-1" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-0">
            <div className="mb-3 flex items-start gap-3">
              <Avatar>
                <AvatarImage src={review.userPhoto || "/placeholder.svg"} alt={review.userName} />
                <AvatarFallback>{review.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{review.userName}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold text-foreground">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
