import { NextRequest } from "next/server";
import { WebSocketServer } from "ws";
import { IncomingMessage } from "http";

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

let wss: WebSocketServer | null = null;

function getServer() {
  if(!wss){
    wss = new WebSocketServer({ noServer: true });
    wss.on('connection', (ws) => {
      console.log('客户端已连接');
      
      ws.on('message', async (data) => {
        const msg = data.toString()
        console.log(msg);
        //ai流式回复
        const reply =   `你说的是：“${msg}”，我是ai助手，在用流式回复你`
        for(const char of reply){
          if(ws.readyState === ws.OPEN){
            ws.send(char)
            await new Promise(resolve => setTimeout(resolve, 100))
          }
        }
        ws.send('[DONE]')
      })

      ws.on('close', () => {
        console.log('客户端已断开连接');
      })
    })
  }
  return wss
}

export async function GET(req: NextRequest) {
  const upgrade = req.headers.get('upgrade') || ''
  if(upgrade.toLowerCase() !== 'websocket'){
    return new Response('需要websocket连接', {status: 400})
  }
  // @ts-expect-error: Next.js 内部 socket 类型兼容
  const socket = req.socket;
  const server = getServer();

  server.handleUpgrade(
    req as unknown as IncomingMessage,
    socket,
    Buffer.alloc(0),
    (ws) => {
      server.emit('connection', ws, req);
    }
  );

  return new Response('websocket连接成功', {status: 101})
}