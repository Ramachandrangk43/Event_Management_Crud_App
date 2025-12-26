#!/usr/bin/env python
import os
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'event_management.settings')
    django.setup()
    
    # Run migrations
    execute_from_command_line(['manage.py', 'migrate'])
    
    # Create default categories
    from events.models import Category
    categories = ['Conference', 'Workshop', 'Seminar', 'Webinar', 'Training']
    for cat_name in categories:
        Category.objects.get_or_create(name=cat_name)
    
    print("Database setup completed!")