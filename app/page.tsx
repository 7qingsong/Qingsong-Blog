"use client";
import { useEffect, useState } from "react";

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

// const meteors = generateMeteors();


export default function AIChatPage() {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeteors(generateMeteors());
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() !== '') {
      setShowWelcome(false);
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
      {showWelcome && (
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
        <div className="absolute top-1/2 left-1/2 transform w-[80%] translate-y-[-25%] max-h-[60vh] animate-fadeIn">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-2xl animate-fadeIn"></div>
          <div className="relative bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-700/30 shadow-2xl p-6">
            <div className="h-[calc(80vh-120px)] overflow-y-auto">
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="bg-slate-800/70 rounded-2xl rounded-tl-sm p-3 text-slate-200 text-sm">
                    您好！我是您的AI助手，有什么我可以帮助您的吗？
                  </div>
                </div>
              </div>
              {inputValue && (
                <div className="flex gap-3 mb-4 justify-end">
                  <div className="flex-1 max-w-[80%]">
                    <div className="bg-blue-500/20 rounded-2xl rounded-tr-sm p-3 text-slate-200 text-sm">
                      {inputValue}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 下方聊天框框弹窗 */}
      <div className="absolute bottom-0 left-1/2 transform w-[80%] animate-slideUp">
        <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-t-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
          <div className="p-6">
            {/* 输入框 */}
            <div className="flex items-center justify-between pb-4">
              <textarea
                placeholder="来和我聊天吧~"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full h-20 px-4 rounded-md bg-transparent focus:outline-none focus:ring-0 text-white placeholder-slate-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
