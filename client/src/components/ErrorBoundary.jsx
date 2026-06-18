import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="bg-surface border border-danger/30 rounded-xl p-8 max-w-lg w-full shadow-2xl flex flex-col items-center text-center">
            <div className="bg-danger/10 p-4 rounded-full mb-4">
              <AlertTriangle className="w-12 h-12 text-danger" />
            </div>
            <h1 className="text-2xl font-bold text-textMain mb-2">Something went wrong</h1>
            <p className="text-textMuted mb-6">
              An unexpected error occurred in the application. Our team has been notified.
            </p>
            {this.state.error && (
              <div className="bg-background border border-border rounded p-4 text-left w-full overflow-x-auto mb-6">
                <code className="text-xs text-danger font-mono">{this.state.error.toString()}</code>
              </div>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
