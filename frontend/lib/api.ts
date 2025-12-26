import axios from 'axios'

const getApiBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  // Debug logging
  console.log('Environment:', process.env.NODE_ENV)
  console.log('API URL from env:', apiUrl)
  
  if (process.env.NODE_ENV === 'production') {
    if (!apiUrl) {
      console.error('NEXT_PUBLIC_API_URL not set in production')
      throw new Error('API URL not configured')
    }
    return apiUrl
  }
 
  return apiUrl || 'http://localhost:8000/api'
}

const API_BASE_URL = getApiBaseUrl()
console.log('Final API_BASE_URL:', API_BASE_URL)

export interface Category {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description?: string
  venue: string
  date: string
  time: string
  image?: string
  category: string
  category_id: string
  category_name: string
  created_at: string
  updated_at: string
}

export interface CreateEventData {
  title: string
  description?: string
  venue: string
  date: string
  time: string
  image?: string
  category: string
}

// Enhanced API client with error handling and retry logic
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Demo data for when backend is not available
const demoCategories: Category[] = [
  { id: '1', name: 'Conference', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Workshop', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Seminar', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'Webinar', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
]

const demoEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024: Future of Development',
    description: 'A hands-on conference for frontend and backend developers focusing on React, Next.js, Django, APIs, and scalable system design. Join industry experts for workshops, keynotes, and networking sessions.',
    venue: 'Silicon Valley Convention Center',
    date: '2024-12-30',
    time: '09:00:00',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: '1',
    category_id: '1',
    category_name: 'Conference',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  
  
]

// Check if we're using demo mode
const isDemoMode = () => {
  return false // Disable demo mode completely
}

// Request interceptor for logging in development
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.data || error.message)
    }
    
    // Handle common HTTP errors
    if (error.response?.status === 404) {
      throw new Error('Resource not found')
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.')
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.')
    }
    
    return Promise.reject(error)
  }
)

export const categoryApi = {
  // Get all categories with error handling
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories/')
    return response.data.results || response.data
  },

  // Get single category
  getCategory: async (id: string): Promise<Category> => {
    if (isDemoMode()) {
      const category = demoCategories.find(c => c.id === id)
      if (!category) throw new Error('Category not found')
      return Promise.resolve(category)
    }
    
    try {
      const response = await api.get(`/categories/${id}/`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch category ${id}:`, error)
      throw error
    }
  },

  // Create category
  createCategory: async (data: { name: string }): Promise<Category> => {
    if (isDemoMode()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: data.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      return Promise.resolve(newCategory)
    }
    
    try {
      const response = await api.post('/categories/', data)
      return response.data
    } catch (error) {
      console.error('Failed to create category:', error)
      throw error
    }
  },

  // Update category
  updateCategory: async (id: string, data: { name: string }): Promise<Category> => {
    if (isDemoMode()) {
      const category = demoCategories.find(c => c.id === id)
      if (!category) throw new Error('Category not found')
      return Promise.resolve({ ...category, ...data, updated_at: new Date().toISOString() })
    }
    
    try {
      const response = await api.put(`/categories/${id}/`, data)
      return response.data
    } catch (error) {
      console.error(`Failed to update category ${id}:`, error)
      throw error
    }
  },

  // Delete category
  deleteCategory: async (id: string): Promise<void> => {
    if (isDemoMode()) {
      return Promise.resolve()
    }
    
    try {
      await api.delete(`/categories/${id}/`)
    } catch (error) {
      console.error(`Failed to delete category ${id}:`, error)
      throw error
    }
  },
}

export const eventApi = {
  // Get all events with enhanced error handling
  getEvents: async (search?: string, category?: string): Promise<Event[]> => {
    const params: any = {}
    if (search) params.search = search
    if (category) params.category = category
    
    const response = await api.get('/events/', { params })
    return response.data.results || response.data
  },

  // Get single event
  getEvent: async (id: string): Promise<Event> => {
    if (isDemoMode()) {
      const event = demoEvents.find(e => e.id === id)
      if (!event) throw new Error('Event not found')
      return Promise.resolve(event)
    }
    
    try {
      const response = await api.get(`/events/${id}/`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch event ${id}:`, error)
      throw error
    }
  },

  // Create event
  createEvent: async (data: CreateEventData): Promise<Event> => {
    if (isDemoMode()) {
      const category = demoCategories.find(c => c.id === data.category)
      const newEvent: Event = {
        id: Date.now().toString(),
        ...data,
        category_id: data.category,
        category_name: category?.name || 'Unknown',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      return Promise.resolve(newEvent)
    }
    
    try {
      const response = await api.post('/events/', data)
      return response.data
    } catch (error) {
      console.error('Failed to create event:', error)
      throw error
    }
  },

  // Update event
  updateEvent: async (id: string, data: Partial<CreateEventData>): Promise<Event> => {
    if (isDemoMode()) {
      const event = demoEvents.find(e => e.id === id)
      if (!event) throw new Error('Event not found')
      const category = demoCategories.find(c => c.id === data.category)
      return Promise.resolve({
        ...event,
        ...data,
        category_id: data.category || event.category_id,
        category_name: category?.name || event.category_name,
        updated_at: new Date().toISOString(),
      })
    }
    
    try {
      const response = await api.put(`/events/${id}/`, data)
      return response.data
    } catch (error) {
      console.error(`Failed to update event ${id}:`, error)
      throw error
    }
  },

  // Delete event
  deleteEvent: async (id: string): Promise<void> => {
    if (isDemoMode()) {
      return Promise.resolve()
    }
    
    try {
      await api.delete(`/events/${id}/`)
    } catch (error) {
      console.error(`Failed to delete event ${id}:`, error)
      throw error
    }
  },
}

// Health check function for monitoring
export const healthCheck = async (): Promise<boolean> => {
  if (isDemoMode()) {
    return Promise.resolve(true)
  }
  
  try {
    const response = await api.get('/', { timeout: 5000 })
    return response.status === 200
  } catch (error) {
    console.error('Health check failed:', error)
    return false
  }
}

export default api