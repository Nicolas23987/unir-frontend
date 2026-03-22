"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Medal, Instagram } from "lucide-react"
import Image from "next/image"
import type { Candidata } from "@/lib/types"

interface CandidateCardProps {
  candidate: Candidata
  rank: number
  onVote: (id: string) => void
  hasVoted: boolean
  isVotedFor: boolean
}

export function CandidateCard({ candidate, rank, onVote, hasVoted, isVotedFor }: CandidateCardProps) {
  const votePercentage = candidate.votos_percentage?.toFixed(1) || "0.0"

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {rank <= 3 && (
          <div className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
            <Medal className="h-5 w-5 text-white" />
          </div>
        )}
        <Image
          src={candidate.foto_url || "/placeholder.svg?height=600&width=450"}
          alt={candidate.nombre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="mb-1 text-xl font-bold">{candidate.nombre}</h3>
          {candidate.carrera && <p className="text-sm text-white/90">{candidate.carrera.nombre}</p>}
        </div>
      </div>
      <CardContent className="p-4">
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {candidate.descripcion || "Estudiante destacada de la universidad"}
        </p>

        <div className="mb-3 flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <span className="text-sm font-medium text-muted-foreground">Porcentaje de votos</span>
          <span className="text-2xl font-bold text-primary">{votePercentage}%</span>
        </div>

        {candidate.instagram_url && (
          <a
            href={candidate.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-muted-foreground/20 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg"
          >
            <Instagram className="h-4 w-4" />
            Ver Instagram
          </a>
        )}

        <Button
          onClick={() => onVote(candidate.id_candidata)}
          disabled={hasVoted}
          className={`w-full ${
            isVotedFor
              ? "bg-primary text-white hover:bg-primary"
              : hasVoted
                ? "bg-muted text-muted-foreground"
                : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isVotedFor ? (
            <>
              <Heart className="mr-2 h-4 w-4 fill-current" />
              Votaste por ella
            </>
          ) : hasVoted ? (
            "Ya votaste"
          ) : (
            <>
              <Heart className="mr-2 h-4 w-4" />
              Votar
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
