"use client"

import { MainNav } from "@/components/main-nav"
import { ConversationsList } from "@/components/chat/conversations-list"
import { ChatThread } from "@/components/chat/chat-thread"
import type { ChatConversation } from "@/lib/types"
import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <MainNav />
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Conversations list - always visible on desktop */}
            <div className={`lg:col-span-1 ${selectedConversation ? "hidden lg:block" : "block"}`}>
              <div className="h-full overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
                <ConversationsList onSelectConversation={setSelectedConversation} onClose={() => {}} />
              </div>
            </div>

            {/* Chat thread */}
            <div className={`lg:col-span-2 ${selectedConversation ? "block" : "hidden lg:block"}`}>
              {selectedConversation ? (
                <div className="h-full overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
                  <ChatThread
                    conversation={selectedConversation}
                    onBack={() => setSelectedConversation(null)}
                    onClose={() => setSelectedConversation(null)}
                  />
                </div>
              ) : (
                <div className="hidden lg:flex h-full items-center justify-center rounded-2xl border border-border bg-background shadow-lg">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      <svg
                        className="h-10 w-10 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Tus mensajes</h3>
                    <p className="text-sm text-muted-foreground">Selecciona una conversación para comenzar a chatear</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
