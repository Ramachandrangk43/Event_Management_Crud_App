import axios from 'axios'

// Smart API configuration with proper fallbacks
const getApiConfig = () => {
  const envApiUrl = process.env.NEXT_PUBLIC_API_URL
  const isProduction = process.env.NODE_ENV === 'production'
  
  console.log('=== API Configuration ===')
  console.log('Environment:', process.env.NODE_ENV)
  console.log('Env API URL:', envApiUrl)
  
  // If we have a valid API URL that's not localhost in production, use it
  if (envApiUrl && (!isProduction || !envApiUrl.includes('localhost'))) {
    console.log('Using provided API URL:', envApiUrl)
    return { baseURL: envApiUrl, isDemoMode: false }
  }
  
  // In development, try localhost
  if (!isProduction) {
    console.log('Development mode: using localhost')
    return { baseURL: 'http://localhost:8000/api', isDemoMode: false }
  }
  
  // Production fallback to demo mode
  console.log('Production mode: using demo data')
  return { baseURL: 'https://jsonplaceholder.typicode.com', isDemoMode: true }
}

const { baseURL, isDemoMode } = getApiConfig()

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

// Demo data for when backend is not available
const demoCategories: Category[] = [
  { id: '1', name: 'Conference', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Workshop', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Seminar', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'Webinar', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'Meetup', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'Hackathon', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '7', name: 'Training', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '8', name: 'Networking', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
]

const demoEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024: Future of Development',
    description: 'A hands-on conference for frontend and backend developers focusing on React, Next.js, Django, APIs, and scalable system design. Join industry experts for workshops, keynotes, and networking sessions covering the latest trends in web development.',
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
  {
    id: '2',
    title: 'React Workshop: Building Modern UIs',
    description: 'Learn to build modern user interfaces with React and TypeScript. Hands-on coding session with experienced developers covering hooks, state management, and best practices.',
    venue: 'Tech Hub Downtown',
    date: '2024-12-28',
    time: '10:00:00',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: '2',
    category_id: '2',
    category_name: 'Workshop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'AI & Machine Learning Seminar',
    description: 'Explore the latest trends in artificial intelligence and machine learning. Expert speakers from leading tech companies will share insights on neural networks, deep learning, and practical AI applications.',
    venue: 'University Auditorium',
    date: '2025-01-15',
    time: '14:00:00',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: '3',
    category_id: '3',
    category_name: 'Seminar',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    title: 'Remote Work Best Practices Webinar',
    description: 'Learn effective strategies for remote work, team collaboration, and productivity in distributed teams. Discover tools and techniques for successful remote work culture.',
    venue: 'Online Event',
    date: '2025-01-20',
    time: '16:00:00',
    category: '4',
    category_id: '4',
    category_name: 'Webinar',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    title: 'Local Developer Meetup',
    description: 'Monthly gathering of local developers to share knowledge, network, and discuss the latest in software development. Pizza and drinks provided!',
    venue: 'Community Center',
    date: '2025-01-10',
    time: '18:30:00',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: '5',
    category_id: '5',
    category_name: 'Meetup',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    title: '48-Hour Innovation Hackathon',
    description: 'Build innovative solutions in 48 hours! Teams will compete to create the most creative and impactful applications. Prizes for top 3 teams.',
    venue: 'Innovation Lab',
    date: '2025-02-01',
    time: '09:00:00',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: '6',
    category_id: '6',
    category_name: 'Hackathon',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

// Enhanced API client with error handling
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor with fallback to demo data
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message)
    
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
      console.log('Network error detected, falling back to demo data')
      // Don't throw error, let individual functions handle fallback
      return Promise.reject(new Error('NETWORK_ERROR'))
    }
    
    return Promise.reject(error)
  }
)

export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    if (isDemoMode) {
      return Promise.resolve(demoCategories)
    }
    
    try {
      const response = await api.get('/categories/')
      return response.data.results || response.data
    } catch (error: any) {
      console.log('Categories API failed, using demo data')
      return demoCategories
    }
  },

  getCategory: async (id: string): Promise<Category> => {
    if (isDemoMode) {
      const category = demoCategories.find(c => c.id === id)
      if (!category) throw new Error('Category not found')
      return Promise.resolve(category)
    }
    
    try {
      const response = await api.get(`/categories/${id}/`)
      return response.data
    } catch (error) {
      const category = demoCategories.find(c => c.id === id)
      if (category) return category
      throw new Error('Category not found')
    }
  },

  createCategory: async (data: { name: string }): Promise<Category> => {
    if (isDemoMode) {
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
      // Fallback to demo behavior
      const newCategory: Category = {
        id: Date.now().toString(),
        name: data.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      return newCategory
    }
  },

  updateCategory: async (id: string, data: { name: string }): Promise<Category> => {
    if (isDemoMode) {
      const category = demoCategories.find(c => c.id === id)
      if (!category) throw new Error('Category not found')
      return Promise.resolve({ ...category, ...data, updated_at: new Date().toISOString() })
    }
    
    try {
      const response = await api.put(`/categories/${id}/`, data)
      return response.data
    } catch (error) {
      const category = demoCategories.find(c => c.id === id)
      if (!category) throw new Error('Category not found')
      return { ...category, ...data, updated_at: new Date().toISOString() }
    }
  },

  deleteCategory: async (id: string): Promise<void> => {
    if (isDemoMode) {
      return Promise.resolve()
    }
    
    try {
      await api.delete(`/categories/${id}/`)
    } catch (error) {
      // Silently succeed in demo mode
      return Promise.resolve()
    }
  },
}

export const eventApi = {
  getEvents: async (search?: string, category?: string): Promise<Event[]> => {
    if (isDemoMode) {
      let filteredEvents = [...demoEvents]
      
      if (search) {
        filteredEvents = filteredEvents.filter(event =>
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.description?.toLowerCase().includes(search.toLowerCase()) ||
          event.venue.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      if (category) {
        filteredEvents = filteredEvents.filter(event => event.category === category)
      }
      
      return Promise.resolve(filteredEvents)
    }
    
    try {
      const params: any = {}
      if (search) params.search = search
      if (category) params.category = category
      
      const response = await api.get('/events/', { params })
      return response.data.results || response.data
    } catch (error: any) {
      console.log('Events API failed, using demo data')
      let filteredEvents = [...demoEvents]
      
      if (search) {
        filteredEvents = filteredEvents.filter(event =>
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.description?.toLowerCase().includes(search.toLowerCase()) ||
          event.venue.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      if (category) {
        filteredEvents = filteredEvents.filter(event => event.category === category)
      }
      
      return filteredEvents
    }
  },

  getEvent: async (id: string): Promise<Event> => {
    if (isDemoMode) {
      const event = demoEvents.find(e => e.id === id)
      if (!event) throw new Error('Event not found')
      return Promise.resolve(event)
    }
    
    try {
      const response = await api.get(`/events/${id}/`)
      return response.data
    } catch (error) {
      const event = demoEvents.find(e => e.id === id)
      if (event) return event
      throw new Error('Event not found')
    }
  },

  createEvent: async (data: CreateEventData): Promise<Event> => {
    if (isDemoMode) {
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
      const category = demoCategories.find(c => c.id === data.category)
      const newEvent: Event = {
        id: Date.now().toString(),
        ...data,
        category_id: data.category,
        category_name: category?.name || 'Unknown',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      return newEvent
    }
  },

  updateEvent: async (id: string, data: Partial<CreateEventData>): Promise<Event> => {
    if (isDemoMode) {
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
      const event = demoEvents.find(e => e.id === id)
      if (!event) throw new Error('Event not found')
      const category = demoCategories.find(c => c.id === data.category)
      return {
        ...event,
        ...data,
        category_id: data.category || event.category_id,
        category_name: category?.name || event.category_name,
        updated_at: new Date().toISOString(),
      }
    }
  },

  deleteEvent: async (id: string): Promise<void> => {
    if (isDemoMode) {
      return Promise.resolve()
    }
    
    try {
      await api.delete(`/events/${id}/`)
    } catch (error) {
      return Promise.resolve()
    }
  },
}

// Health check function
export const healthCheck = async (): Promise<boolean> => {
  if (isDemoMode) {
    return Promise.resolve(true)
  }
  
  try {
    const response = await api.get('/', { timeout: 5000 })
    return response.status === 200
  } catch (error) {
    return false
  }
}

// Export demo mode status for components to use
export const isInDemoMode = () => isDemoMode

export default api