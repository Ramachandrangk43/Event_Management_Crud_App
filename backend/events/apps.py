from django.apps import AppConfig
from django.db import connection
from django.core.management import call_command


class EventsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'events'
    
    def ready(self):
        # Run migrations and setup on app startup
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='events_event';")
                if not cursor.fetchone():
                    call_command('migrate', verbosity=0, interactive=False)
                    self.create_default_categories()
        except Exception:
            pass
    
    def create_default_categories(self):
        try:
            from .models import Category
            categories = ['Conference', 'Workshop', 'Seminar', 'Webinar', 'Training']
            for cat_name in categories:
                Category.objects.get_or_create(name=cat_name)
        except Exception:
            pass