import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Don't worry - your data is safe! FarmSight encountered an unexpected error.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What you can do:
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>Click the button below to reload the application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>All your data has been saved locally and will be preserved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>If the problem persists, try clearing your browser cache</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={this.handleReset}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Reload FarmSight
              </Button>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                    Technical Details (Development Mode)
                  </summary>
                  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto">
                    <pre className="text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
