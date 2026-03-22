"use client"

import { useState } from "react"
import { ConversationsList } from "./conversations-list"
import { ChatThread } from "./chat-thread"
import type { ChatConversation } from "@/lib/types"

interface ChatWindowProps {
  onClose: () => void
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null)

  return (
    <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
      {selectedConversation ? (
        <ChatThread
          conversation={selectedConversation}
          onBack={() => setSelectedConversation(null)}
          onClose={onClose}
        />
      ) : (
        <ConversationsList onSelectConversation={setSelectedConversation} onClose={onClose} />
      )}
    </div>
  )
}
