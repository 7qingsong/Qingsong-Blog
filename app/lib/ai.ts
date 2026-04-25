export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatInstance {
  sendMessage: (userMessage: string, onChunk: (chunk: string) => void) => Promise<string>
  messages: ChatMessage[]
}

export interface AIConfig {
  apiKey: string
  baseUrl: string
  model: string
  systemPrompt: string
}

export const aiConfig: AIConfig = {
  apiKey: 'sk-aqdmsksxyqqlzfwpvdstlabzsevitvqihpnmwcubxlvovvwr',
  baseUrl: 'https://api.siliconflow.cn/v1/chat/completions',
  model: 'Qwen/Qwen2.5-32B-Instruct',
  systemPrompt: '你叫青松，一个乐于助人的聊天助手。请用友好、简洁且幽默的方式回答用户的问题。'
}

export async function createAIChat(config: AIConfig = aiConfig): Promise<ChatInstance> {
  const messages: ChatMessage[] = [
    { role: 'system', content: config.systemPrompt }
  ]

  const compressContext = () => {
    if (messages.length > 10) {
      const recentMessages = messages.slice(-8)
      const compressedContext = {
        role: 'system' as const,
        content: `对话历史摘要：\n${recentMessages.map(m => `${m.role === 'user' ? '用户' : '助手'}: ${m.content}`).join('\n')}`
      }
      messages.splice(1, messages.length - 8, compressedContext)
    }
  }

  const sendMessage = async (userMessage: string, onChunk: (chunk: string) => void): Promise<string> => {
    messages.push({ role: 'user', content: userMessage })
    
    compressContext()

    const response = await fetch(`${config.baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: messages,
        stream: true
      })
    })

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('无法获取响应流')
    }

    const decoder = new TextDecoder()
    let fullContent = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices?.[0]?.delta?.content
            if (content) {
              fullContent += content
              onChunk(content)
            }
          } catch {
          }
        }
      }
    }

    messages.push({ role: 'assistant', content: fullContent })
    compressContext()
    return fullContent
  }

  return { sendMessage, messages }
}

export async function sendAIMessage(
  userMessage: string,
  onChunk: (chunk: string) => void,
  config: AIConfig = aiConfig
): Promise<string> {
  const chat = await createAIChat(config)
  return chat.sendMessage(userMessage, onChunk)
}
