"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ChatConversation } from "@/lib/types"
import { useState } from "react"

interface ConversationsListProps {
  onSelectConversation: (conversation: ChatConversation) => void
  onClose: () => void
}

// Mock data - would come from API
const mockConversations: ChatConversation[] = [
  {
    id: "1",
    participants: [
      {
        id: "2",
        name: "Carlos Mendoza",
        photo: "/landlord-meeting.png",
        online: true,
      },
    ],
    lastMessage: {
      id: "m1",
      conversationId: "1",
      senderId: "2",
      content: "El departamento está disponible desde el próximo mes",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false,
      type: "text",
    },
    unreadCount: 2,
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    participants: [
      {
        id: "3",
        name: "María González",
        photo: "/student-woman.jpg",
        online: false,
        lastSeen: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
    ],
    lastMessage: {
      id: "m2",
      conversationId: "2",
      senderId: "3",
      content: "Me interesa ser tu roommate!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: false,
      type: "text",
    },
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "3",
    participants: [
      {
        id: "4",
        name: "Ana Rodríguez",
        photo: "/student-profile.jpg",
        online: true,
      },
    ],
    lastMessage: {
      id: "m3",
      conversationId: "3",
      senderId: "1",
      content: "Gracias por la información",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: true,
      type: "text",
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
]

export function ConversationsList({ onSelectConversation, onClose }: ConversationsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = mockConversations.filter((conv) =>
    conv.participants[0].name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Ahora"
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`
    return date.toLocaleDateString("es-ES", { month: "short", day: "numeric" })
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-xl font-bold text-foreground">Chats</h2>
        <button onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar en Messenger"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Conversations list */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredConversations.map((conversation) => {
            const participant = conversation.participants[0]
            const isUnread = conversation.unreadCount > 0

            return (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={participant.photo || "/placeholder.svg"} alt={participant.name} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                  {participant.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                  )}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm ${isUnread ? "font-bold" : "font-medium"} text-foreground truncate`}>
                      {participant.name}
                    </h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm ${isUnread ? "font-semibold text-foreground" : "text-muted-foreground"} truncate`}
                    >
                      {conversation.lastMessage?.content}
                    </p>
                    {isUnread && (
                      <Badge className="h-5 w-5 rounded-full bg-primary p-0 flex items-center justify-center text-xs text-white">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </>
  )
}
