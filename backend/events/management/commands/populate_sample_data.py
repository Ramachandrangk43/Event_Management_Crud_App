from django.core.management.base import BaseCommand
from events.models import Category, Event
from datetime import date, time

class Command(BaseCommand):
    help = 'Populate database with sample events and categories'

    def handle(self, *args, **options):
        self.stdout.write('Populating database with sample data...')
        
        # Create categories
        categories_data = [
            'Conference', 'Workshop', 'Seminar', 'Webinar', 
            'Meetup', 'Hackathon', 'Training', 'Networking'
        ]
        
        for cat_name in categories_data:
            category, created = Category.objects.get_or_create(name=cat_name)
            if created:
                self.stdout.write(f'✓ Created category: {cat_name}')

        # Get categories for events
        conference = Category.objects.get(name='Conference')
        workshop = Category.objects.get(name='Workshop')
        seminar = Category.objects.get(name='Seminar')
        webinar = Category.objects.get(name='Webinar')

        # Create sample events
        sample_events = [
            {
                'title': 'Tech Conference 2025: Future of Development',
                'description': 'A comprehensive conference for developers focusing on React, Next.js, Django, APIs, and scalable system design. Join industry experts and learn the latest trends.',
                'venue': 'Silicon Valley Convention Center',
                'date': date(2025, 2, 15),
                'time': time(9, 0),
                'image': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'category': conference
            },
            {
                'title': 'React Workshop: Building Modern UIs',
                'description': 'Learn to build modern, responsive user interfaces with React and TypeScript. Hands-on coding session with real-world projects.',
                'venue': 'Tech Hub Downtown',
                'date': date(2025, 1, 28),
                'time': time(10, 0),
                'image': 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'category': workshop
            },
            {
                'title': 'AI & Machine Learning Seminar',
                'description': 'Explore the latest trends in artificial intelligence and machine learning. Discover practical applications and future possibilities.',
                'venue': 'University Auditorium',
                'date': date(2025, 2, 5),
                'time': time(14, 0),
                'image': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'category': seminar
            },
            {
                'title': 'Remote Work Best Practices Webinar',
                'description': 'Learn effective strategies for remote work, team collaboration, and maintaining productivity in distributed teams.',
                'venue': 'Online Event',
                'date': date(2025, 1, 30),
                'time': time(16, 0),
                'image': 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'category': webinar
            },
            {
                'title': 'Full-Stack Development Bootcamp',
                'description': 'Intensive 3-day bootcamp covering frontend and backend development with modern technologies.',
                'venue': 'Coding Academy',
                'date': date(2025, 2, 10),
                'time': time(9, 0),
                'image': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'category': workshop
            }
        ]

        for event_data in sample_events:
            event, created = Event.objects.get_or_create(
                title=event_data['title'],
                defaults=event_data
            )
            if created:
                self.stdout.write(f'✓ Created event: {event_data["title"]}')

        self.stdout.write(
            self.style.SUCCESS(
                f'✅ Database populated! Categories: {Category.objects.count()}, Events: {Event.objects.count()}'
            )
        )