"use client";
import { useEffect, useState, useRef } from "react";
import { useAIChat } from "./hooks/useAIChat";
import ChatBox from "./components/chetBox";

interface Meteor {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
}

const generateMeteors = (): Meteor[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${5 + Math.random() * 8}s`
  }));
};

export default function AIChatPage() {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {messages, sendMessage} = useAIChat();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeteors(generateMeteors());
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim()) {
      setShowWelcome(false);
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  const handleSend = (text: string) => {
    if (text.trim()) {
      setShowWelcome(false);
      sendMessage(text);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = '80px';
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right bottom, #000000, #18000c, #22011a, #280229, #27053d, #200843, #160c49, #00104f, #000e45, #030b3b, #050731, #050228)' }} />

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-meteor"
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration
          }}
        />
      ))}

      {/* 欢迎文字 */}
      {showWelcome && messages.length <= 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-5xl font-bold text-white animate-welcome">
            欢迎进入AI聊天室
          </h1>
        </div>
      )}

      {/* 毛玻璃对话界面 */}
      {!showWelcome && (
        <ChatBox
          messages={messages}
        />
      )}

      {/* 底部输入框 */}
      <div className="absolute bottom-0 left-1/2 transform w-[80%] animate-slideUp">
        <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-t-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <textarea
                ref={textareaRef}
                placeholder="来和我聊天吧~"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 200) + 'px';
                }}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputValue);
                  }
                }}
                rows={1}
                style={{ resize: 'none', overflow: 'hidden' }}
                className="w-full min-h-[80px] max-h-[200px] px-4 py-3 rounded-md bg-transparent focus:outline-none focus:ring-0 text-white placeholder-slate-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
