"use client";
import { useState } from "react";
import AIChatPage from "./components/AIChatPage";
import BlogPage from "./components/BlogPage";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<'ai' | 'blog'>('ai');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(currentPage === 'ai' ? 'blog' : 'ai');
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative min-h-screen">
      {currentPage === 'ai' && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <AIChatPage isTransitioningOut={isTransitioning && currentPage === 'ai'} />
        </div>
      )}
      
      {currentPage === 'blog' && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <BlogPage isTransitioningIn={!isTransitioning && currentPage === 'blog'} />
        </div>
      )}
      
      <button
        onClick={handlePageChange}
        disabled={isTransitioning}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        title={currentPage === 'ai' ? '切换到博客' : '切换到AI聊天'}
      >
        {currentPage === 'ai' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
