import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { ErrorPage } from '@/pages/error-page'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorId: string
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorId: '' }
    this.handleReset = this.handleReset.bind(this)
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorId = 'ERR-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    return { hasError: true, error, errorId }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error)
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack)
  }

  handleReset() {
    this.setState({ hasError: false, error: null, errorId: '' })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorPage
          error={this.state.error}
          errorId={this.state.errorId}
          onReset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}
