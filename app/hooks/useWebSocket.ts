import { useRef, useState, useEffect } from "react";

interface Message {
  content: string
  isUser: boolean
}

export function useWebSocket(url: string) {
  const ws = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    { content: '你好!有没有什么可以跟我聊聊的呢', isUser: false },
  ])

  // 连接websocket
  useEffect(() => {
    const socket = new WebSocket(url)
    ws.current = socket
    //接收流式消息
    socket.onmessage = (e) => {
      const data = e.data
      if(data === '[DONE]') return
      setMessages((prev) => {
        const last = prev[prev.length-1]
        if(last && !last.isUser){
          const updated = [...prev]
          updated[updated.length-1] = {
            ...last,
            content: last.content + data,
          }
          return updated
        } else {
          return [...prev, { content: data, isUser: false }]
        }
      })
    }
    return () => socket.close()
  }, [url])

  //发送消息
  const sendMessage = (text: string) => {
    if(!ws.current || ws.current.readyState !== WebSocket.OPEN) return
    setMessages((prev) => [...prev, { content: text, isUser: true }])
    ws.current.send(text)
  }

  return {
    messages,
    sendMessage,
  }
}