'use client'

import { Event } from '../lib/api'
import Link from 'next/link'

interface EventCardProps {
  event: Event
  onDelete: (id: string) => void
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const isUpcoming = () => {
    const eventDate = new Date(`${event.date}T${event.time}`)
    return eventDate > new Date()
  }

  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      'Conference': 'bg-blue-100 text-blue-800',
      'Workshop': 'bg-green-100 text-green-800',
      'Seminar': 'bg-purple-100 text-purple-800',
      'Webinar': 'bg-indigo-100 text-indigo-800',
      'Meetup': 'bg-yellow-100 text-yellow-800',
      'Hackathon': 'bg-red-100 text-red-800',
      'Training': 'bg-orange-100 text-orange-800',
      'Networking': 'bg-pink-100 text-pink-800',
    }
    return colors[categoryName] || 'bg-slate-100 text-slate-800'
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id)
    }
  }

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100 overflow-hidden">
      {/* Event Image */}
      {event.image && (
        <div className="relative h-48 bg-slate-100 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category_name)}`}>
              {event.category_name}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isUpcoming()
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-slate-100 text-slate-600'
              }`}>
              {isUpcoming() ? 'Upcoming' : 'Past'}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Status Badges - Only show if no image */}
        {!event.image && (
          <div className="flex items-center space-x-2 mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isUpcoming()
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-slate-100 text-slate-600'
              }`}>
              {isUpcoming() ? 'Upcoming' : 'Past'}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category_name)}`}>
              {event.category_name}
            </span>
          </div>
        )}

        {/* Event Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-slate-600 text-sm">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{formatDate(event.date)}</span>
            <span className="mx-2">•</span>
            <span>{formatTime(event.time)}</span>
          </div>

          <div className="flex items-center text-slate-600 text-sm">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-slate-600 text-sm line-clamp-2 mb-4">
            {event.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Link>

          <div className="flex items-center space-x-3">
            <Link
              href={`/events/${event.id}/edit`}
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}