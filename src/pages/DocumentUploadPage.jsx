import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import FileUploader from '../components/FileUploader.jsx';
import { FileText, Type, StickyNote, Send } from 'lucide-react';
import { useUploadDocumentMutation } from '../services/dcouments.js';
import ConfirmationModal from '../components/ConfirmationOfDocUpload.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import anylaticsApi from '../services/anylatics.js';

const DocumentUploadPage = () => {
  const [fetchUpload, { isLoading }] = useUploadDocumentMutation();
  const [isGenerated, setIsGenerated] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [docId, setDocId] = useState(null);
  const [uploadedName, setUploadedName] = useState(''); // To keep name visible in modal after form reset
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    note: '',
    document: null
  });

  const dispatch = useDispatch();

  function onConfirmationClose() {
    setIsConfirmationOpen(false);
    navigate('/reports');
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.document || !formData.name) {
      return alert("Please provide a name and a document.");
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('note', formData.note);
      data.append('document', formData.document);

      const res = await fetchUpload(data).unwrap();
      
      if (res.success) {
        // Set data for the modal
        setDocId(res.document._id); // Assuming your API returns the new doc in res.data
        setIsGenerated(false);
        setUploadedName(formData.name);
        
        // Open Modal
        setIsConfirmationOpen(true);
        
        // Reset Form
        setFormData({ name: '', note: '', document: null });
        dispatch(anylaticsApi.util.invalidateTags(['Anylatics']))
      }
      
    } catch (error) {
      console.error("Upload Error:", error);
      alert(error?.data?.message || error?.message || 'Some error occurred');
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-black text-(--text-primary) tracking-tight flex items-center gap-3">
              <FileText className="text-(--btn-primary)" size={32} />
              Upload Document
            </h1>
            <p className="text-(--text-secondary) mt-1">
              Add prescriptions, lab reports, or scans to your secure vault.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6 bg-(--bg-primary) p-8 rounded-[2.5rem] border border-(--border-subtle) shadow-xl shadow-blue-500/5">
            
            {/* Document Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-(--text-secondary) flex items-center gap-2 px-1">
                <Type size={14} /> Document Title
              </label>
              <Input 
                placeholder="e.g. Blood Test Report - March" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            {/* File Input Molecule */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-(--text-secondary) px-1">
                Attachment
              </label>
              <FileUploader 
                selectedFile={formData.document}
                onFileSelect={(file) => setFormData({...formData, document: file})}
                onClear={() => setFormData({...formData, document: null})}
              />
            </div>

            {/* Note Input */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-(--text-secondary) flex items-center gap-2 px-1">
                <StickyNote size={14} /> Additional Notes
              </label>
              <textarea 
                placeholder="Mention details like doctor's name or specific findings..."
                className="w-full p-4 rounded-xl bg-(--bg-secondary) text-(--text-primary) border border-transparent focus:bg-white focus:border-(--btn-primary) focus:ring-4 focus:ring-blue-500/10 outline-none transition-all min-h-[120px] text-sm resize-none"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
              />
            </div>

            <Button 
              type="submit" 
              loading={isLoading} 
              className="w-full text-sm bg-(--btn-primary) text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-200"
            >
              {!isLoading && <Send size={18} className="mr-2" />}
              {isLoading ? 'Uploading...' : 'Submit Record'}
            </Button>
          </form>
        </div>
      </DashboardLayout>

      <ConfirmationModal 
        isOpen={isConfirmationOpen}
        isGenerated={isGenerated}
        onClose={onConfirmationClose}
        docId={docId}
        docName={uploadedName}
      />
    </>
  );
};

export default DocumentUploadPage;