'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AnalysisTransitionProps {
  url: string;
  limit?: number;
  onComplete: () => void;
}

export function AnalysisTransition({ url, limit = 5, onComplete }: AnalysisTransitionProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  const steps = [
    { label: 'Resolving public endpoint & stealth headers', icon: ShieldCheck, duration: 500 },
    { label: `Extracting ${limit} latest public video transcripts & captions`, icon: Activity, duration: 700 },
    { label: 'Deconstructing 3-second hook triggers & audio pacing', icon: Sparkles, duration: 600 },
    { label: `Synthesizing Content DNA & statistical win rates (n=${limit})`, icon: CheckCircle2, duration: 500 }
  ];

  useEffect(() => {
    let accumulatedTime = 0;
    const timeouts: NodeJS.Timeout[] = [];

    steps.forEach((step, index) => {
      accumulatedTime += step.duration;
      const timeout = setTimeout(() => {
        setCurrentStepIndex(index);
        setProgress(Math.round(((index + 1) / steps.length) * 100));
      }, accumulatedTime);
      timeouts.push(timeout);
    });

    const completionTimeout = setTimeout(() => {
      onComplete();
    }, accumulatedTime + 400);
    timeouts.push(completionTimeout);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#09090b]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
      <div className="max-w-md w-full velvet-card p-8 shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Glowing Top Beam */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent animate-pulse" />
        
        {/* Animated Radar Pulse Icon */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
          <div className="absolute -inset-2 rounded-full border border-emerald-500/20 animate-pulse" />
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white">
            <Sparkles className="w-7 h-7 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1 font-display tracking-tight">
          Deconstructing Content DNA
        </h3>
        <p className="text-xs font-mono text-zinc-400 mb-6 truncate max-w-full px-4">
          Target: {url}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5 mb-6">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Ticker */}
        <div className="space-y-3 text-left">
          {steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <div 
                key={idx} 
                className={`flex items-center gap-3 text-xs transition-opacity duration-200 ${
                  isCurrent ? 'text-white font-medium opacity-100 scale-100' : isCompleted ? 'text-zinc-400 opacity-80' : 'text-zinc-600 opacity-40'
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] ${
                  isCompleted 
                    ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' 
                    : isCurrent 
                    ? 'border-white text-white bg-white/10 animate-pulse' 
                    : 'border-zinc-700 text-zinc-600'
                }`}>
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <span className="font-mono truncate">{step.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>PIPELINE: PROVENANCE-AWARE</span>
          <span className="text-emerald-400 font-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
