import { Loader2 } from "lucide-react";

export function LoadingSpinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <Loader2 className={`animate-spin text-emerald-500 ${sizes[size]} ${className}`} />
  );
}

export function LoadingOverlay({ message = "Loading..." }) {
  return (
    <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-slate-400">{message}</p>
      </div>
    </div>
  );
}

export function LoadingPage({ message = "Loading dashboard..." }) {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-slate-400">{message}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
