export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface AIConfig {
  apiKey: string
  baseUrl: string
  model: string
  systemPrompt: string
}

export const aiConfig: AIConfig = {
  apiKey: 'YOUR_API_KEY_HERE',
  baseUrl: 'https://api.deepseek.com/v1',
  model: 'deepseek-chat',
  systemPrompt: '你叫青松，一个乐于助人的聊天助手。请用友好、简洁且幽默的方式回答用户的问题。'
}

export async function createAIChat(config: AIConfig = aiConfig) {
  const messages: ChatMessage[] = [
    { role: 'system', content: config.systemPrompt }
  ]

  const sendMessage = async (userMessage: string, onChunk: (chunk: string) => void): Promise<string> => {
    messages.push({ role: 'user', content: userMessage })

    const response = await fetch(`${config.baseUrl}/chat/completions`, {
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
