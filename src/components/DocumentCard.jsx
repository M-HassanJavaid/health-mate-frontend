import React from 'react';
import { FileText, Calendar, ExternalLink, Sparkles, StickyNote } from 'lucide-react';
import { Link } from 'react-router-dom';
import cn from '../utils/cn.js';
import Button from './Button.jsx';

const DocumentCard = ({ doc , generateAiReport}) => {
  const date = new Date(doc.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="group bg-(--bg-primary) w-full max-w-lg border border-(--border-subtle) rounded-[2rem] p-6 shadow-sm shadow-blue-500/5 transition-all hover:shadow-md hover:border-(--btn-primary)/30 flex flex-col h-full">
      {/* Header: Icon & Date */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-(--bg-secondary) flex items-center justify-center text-(--btn-primary)">
          <FileText size={24} />
        </div>
        <div className="flex items-center gap-1.5 text-(--text-secondary) text-[10px] font-bold uppercase tracking-wider">
          <Calendar size={12} />
          {date}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-black text-(--text-primary) leading-tight line-clamp-1 group-hover:text-(--btn-primary) transition-colors">
          {doc.name}
        </h3>
        
        {doc.note ? (
          <div className="flex gap-2 items-start text-(--text-secondary) bg-(--bg-secondary)/50 p-3 rounded-xl">
            <StickyNote size={14} className="shrink-0 mt-0.5 opacity-50" />
            <p className="text-xs italic line-clamp-2 leading-relaxed">"{doc.note}"</p>
          </div>
        ) : (
          <p className="text-xs text-slate-300 italic">No notes added</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-slate-50 flex gap-2">
        <a 
          href={doc.url} 
          target="_blank" 
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-(--bg-secondary) text-(--text-primary) text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          <ExternalLink size={14} /> View File
        </a>

        {console.log(doc.aiReport)}

        {doc.aiReport ? (
          <Link 
            to={`/ai/report/${doc.aiReport}`}
            className="flex-1 flex p-3 items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors"
          >
            <Sparkles size={14} /> Analysis
          </Link>
        ) : (
          <p 
            onClick={()=> generateAiReport(doc._id)}
            className="flex-1 text-nowrap flex p-3 items-center justify-center gap-2 py-2.5 bg-blue-50 text-(--btn-primary) text-xs font-bold rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Sparkles size={14} /> Get AI
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;