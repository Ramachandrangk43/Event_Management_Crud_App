'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { categoryApi, Category } from '@/lib/api'

export default function CategoriesPage() {
  const { data: categories, error, mutate } = useSWR<Category[]>('categories', categoryApi.getCategories)
  const [isCreating, setIsCreating] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    try {
      setIsCreating(true)
      await categoryApi.createCategory({ name: newCategoryName.trim() })
      setNewCategoryName('')
      mutate()
    } catch (error) {
      alert('Failed to create category. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the "${name}" category?`)) return

    try {
      await categoryApi.deleteCategory(id)
      mutate()
    } catch (error: any) {
      if (error.response?.data?.error) {
        alert(error.response.data.error)
      } else {
        alert('Failed to delete category. Please try again.')
      }
    }
  }

  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      'Conference': 'bg-blue-100 text-blue-800 border-blue-200',
      'Workshop': 'bg-green-100 text-green-800 border-green-200',
      'Seminar': 'bg-purple-100 text-purple-800 border-purple-200',
      'Webinar': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Meetup': 'bg-yellow-100 text-yellow-800 border-yellow-200',
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
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to load categories</h3>
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
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Event Categories
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Manage and organize your event categories
        </p>
      </div>

      {/* Create Category Form */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Create New Category</h2>
          <form onSubmit={handleCreateCategory} className="flex gap-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
              disabled={isCreating}
            />
            <button
              type="submit"
              disabled={isCreating || !newCategoryName.trim()}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isCreating ? 'Creating...' : 'Create'}
            </button>
          </form>
        </div>
      </div>

      {/* Categories Grid */}
      {!categories ? (
        <div className="text-center py-16">
          <div className="max-w-sm mx-auto">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-3/4 mx-auto"></div>
            </div>
            <p className="mt-6 text-slate-600">Loading categories...</p>
          </div>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">No categories yet</h3>
            <p className="text-slate-600 mb-8">Create your first category to start organizing events.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category.name)}`}>
                    {category.name}
                  </span>
                  <button
                    onClick={() => handleDeleteCategory(category.id, category.name)}
                    className="text-slate-400 hover:text-red-600 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-sm text-slate-600">
                  <p>Created: {new Date(category.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}