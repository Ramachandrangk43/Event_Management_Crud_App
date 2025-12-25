from rest_framework import serializers
from .models import Event, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Category name cannot be empty.")
        return value.strip().title()


class EventSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_id = serializers.UUIDField(source='category.id', read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'venue', 'date', 'time', 'image',
            'category', 'category_id', 'category_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'category_id', 'category_name', 'created_at', 'updated_at']

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        return value

    def validate_venue(self, value):
        if not value.strip():
            raise serializers.ValidationError("Venue cannot be empty.")
        return value

    def validate_category(self, value):
        if not value:
            raise serializers.ValidationError("Category is required.")
        return value

    def validate_image(self, value):
        if value and not value.strip():
            return None
        return value