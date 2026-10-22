export function Marquee() {
  const items = [
    "МЦК КИТС",
    "БЕСПЛАТНО",
    "РЕГИСТРАЦИЯ ОТКРЫТА",
    "НАШ.DEV",
    "23 ОКТЯБРЯ",
  ];
  const line = items.join("  //  ") + "  //  ";
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 hidden h-10 overflow-hidden bg-[#CCFF00] text-black sm:block">
      <div className="flex h-full items-center overflow-hidden whitespace-nowrap font-mono text-sm font-medium tracking-[.15em]">
        <div className="flex shrink-0 animate-[nashMarquee_32s_linear_infinite]">
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="px-6">
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
