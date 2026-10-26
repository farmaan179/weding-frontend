import { Component } from "react";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <pre style={{ padding: 16, color: "red", whiteSpace: "pre-wrap" }}>
          {String(this.state.error)}
          {"\n\n"}
          {this.state.error.stack}
        </pre>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;