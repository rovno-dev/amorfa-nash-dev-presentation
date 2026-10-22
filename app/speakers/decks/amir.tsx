"use client";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS } from "../data";
import { SpeakerHero, TerminalCard, Prompt, ThanksSlide, type DeckProps } from "./shared";

export function AmirDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.amir.slideCount;
  return (
    <>
      <SpeakerHero
        id="amir"
        active={index === 0}
        index={0}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />
      <SlideShell
        active={index === 1}
        index={1}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <pre className="anim pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 select-none whitespace-pre font-mono text-[15px] font-medium leading-[1.1] text-[#CCFF00] opacity-10 [animation-delay:100ms] 2xl:block">
          {`    _    __  __ ___ ____
   / \\  |  \\/  |_ _|  _ \\
  / _ \\ | |\\/| || || |_) |
 / ___ \\| |  | || ||  _ <
/_/   \\_\\_|  |_|___|_| \\_\\
__  __ _____ _   _ 
|  \\/  | ____| | | |
| |\\/| |  _| | | | |
|  | | |___| |_| |
|_|  |_|_____|\\___/`}
        </pre>
        <div className="relative max-w-full 2xl:max-w-[68%]">
          <Prompt cmd="./history --amir" />
          <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
            Как я стал волонтёром в 16 лет
          </h2>
          <div className="anim mt-4 max-w-[900px] border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-3 text-sm leading-relaxed text-[#ddd] [animation-delay:250ms] sm:mt-6 sm:p-4 sm:text-base lg:mt-6 lg:p-4 lg:text-base 2xl:mt-10 2xl:p-6 2xl:text-xl">
            Я не просыпался с мыслью: «Сегодня я стану волонтёром». Всё
            произошло случайно. Как и большинство великих открытий. Например,
            пенициллин. Или мемы про котов.
          </div>
        </div>
      </SlideShell>
      <SlideShell
        active={index === 2}
        index={2}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./first-step" />
        <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
          С чего начать активную деятельность?
        </h2>
        <p className="anim mt-3 max-w-[920px] text-sm leading-relaxed text-[#ccc] [animation-delay:200ms] sm:mt-4 sm:text-base md:text-lg lg:mt-4 lg:text-lg xl:mt-4 xl:text-lg 2xl:mt-5 2xl:text-[22px]">
          «Здравствуйте, а вам случайно не нужны волонтёры?» Первое сообщение
          всегда страшное. Но потом ты понимаешь, что люди отвечают. Иногда
          даже «да».
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2 lg:mt-6 lg:gap-4 2xl:mt-10 2xl:gap-6">
          <TerminalCard title="Спорт" body="«Ак Барс», «Рубин», марафон «Ночная Казань». Если любишь спорт и движ - тебе сюда." delay={250} />
          <TerminalCard title="Международные" body="Саммит АСЕАН, Global Summit, форумы БРИКС. Если тянет к масштабу - пробуй." delay={300} />
          <TerminalCard title="Молодёжь" body="Лагерь «Сэлэт», образовательные форумы. Если ближе общение - это твоё." delay={350} />
          <TerminalCard title="Экология" body="Городские фестивали, экологические акции, благотворительные проекты. Начни с малого." delay={400} />
        </div>
      </SlideShell>
      <SlideShell
        active={index === 3}
        index={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <pre className="anim pointer-events-none absolute bottom-[6%] left-[4%] hidden select-none whitespace-pre font-mono text-[15px] font-medium leading-[1.1] text-[#CCFF00] opacity-10 [animation-delay:100ms] 2xl:block">
          {`   ____                 _   
  / ___| __ _ _ __   __| | __ _ 
 | |  _ / _\` | '_ \\ / _\` |/ _\` |
 | |_| | (_| | | | | (_| | (_| |
  \\____|\\__,_|_| |_|\\__,_|\\__,_|`}
        </pre>
        <div className="relative max-w-full 2xl:max-w-[68%]">
          <Prompt cmd="./networking" />
          <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
            Это не «давайте будем полезны друг другу»
          </h2>
          <div className="anim mt-4 max-w-[900px] border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-3 text-sm leading-relaxed text-[#ddd] [animation-delay:250ms] sm:mt-6 sm:p-4 sm:text-base lg:mt-6 lg:p-4 lg:text-base 2xl:mt-10 2xl:p-6 2xl:text-xl">
            «Один обычный разговор может привести вас к новой возможности.
            Поэтому волонтёрство - это не только помощь другим, но и
            возможность развиваться самому».
          </div>
        </div>
      </SlideShell>
      <ThanksSlide active={index === 4} index={4} total={total} onPrev={onPrev} onNext={onNext} />
    </>
  );
}
