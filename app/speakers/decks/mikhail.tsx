"use client";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS } from "../data";
import { SpeakerHero, TerminalCard, Stat, Prompt, type DeckProps } from "./shared";

export function MikhailDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.mikhail.slideCount;
  return (
    <>
      <SpeakerHero
        id="mikhail"
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
        <Prompt cmd="./brief" />
        <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
          5 вопросов, которые спасают проект
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2 lg:mt-6 lg:gap-4 2xl:mt-8 2xl:gap-6">
          {[
            ["1. Для чего вам понадобился логотип?", "Что он должен транслировать? Какую задачу решает?"],
            ["2. Что должен испытать клиент в первые секунды?", "Доверие? Восторг? Спокойствие? Это определяет визуальный язык."],
            ["3. Какой бизнес-показатель меняем?", "Выручку, скорость, стоимость, безопасность или нагрузку?"],
            ["4. Как поймём, что проект удался?", "Метрика. Конкретная. Проверяемая. До старта."],
            ["5. Кто подписывает бюджет?", "Кто принимает решение, кроме вас? Кто может сказать «нет»?"],
          ].map(([title, body], i) => (
            <TerminalCard key={i} title={title} body={body} delay={200 + i * 50} />
          ))}
        </div>
      </SlideShell>
      <SlideShell
        active={index === 2}
        index={2}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative max-w-full 2xl:max-w-[68%]">
          <Prompt cmd="./process" />
          <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
            5 вопросов → один документ → один прототип
          </h2>
          <p className="anim mt-2 text-sm leading-relaxed text-[#ccc] [animation-delay:200ms] sm:mt-3 sm:text-base md:text-lg lg:mt-3 lg:text-lg xl:mt-3 xl:text-lg 2xl:mt-5 2xl:text-[22px]">
            Не начинайте с дизайна. Начните с брифа. Один документ, который
            фиксирует ожидания и критерии успеха.
          </p>
          <div className="anim mt-4 max-w-[900px] border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-3 text-sm leading-relaxed text-[#ddd] [animation-delay:250ms] sm:mt-6 sm:p-4 sm:text-base lg:mt-6 lg:p-4 lg:text-base 2xl:mt-10 2xl:p-6 2xl:text-xl">
            «Брат, сделай сайт как у Apple, но бюджет 15 тыс.» — это не бриф.
            Это начало марионеточного театра.
          </div>
        </div>
        <div className="anim absolute right-20 top-1/2 z-10 hidden -translate-y-1/2 border border-[#222] bg-[#0a0a0a] p-2 [animation-delay:300ms] 2xl:block">
          <img src="/speakers/4/playwright.png" alt="Playwright" className="h-[320px] w-auto object-contain" />
        </div>
      </SlideShell>
      <SlideShell
        active={index === 3}
        index={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative max-w-full 2xl:max-w-[68%]">
          <Prompt cmd="./marionette" />
          <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
            Как не быть марионеткой в руках клиента?
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 lg:mt-4 lg:gap-4 2xl:mt-6">
            <TerminalCard title="Без брифа" body="Клиент дёргает за ниточки. Вы делаете «красиво», но не решаете задачу. Переделки. Выгорание." delay={200} danger />
            <TerminalCard title="С брифом" body="Вы — партнёр. Есть критерии успеха. Есть границы. Есть уважение к процессу." delay={250} success />
          </div>
        </div>
        <div className="anim absolute right-20 top-1/2 z-10 hidden -translate-y-1/2 border border-[#222] bg-[#0a0a0a] p-2 [animation-delay:300ms] 2xl:block">
          <img src="/speakers/4/man-tired.png" alt="Выгорание" className="h-[320px] w-auto object-contain" />
        </div>
      </SlideShell>
      <SlideShell
        active={index === 4}
        index={4}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./result" />
        <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
          Проект удался, когда метрика изменилась
        </h2>
        <div className="anim mt-6 flex flex-wrap gap-6 [animation-delay:200ms] sm:mt-8 sm:gap-10 lg:mt-8 lg:gap-10 2xl:mt-10 2xl:gap-16">
          <Stat num="1" label="документ с ответами" />
          <Stat num="1" label="прототип до старта" />
          <Stat num="0" label="переделок" />
        </div>
        <div className="anim mt-6 flex flex-col items-start gap-4 [animation-delay:250ms] sm:mt-8 sm:gap-6 lg:mt-8 lg:gap-6 2xl:mt-12 2xl:flex-row 2xl:items-center 2xl:gap-10">
          <img
            src="/speakers/4/rd-qr-code.svg"
            alt="QR"
            className="h-24 w-24 bg-white p-2 sm:h-32 sm:w-32 lg:h-32 lg:w-32 2xl:h-40 2xl:w-40"
          />
          <div className="w-full flex-1 border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-3 text-sm leading-relaxed text-[#ddd] sm:p-4 sm:text-base lg:p-4 lg:text-base 2xl:p-6 2xl:text-xl">
            «Ожидания оправданы, когда они зафиксированы. Иначе это не
            ожидания, а сюрприз».
          </div>
        </div>
      </SlideShell>
    </>
  );
}
