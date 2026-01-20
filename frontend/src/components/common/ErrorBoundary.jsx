import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-slate-400 mb-4">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.props.showDetails && this.state.error && (
              <pre className="text-left text-xs text-red-400 bg-slate-800 p-4 rounded-lg mb-4 overflow-auto max-h-40">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
