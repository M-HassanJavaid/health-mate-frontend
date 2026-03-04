import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import { useGetAllDocumentsQuery } from '../services/dcouments.js';
import DocumentCard from '../components/DocumentCard.jsx';
import { Folder, Plus, Search, Loader2 } from 'lucide-react';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import { useGenerateAiReportMutation } from '../services/aiReports.js';
import ProcessingModal from '../components/ProcessingModal.jsx';
import { useNavigate } from 'react-router-dom';

const DocumentsPage = () => {
  const { data, isLoading, isError } = useGetAllDocumentsQuery();
  const [fetchGenerate] = useGenerateAiReportMutation();
  const [isGenerating, setIsGenerating] = useState(false)
  const navigate = useNavigate();

  async function generateAiReport(id) {
    try {
      setIsGenerating(true)
      let res = await fetchGenerate(id).unwrap();
      if (!res.success) throw new Error(res.message);
      setIsGenerating(false);
      navigate(`/ai/report/${res.aiReport._id}`)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-(--text-primary) tracking-tight flex items-center gap-3">
                <Folder size={32} className="text-(--btn-primary)" />
                Medical Vault
              </h1>
              <p className="text-(--text-secondary) mt-1">Access and manage all your uploaded health records.</p>
            </div>

            <Button path="/upload" className="rounded-2xl py-3 px-6 shadow-lg shadow-blue-200">
              <Plus size={18} className="mr-2" /> Upload New
            </Button>
          </div>

          {/* Content State Handling */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={40} className="text-(--btn-primary) animate-spin" />
              <p className="text-(--text-secondary) font-bold animate-pulse">Fetching your vault...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-20 bg-red-50 rounded-[2.5rem] border border-red-100">
              <p className="text-red-500 font-bold">Failed to load documents. Please try again later.</p>
            </div>
          ) : data?.documents?.length > 0 ? (
            <div className="flex gap-5 flex-wrap justify-center items-start">
              {data.documents.map((doc) => (
                <DocumentCard key={doc._id} doc={doc} generateAiReport={generateAiReport}/>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-(--bg-secondary) rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-sm">
                <Folder size={32} />
              </div>
              <h3 className="text-lg font-bold text-(--text-primary)">Your vault is empty</h3>
              <p className="text-(--text-secondary) mb-6">Start by uploading your first medical report.</p>
              <Button path="/upload" className="rounded-xl px-8">Upload Now</Button>
            </div>
          )}
        </div>
      </DashboardLayout>
      <ProcessingModal isOpen={isGenerating} message='Generating AI Medical Report' />
    </>
  );
};

export default DocumentsPage;