import { Suspense } from 'react'
import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { router } from '@/router'
import { ModalProvider } from '@/components/molecules/modal'
import { ErrorBoundary } from '@/components/molecules/error-boundary'
import { Spinner } from '@/components/atoms/spinner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner size="lg" /></div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
      <ModalProvider />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
  )
}
