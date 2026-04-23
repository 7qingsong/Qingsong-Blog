export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="bg-pink">
        123
      </div>
      {children}
    </div>
  );
}
