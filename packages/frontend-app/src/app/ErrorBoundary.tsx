import React from "react";

import type { ReactNode } from "react";

import { RedirectError } from "../errors/redirect-error";

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

  componentDidCatch(error: Error): void {
    if (error instanceof RedirectError) {
      return window.location.replace(error.url);
    }

    // TODO: Log this to an error reporting service
    console.error(
      "-------------- Error caught in error boundary -------------------"
    );
    console.error(error);

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
