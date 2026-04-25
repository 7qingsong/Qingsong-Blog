interface BlogPageProps {
  isTransitioningIn?: boolean;
}

const BlogPage = ({ isTransitioningIn = false }: BlogPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-8 flex items-center justify-center">
      <div className={`max-w-4xl mx-auto w-full ${isTransitioningIn ? 'animate-scaleIn' : ''}`}>
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">青松的博客</h1>
          <p className="text-slate-400">记录生活，分享知识</p>
        </header>

        <section className="space-y-8">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
            <h2 className="text-2xl font-semibold mb-3">欢迎来到我的博客</h2>
            <p className="text-slate-300 mb-4">这是一个记录生活和分享知识的地方，希望你能在这里找到有用的信息。</p>
            <div className="text-slate-400 text-sm">2026年4月25日</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
            <h2 className="text-2xl font-semibold mb-3">AI 技术的发展</h2>
            <p className="text-slate-300 mb-4">人工智能技术正在快速发展，从大型语言模型到计算机视觉，AI正在改变我们的生活和工作方式。</p>
            <div className="text-slate-400 text-sm">2026年4月20日</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
            <h2 className="text-2xl font-semibold mb-3">前端开发的未来</h2>
            <p className="text-slate-300 mb-4">前端技术不断演进，从React到Next.js，从Tailwind CSS到现代CSS特性，前端开发变得越来越强大。</p>
            <div className="text-slate-400 text-sm">2026年4月15日</div>
          </div>
        </section>

        <footer className="mt-16 text-center text-slate-500">
          <p>© 2026 青松的博客. 保留所有权利.</p>
        </footer>
      </div>
    </div>
  )
}

export default BlogPage