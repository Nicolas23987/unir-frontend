"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, GraduationCap, Calendar, DollarSign, Heart, MessageCircle, CheckCircle, Sparkles } from "lucide-react"
import type { RoommateProfile } from "@/lib/types"
import Link from "next/link"

interface RoommateProfileCardProps {
  profile: RoommateProfile
}

export function RoommateProfileCard({ profile }: RoommateProfileCardProps) {
  const getLifestyleIcon = (key: string, value: any) => {
    const icons: Record<string, string> = {
      "early-bird": "🌅",
      "night-owl": "🌙",
      flexible: "⏰",
      "very-clean": "✨",
      clean: "🧹",
      moderate: "👌",
      relaxed: "😌",
      "very-social": "🎉",
      social: "👥",
      quiet: "🤫",
      library: "📚",
      home: "🏠",
    }
    return icons[value] || "•"
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        {/* Profile Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={profile.photo || "/placeholder.svg"}
            alt={profile.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        {/* Compatibility Badge */}
        {profile.compatibilityScore && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white shadow-lg">
            <Sparkles className="h-4 w-4" />
            {profile.compatibilityScore}% Match
          </div>
        )}

        {/* Verified Badge */}
        {profile.verified && (
          <div className="absolute left-3 top-3 rounded-full bg-green-500 p-1.5 shadow-lg">
            <CheckCircle className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <Link href={`/perfil/${profile.userId}`}>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary">{profile.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground">
              {profile.age} años • {profile.yearOfStudy}° año
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Info */}
        <div className="mb-3 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{profile.major}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">De {profile.cityOfOrigin}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4 flex-shrink-0" />
            <span>
              ${profile.budget.min} - ${profile.budget.max}/mes
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Desde {new Date(profile.moveInDate).toLocaleDateString("es-ES")}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{profile.bio}</p>

        {/* Interests */}
        <div className="mb-3 flex flex-wrap gap-1">
          {profile.interests.slice(0, 3).map((interest) => (
            <Badge key={interest} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
          {profile.interests.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{profile.interests.length - 3}
            </Badge>
          )}
        </div>

        {/* Lifestyle Quick View */}
        <div className="mb-4 flex items-center gap-2 text-sm">
          <span>{getLifestyleIcon("sleepSchedule", profile.lifestyle.sleepSchedule)}</span>
          <span>{getLifestyleIcon("cleanliness", profile.lifestyle.cleanliness)}</span>
          <span>{getLifestyleIcon("socialLevel", profile.lifestyle.socialLevel)}</span>
          <span>{getLifestyleIcon("studyHabits", profile.lifestyle.studyHabits)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/perfil/${profile.userId}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              Ver Perfil
            </Button>
          </Link>
          <Button className="flex-1 gap-2">
            <MessageCircle className="h-4 w-4" />
            Conectar
          </Button>
        </div>
      </div>
    </Card>
  )
}
