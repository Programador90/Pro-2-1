# backend/user_api/urls.py
# chambita_python/urls.py

# chambita_python/urls.py

from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
