"use client"

import { useEffect, useRef } from "react"

interface Message {
  content: string
  isUser: boolean
}

interface ChatBoxProps {
  messages: Message[]
}

export default function ChatBox({
  messages,
}: ChatBoxProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="absolute top-1/2 left-1/2 transform w-[80%] translate-y-[-10%] max-h-[90vh] animate-fadeIn">
      <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl p-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
        <div className="h-[calc(90vh-180px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [&]:scrollbar-hide">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 mb-4 animate-bubbleUp ${message.isUser ? 'justify-end' : ''}`}>
              {!message.isUser && (
                <div>
                  <img src="/chetbox.jpg" alt="avatar" className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0 flex items-center justify-center" />
                </div>
              )}
              <div className={`${message.isUser ? 'max-w-[70%]' : ''}`}>
                <div className={`relative ${message.isUser ? 'bg-blue-500/20' : 'bg-slate-700/70'} px-4 py-2 text-sm text-white`} style={{ borderRadius: '12px' }}>
                  {message.content}
                  {!message.isUser && (
                    <div className="absolute left-0 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-r-[10px] border-r-slate-700/70 border-b-[8px] border-b-transparent transform -translate-x-full" />
                  )}
                  {message.isUser && (
                    <div className="absolute right-0 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-l-[10px] border-l-blue-500/20 border-b-[8px] border-b-transparent transform translate-x-full" />
                  )}
                </div>
              </div>
              {message.isUser && (
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
