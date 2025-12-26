// Quick verification script to check API configuration
// Run with: node verify-config.js

// Simulate production environment
process.env.NODE_ENV = 'production'
process.env.NEXT_PUBLIC_API_URL = 'https://event-management-crud-app.onrender.com/api'

console.log('=== Production Configuration Test ===')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)

// Test the API configuration logic
const getApiConfig = () => {
  const envApiUrl = process.env.NEXT_PUBLIC_API_URL
  const isProduction = process.env.NODE_ENV === 'production'
  
  console.log('Environment:', process.env.NODE_ENV)
  console.log('Env API URL:', envApiUrl)
  
  if (envApiUrl && (!isProduction || !envApiUrl.includes('localhost'))) {
    console.log('✅ Using provided API URL:', envApiUrl)
    return { baseURL: envApiUrl, isDemoMode: false }
  }
  
  if (!isProduction) {
    console.log('Development mode: using localhost')
    return { baseURL: 'http://localhost:8000/api', isDemoMode: false }
  }
  
  console.log('❌ Production mode: using demo data')
  return { baseURL: 'https://jsonplaceholder.typicode.com', isDemoMode: true }
}

const { baseURL, isDemoMode } = getApiConfig()

console.log('\n=== Result ===')
console.log('Base URL:', baseURL)
console.log('Demo Mode:', isDemoMode)
console.log('Expected:', 'https://event-management-crud-app.onrender.com/api')
console.log('Match:', baseURL === 'https://event-management-crud-app.onrender.com/api' ? '✅ CORRECT' : '❌ INCORRECT')