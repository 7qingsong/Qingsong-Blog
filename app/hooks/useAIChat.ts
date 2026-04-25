import { useState, useCallback, useRef, useEffect } from 'react'
import { createAIChat, aiConfig, AIConfig, ChatInstance } from '../lib/ai'

interface Message {
  id: string
  content: string
  isUser: boolean
}

let messageIdCounter = 0

export function useAIChat(config?: AIConfig) {
  const [messages, setMessages] = useState<Message[]>([
    { id: String(messageIdCounter++), content: '你好！有没有什么可以跟我聊聊的呢', isUser: false },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const chatRef = useRef<ChatInstance | null>(null)
  const contentBufferRef = useRef('')
  const pendingMessagesRef = useRef<string[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const initChat = async () => {
      chatRef.current = await createAIChat(config || aiConfig)
    }
    initChat()
  }, [config])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    pendingMessagesRef.current = []

    setMessages(prev => [...prev, { id: String(messageIdCounter++), content: text, isUser: true }])
    setIsLoading(true)
    contentBufferRef.current = ''

    const processNext = () => {
      if (pendingMessagesRef.current.length === 0) {
        return
      }

      const nextContent = pendingMessagesRef.current.shift()

      if (nextContent) {
        setMessages(prev => {
          return [...prev, { id: String(messageIdCounter++), content: nextContent, isUser: false }]
        })

        if (pendingMessagesRef.current.length > 0) {
          timeoutRef.current = setTimeout(processNext, 150)
        }
      }
    }

    try {
      if (!chatRef.current) {
        chatRef.current = await createAIChat(config || aiConfig)
      }

      await chatRef.current.sendMessage(
        text,
        (chunk) => {
          contentBufferRef.current += chunk

          const sentences: string[] = []
          let current = ''

          for (const char of contentBufferRef.current) {
            current += char
            if (['。', '？', '！'].includes(char)) {
              sentences.push(current.trim())
              current = ''
            }
          }

          contentBufferRef.current = current

          if (sentences.length > 0) {
            for (const sentence of sentences) {
              if (sentence) {
                pendingMessagesRef.current.push(sentence)
              }
            }

            if (!timeoutRef.current) {
              processNext()
            }
          }
        }
      )

      setTimeout(() => {
        if (contentBufferRef.current.trim()) {
          const lastContent = contentBufferRef.current.trim()
          pendingMessagesRef.current.push(lastContent)
          if (!timeoutRef.current) {
            processNext()
          }
        }
      }, 100)
    } catch (error) {
      pendingMessagesRef.current.push('抱歉，发生了错误，请稍后重试。')
      if (!timeoutRef.current) {
        processNext()
      }
      console.error('AI消息发送失败:', error)
    } finally {
      setIsLoading(false)
      contentBufferRef.current = ''
      pendingMessagesRef.current = []
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [config, isLoading])

  return {
    messages,
    sendMessage,
    isLoading,
  }
}
