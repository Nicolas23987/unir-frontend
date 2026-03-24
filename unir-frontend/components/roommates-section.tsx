import Link from "next/link"
import { Users, GraduationCap, Heart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Roommate } from "@/lib/types"

interface RoommatesSectionProps {
  roommates: Roommate[]
  maxOccupants: number
}

export function RoommatesSection({ roommates, maxOccupants }: RoommatesSectionProps) {
  const availableSpots = maxOccupants - roommates.length

  return (
    <div className="border-b border-border py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Tus futuros roomies</h2>
        <Badge variant="secondary" className="gap-1">
          <Users className="h-3 w-3" />
          {availableSpots} {availableSpots === 1 ? "espacio disponible" : "espacios disponibles"}
        </Badge>
      </div>

      <div className="space-y-6">
        {roommates.map((roommate) => (
          <Link key={roommate.id} href={`/perfil/${roommate.id}`} className="block">
            <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <div className="mb-4 flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={roommate.photo || "/placeholder.svg"} alt={roommate.name} />
                  <AvatarFallback>{roommate.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{roommate.name}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{roommate.age} años</p>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {roommate.major} - {roommate.university}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-foreground">{roommate.bio}</p>
              <div className="flex flex-wrap gap-2">
                {roommate.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="gap-1">
                    <Heart className="h-3 w-3" />
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
