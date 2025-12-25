'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import useSWR from 'swr'
import { eventApi, CreateEventData } from '@/lib/api'
import EventForm from '../../../../components/EventForm'

export default function EditEventPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const [isLoading, setIsLoading] = useState(false)

  const { data: event, error } = useSWR(
    eventId ? `event-${eventId}` : null,
    () => eventApi.getEvent(eventId)
  )

  const handleSubmit = async (data: CreateEventData) => {
    setIsLoading(true)
    try {
      await eventApi.updateEvent(eventId, data)
      router.push(`/events/${eventId}`)
    } catch (error) {
      console.error('Failed to update event:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Event not found</h3>
        <p className="text-slate-600 mb-6">The event you're trying to edit doesn't exist or has been removed.</p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200"
        >
          ← Back to Events
        </Link>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-lg mb-4 w-3/4 mx-auto"></div>
          <div className="h-4 bg-slate-200 rounded-lg mb-2 w-1/2 mx-auto"></div>
          <div className="h-4 bg-slate-200 rounded-lg w-1/3 mx-auto"></div>
        </div>
        <p className="mt-6 text-slate-600">Loading event details...</p>
      </div>
    )
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
        <Link
          href={`/events/${event.id}`}
          className="hover:text-indigo-600 transition-colors duration-200 truncate"
        >
          {event.title}
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-900 font-medium">Edit</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Event</h1>
        <p className="text-slate-600">Update the details for "{event.title}"</p>
      </div>

      {/* Form */}
      <EventForm
        initialData={event}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Event"
      />

      {/* Navigation Links */}
      <div className="flex items-center justify-between mt-6 text-sm">
        <Link
          href={`/events/${event.id}`}
          className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
        >
          ← Cancel & View Event
        </Link>
        <Link
          href="/"
          className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
        >
          Back to All Events
        </Link>
      </div>
    </div>
  )
}