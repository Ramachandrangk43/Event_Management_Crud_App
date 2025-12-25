from django.contrib import admin
from .models import Event, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at', 'event_count']
    search_fields = ['name']
    readonly_fields = ['id', 'created_at', 'updated_at']

    def event_count(self, obj):
        return obj.events.count()
    event_count.short_description = 'Events'


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'venue', 'date', 'time', 'created_at']
    list_filter = ['category', 'date', 'created_at']
    search_fields = ['title', 'venue', 'description', 'category__name']
    readonly_fields = ['id', 'created_at', 'updated_at']