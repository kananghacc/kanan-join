export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-canvas/88 backdrop-blur-md border-b border-hairline transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-xl tracking-tight font-bold text-ink">
            Learn With <span className="text-primary">Sam and Ash</span>
          </div>
        </div>
        <div className="flex items-center">
          <a
            href="#lead-form"
            className="hidden sm:inline-flex items-center justify-center bg-primary text-white text-[14px] font-bold px-6 py-2.5 rounded-full transition-all duration-200 hover:bg-primary-hover hover:scale-105 active:scale-95 shadow-sm shadow-primary/20"
          >
            Get Free Mock Test
          </a>
        </div>
      </div>
    </header>
  );
}
