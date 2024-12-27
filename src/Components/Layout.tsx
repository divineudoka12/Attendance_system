import React from 'react'
import { Bell } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  title: string
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">Attendance System</span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl text-center font-bold text-gray-900 mb-6">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  )
}