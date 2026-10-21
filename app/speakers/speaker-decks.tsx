"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScrambleText } from "./components/scramble-text";
import { SlideShell } from "./components/slide-shell";
import { SPEAKERS, type DeckId } from "./data";
interface DeckProps {
  total: number;
  index: number;
  onPrev: () => void;
  onNext: () => void;
}
function SpeakerHero({
  id,
  active,
  index,
  total,
  onPrev,
  onNext,
}: DeckProps & { id: DeckId; active: boolean }) {
  const s = SPEAKERS[id];
  const isDuo = s.photos.length === 2;
  return (
    <SlideShell
      active={active}
      index={index}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
    >
      {isDuo ? (
        <div className="flex flex-col items-center gap-10">
          <div className="anim flex shrink-0 gap-6 [animation-delay:100ms]">
            {s.photos.map((p, i) => (
              <div
                key={i}
                className="relative h-[420px] w-[340px] overflow-hidden border border-[#222] transition-colors hover:border-[#CCFF00]"
              >
                <Image
                  src={p}
                  alt={s.name}
                  fill
                  sizes="340px"
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
          <div className="w-full max-w-[720px]">
            <ScrambleText
              text={s.name}
              as="h1"
              className="anim min-h-[80px] text-[64px] font-medium leading-[1.05] tracking-[-.03em] [animation-delay:150ms]"
            />
            <div className="anim mt-3 font-mono text-base text-[#CCFF00] [animation-delay:200ms]">
              {s.subtitle}
            </div>
            <p className="anim mt-4 text-[22px] leading-relaxed text-[#ccc] [animation-delay:250ms]">
              {s.shortBio}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-16">
          <div className="anim flex shrink-0 [animation-delay:100ms]">
            <div className="relative h-[460px] w-[460px] overflow-hidden border border-[#222] transition-colors hover:border-[#CCFF00]">
              <Image
                src={s.photos[0]}
                alt={s.name}
                fill
                sizes="460px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <ScrambleText
              text={s.name}
              as="h1"
              className="anim min-h-[106px] text-[88px] font-medium leading-[1.05] tracking-[-.03em] [animation-delay:150ms]"
            />
            <div className="anim mt-3 font-mono text-base text-[#CCFF00] [animation-delay:200ms]">
              {s.subtitle}
            </div>
            <p className="anim mt-6 max-w-[920px] text-[22px] leading-relaxed text-[#ccc] [animation-delay:250ms]">
              {s.shortBio}
            </p>
          </div>
        </div>
      )}
    </SlideShell>
  );
}
function TerminalCard({
  title,
  body,
  delay,
  danger,
  success,
  className,
}: {
  title: string;
  body: React.ReactNode;
  delay: number;
  danger?: boolean;
  success?: boolean;
  className?: string;
}) {
  const border = danger ? "#FF3B3B" : success ? "#CCFF00" : "#222";
  return (
    <Card
      className={cn(
        "anim gap-3 rounded-none border bg-[rgba(10,10,10,.6)] px-8 py-8 ring-0 backdrop-blur-xl",
        className,
      )}
      style={{ borderColor: border, animationDelay: `${delay}ms` }}
    >
      <h3
        className="font-mono text-[20px] font-medium"
        style={{ color: danger ? "#FF3B3B" : "#CCFF00" }}
      >
        {title}
      </h3>
      <p className="text-[20px] leading-relaxed text-[#ccc]">{body}</p>
    </Card>
  );
}
function Stat({
  num,
  label,
  accent,
}: {
  num: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="border-l-2 pl-6" style={{ borderColor: accent ?? "#CCFF00" }}>
      <div
        className="text-[76px] font-medium leading-none tracking-[-.03em]"
        style={{ color: accent }}
      >
        {num}
      </div>
      <div className="mt-3 font-mono text-[13px] text-[#888]">{label}</div>
    </div>
  );
}
function Prompt({ cmd, delay = 100 }: { cmd: string; delay?: number }) {
  return (
    <div
      className="anim font-mono text-base text-[#CCFF00]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="font-medium">$</span> {cmd}
    </div>
  );
}
/* ══════════════════════════════════════════════════════════════════
AMIR — 4 slides
══════════════════════════════════════════════════════════════════ */
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
        <pre className="anim pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 select-none whitespace-pre font-mono text-[15px] font-medium leading-[1.1] text-[#CCFF00] opacity-10 [animation-delay:100ms]">
          {`    _    __  __ ___ ____
   / \\  |  \\/  |_ _|  _ \\
  / _ \\ | |\\/| || || |_) |
 / ___ \\| |  | || ||  _ <
/_/   \\_\\_|  |_|___|_| \\_\\
__  __ _____ _   _ 
|  \\/  | ____| | | |
| |\\/| |  _| | | | |
| |  | | |___| |_| |
|_|  |_|_____|\\___/`}
        </pre>
        <div className="relative max-w-[68%]">
          <Prompt cmd="./history --amir" />
          <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
            Как я стал волонтёром в 16 лет
          </h2>
          <p className="anim mt-6 text-[22px] leading-relaxed text-[#ccc] [animation-delay:200ms]">
            Я не просыпался с мыслью: «Сегодня я стану волонтёром». Всё
            произошло случайно. Как и большинство великих открытий. Например,
            пенициллин. Или мемы про котов.
          </p>
          <div className="anim mt-10 max-w-[900px] border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-6 text-xl leading-relaxed text-[#ddd] [animation-delay:250ms]">
            «С большой силой приходит большая ответственность». Суперсил у меня
            пока нет, но ответственность уже появилась.
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
        <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
          С чего начать активную деятельность?
        </h2>
        <p className="anim mt-5 max-w-[920px] text-[22px] leading-relaxed text-[#ccc] [animation-delay:200ms]">
          «Здравствуйте, а вам случайно не нужны волонтёры?» Первое сообщение
          всегда страшное. Но потом ты понимаешь, что люди отвечают. Иногда
          даже «да».
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <TerminalCard
            title="Спорт"
            body="«Ак Барс», «Рубин», марафон «Ночная Казань». Если любишь спорт и движ — тебе сюда."
            delay={250}
          />
          <TerminalCard
            title="Международные"
            body="Саммит АСЕАН, Global Summit, форумы БРИКС. Если тянет к масштабу — пробуй."
            delay={300}
          />
          <TerminalCard
            title="Молодёжь"
            body="Лагерь «Сэлэт», образовательные форумы. Если ближе общение — это твоё."
            delay={350}
          />
          <TerminalCard
            title="Экология"
            body="Городские фестивали, экологические акции, благотворительные проекты. Начни с малого."
            delay={400}
          />
        </div>
      </SlideShell>
      <SlideShell
        active={index === 3}
        index={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <pre className="anim pointer-events-none absolute bottom-[6%] left-[4%] select-none whitespace-pre font-mono text-[15px] font-medium leading-[1.1] text-[#CCFF00] opacity-10 [animation-delay:100ms]">
          {`   ____                 _   
  / ___| __ _ _ __   __| | __ _ 
 | |  _ / _\` | '_ \\ / _\` |/ _\` |
 | |_| | (_| | | | | (_| | (_| |
  \\____|\\__,_|_| |_|\\__,_|\\__,_|`}
        </pre>
        <div className="relative max-w-[68%]">
          <Prompt cmd="./networking" />
          <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
            Это не «давайте будем полезны друг другу»
          </h2>
          <p className="anim mt-6 text-[22px] leading-relaxed text-[#ccc] [animation-delay:200ms]">
            «Давайте будем полезны друг другу» звучит как сделка. Просто
            поздоровайтесь. И не ведите себя так, будто вы пришли брать
            интервью для Forbes.
          </p>
          <div className="anim mt-10 max-w-[900px] border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-6 text-xl leading-relaxed text-[#ddd] [animation-delay:250ms]">
            «Один обычный разговор может привести вас к новой возможности.
            Поэтому волонтёрство — это не только помощь другим, но и
            возможность развиваться самому».
          </div>
        </div>
      </SlideShell>
    </>
  );
}
/* ══════════════════════════════════════════════════════════════════
NIYAZ — 4 slides
══════════════════════════════════════════════════════════════════ */
export function NiyazDeck({ index, onPrev, onNext }: DeckProps) {
  const total = SPEAKERS.niyaz.slideCount;
  return (
    <>
      <SpeakerHero
        id="niyaz"
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
        <img
          src="/speakers/2/VershinyTop_Logotype.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-[55%] object-contain p-24 opacity-20"
          style={{
            maskImage: "linear-gradient(to left, black 30%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 30%, transparent 100%)",
          }}
        />
        <div className="relative max-w-[68%]">
          <Prompt cmd="./unidoka --events" />
          <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
            Unidoka Events
          </h2>
          <p className="anim mt-5 text-[22px] leading-relaxed text-[#ccc] [animation-delay:200ms]">
            Календарь IT и бизнес-событий. Все конференции, форумы, митапы и
            хакатоны в одном месте.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4">
            <TerminalCard
              title="Фильтруй"
              body="По дате, городу и направлению. Находи то, что действительно важно."
              delay={250}
            />
            <TerminalCard
              title="Добавляй"
              body="Свои события. Делись с сообществом."
              delay={300}
            />
            <TerminalCard
              title="Не пропускай"
              body="Подписывайся на обновления и будь в курсе."
              delay={350}
            />
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
        <Prompt cmd="unidoka --stats" />
        <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
          IT-события для своих
        </h2>
        <p className="anim mt-5 text-[22px] leading-relaxed text-[#ccc] [animation-delay:200ms]">
          Закрытое IT-сообщество. События, статьи, нетворкинг и проекты.
        </p>
        <div className="anim mt-12 flex gap-16 [animation-delay:250ms]">
          <Stat num="100+" label="событий в календаре" />
          <Stat num="5 мин" label="на добавление" />
          <Stat num="1" label="место для всех" />
        </div>
      </SlideShell>
      <SlideShell
        active={index === 3}
        index={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <Prompt cmd="./live-demo" />
        <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
          unidoka.com/events — вживую
        </h2>
        <div className="anim mt-8 flex items-start gap-12 [animation-delay:200ms]">
          <div className="relative h-[420px] w-[420px] shrink-0 border border-[#222] bg-white p-2">
            <img
              src="/speakers/2/events-qr.svg"
              alt="QR: unidoka.com/events"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 border border-[#222] bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-[#888]">
              <span className="inline-block size-2 rounded-full bg-[#CCFF00]" />
              unidoka.com/events
            </div>
            <div className="h-[380px] w-full overflow-hidden border border-t-0 border-[#222]">
              <iframe
                src="https://unidoka.com/events"
                title="Unidoka Events"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-4 font-mono text-sm text-[#666]">
							// отсканируй QR или открой на своём устройстве прямо сейчас
            </p>
          </div>
        </div>
      </SlideShell>
    </>
  );
}
/* ══════════════════════════════════════════════════════════════════
ANASTASIA — 8 slides
══════════════════════════════════════════════════════════════════ */
function ErrorSlide({
  active,
  idx,
  total,
  onPrev,
  onNext,
  title,
  desc,
  bad,
  good,
  badLabel = "Плохо",
}: {
  active: boolean;
  idx: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  title: string;
  desc: string;
  bad: React.ReactNode;
  good: React.ReactNode;
  badLabel?: string;
}) {
  return (
    <SlideShell
      active={active}
      index={idx}
      total={total}
      onPrev={onPrev}
      onNext={onNext}
    >
      <Prompt cmd={`./error-0${idx}`} />
      <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
        {title}
      </h2>
      <p className="anim mt-5 max-w-[920px] text-[22px] leading-relaxed text-[#ccc] [animation-delay:200ms]">
        {desc}
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <TerminalCard title={badLabel} body={bad} delay={250} danger />
        <TerminalCard title="Хорошо" body={good} delay={300} success />
      </div>
    </SlideShell>
  );
}
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
        <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
          97% посетителей уходят с вашего сайта
        </h2>
        <div className="anim mt-12 flex gap-16 [animation-delay:200ms]">
          <Stat num="97%" label="посетителей уходят" accent="#FF3B3B" />
          <Stat num="1-3%" label="средняя конверсия" />
        </div>
        <p className="anim mt-10 max-w-[920px] text-[22px] leading-relaxed text-[#ccc] [animation-delay:250ms]">
          Причины: не поняли ценность · не доверились · перегрузились ·
          столкнулись с неопределённостью.
        </p>
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
        <pre className="anim pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 select-none whitespace-pre font-mono text-[15px] font-medium leading-[1.1] text-[#CCFF00] opacity-10 [animation-delay:100ms]">
          {`    _---_    
   /     \\    
  | () () |    
   \\  ^  /     
    |||||      
    |||||`}
        </pre>
        <div className="relative max-w-[68%]">
          <Prompt cmd="./conclusion" />
          <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
            Конверсия начинается не с рекламы
          </h2>
          <p className="anim mt-5 text-[22px] leading-relaxed text-[#ccc] [animation-delay:200ms]">
            По данным Forrester Research, улучшение UX может повысить конверсию
            до <span className="font-medium text-[#CCFF00]">×5</span>.
          </p>
          <div className="anim mt-10 max-w-[900px] border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-6 text-xl leading-relaxed text-[#ddd] [animation-delay:250ms]">
            «Хороший интерфейс помогает быстрее понять, быстрее довериться и
            быстрее сделать следующий шаг».
          </div>
        </div>
      </SlideShell>
    </>
  );
}
/* ══════════════════════════════════════════════════════════════════
MIKHAIL & DANIL — 5 slides
══════════════════════════════════════════════════════════════════ */
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
        <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
          5 вопросов, которые спасают проект
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            [
              "1. Для чего вам понадобился логотип?",
              "Что он должен транслировать? Какую задачу решает?",
            ],
            [
              "2. Что должен испытать клиент в первые секунды?",
              "Доверие? Восторг? Спокойствие? Это определяет визуальный язык.",
            ],
            [
              "3. Какой бизнес-показатель меняем?",
              "Выручку, скорость, стоимость, безопасность или нагрузку?",
            ],
            [
              "4. Как поймём, что проект удался?",
              "Метрика. Конкретная. Проверяемая. До старта.",
            ],
            [
              "5. Кто подписывает бюджет?",
              "Кто принимает решение, кроме вас? Кто может сказать «нет»?",
            ],
          ].map(([title, body], i) => (
            <TerminalCard
              key={i}
              title={title}
              body={body}
              delay={200 + i * 50}
            />
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
        <div className="relative max-w-[68%]">
          <Prompt cmd="./process" />
          <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
            5 вопросов → один документ → один прототип
          </h2>
          <p className="anim mt-5 text-[22px] leading-relaxed text-[#ccc] [animation-delay:200ms]">
            Не начинайте с дизайна. Начните с брифа. Один документ, который
            фиксирует ожидания и критерии успеха.
          </p>
          <div className="anim mt-10 max-w-[900px] border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-6 text-xl leading-relaxed text-[#ddd] [animation-delay:250ms]">
            «Брат, сделай сайт как у Apple, но бюджет 15 тыс.» — это не бриф.
            Это начало марионеточного театра.
          </div>
        </div>
        {/* ponytail: image as a visible framed panel, not a faded bg */}
        <div className="anim absolute right-20 top-1/2 z-10 -translate-y-1/2 border border-[#222] bg-[#0a0a0a] p-2 [animation-delay:300ms]">
          <img
            src="/speakers/4/playwright.png"
            alt="Playwright"
            className="h-[320px] w-auto object-contain"
          />
        </div>
      </SlideShell>
      <SlideShell
        active={index === 3}
        index={3}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      >
        <div className="relative max-w-[68%]">
          <Prompt cmd="./marionette" />
          <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
            Как не быть марионеткой в руках клиента?
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4">
            <TerminalCard
              title="Без брифа"
              body="Клиент дёргает за ниточки. Вы делаете «красиво», но не решаете задачу. Переделки. Выгорание."
              delay={200}
              danger
            />
            <TerminalCard
              title="С брифом"
              body="Вы — партнёр. Есть критерии успеха. Есть границы. Есть уважение к процессу."
              delay={250}
              success
            />
          </div>
        </div>
        {/* ponytail: image as a visible framed panel, not a full-bg overlay */}
        <div className="anim absolute right-20 top-1/2 z-10 -translate-y-1/2 border border-[#222] bg-[#0a0a0a] p-2 [animation-delay:300ms]">
          <img
            src="/speakers/4/man-tired.png"
            alt="Выгорание"
            className="h-[320px] w-auto object-contain"
          />
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
        <h2 className="anim mt-3 text-[54px] font-medium leading-[1.15] tracking-[-.02em] [animation-delay:150ms]">
          Проект удался, когда метрика изменилась
        </h2>
        <div className="anim mt-10 flex gap-16 [animation-delay:200ms]">
          <Stat num="1" label="документ с ответами" />
          <Stat num="1" label="прототип до старта" />
          <Stat num="0" label="переделок" />
        </div>
        <div className="anim mt-12 flex items-center gap-10 [animation-delay:250ms]">
          <img
            src="/speakers/4/rd-qr-code.svg"
            alt="QR"
            className="h-40 w-40 bg-white p-2.5"
          />
          <div className="flex-1 border-l-2 border-[#CCFF00] bg-[rgba(10,10,10,.5)] p-6 text-xl leading-relaxed text-[#ddd]">
            «Ожидания оправданы, когда они зафиксированы. Иначе это не
            ожидания, а сюрприз».
          </div>
        </div>
      </SlideShell>
    </>
  );
}
