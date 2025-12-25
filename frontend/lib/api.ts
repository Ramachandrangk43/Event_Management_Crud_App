import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

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

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const categoryApi = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories/')
    return response.data.results || response.data
  },

  // Get single category
  getCategory: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}/`)
    return response.data
  },

  // Create category
  createCategory: async (data: { name: string }): Promise<Category> => {
    const response = await api.post('/categories/', data)
    return response.data
  },

  // Update category
  updateCategory: async (id: string, data: { name: string }): Promise<Category> => {
    const response = await api.put(`/categories/${id}/`, data)
    return response.data
  },

  // Delete category
  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}/`)
  },
}

export const eventApi = {
  // Get all events
  getEvents: async (search?: string, category?: string): Promise<Event[]> => {
    const params: any = {}
    if (search) params.search = search
    if (category) params.category = category
    const response = await api.get('/events/', { params })
    return response.data.results || response.data
  },

  // Get single event
  getEvent: async (id: string): Promise<Event> => {
    const response = await api.get(`/events/${id}/`)
    return response.data
  },

  // Create event
  createEvent: async (data: CreateEventData): Promise<Event> => {
    const response = await api.post('/events/', data)
    return response.data
  },

  // Update event
  updateEvent: async (id: string, data: Partial<CreateEventData>): Promise<Event> => {
    const response = await api.put(`/events/${id}/`, data)
    return response.data
  },

  // Delete event
  deleteEvent: async (id: string): Promise<void> => {
    await api.delete(`/events/${id}/`)
  },
}

export default api