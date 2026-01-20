import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message, duration) => addToast(message, "success", duration), [addToast]);
  const error = useCallback((message, duration) => addToast(message, "error", duration), [addToast]);
  const warning = useCallback((message, duration) => addToast(message, "warning", duration), [addToast]);
  const info = useCallback((message, duration) => addToast(message, "info", duration), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }) {
  if (toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "success":
        return "border-l-emerald-500";
      case "error":
        return "border-l-red-500";
      case "warning":
        return "border-l-amber-500";
      default:
        return "border-l-blue-500";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 bg-slate-800 border border-slate-700 border-l-4 ${getBorderColor(toast.type)} rounded-lg p-4 shadow-lg min-w-72 max-w-md animate-slide-in`}
        >
          {getIcon(toast.type)}
          <p className="flex-1 text-sm text-white">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
