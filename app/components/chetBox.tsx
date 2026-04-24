"use client"

import { useEffect, useRef, useState } from "react"

interface Message {
  content: string
  isUser: boolean
}

interface ChatBoxProps {
  messages: Message[]
  onSend: (text: string) => void
  onInputChange?: (value: string) => void
  showInputOnly?: boolean
}

export default function ChatBox({
  messages,
  onSend,
  onInputChange,
  showInputOnly = false,
}: ChatBoxProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if(!inputValue.trim()) return
    onSend(inputValue)
    setInputValue('')
  }

  return (
    <>
      {!showInputOnly && (
        <div className="absolute top-1/2 left-1/2 transform w-[80%] translate-y-[-25%] max-h-[60vh] animate-fadeIn">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-2xl animate-fadeIn"></div>
          <div className="relative bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-700/30 shadow-2xl p-6">
            <div className="h-[calc(80vh-220px)] overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-3 mb-4 ${message.isUser ? 'justify-end' : ''}`}>
                  {!message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  )}
                  <div className={`flex-1 ${message.isUser ? 'max-w-[80%]' : ''}`}>
                    <div className={`${message.isUser ? 'bg-blue-500/20 rounded-2xl rounded-tr-sm' : 'bg-slate-800/70 rounded-2xl rounded-tl-sm'} p-3 text-slate-200 text-sm`}>
                      {message.content}
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
      )}

      <div className="absolute bottom-0 left-1/2 transform w-[80%] animate-slideUp">
        <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-t-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
          <div className="p-6">
            <div className="flex items-center justify-between pb-4">
              <textarea
                placeholder="来和我聊天吧~"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  onInputChange?.(e.target.value)
                }}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="w-full h-20 px-4 rounded-md bg-transparent focus:outline-none focus:ring-0 text-white placeholder-slate-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
