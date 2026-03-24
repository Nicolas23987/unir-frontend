"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, Heart, Send, MessageCircle, Loader2 } from "lucide-react"
import type { Comentario, Reaccion } from "@/lib/types"

const mockComments: (Comentario & { usuario: { name: string; picture: string }; reacciones: Reaccion[] })[] = [
  {
    id_comentario: "1",
    id_usuario: 1,
    id_evento: "evento-1",
    id_candidata: null,
    id_comentario_padre: null,
    mensaje: "¡Todas las candidatas son increíbles! Mucha suerte a todas",
    fecha_comentario: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    usuario: {
      name: "Carlos Mendoza",
      picture: "/student-avatar-1.png",
    },
    reacciones: [],
    respuestas: [],
  },
  {
    id_comentario: "2",
    id_usuario: 2,
    id_evento: "evento-1",
    id_candidata: null,
    id_comentario_padre: null,
    mensaje: "Qué orgullo ver a nuestras compañeras de enfermería brillar así",
    fecha_comentario: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    usuario: {
      name: "Laura Jiménez",
      picture: "/student-avatar-2.png",
    },
    reacciones: [],
    respuestas: [],
  },
]

const reactionIcons = {
  like: ThumbsUp,
  love: Heart,
}

export function CommentsSection() {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")
  const [userReactions, setUserReactions] = useState<Map<string, string>>(new Map())
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [loadingReplies, setLoadingReplies] = useState<Set<string>>(new Set())

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    console.log("[v0] Posting comment:", newComment)

    const comment = {
      id_comentario: `${Date.now()}`,
      id_usuario: 999,
      id_evento: "evento-1",
      id_candidata: null,
      id_comentario_padre: null,
      mensaje: newComment,
      fecha_comentario: new Date().toISOString(),
      usuario: {
        name: "Tú",
        picture: "/diverse-user-avatars.png",
      },
      reacciones: [],
      respuestas: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const addReplyToComment = (
    comments: typeof mockComments,
    parentId: string,
    reply: (typeof mockComments)[0],
  ): typeof mockComments => {
    return comments.map((comment) => {
      if (comment.id_comentario === parentId) {
        return { ...comment, respuestas: [...(comment.respuestas || []), reply] }
      }
      if (comment.respuestas && comment.respuestas.length > 0) {
        return {
          ...comment,
          respuestas: addReplyToComment(comment.respuestas, parentId, reply),
        }
      }
      return comment
    })
  }

  const handleSubmitReply = (parentId: string) => {
    if (!replyText.trim()) return

    console.log("[v0] Posting reply to:", parentId, replyText)

    const reply = {
      id_comentario: `${Date.now()}`,
      id_usuario: 999,
      id_evento: "evento-1",
      id_candidata: null,
      id_comentario_padre: parentId,
      mensaje: replyText,
      fecha_comentario: new Date().toISOString(),
      usuario: {
        name: "Tú",
        picture: "/diverse-user-avatars.png",
      },
      reacciones: [],
      respuestas: [],
    }

    setComments((prev) => addReplyToComment(prev, parentId, reply))
    setReplyText("")
    setReplyingTo(null)
  }

  const handleReaction = (commentId: string, tipo: Reaccion["tipo"]) => {
    const currentReaction = userReactions.get(commentId)

    if (currentReaction === tipo) {
      setUserReactions((prev) => {
        const newMap = new Map(prev)
        newMap.delete(commentId)
        return newMap
      })
    } else {
      setUserReactions((prev) => new Map(prev).set(commentId, tipo))
    }
  }

  const getReactionCount = (commentId: string, tipo: Reaccion["tipo"]) => {
    const comment = comments.find((c) => c.id_comentario === commentId)
    const baseCount = comment?.reacciones?.filter((r) => r.tipo === tipo).length || 0
    const userReaction = userReactions.get(commentId)
    return userReaction === tipo ? baseCount + 1 : baseCount
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return "Ahora"
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`
    return `Hace ${diffDays} día${diffDays > 1 ? "s" : ""}`
  }

  const handleLoadReplies = async (commentId: string) => {
    console.log("[v0] Loading replies for comment:", commentId)

    setLoadingReplies((prev) => new Set(prev).add(commentId))

    await new Promise((resolve) => setTimeout(resolve, 800))

    setLoadingReplies((prev) => {
      const newSet = new Set(prev)
      newSet.delete(commentId)
      return newSet
    })
    setExpandedReplies((prev) => new Set(prev).add(commentId))
  }

  const handleCollapseReplies = (commentId: string) => {
    setExpandedReplies((prev) => {
      const newSet = new Set(prev)
      newSet.delete(commentId)
      return newSet
    })
  }

  const countReplies = (comment: (typeof mockComments)[0]): number => {
    if (!comment.respuestas || comment.respuestas.length === 0) return 0
    return comment.respuestas.length + comment.respuestas.reduce((sum, reply) => sum + countReplies(reply), 0)
  }

  const CommentItem = ({
    comment,
    depth = 0,
    isLastSibling = false,
  }: {
    comment: Comentario & { usuario: { name: string; picture: string }; reacciones: Reaccion[] }
    depth?: number
    isLastSibling?: boolean
  }) => {
    const isExpanded = expandedReplies.has(comment.id_comentario)
    const isLoading = loadingReplies.has(comment.id_comentario)
    const replyCount = countReplies(comment)
    const hasReplies = comment.respuestas && comment.respuestas.length > 0

    return (
      <div className="relative">
        {depth > 0 && (
          <>
            {!isLastSibling && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-accent/30"
                style={{
                  left: `${(depth - 1) * 2.5 + 1.125}rem`,
                }}
              />
            )}
            <div
              className="absolute top-0 w-5 h-26 border-l-2 border-b-2 border-accent/30 rounded-bl-lg"
              style={{
                left: `${(depth - 1) * 2.5 + 1.125}rem`,
                top: "-0.75rem",
              }}
            />
          </>
        )}
        <Card
          className={`border-accent/20 transition-all hover:border-accent/40 ${depth > 0 ? "ml-10" : ""}`}
          style={{ marginLeft: depth > 0 ? `${depth * 2.5}rem` : "0" }}
        >
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={comment.usuario.picture || "/placeholder.svg"} alt={comment.usuario.name} />
                <AvatarFallback>{comment.usuario.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-foreground">{comment.usuario.name}</h4>
                  <span className="text-xs text-muted-foreground">{formatTimestamp(comment.fecha_comentario)}</span>
                </div>
                <p className="mb-2 text-sm leading-relaxed text-foreground/90">{comment.mensaje}</p>
                <div className="flex gap-1 items-center">
                  {(Object.keys(reactionIcons) as Array<keyof typeof reactionIcons>).map((tipo) => {
                    const Icon = reactionIcons[tipo]
                    const count = getReactionCount(comment.id_comentario, tipo as Reaccion["tipo"])
                    const isActive = userReactions.get(comment.id_comentario) === tipo

                    return (
                      <Button
                        key={tipo}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReaction(comment.id_comentario, tipo as Reaccion["tipo"])}
                        className={`h-7 gap-1 px-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${isActive ? "fill-current" : ""}`} />
                        {count > 0 && <span className="text-xs">{count}</span>}
                      </Button>
                    )
                  })}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(comment.id_comentario)}
                    className="h-7 gap-1 px-2 text-muted-foreground"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span className="text-xs">Responder</span>
                  </Button>
                </div>
                {replyingTo === comment.id_comentario && (
                  <div className="mt-3 space-y-2">
                    <Textarea
                      placeholder="Escribe tu respuesta..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-16 resize-none border-accent/20 text-sm"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setReplyingTo(null)
                          setReplyText("")
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSubmitReply(comment.id_comentario)}
                        disabled={!replyText.trim()}
                      >
                        <Send className="mr-1 h-3 w-3" />
                        Responder
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {hasReplies && !isExpanded && (
          <div className="mt-2" style={{ marginLeft: depth > 0 ? `${depth * 2.5}rem` : "0" }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLoadReplies(comment.id_comentario)}
              disabled={isLoading}
              className="h-8 gap-2 text-primary hover:text-primary/80"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="text-xs">Cargando...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span className="text-xs">
                    Ver {replyCount} {replyCount === 1 ? "respuesta" : "respuestas"}
                  </span>
                </>
              )}
            </Button>
          </div>
        )}
        {hasReplies && isExpanded && (
          <>
            <div className="mt-2" style={{ marginLeft: depth > 0 ? `${depth * 2.5}rem` : "0" }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCollapseReplies(comment.id_comentario)}
                className="h-8 gap-2 text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="text-xs">Ocultar respuestas</span>
              </Button>
            </div>
            <div className="mt-3 space-y-3">
              {comment.respuestas!.map((reply, index) => (
                <CommentItem
                  key={reply.id_comentario}
                  comment={reply}
                  depth={depth + 1}
                  isLastSibling={index === comment.respuestas!.length - 1}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-foreground">Comentarios</h2>
          <p className="text-sm text-muted-foreground">Comparte tu opinión y apoya a las candidatas</p>
        </div>

        <Card className="mb-6 border-accent/20">
          <CardContent className="p-4">
            <form onSubmit={handleSubmitComment} className="space-y-3">
              <Textarea
                placeholder="Escribe tu comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-20 resize-none border-accent/20"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!newComment.trim()} size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Publicar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id_comentario} comment={comment} depth={0} />
          ))}
        </div>
      </div>
    </section>
  )
}
