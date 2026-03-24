"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, GraduationCap } from "lucide-react"

interface UserProfileCardProps {
  user: {
    id: string
    name: string
    photo: string
    verified?: boolean
    university?: string
    major?: string
  }
  showDetails?: boolean
}

export function UserProfileCard({ user, showDetails = true }: UserProfileCardProps) {
  return (
    <Link href={`/perfil/${user.id}`} className="block transition-transform hover:scale-[1.02]">
      <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                {user.verified && <Shield className="h-4 w-4 text-secondary flex-shrink-0" />}
              </div>
              {showDetails && user.university && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <GraduationCap className="h-3 w-3" />
                  <span className="truncate">{user.major}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
