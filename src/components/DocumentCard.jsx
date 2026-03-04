import React from 'react';
import { FileText, Calendar, ExternalLink, Sparkles, StickyNote } from 'lucide-react';
import { Link } from 'react-router-dom';
import cn from '../utils/cn.js';
import Button from './Button.jsx';

const DocumentCard = ({ doc, generateAiReport }) => {
  const date = new Date(doc.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="group bg-(--bg-primary) w-full border border-(--border-subtle) rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 shadow-sm shadow-blue-500/5 transition-all hover:shadow-md hover:border-(--btn-primary)/30 flex flex-col h-full">
      {/* Header: Icon & Date */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-(--bg-secondary) flex items-center justify-center text-(--btn-primary) shrink-0">
          <FileText size={20} className="sm:hidden" />
          <FileText size={24} className="hidden sm:block" />
        </div>
        <div className="flex items-center gap-1.5 text-(--text-secondary) text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-(--bg-secondary)/40 px-2 py-1 rounded-lg sm:bg-transparent sm:p-0">
          <Calendar size={12} />
          {date}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <h3 className="text-base sm:text-lg font-black text-(--text-primary) leading-tight line-clamp-1 group-hover:text-(--btn-primary) transition-colors">
          {doc.name}
        </h3>
        
        {doc.note ? (
          <div className="flex gap-2 items-start text-(--text-secondary) bg-(--bg-secondary)/50 p-2.5 sm:p-3 rounded-xl">
            <StickyNote size={14} className="shrink-0 mt-0.5 opacity-50" />
            <p className="text-[11px] sm:text-xs italic line-clamp-2 leading-relaxed">"{doc.note}"</p>
          </div>
        ) : (
          <p className="text-[11px] sm:text-xs text-slate-300 italic ml-1">No notes added</p>
        )}
      </div>

      {/* Actions: Adjusted for mobile stacking or tight spacing */}
      <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-50 flex flex-row gap-2 sm:gap-3">
        <a 
          href={doc.url} 
          target="_blank" 
          rel="noreferrer"
          className="flex-1 flex p-2 items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 bg-(--bg-secondary) text-(--text-primary) text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl hover:bg-slate-200 transition-colors"
        >
          <ExternalLink size={14} className="shrink-0" /> 
          <span className="truncate">View File</span>
        </a>

        {doc.aiReport ? (
          <Link 
            to={`/ai/report/${doc.aiReport}`}
            className="flex-1 p-2 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 bg-emerald-50 text-emerald-600 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl hover:bg-emerald-100 transition-colors"
          >
            <Sparkles size={14} className="shrink-0" /> 
            <span className="truncate">See AI Report</span>
          </Link>
        ) : (
          <button 
            onClick={() => generateAiReport(doc._id)}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 bg-blue-50 text-(--btn-primary) text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl hover:bg-blue-100 transition-colors border-none cursor-pointer"
          >
            <Sparkles size={14} className="shrink-0" /> 
            <span className="truncate text-nowrap">Generate AI Report</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;