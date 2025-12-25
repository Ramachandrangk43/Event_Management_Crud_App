from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': 'Event Management API',
        'version': '1.0',
        'endpoints': {
            'events': '/api/events/',
            'categories': '/api/categories/',
            'admin': '/admin/',
        },
        'status': 'running'
    })

urlpatterns = [
    path('', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('api/', include('events.urls')),
]