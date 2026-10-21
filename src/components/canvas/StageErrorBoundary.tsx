'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface StageErrorBoundaryProps {
  children: ReactNode;
  onFallbackTo2D?: () => void;
}

interface StageErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class StageErrorBoundary extends Component<
  StageErrorBoundaryProps,
  StageErrorBoundaryState
> {
  constructor(props: StageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): StageErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Stage rendering error caught by StageErrorBoundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#fff1e8] border-2 border-accentRed rounded-xl m-2">
          <AlertTriangle className="w-8 h-8 text-accentRed" />
          <h4 className="font-hand text-xl font-bold text-ink">3D Stage Display Error</h4>
          <p className="text-xs sm:text-sm text-dim max-w-md font-sans">
            A WebGL / canvas context error occurred while rendering this scene ({this.state.error?.message || 'context lost'}).
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={this.resetError}
              className="btn text-xs px-3 py-1 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Canvas</span>
            </button>
            {this.props.onFallbackTo2D && (
              <button
                type="button"
                onClick={() => {
                  this.resetError();
                  this.props.onFallbackTo2D?.();
                }}
                className="btn red text-xs px-3 py-1 font-bold"
              >
                Switch to 2D Exam Sketchbook
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
