"use client"

import { ArrowLeft, Send, ImageIcon, Smile, MoreVertical, Phone, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ChatConversation, ChatMessage } from "@/lib/types"
import { useState } from "react"
import Link from "next/link"

interface ChatThreadProps {
  conversation: ChatConversation
  onBack: () => void
  onClose: () => void
}

// Mock messages - would come from API
const mockMessages: ChatMessage[] = [
  {
    id: "1",
    conversationId: "1",
    senderId: "2",
    content: "Hola! Vi que estás interesado en el departamento",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
    type: "text",
  },
  {
    id: "2",
    conversationId: "1",
    senderId: "1",
    content: "Sí, me gustaría saber más detalles sobre la ubicación",
    timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    read: true,
    type: "text",
  },
  {
    id: "3",
    conversationId: "1",
    senderId: "2",
    content: "Está a 5 minutos caminando de la universidad",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: true,
    type: "text",
  },
  {
    id: "4",
    conversationId: "1",
    senderId: "2",
    content: "El departamento está disponible desde el próximo mes",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    type: "text",
  },
]

export function ChatThread({ conversation, onBack, onClose }: ChatThreadProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [isTyping, setIsTyping] = useState(false)

  const participant = conversation.participants[0]
  const currentUserId = "1" // Would come from auth context

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      conversationId: conversation.id,
      senderId: currentUserId,
      content: message,
      timestamp: new Date().toISOString(),
      read: false,
      type: "text",
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate typing indicator
    setTimeout(() => setIsTyping(true), 1000)
    setTimeout(() => setIsTyping(false), 3000)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Link
            href={`/perfil/${participant.id}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={participant.photo || "/placeholder.svg"} alt={participant.name} />
                <AvatarFallback>{participant.name[0]}</AvatarFallback>
              </Avatar>
              {participant.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{participant.name}</h3>
              <p className="text-xs text-muted-foreground">{participant.online ? "Activo ahora" : "Desconectado"}</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Phone className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Video className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isOwn = msg.senderId === currentUserId
            return (
              <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 max-w-[75%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                  {!isOwn && (
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={participant.photo || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isOwn ? "bg-primary text-white rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <p className={`mt-1 text-xs text-muted-foreground ${isOwn ? "text-right" : "text-left"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={participant.photo || "/placeholder.svg"} alt={participant.name} />
                <AvatarFallback>{participant.name[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full shrink-0">
            <ImageIcon className="h-5 w-5 text-primary" />
          </Button>
          <div className="relative flex-1">
            <Input
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="pr-10 bg-muted border-0 rounded-full focus-visible:ring-1"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <Button
            onClick={handleSendMessage}
            size="icon"
            disabled={!message.trim()}
            className="h-9 w-9 rounded-full shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
