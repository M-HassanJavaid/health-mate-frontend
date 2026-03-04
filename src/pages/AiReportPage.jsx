import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import { useGetAiReportByIdQuery } from '../services/aiReports.js';
import ReportSection from '../components/ReportSection.jsx';
import { 
  FileText, Sparkles, Languages, Apple, Ban, 
  Stethoscope, Home, ChevronLeft, Calendar, ExternalLink 
} from 'lucide-react';
import cn from '../utils/cn.js';

const AiReportPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetAiReportByIdQuery(id);
  const [lang, setLang] = useState('en'); // 'en' or 'ur' (Roman Urdu)

  if (isLoading) return <DashboardLayout><div className="p-20 text-center animate-pulse font-bold">Analyzing Report Data...</div></DashboardLayout>;
  if (isError || !data?.success) return <DashboardLayout><div className="p-20 text-center text-red-500">Report not found or error fetching data.</div></DashboardLayout>;

  const report = data.aiReport;
  const isEn = lang === 'en';

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-20">
        
        {/* Top Navigation & Language Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Link to="/reports" className="flex items-center gap-2 text-xs font-bold text-(--text-secondary) hover:text-(--btn-primary) transition-colors">
            <ChevronLeft size={16} /> BACK TO VAULT
          </Link>
          
          <div className="flex bg-(--bg-secondary) p-1 rounded-2xl border border-(--border-subtle)">
            <button 
              onClick={() => setLang('en')}
              className={cn("px-6 py-2 rounded-xl text-xs font-black transition-all", isEn ? "bg-white shadow-sm text-(--btn-primary)" : "text-(--text-secondary)")}
            >
              ENGLISH
            </button>
            <button 
              onClick={() => setLang('ur')}
              className={cn("px-6 py-2 rounded-xl text-xs font-black transition-all", !isEn ? "bg-white shadow-sm text-(--btn-primary)" : "text-(--text-secondary)")}
            >
              ROMAN URDU
            </button>
          </div>
        </div>

        {/* Header Card */}
        <div className="bg-(--bg-primary) p-8 rounded-[3rem] border border-(--border-subtle) shadow-xl shadow-blue-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Sparkles size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 text-(--btn-primary) flex items-center justify-center">
                <FileText size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-(--text-primary) tracking-tight">AI Health Insight</h1>
                <p className="text-(--text-secondary) text-sm flex items-center gap-2">
                  Source: <span className="font-bold text-(--text-primary)">{report.sourceId?.name}</span>
                  <span className="opacity-30">|</span>
                  <Calendar size={14} /> {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <a 
                href={report.sourceId?.url} 
                target="_blank" 
                className="flex items-center gap-2 px-5 py-2.5 bg-(--bg-secondary) rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                <ExternalLink size={14} /> View Original Document
              </a>
            </div>
          </div>
        </div>

        {/* Main Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Summary - Full Width */}
          <div className="md:col-span-2">
            <ReportSection title="Executive Summary" icon={Sparkles} variant="info">
              <p className="text-lg font-medium text-slate-700 italic">
                {isEn ? report.summaryInEnglish : report.summaryInRomanUrdu}
              </p>
            </ReportSection>
          </div>

          {/* Foods to Eat */}
          <ReportSection title="Recommended Diet" icon={Apple} variant="success">
            <ul className="list-disc pl-5 space-y-2">
              {(isEn ? report.foodsToEatInEnglish : report.foodsToEatInRomanUrdu).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </ReportSection>

          {/* Foods to Avoid */}
          <ReportSection title="Avoid These" icon={Ban} variant="warning">
            <ul className="list-disc pl-5 space-y-2">
              {(isEn ? report.foodsToAvoidInEnglish : report.foodsToAvoidInRomanUrdu).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </ReportSection>

          {/* Questions for Doctor */}
          <ReportSection title="Ask Your Doctor" icon={Stethoscope}>
            <ul className="space-y-3">
              {(isEn ? report.questionsToDoctorInEnglish : report.questionsToDoctorInRomanUrdu).map((item, i) => (
                <li key={i} className="bg-white p-3 rounded-xl border border-slate-100 font-medium shadow-sm">
                  "{item}"
                </li>
              ))}
            </ul>
          </ReportSection>

          {/* Home Remedies */}
          <ReportSection title="Self Care / Remedies" icon={Home}>
            <ul className="list-disc pl-5 space-y-2">
              {(isEn ? report.homeRemediesInEnglish : report.homeRemediesInRomanUrdu).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </ReportSection>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default AiReportPage;