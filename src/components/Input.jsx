import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import cn from '../utils/cn';

const Input = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "", 
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full group">
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          // Layout & Sizing
          "w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 ease-in-out text-sm",
          
          // Theme Colors
          "bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-slate-400",
          
          // Border & Interaction
          "border border-transparent hover:border-blue-100",
          "focus:bg-white focus:border-[var(--btn-primary)] focus:ring-4 focus:ring-blue-500/10",
          
          // Extra padding if password toggle exists
          isPassword ? "pr-12" : "", 
          
          className
        )}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          tabIndex="-1" // Prevents tab-key from focusing the eye icon before the next input
          onClick={() => setShowPassword(!showPassword)}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-200",
            isFocused ? "text-[var(--btn-primary)]" : "text-slate-400 hover:text-slate-600"
          )}
        >
          {showPassword ? (
            <EyeOff size={18} strokeWidth={2.5} />
          ) : (
            <Eye size={18} strokeWidth={2.5} />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;