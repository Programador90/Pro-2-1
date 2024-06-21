from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Rol, DatosPostulantes, Sector, Empresa, OfertaTrabajo, Postulacion, Contratacion

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Rol', {'fields': ('rol',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)

@admin.register(Rol)
class RolAdmin(admin.ModelAdmin):
    list_display = ('tipo',)
    search_fields = ('tipo',)

@admin.register(DatosPostulantes)
class DatosPostulantesAdmin(admin.ModelAdmin):
    list_display = ('id', 'descripcion_profesional', 'usuario')
    search_fields = ('descripcion_profesional',)

@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    search_fields = ('nombre',)

@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre_comercial', 'telefono', 'ruc', 'distrito', 'direccion', 'sector')
    search_fields = ('nombre_comercial', 'ruc')

@admin.register(OfertaTrabajo)
class OfertaTrabajoAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'descripcion', 'salario', 'empresa', 'estado', 'fecha_publicacion')
    search_fields = ('titulo', 'empresa__nombre_comercial')

@admin.register(Postulacion)
class PostulacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'fecha_inicio', 'oferta_trabajo', 'usuario')
    search_fields = ('usuario__first_name', 'oferta_trabajo__titulo')

@admin.register(Contratacion)
class ContratacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'oferta_trabajo')
    search_fields = ('oferta_trabajo__titulo',)
