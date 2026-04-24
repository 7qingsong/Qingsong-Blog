import { useState, useCallback } from 'react'
import { sendAIMessage, aiConfig, AIConfig } from '../lib/ai'

interface Message {
  content: string
  isUser: boolean
}

export function useAIChat(config?: AIConfig) {
  const [messages, setMessages] = useState<Message[]>([
    { content: '你好!有没有什么可以跟我聊聊的呢', isUser: false },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return

    setMessages(prev => [...prev, { content: text, isUser: true }])
    setIsLoading(true)

    setMessages(prev => [...prev, { content: '', isUser: false }])

    try {
      await sendAIMessage(
        text,
        (chunk) => {
          setMessages(prev => {
            const updated = [...prev]
            const lastIndex = updated.length - 1
            if (lastIndex >= 0 && !updated[lastIndex].isUser) {
              updated[lastIndex] = {
                ...updated[lastIndex],
                content: updated[lastIndex].content + chunk
              }
            }
            return updated
          })
        },
        config || aiConfig
      )
    } catch (error) {
      setMessages(prev => {
        const updated = [...prev]
        const lastIndex = updated.length - 1
        if (lastIndex >= 0 && !updated[lastIndex].isUser) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: '抱歉，发生了错误，请稍后重试。'
          }
        }
        return updated
      })
      console.error('AI消息发送失败:', error)
    } finally {
      setIsLoading(false)
    }
  }, [config, isLoading])

  return {
    messages,
    sendMessage,
    isLoading,
  }
}
