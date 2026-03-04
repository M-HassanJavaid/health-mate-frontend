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
          className={cn(
            "group cursor-pointer border-2 border-dashed border-slate-200 rounded-[1.5rem] sm:rounded-[2rem]",
            "p-6 sm:p-10 flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all",
            "hover:border-(--btn-primary) hover:bg-blue-50/30 active:scale-[0.98]"
          )}
        >
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-(--bg-secondary) text-slate-400 group-hover:text-(--btn-primary) group-hover:bg-blue-100 transition-colors">
            <Upload size={24} className="sm:hidden" />
            <Upload size={32} className="hidden sm:block" />
          </div>
          <div className="text-center">
            <p className="text-xs sm:text-sm font-bold text-(--text-primary)">
              Click to upload medical record
            </p>
            <p className="text-[10px] sm:text-xs text-(--text-secondary) mt-1">
              PDF, PNG, or JPG (Max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-xl sm:rounded-2xl">
          <div className="flex items-center gap-3 min-w-0"> {/* min-w-0 allows children to truncate */}
            <div className="p-2 bg-white rounded-lg text-(--btn-primary) shrink-0">
              <File size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-blue-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-[9px] sm:text-[10px] text-blue-700 uppercase font-bold">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button 
            onClick={onClear} 
            className="p-2 hover:bg-blue-100 rounded-full text-blue-900 transition-colors shrink-0 ml-2"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;