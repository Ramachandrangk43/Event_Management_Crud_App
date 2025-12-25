# Event Management CRUD Application

A modern full-stack Event Management application built with Django REST Framework and Next.js, featuring a clean and responsive interface for managing events.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete events and categories
- **Event Images**: Add beautiful images to events with URL support and preview
- **Event Categories**: Organize events by type (Conference, Workshop, Seminar, etc.)
- **Category-based Filtering**: Filter events by category with visual badges
- **Search Functionality**: Search events by title, description, venue, or category
- **Responsive Design**: Clean, modern UI built with Tailwind CSS
- **Real-time Updates**: Smooth user experience with SWR for data fetching
- **Form Validation**: Client and server-side validation
- **Error Handling**: Graceful error handling and loading states

## 🛠 Tech Stack

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Database
- **django-cors-headers** - CORS handling

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **SWR** - Data fetching and caching
- **Axios** - HTTP client

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL 12+ (optional - SQLite works for development)

## 🔧 Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd event-management
\`\`\`

### 2. Backend Setup

\`\`\`bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows PowerShell (if you get execution policy error, run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser):
venv\Scripts\Activate.ps1
# On Windows Command Prompt:
venv\Scripts\activate.bat
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# If you encounter issues with psycopg2-binary on Windows, try:
# pip install -r requirements-dev.txt
# This will skip PostgreSQL dependencies and use SQLite instead

# Create .env file
cp .env.example .env
# For quick start, you can use the default SQLite configuration

# Run migrations
python manage.py makemigrations events
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
\`\`\`

The backend will be available at \`http://localhost:8000\`

### 3. Frontend Setup

\`\`\`bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

The frontend will be available at `http://localhost:3000`

### 4. Database Configuration

#### Option A: SQLite (Recommended for Development)
No additional setup required! The application will use SQLite by default.

#### Option B: PostgreSQL (Production Ready)
Create a PostgreSQL database and update the \`.env\` file in the backend directory:

\`\`\`env
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_ENGINE=django.db.backends.postgresql
DB_NAME=event_management
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
\`\`\`

## 🚨 Troubleshooting

### Windows PowerShell Issues

If you encounter PowerShell execution policy errors:
\`\`\`powershell
# Run this command first to allow script execution:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then activate the virtual environment:
venv\Scripts\Activate.ps1
\`\`\`

Alternatively, use Command Prompt instead of PowerShell:
\`\`\`cmd
# In Command Prompt:
venv\Scripts\activate.bat
\`\`\`

### Windows Setup Issues

If you encounter issues with \`psycopg2-binary\` on Windows:

1. **Use SQLite instead** (recommended for development):
   \`\`\`bash
   pip install -r requirements-dev.txt
   \`\`\`
   
2. **Or install PostgreSQL dependencies manually**:
   \`\`\`bash
   # Install Microsoft C++ Build Tools first
   # Then try:
   pip install psycopg2-binary --no-cache-dir
   \`\`\`

3. **Alternative approach**:
   \`\`\`bash
   # Remove psycopg2-binary from requirements and use SQLite
   pip install Django djangorestframework django-cors-headers django-filter python-decouple
   \`\`\`

## 📚 API Documentation

### Base URL
\`http://localhost:8000/api\`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events/` | List all events |
| GET | `/events/{id}/` | Retrieve event details |
| POST | `/events/` | Create a new event |
| PUT | `/events/{id}/` | Update an event |
| DELETE | `/events/{id}/` | Delete an event |
| GET | `/categories/` | List all categories |
| GET | `/categories/{id}/` | Retrieve category details |
| POST | `/categories/` | Create a new category |
| PUT | `/categories/{id}/` | Update a category |
| DELETE | `/categories/{id}/` | Delete a category |

### Event Model

\`\`\`json
{
  "id": "uuid",
  "title": "string (required)",
  "description": "string (optional)",
  "venue": "string (required)",
  "date": "date (YYYY-MM-DD)",
  "time": "time (HH:MM:SS)",
  "image": "url (optional)",
  "category": "uuid (required)",
  "category_id": "uuid",
  "category_name": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
\`\`\`

### Category Model

\`\`\`json
{
  "id": "uuid",
  "name": "string (required, unique)",
  "created_at": "datetime",
  "updated_at": "datetime"
}
\`\`\`

### Search Parameters

- `search`: Search events by title, description, venue, or category name
- `date`: Filter events by date
- `category`: Filter events by category ID

Example: `GET /api/events/?search=workshop&category=uuid&date=2024-01-15`

## 🎯 Usage

1. **View Events**: Navigate to the home page to see all events with category badges
2. **Filter by Category**: Use category filter buttons to view events by type
3. **Create Event**: Click "Create Event" button, select a category, and fill out the form
4. **Search Events**: Use the search bar to find specific events by title, venue, description, or category
5. **View Details**: Click "View Details" on any event card to see full information including category
6. **Edit Event**: Click "Edit" on an event card or from the detail page to modify event and category
7. **Delete Event**: Click "Delete" and confirm the action

### Default Categories

The system comes with pre-configured categories:
- Conference
- Workshop  
- Seminar
- Webinar
- Meetup
- Hackathon
- Training
- Networking

## 🧪 Testing

### Backend Tests
\`\`\`bash
cd backend
python manage.py test
\`\`\`

### Frontend Tests
\`\`\`bash
cd frontend
npm test
\`\`\`

## 🚀 Deployment

### Backend Deployment
1. Set `DEBUG=False` in production
2. Configure production database
3. Set up static file serving
4. Use a production WSGI server like Gunicorn

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or your preferred hosting service

## 📁 Project Structure

\`\`\`
event-management/
├── backend/
│   ├── event_management/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── events/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── ...
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── events/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── EventCard.tsx
│   │   └── EventForm.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── package.json
│   └── ...
└── README.md
\`\`\`

## 🔍 Key Features Implementation

### Backend Features
- **UUID Primary Keys**: Secure, non-sequential identifiers
- **Model Validation**: Server-side validation for data integrity
- **CORS Configuration**: Proper cross-origin resource sharing
- **Search & Filtering**: Full-text search and date filtering
- **Pagination**: Efficient data loading for large datasets

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: SWR for efficient data fetching and caching
- **Form Handling**: Comprehensive form validation and error handling
- **Loading States**: User-friendly loading indicators
- **Error Boundaries**: Graceful error handling throughout the app

## 🎨 Design Decisions

1. **Clean Architecture**: Separation of concerns between frontend and backend
2. **Type Safety**: TypeScript for better development experience
3. **Modern UI**: Tailwind CSS for consistent, responsive design
4. **Performance**: SWR for optimized data fetching and caching
5. **User Experience**: Smooth interactions with proper feedback

## 📝 Final Statement

This project focuses on correctness, clarity, and smooth functionality. All CRUD operations are fully implemented, tested, and integrated end-to-end using Django REST Framework, PostgreSQL, and Next.js, following clean architecture and best practices.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.