import { useState, useEffect, type ReactNode } from 'react';
import { ArrowRight, ShieldCheck, Activity } from 'lucide-react';

// FadeIn Component: A wrapper that starts with opacity: 0 and transitions to
// opacity: 1 after a configurable delay (ms) using a setTimeout + React state.
interface FadeInProps {
  children: ReactNode;
  delayMs: number;
  durationMs?: number;
  className?: string;
}

export function FadeIn({ children, delayMs, durationMs = 1000, className = '' }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return (
    <div
      id={`fade-in-wrapper-${delayMs}`}
      className={`transition-opacity ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${durationMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

// AnimatedHeading Component: Splits text by \n into lines, then each line into individual characters. 
// Transition triggers via React state after the initial delay.
interface AnimatedHeadingProps {
  text: string;
}

export function AnimatedHeading({ text }: AnimatedHeadingProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const charDelay = 30; // 30ms

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 200); // 200ms initial delay
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');

  return (
    <h1
      id="hero-animated-heading"
      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-4 text-white leading-tight"
      style={{ letterSpacing: '-0.03em' }}
    >
      {lines.map((line, lineIndex) => {
        const lineLength = line.length;
        return (
          <span key={`line-${lineIndex}`} className="block whitespace-nowrap">
            {line.split('').map((char, charIndex) => {
              const delay = (lineIndex * lineLength * charDelay) + (charIndex * charDelay);
              const renderedChar = char === ' ' ? '\u00A0' : char;

              return (
                <span
                  key={`char-${lineIndex}-${charIndex}`}
                  className="inline-block transition-all ease-out"
                  style={{
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateX(0)' : 'translateX(-12px)',
                    transitionDuration: '600ms',
                    transitionDelay: `${delay}ms`,
                    transitionProperty: 'opacity, transform',
                  }}
                >
                  {renderedChar}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

export default function HeroSection() {
  return (
    <div id="vex-hero-viewport" className="relative w-full h-[100dvh] min-h-[600px] text-white overflow-hidden font-sans select-none flex flex-col">
      {/* 1. Full-screen Background Video */}
      <video
        id="bg-video-element"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
      />
      
      {/* Dark gradient overlay for readability and cinematic feeling */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-1 pointer-events-none" />

      {/* 2. Hero Content (Aligned to Bottom) */}
      <main id="main-hero-body" className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 lg:pb-24">
        <div id="hero-columns-container" className="grid grid-cols-1 lg:grid-cols-12 lg:items-end w-full gap-8 lg:gap-12">
          
          {/* Left Column - Main Content (Spans 7 cols on large screens) */}
          <div id="hero-left-column" className="lg:col-span-7 flex text-start flex-col items-start max-w-2xl">
            {/* Eyebrow badge */}
            <FadeIn delayMs={100} durationMs={800}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                ISO 31000 Standardized Platform
              </div>
            </FadeIn>

            {/* Animated Heading */}
            <AnimatedHeading text={"Quản lý rủi ro\ncho dự án của bạn"} />

            {/* Subheading */}
            <FadeIn delayMs={800} durationMs={1000} className="w-full">
              <p id="hero-subheading" className="text-base md:text-lg text-neutral-300 text-start mb-8 leading-relaxed tracking-wide max-w-lg">
                Công cụ toàn diện giúp bạn xác định, đánh giá và quản lý rủi ro hiệu quả cho mọi dự án, đảm bảo thành công và giảm thiểu bất ngờ.
              </p>
            </FadeIn>

            {/* Button Actions */}
            <FadeIn delayMs={1200} durationMs={1000}>
              <div id="hero-actions" className="flex flex-wrap gap-4 items-center">
                <button
                  id="hero-explore-action-btn"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Bắt đầu ngay
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
                <button
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 active:scale-[0.98] cursor-pointer"
                >
                  Tìm hiểu thêm
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Status/Tag Card (Spans 5 cols on large screens) */}
          <div id="hero-right-column" className="lg:col-span-5 flex items-end justify-start lg:justify-end mt-4 lg:mt-0">
            <FadeIn delayMs={1400} durationMs={1000} className="w-full lg:w-auto">
              <div className="w-full lg:w-80 rounded-2xl border border-white/10 bg-black/45 p-6 backdrop-blur-md shadow-2xl text-start">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Hệ thống Live</span>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-blue-400 animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400">Tiêu chuẩn:</span>
                    <span className="font-semibold text-white">ISO 31000 : 2009</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400">Trạng thái:</span>
                    <span className="font-semibold text-emerald-400">99.9% Tuân thủ</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex items-center gap-2 text-[11px] text-neutral-300">
                    <Activity className="h-3.5 w-3.5 text-blue-400" />
                    <span>Phát hiện rủi ro tự động</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </main>
    </div>
  );
}
