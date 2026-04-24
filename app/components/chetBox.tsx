"use client"

import { useEffect, useRef } from "react"

interface Message {
  content: string
  isUser: boolean
}

interface ChatBoxProps {
  messages: Message[]
  inputValue: string
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSend: () => void
}

export default function ChatBox({
  messages,
  inputValue,
  onInputChange,
  onSend,
}: ChatBoxProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  //自动滚到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="absolute top-1/2 left-1/2 transform w-[80%] translate-y-[-25%] max-h-[60vh] animate-fadeIn">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-2xl animate-fadeIn"></div>
      <div className="relative bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-700/30 shadow-2xl p-6">
        <div className="h-[calc(80vh-120px)] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 mb-4 ${msg.isUser ? "justify-end" : ""}`}>
              {!msg.isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              )}

              <div className={`flex-1 ${msg.isUser ? "max-w-[80%]" : ""}`}>
                <div
                  className={`p-3 text-sm rounded-2xl ${
                    msg.isUser
                      ? "bg-blue-500/20 rounded-tr-sm text-white ml-auto"
                      : "bg-slate-800/70 rounded-tl-sm text-slate-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>

              {msg.isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}