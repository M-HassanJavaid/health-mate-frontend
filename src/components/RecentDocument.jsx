import React from 'react';
import { useGetRecentDocumentQuery } from '../services/dcouments.js';
import { FileText, Sparkles, Calendar, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import cn from '../utils/cn';

const RecentDocument = () => {
  const { data, isLoading, isError } = useGetRecentDocumentQuery();

  if (isLoading) return (
    <div className="w-full h-48 bg-(--bg-secondary)/50 animate-pulse rounded-[2.5rem] flex items-center justify-center">
      <Loader2 className="animate-spin text-(--btn-primary) opacity-20" size={32} />
    </div>
  );

  if (isError || !data?.document) return null; // Hide section if no documents exist

  const doc = data.document;
  const hasAi = !!doc.aiReport;

  return (
    <div className="group my-4 relative bg-(--bg-primary) border border-(--border-subtle) rounded-[2.5rem] p-6 sm:p-8 shadow-xl shadow-blue-500/5 overflow-hidden transition-all hover:border-(--btn-primary)/20">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
        <FileText size={160} />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-(--btn-primary) flex items-center justify-center shadow-inner">
              <FileText size={28} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-(--btn-primary) opacity-80">Latest Upload</span>
              <h2 className="text-xl font-black text-(--text-primary) leading-tight line-clamp-1">{doc.name}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-(--text-secondary) text-xs font-bold bg-(--bg-secondary) px-4 py-2 rounded-full w-fit">
            <Calendar size={14} />
            {new Date(doc.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
          </div>
        </div>

        {/* AI Insight Preview (Conditional) */}
        {hasAi ? (
          <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-3xl p-5 mb-6">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Summary Extract</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 italic">
              "{doc.aiReport.summaryInEnglish}"
            </p>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 mb-6 flex gap-3 items-center justify-between">
            <p className="text-xs text-(--text-secondary) font-medium">No AI analysis generated for this document yet.</p>
            <Link to="/reports" className="text-xs font-black text-(--btn-primary) flex items-center gap-1">
              Analyze <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <a 
            href={doc.url} 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-1 items-center gap-2 px-6 py-3 bg-(--bg-secondary) text-(--text-primary) text-xs font-black rounded-xl hover:bg-slate-200 transition-colors"
          >
            <ExternalLink size={14} /> View Document
          </a>
          
          {hasAi && (
            <Link 
              to={`/ai/report/${doc.aiReport._id}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-(--btn-primary) text-white text-xs font-black rounded-xl shadow-lg shadow-blue-200 hover:opacity-90 transition-all"
            >
              Open Full Analysis <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentDocument;