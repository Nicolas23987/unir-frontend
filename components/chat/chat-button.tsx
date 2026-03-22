"use client"

import { MessageCircle, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChatWindow } from "./chat-window"
import { Badge } from "@/components/ui/badge"

const isAuteticate = false

export function ChatButton() {

  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = 13 // This would come from your state management

  return (
    <>
      {/* Floating chat button - Facebook Messenger style */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="relative h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6 text-white" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-500 p-0 flex items-center justify-center text-xs text-white border-2 border-background">
                  {unreadCount}
                </Badge>
              )}
            </>
          )}
        </Button>
      </div>

      {/* Chat window */}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  )
}
