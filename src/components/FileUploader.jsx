import React, { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import cn from '../utils/cn';

const FileUploader = ({ selectedFile, onFileSelect, onClear }) => {
  const fileInputRef = useRef(null);

  return (
    <div className="w-full">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => onFileSelect(e.target.files[0])}
        accept=".pdf,.jpg,.jpeg,.png"
      />
      
      {!selectedFile ? (
        <div 
          onClick={() => fileInputRef.current.click()}
          className="group cursor-pointer border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 transition-all hover:border-(--btn-primary) hover:bg-blue-50/30"
        >
          <div className="p-4 rounded-2xl bg-(--bg-secondary) text-slate-400 group-hover:text-(--btn-primary) group-hover:bg-blue-100 transition-colors">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-(--text-primary)">Click to upload medical record</p>
            <p className="text-xs text-(--text-secondary) mt-1">PDF, PNG, or JPG (Max 10MB)</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg text-(--btn-primary)">
              <File size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900 truncate max-w-[200px]">{selectedFile.name}</p>
              <p className="text-[10px] text-blue-700 uppercase font-bold">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button onClick={onClear} className="p-2 hover:bg-blue-100 rounded-full text-blue-900 transition-colors">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;