from django.core.management.base import BaseCommand
from events.models import Category


class Command(BaseCommand):
    help = 'Initialize database with default categories'

    def handle(self, *args, **options):
        categories = ['Conference', 'Workshop', 'Seminar', 'Webinar', 'Training']
        
        for cat_name in categories:
            category, created = Category.objects.get_or_create(name=cat_name)
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created category "{cat_name}"')
                )
            else:
                self.stdout.write(f'Category "{cat_name}" already exists')
        
        self.stdout.write(
            self.style.SUCCESS('Database initialization completed!')
        )