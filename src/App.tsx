/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  Lightbulb, 
  Layers, 
  Users, 
  Phone, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';

// --- Constants & Types ---

const SLIDES = [
  {
    id: 'intro',
    title: 'Elevating Your Digital Presence',
    subtitle: 'Strategic Design & Development Solutions',
    type: 'hero',
    content: 'We craft high-impact digital experiences that drive growth, engage customers, and position your brand as a leader in the digital economy.',
    accent: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'problem',
    title: 'The Challenge',
    subtitle: 'Navigating a Crowded Digital Landscape',
    type: 'content',
    icon: <Target className="w-12 h-12 text-red-500" />,
    items: [
      'Stagnant user engagement and high bounce rates',
      'Outdated brand perception in a modern market',
      'Fragmented tech stacks slowing down innovation',
      'Inconsistent user experiences across platforms'
    ]
  },
  {
    id: 'solution',
    title: 'Our Solution',
    subtitle: 'A Holistic Approach to Innovation',
    type: 'content',
    icon: <Lightbulb className="w-12 h-12 text-amber-500" />,
    items: [
      'Human-centric UI/UX design that prioritizes accessibility',
      'Scalable full-stack architecture optimized for performance',
      'Data-driven insights to inform strategic decisions',
      'Cohesive brand identity that resonates globally'
    ]
  },
  {
    id: 'services',
    title: 'Core Services',
    subtitle: 'Tailored to Your Business Goals',
    type: 'grid',
    services: [
      {
        title: 'Strategy & Brand',
        desc: 'Market analysis, brand identity, and long-term digital roadmaps.',
        icon: <TrendingUp className="w-6 h-6" />
      },
      {
        title: 'Product Design',
        desc: 'Intuitive user interfaces and seamless user journeys.',
        icon: <Layers className="w-6 h-6" />
      },
      {
        title: 'Development',
        desc: 'Performant, secure, and future-proof codebases.',
        icon: <Zap className="w-6 h-6" />
      },
      {
        title: 'Digital Security',
        desc: 'Advanced threat protection and data integrity protocols.',
        icon: <ShieldCheck className="w-6 h-6" />
      }
    ]
  },
  {
    id: 'team',
    title: 'Meet the Team',
    subtitle: 'Experts Committed to Your Success',
    type: 'team',
    content: 'Our team comprises award-winning designers, senior engineers, and strategic consultants with decades of combined experience across diverse industries.',
    members: [
      { name: 'Alex Rivera', role: 'Design Lead' },
      { name: 'Jordan Chen', role: 'CTO' },
      { name: 'Sarah Miller', role: 'Head of Strategy' }
    ]
  },
  {
    id: 'contact',
    title: "Let's Build the Future",
    subtitle: 'Start Your Transformation Today',
    type: 'hero',
    content: 'Ready to take your business to the next level? Connect with our team for a personalized consultation and strategy session.',
    cta: 'Get in Touch',
    accent: 'from-emerald-600 to-teal-700'
  }
];

// --- Components ---

const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
    <motion.div 
      className="h-full bg-blue-500"
      initial={{ width: 0 }}
      animate={{ width: `${((current + 1) / total) * 100}%` }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    />
  </div>
);

const Navigation = ({ 
  onNext, 
  onPrev, 
  isFirst, 
  isLast 
}: { 
  onNext: () => void, 
  onPrev: () => void, 
  isFirst: boolean, 
  isLast: boolean 
}) => (
  <div className="fixed bottom-8 right-8 flex gap-4 z-50">
    <button
      onClick={onPrev}
      disabled={isFirst}
      className={`p-3 rounded-full border transition-all ${
        isFirst 
          ? 'bg-transparent border-white/20 text-white/20 cursor-not-allowed' 
          : 'bg-white/5 border-white/30 text-white hover:bg-white/10'
      }`}
      id="nav-prev-btn"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
    <button
      onClick={onNext}
      disabled={isLast}
      className={`p-3 rounded-full border transition-all ${
        isLast 
          ? 'bg-transparent border-white/20 text-white/20 cursor-not-allowed' 
          : 'bg-white/5 border-white/30 text-white hover:bg-white/10'
      }`}
      id="nav-next-btn"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideCount = SLIDES.length;

  const nextSlide = useCallback(() => {
    if (currentSlide < slideCount - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, slideCount]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      <ProgressBar current={currentSlide} total={slideCount} />
      
      <main className="relative h-screen overflow-hidden flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl px-8"
          >
            {slide.type === 'hero' && (
              <div className="text-center space-y-8" id={`slide-${slide.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-block py-1 px-4 rounded-full border border-white/10 bg-gradient-to-r ${slide.accent} bg-opacity-20 text-xs font-semibold tracking-widest uppercase mb-4`}
                >
                  {slide.subtitle}
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
                >
                  {slide.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed"
                >
                  {slide.content}
                </motion.p>
                {slide.cta && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors flex items-center gap-2 mx-auto"
                    id="cta-btn"
                  >
                    {slide.cta} <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            )}

            {slide.type === 'content' && (
              <div className="grid md:grid-cols-2 gap-16 items-center" id={`slide-${slide.id}`}>
                <div className="space-y-6">
                  <div className="mb-4">{slide.icon}</div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{slide.title}</h2>
                  <p className="text-xl text-white/40">{slide.subtitle}</p>
                </div>
                <div className="space-y-6">
                  {slide.items?.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                      <div className="mt-1 p-1 rounded-full bg-white/10 group-hover:bg-blue-500/20 transition-colors">
                        <ChevronRight className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-lg text-white/80">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'grid' && (
              <div className="space-y-12" id={`slide-${slide.id}`}>
                <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{slide.title}</h2>
                  <p className="text-xl text-white/40">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {slide.services?.map((svc, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex flex-col items-center text-center group"
                    >
                      <div className="mb-6 p-4 rounded-2xl bg-white/5 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                        {svc.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{svc.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{svc.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'team' && (
              <div className="grid md:grid-cols-2 gap-16 items-center" id={`slide-${slide.id}`}>
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{slide.title}</h2>
                  <p className="text-xl text-white/40">{slide.subtitle}</p>
                  <p className="text-lg text-white/60 font-light leading-relaxed">{slide.content}</p>
                </div>
                <div className="space-y-4">
                  {slide.members?.map((member, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div>
                        <p className="text-xl font-bold">{member.name}</p>
                        <p className="text-white/40 text-sm">{member.role}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation 
        onNext={nextSlide} 
        onPrev={prevSlide} 
        isFirst={currentSlide === 0} 
        isLast={currentSlide === slideCount - 1} 
      />

      <div className="fixed bottom-8 left-8 text-white/20 text-xs font-mono tracking-widest flex items-center gap-4">
        <span>SLIDE {currentSlide + 1} / {slideCount}</span>
        <span className="w-12 h-px bg-white/20" />
        <span>PITCHDECK PRO &copy; 2026</span>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
    </div>
  );
}
