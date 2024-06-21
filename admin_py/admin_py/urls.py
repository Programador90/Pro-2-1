"""
URL configuration for admin_py project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# admin_py/urls.py

# admin_py/urls.py

# admin_py/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from chambita_python.views import RegisterView, LoginView, UserViewSet, RolViewSet, DatosPostulantesViewSet, SectorViewSet, EmpresaViewSet, OfertaTrabajoViewSet, PostulacionViewSet, ContratacionViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'roles', RolViewSet)
router.register(r'datospostulantes', DatosPostulantesViewSet)
router.register(r'sectores', SectorViewSet)
router.register(r'empresas', EmpresaViewSet)
router.register(r'ofertas', OfertaTrabajoViewSet)
router.register(r'postulaciones', PostulacionViewSet)
router.register(r'contrataciones', ContratacionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('account/', include('django.contrib.auth.urls')),
]
