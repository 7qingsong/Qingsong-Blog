"use client";
import { useEffect, useState } from "react";
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
    duration: `${2 + Math.random() * 3}s`
  }));
};

export default function AIChatPage() {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const {messages, sendMessage} = useAIChat();

  useEffect(() => {
    setMeteors(generateMeteors());
  }, []);

  const handleInputChange = (value: string) => {
    if (value.trim()) {
      setShowWelcome(false);
    }
  };

  const handleSend = (text: string) => {
    if (text.trim()) {
      setShowWelcome(false);
    }
    sendMessage(text);
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
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/5 blur-3xl animate-welcome"></div>
            <h1 className="text-5xl font-bold text-white animate-welcome relative z-10">
              欢迎进入AI聊天室
            </h1>
          </div>
        </div>
      )}

      {/* 毛玻璃对话界面 */}
      {!showWelcome && (
        <ChatBox
          messages={messages}
          onSend={handleSend}
          onInputChange={handleInputChange}
        />
      )}

      {/* 欢迎状态下只显示输入框 */}
      {showWelcome && (
        <ChatBox
          messages={messages}
          onSend={handleSend}
          onInputChange={handleInputChange}
          showInputOnly={true}
        />
      )}
    </div>
  );
}
