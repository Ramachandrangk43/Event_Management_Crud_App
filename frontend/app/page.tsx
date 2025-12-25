'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { eventApi, categoryApi, Event, Category } from '@/lib/api'
import EventCard from '../components/EventCard'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { data: events, error, mutate } = useSWR<Event[]>(
    ['events', searchTerm, selectedCategory],
    () => eventApi.getEvents(searchTerm || undefined, selectedCategory || undefined)
  )
  const { data: categories } = useSWR<Category[]>('categories', categoryApi.getCategories)

  const handleDelete = async (id: string) => {
    try {
      await eventApi.deleteEvent(id)
      mutate() // Refresh the list
    } catch (error) {
      alert('Failed to delete event. Please try again.')
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    mutate() // Trigger refetch with current search term
  }

  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      'Conference': 'bg-blue-100 text-blue-800 border-blue-200',
      'Workshop': 'bg-green-100 text-green-800 border-green-200',
      'Seminar': 'bg-purple-100 text-purple-800 border-purple-200',
      'Webinar': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Meetup': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Hackathon': 'bg-red-100 text-red-800 border-red-200',
      'Training': 'bg-orange-100 text-orange-800 border-orange-200',
      'Networking': 'bg-pink-100 text-pink-800 border-pink-200',
    }
    return colors[categoryName] || 'bg-slate-100 text-slate-800 border-slate-200'
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to load events</h3>
          <p className="text-slate-600 mb-4">Please check your connection and try again.</p>
          <button
            onClick={() => mutate()}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Manage Your Events
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Create, organize, and track your events with our modern management system
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search events by title, venue, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-32 py-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium"
          >
            Search
          </button>
        </form>

        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-slate-700">Filter by category:</span>
                <button
                  onClick={() => {
                    setSelectedCategory('')
                    mutate()
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${!selectedCategory
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  All Events
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id)
                      mutate()
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${selectedCategory === category.id
                      ? getCategoryColor(category.name).replace('bg-', 'bg-').replace('100', '200') + ' shadow-md'
                      : getCategoryColor(category.name) + ' hover:shadow-md'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                    mutate()
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Events Grid */}
      {!events ? (
        <div className="text-center py-16">
          <div className="max-w-sm mx-auto">
            {/* Loading Skeleton */}
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-3/4 mx-auto"></div>
            </div>
            <p className="mt-6 text-slate-600">Loading your events...</p>
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {searchTerm || selectedCategory ? 'No events found' : 'No events yet'}
            </h3>
            <p className="text-slate-600 mb-8">
              {searchTerm || selectedCategory
                ? 'Try adjusting your search terms or filters, or create a new event.'
                : 'Get started by creating your first event and bring your ideas to life.'
              }
            </p>
            {!searchTerm && !selectedCategory && (
              <Link
                href="/events/create"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Event
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {searchTerm || selectedCategory ? 'Filtered Results' : 'Your Events'}
              </h2>
              <p className="text-slate-600 mt-1">
                {events.length} {events.length === 1 ? 'event' : 'events'} found
                {selectedCategory && categories && (
                  <span className="ml-1">
                    in {categories.find(c => c.id === selectedCategory)?.name}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}