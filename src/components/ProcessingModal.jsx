import React from 'react';
import { Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import cn from '../utils/cn';

const ProcessingModal = ({ isOpen, message = "Analyzing your medical document..." }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-500">
      
      <div className="flex flex-col items-center text-center max-w-xs w-full">
        {/* Animated Icon Logic */}
        <div className="relative mb-8">
          {/* Outer Pulse Rings */}
          <div className="absolute inset-0 rounded-full bg-(--btn-primary)/20 animate-ping duration-[2000ms]" />
          <div className="absolute inset-0 rounded-full bg-(--btn-primary)/10 animate-pulse" />
          
          {/* Main Icon Container */}
          <div className="relative w-24 h-24 rounded-[2.5rem] bg-(--bg-primary) border border-(--border-subtle) shadow-2xl flex items-center justify-center text-(--btn-primary)">
            <Loader2 size={40} className="animate-spin duration-[3000ms]" strokeWidth={1.5} />
            <div className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-sm">
              <Sparkles size={16} className="text-amber-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md">
            AI is Thinking
          </h3>
          <p className="text-blue-100/80 text-sm font-medium leading-relaxed">
            {message}
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-10 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
            HIPAA Compliant Processing
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;