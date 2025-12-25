'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { eventApi, CreateEventData } from '@/lib/api'
import EventForm from '../../../components/EventForm'

export default function CreateEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: CreateEventData) => {
    setIsLoading(true)
    try {
      await eventApi.createEvent(data)
      router.push('/')
    } catch (error) {
      console.error('Failed to create event:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors duration-200">
          Events
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-900 font-medium">Create Event</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create New Event</h1>
        <p className="text-slate-600">Fill in the details below to create your event</p>
      </div>

      {/* Form */}
      <EventForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Event"
      />

      {/* Cancel Link */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors duration-200"
        >
          ← Back to Events
        </Link>
      </div>
    </div>
  )
}