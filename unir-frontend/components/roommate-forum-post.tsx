"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import type { RoommatePost } from "@/lib/types"
import Link from "next/link"

interface RoommateForumPostProps {
  post: RoommatePost
}

export function RoommateForumPost({ post }: RoommateForumPostProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "looking-for-roommate": "bg-primary/10 text-primary",
      "looking-for-room": "bg-secondary/10 text-secondary",
      advice: "bg-yellow-500/10 text-yellow-600",
      general: "bg-muted text-muted-foreground",
    }
    return colors[category] || colors.general
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      "looking-for-roommate": "Busco Roomie",
      "looking-for-room": "Busco Cuarto",
      advice: "Consejos",
      general: "General",
    }
    return labels[category] || category
  }

  return (
    <Card className="p-6 transition-all hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex gap-3">
          <Link href={`/perfil/${post.authorId}`}>
            <Avatar className="h-12 w-12 cursor-pointer ring-2 ring-primary/20 transition-all hover:ring-primary">
              <AvatarImage src={post.author.photo || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href={`/perfil/${post.authorId}`}>
              <h4 className="font-semibold text-foreground hover:text-primary">{post.author.name}</h4>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{post.author.university}</span>
              <span>•</span>
              <span>{new Date(post.createdAt).toLocaleDateString("es-ES")}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Category Badge */}
      <Badge className={`mb-3 ${getCategoryColor(post.category)}`}>{getCategoryLabel(post.category)}</Badge>

      {/* Content */}
      <Link href={`/roomies/post/${post.id}`}>
        <h3 className="mb-2 text-xl font-semibold text-foreground hover:text-primary">{post.title}</h3>
      </Link>
      <p className="mb-4 text-muted-foreground">{post.content}</p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-border pt-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <Heart className="h-4 w-4" />
          {post.likes}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          {post.comments.length}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Compartir
        </Button>
      </div>

      {/* Comments Preview */}
      {post.comments.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          {post.comments.slice(0, 2).map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.author.photo || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm font-medium text-foreground">{comment.author.name}</p>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <button className="hover:text-primary">Me gusta ({comment.likes})</button>
                  <button className="hover:text-primary">Responder</button>
                  <span>{new Date(comment.createdAt).toLocaleDateString("es-ES")}</span>
                </div>
              </div>
            </div>
          ))}
          {post.comments.length > 2 && (
            <Link href={`/roomies/post/${post.id}`}>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver todos los comentarios ({post.comments.length})
              </Button>
            </Link>
          )}
        </div>
      )}
    </Card>
  )
}
