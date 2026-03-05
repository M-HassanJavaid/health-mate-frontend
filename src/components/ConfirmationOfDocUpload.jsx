import React from 'react';
import { CheckCircle2, Sparkles, X, Eye, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import cn from '../utils/cn';
import { useGenerateAiReportMutation } from '../services/aiReports.js';
import { useDispatch } from 'react-redux';
import documentApi from '../services/dcouments.js';

const ConfirmationModal = ({ 
  isOpen, 
  isGenerated, 
  docId, 
  docName, 
  onClose 
}) => {
  const navigate = useNavigate();
  const [fetchGenerate, { isLoading }] = useGenerateAiReportMutation();
  const dispatch = useDispatch()

  if (!isOpen) return null;

  async function generateResponse() {
    try {
      // Trigger the mutation
      const res = await fetchGenerate(docId).unwrap();
      
      if (res.success) {
        // Option 1: Navigate directly to the report
        navigate(`/ai/report/${res.aiReport._id}`);
        dispatch(documentApi.util.invalidateTags(['Documents']));
        
        // Option 2: Just close the modal if your parent state updates 'isGenerated'
        // onClose(); 
      }
    } catch (err) {
      console.error("AI Generation Failed:", err);
      alert(err?.data?.message || "Failed to generate AI report. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="bg-(--bg-primary) w-full max-w-md rounded-[3rem] p-10 border border-(--border-subtle) shadow-2xl animate-in zoom-in-95 duration-300 relative">
        
        <button 
          onClick={onClose} 
          disabled={isLoading}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-(--bg-secondary) rounded-full transition-all disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle2 size={50} strokeWidth={1.5} className="animate-in zoom-in duration-500" />
          </div>

          <h2 className="text-2xl font-black text-(--text-primary) tracking-tight">
            Successfully Stored
          </h2>
          <p className="text-(--text-secondary) mt-3 text-sm leading-relaxed">
            Your document <span className="font-bold text-(--text-primary)">"{docName}"</span> is now encrypted and saved in your medical vault.
          </p>

          <div className="w-full mt-10 space-y-3">
            {isGenerated ? (
              <Link to={`/ai-reports/${docId}`} className="block w-full">
                <Button 
                  className="w-full py-4 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
                >
                  <Eye size={18} />
                  View AI Report
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={generateResponse}
                loading={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all hover:opacity-90"
              >
                {!isLoading && <Sparkles size={18} />}
                {isLoading ? 'Analyzing Document...' : 'Generate AI Report'}
              </Button>
            )}
            
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="w-full py-3 text-(--text-secondary) text-[11px] font-black uppercase tracking-[0.2em] hover:text-(--text-primary) transition-colors disabled:opacity-30"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;