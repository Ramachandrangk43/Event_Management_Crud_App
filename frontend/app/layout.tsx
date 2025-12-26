import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import ErrorBoundary from '../components/ErrorBoundary'
import { ToastProvider } from '../components/Toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EventHub - Modern Event Management',
  description: 'Professional event management system with modern UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ToastProvider>
            <div className="min-h-screen bg-slate-50">
              <Navbar />
              
              {/* Main Content */}
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>

              {/* Footer */}
              <footer className="bg-white border-t border-slate-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="text-center text-slate-600">
                    <p className="text-sm">© 2025 EventHub. Built with Next.js & Django.</p>
                  </div>
                </div>
              </footer>
            </div>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}