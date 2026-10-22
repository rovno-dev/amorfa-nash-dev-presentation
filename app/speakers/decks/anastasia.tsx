"use client";
import { SlideShell } from "../components/slide-shell";
import { SPEAKERS } from "../data";
import {
  SpeakerHero,
  Stat,
  Prompt,
  ErrorSlide,
  type DeckProps,
} from "./shared";

export function AnastasiaDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.anastasia.slideCount;
  return (
    <>
      <SpeakerHero
        id="anastasia"
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
        <Prompt cmd="./problem" />
        <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
          97% посетителей уходят с вашего сайта
        </h2>
        <div className="anim mt-6 flex flex-wrap gap-6 [animation-delay:200ms] sm:mt-8 sm:gap-10 lg:mt-8 lg:gap-10 2xl:mt-12 2xl:gap-16">
          <Stat num="97%" label="посетителей уходят" accent="#FF3B3B" />
          <Stat num="1-3%" label="средняя конверсия" />
        </div>
      </SlideShell>
      <ErrorSlide
        active={index === 2}
        idx={2}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
        title="Эффект первого экрана"
        desc="50 миллисекунд на первое впечатление. Если первый экран перегружен, пользователь теряет интерес ещё до скролла."
        bad="Перегруженный первый экран. Абстрактные формулировки."
        good="Чёткий оффер. Одна приоритетная кнопка. Визуальная иерархия."
      />
      <ErrorSlide
        active={index === 3}
        idx={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
        title="Эффект неопределённости"
        desc="Мозг избегает ситуаций, где результат непредсказуем. Если пользователь не понимает, что будет после клика, он не кликнет."
        bad={
          <>
            <span>«Отправить»</span>
            <br />
            <span>«Оставьте заявку»</span>
          </>
        }
        good={
          <>
            <span>«Получить бесплатный аудит за 3 минуты»</span>
            <br />
            <span>«Получите расчёт стоимости в Telegram через 5 минут»</span>
          </>
        }
      />
      <ErrorSlide
        active={index === 4}
        idx={4}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
        title="Когнитивная нагрузка"
        desc="Когда интерфейс требует слишком много операций ввода, сравнения или запоминания, мозг переключается в режим энергосбережения — и пользователь уходит."
        bad="Формы с 10+ полями. Меню из 7+ пунктов. Сложная фильтрация."
        good="3–4 поля на экран. Пошаговая структура. Группировка и визуальная иерархия."
      />
      <ErrorSlide
        active={index === 5}
        idx={5}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
        title="Социальное доказательство"
        desc="В условиях неопределённости человек ориентируется на поведение других."
        bad="«Нам доверяют» без имён. Отзывы без фото и должности. «Более 1000 клиентов» — кто именно?"
        good="Логотипы узнаваемых компаний. Отзывы с результатом. Кейс «было → стало → за какой срок»."
        badLabel="Не работает"
      />
      <ErrorSlide
        active={index === 6}
        idx={6}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
        title="Паралич выбора"
        desc="Психолог Барри Шварц доказал: когда вариантов слишком много, человек часто не выбирает ничего."
        bad="12 тарифов. 6 кнопок. Меню из 8 пунктов."
        good="3 понятных тарифа. Один выделен как «самый популярный». Подсказки: «выбрали 80% клиентов»."
      />
      <SlideShell
        active={index === 7}
        index={7}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <pre className="anim pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 select-none whitespace-pre font-mono text-[15px] font-medium leading-[1.1] text-[#CCFF00] opacity-10 [animation-delay:100ms] 2xl:block">
          {`    _---_    
   /     \\    
  | () () |    
   \\  ^  /     
    |||||      
    |||||`}
        </pre>
        <div className="relative max-w-full 2xl:max-w-[68%]">
          <Prompt cmd="./conclusion" />
          <h2 className="anim mt-2 text-[22px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms] sm:mt-3 sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[54px]">
            Конверсия начинается не с рекламы
          </h2>
          <p className="anim mt-3 text-sm leading-relaxed text-[#ccc] [animation-delay:200ms] sm:mt-4 sm:text-base md:text-lg lg:mt-4 lg:text-lg xl:mt-4 xl:text-lg 2xl:mt-5 2xl:text-[22px]">
            По данным Forrester Research, улучшение UX может повысить конверсию
            до <span className="font-medium text-[#CCFF00]">×5</span>.
          </p>
          <div className="anim mt-4 max-w-[900px] border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-3 text-sm leading-relaxed text-[#ddd] [animation-delay:250ms] sm:mt-6 sm:p-4 sm:text-base lg:mt-6 lg:p-4 lg:text-base 2xl:mt-10 2xl:p-6 2xl:text-xl">
            «Хороший интерфейс помогает быстрее понять, быстрее довериться и
            быстрее сделать следующий шаг».
          </div>
        </div>
      </SlideShell>
    </>
  );
}
