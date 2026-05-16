import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={ showToast }>
      {children}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div className={`
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
            ${toast.type === 'success'
              ? 'bg-green-500/20 border-green-500/30'
              : 'bg-red-500/20 border-red-500/30'
            }
          `}>
            {toast.type === 'success' ? (
              <Check size={18} className="text-green-500" />
            ) : (
              <AlertCircle size={18} className="text-red-500" />
            )}
            <span className="text-text-primary text-sm">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="text-text-tertiary hover:text-text-primary"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}