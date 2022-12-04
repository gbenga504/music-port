import React from "react";

import type { ReactNode } from "react";

interface IProps {
  error?: Error;
  children: ReactNode;
}

interface IState {
  error?: Error;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: props.error };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // TODO: Log this to an error reporting service
    console.error(
      "-------------- Error caught in error boundary -------------------"
    );
    console.error(errorInfo);

    this.setState({
      error,
    });
  }

  render() {
    if (this.state.error) {
      return <span>An error occurred</span>;
    }

    return this.props.children;
  }
}
