"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DECK_ORDER, SPEAKERS, slugForDeck, type DeckId } from "./data";
import { EventDeck } from "./event-deck";
import { ContestDeck } from "./contest-deck";
import {
	AmirDeck,
	NiyazDeck,
	AnastasiaDeck,
	MikhailDeck,
} from "./speaker-decks";
import { Marquee } from "./components/marquee";
export function SpeakersDeck({ deckId }: { deckId: DeckId }) {
	return (
		<Suspense fallback={<div className="fixed inset-0 z-[100] bg-black" />}>
			<DeckInner deckId={deckId} />
		</Suspense>
	);
}
function DeckInner({ deckId }: { deckId: DeckId }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [slideIndex, setSlideIndex] = useState(() => {
		return searchParams.get("slide") === "last"
			? Math.max(0, SPEAKERS[deckId].slideCount - 1)
			: 0;
	});
	const [collapsed, setCollapsed] = useState(false);
	// Strip ?slide=last after initial read
	useEffect(() => {
		if (searchParams.get("slide")) {
			window.history.replaceState(null, "", window.location.pathname);
		}
	}, [searchParams]);
	// Reset slide on deck change
	useEffect(() => {
		const sp = new URLSearchParams(window.location.search);
		const init =
			sp.get("slide") === "last"
				? Math.max(0, SPEAKERS[deckId].slideCount - 1)
				: 0;
		setSlideIndex(init);
	}, [deckId]);
	// Mobile collapse
	useEffect(() => {
		if (typeof window !== "undefined" && window.innerWidth < 1024) {
			setCollapsed(true);
		}
	}, []);
	const goToDeck = useCallback(
		(id: DeckId) => {
			router.push(slugForDeck(id));
		},
		[router],
	);
	const changeSlide = useCallback(
		(dir: 1 | -1) => {
			const total = SPEAKERS[deckId].slideCount;
			const newIdx = slideIndex + dir;
			if (newIdx >= 0 && newIdx < total) {
				setSlideIndex(newIdx);
			} else if (dir === 1) {
				const cur = DECK_ORDER.indexOf(deckId);
				const next = DECK_ORDER[(cur + 1) % DECK_ORDER.length];
				router.push(slugForDeck(next));
			} else {
				const cur = DECK_ORDER.indexOf(deckId);
				const prev =
					DECK_ORDER[(cur - 1 + DECK_ORDER.length) % DECK_ORDER.length];
				router.push(slugForDeck(prev) + "?slide=last");
			}
		},
		[deckId, slideIndex, router],
	);
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const tag = document.activeElement?.tagName || "";
			if (["INPUT", "TEXTAREA"].includes(tag)) return;
			if (e.key === "ArrowRight" || e.key === " ") {
				e.preventDefault();
				changeSlide(1);
			} else if (e.key === "ArrowLeft") {
				e.preventDefault();
				changeSlide(-1);
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [changeSlide]);
	useEffect(() => {
		let sx = 0;
		let sy = 0;
		const onStart = (e: TouchEvent) => {
			sx = e.changedTouches[0].screenX;
			sy = e.changedTouches[0].screenY;
		};
		const onEnd = (e: TouchEvent) => {
			const dx = sx - e.changedTouches[0].screenX;
			const dy = sy - e.changedTouches[0].screenY;
			if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
				changeSlide(dx > 0 ? 1 : -1);
			}
		};
		document.addEventListener("touchstart", onStart, { passive: true });
		document.addEventListener("touchend", onEnd, { passive: true });
		return () => {
			document.removeEventListener("touchstart", onStart);
			document.removeEventListener("touchend", onEnd);
		};
	}, [changeSlide]);
	const nav = {
		onPrev: () => changeSlide(-1),
		onNext: () => changeSlide(1),
	};
	const total = SPEAKERS[deckId].slideCount;
	return (
		<div className="fixed inset-0 z-[100] flex overflow-hidden bg-black font-sans text-white">
			<style>{`
@keyframes blink { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
@keyframes nashMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@keyframes slideUp { to { opacity: 1; transform: translateY(0) } }
@keyframes gridDrift { from { background-position: 0 0 } to { background-position: 64px 64px } }
.slide-content > .anim { opacity: 0; transform: translateY(20px); }
.slide-content.active > .anim {
animation: slideUp .7s cubic-bezier(.16,1,.3,1) forwards;
}
`}</style>
			<aside
				className={cn(
					"relative z-20 flex shrink-0 flex-col border-r border-[#222] bg-black transition-[width] duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
					collapsed ? "w-[76px]" : "w-[440px]",
				)}
			>
				<button
					onClick={() => setCollapsed((c) => !c)}
					aria-label={collapsed ? "Развернуть" : "Свернуть"}
					className={cn(
						"absolute z-30 flex items-center justify-center border border-[#222] bg-transparent font-mono text-white transition-all hover:border-[#CCFF00] hover:text-[#CCFF00]",
						collapsed
							? "left-1/2 top-5 h-10 w-10 -translate-x-1/2 text-lg"
							: "right-7 top-7 h-9 w-9 text-base",
					)}
				>
					{collapsed ? "≡" : "×"}
				</button>
				<div
					className={cn(
						"flex h-full flex-col px-8 pb-6 pt-8 transition-opacity duration-300",
						collapsed ? "pointer-events-none opacity-0" : "opacity-100 delay-100",
					)}
				>
					<div className="mb-9 pr-12">
						<img src="/nash-dev-logo.svg" alt="Наш.дев" className="h-10" />
					</div>
					<div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[.22em] text-[#CCFF00]">
						<span className="font-medium">$</span>
						<span>deck --list</span>
					</div>
					<nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
						{DECK_ORDER.map((id) => {
							const s = SPEAKERS[id];
							const active = id === deckId;
							return (
								<Button
									key={id}
									variant="text"
									size="small"
									onClick={() => goToDeck(id)}
									className={cn(
										"h-auto w-full justify-start gap-3 rounded-none border px-4 py-3 font-mono text-sm transition-all after:hidden hover:bg-transparent",
										active
											? "border-[#CCFF00] bg-[#0a0a0a] text-white"
											: "border-transparent text-[#888] hover:border-[#222] hover:text-white",
									)}
								>
									<span
										className={cn(
											"text-[10px] tracking-[.1em]",
											active ? "text-[#CCFF00]" : "text-[#555]",
										)}
									>
										[{s.num}]
									</span>
									<span className="truncate">{s.name}</span>
									{active && (
										<span className="ml-auto animate-[blink_1s_steps(1)_infinite] font-mono text-[#CCFF00]">
											{">"}
										</span>
									)}
								</Button>
							);
						})}
					</nav>
					<div className="mt-6 border-t border-[#222] pt-5 font-mono text-[11px] leading-relaxed">
						<div className="flex gap-2 text-[#666]">
							<span className="text-[#CCFF00]">$</span>
							<span>date</span>
						</div>
						<div className="mb-3 text-white">23 окт 2026 · МЦК КИТС</div>
						<div className="flex gap-2 text-[#666]">
							<span className="text-[#CCFF00]">$</span>
							<span>status</span>
						</div>
						<div className="text-[#CCFF00]">регистрация открыта_</div>
					</div>
				</div>
			</aside>
			<main className="relative flex-1 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(204,255,0,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,.018)_1px,transparent_1px)] bg-[size:64px_64px] [animation:gridDrift_60s_linear_infinite]" />
				<div className="relative z-10 h-full">
					{deckId === "event" && <EventDeck index={slideIndex} {...nav} />}
					{deckId === "amir" && (
						<AmirDeck index={slideIndex} total={total} {...nav} />
					)}
					{deckId === "niyaz" && (
						<NiyazDeck index={slideIndex} total={total} {...nav} />
					)}
					{deckId === "anastasia" && (
						<AnastasiaDeck index={slideIndex} total={total} {...nav} />
					)}
					{deckId === "mikhail" && (
						<MikhailDeck index={slideIndex} total={total} {...nav} />
					)}
					{deckId === "contest" && <ContestDeck index={slideIndex} {...nav} />}
				</div>
				<Marquee />
			</main>
		</div>
	);
}
