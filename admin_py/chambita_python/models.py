from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class Rol(models.Model):
    tipo = models.CharField(max_length=45)

    def __str__(self):
        return self.tipo

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

class DatosPostulantes(models.Model):
    foto_perfil = models.ImageField(upload_to='fotos_perfil/', blank=True, null=True)
    cv = models.FileField(upload_to='cvs/', blank=True, null=True)
    descripcion_profesional = models.CharField(max_length=500)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.descripcion_profesional

class Sector(models.Model):
    nombre = models.CharField(max_length=45)

    def __str__(self):
        return self.nombre

class Empresa(models.Model):
    telefono = models.IntegerField()
    ruc = models.IntegerField()
    nombre_comercial = models.CharField(max_length=255)
    distrito = models.CharField(max_length=45)
    direccion = models.CharField(max_length=255)
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_comercial

class OfertaTrabajo(models.Model):
    ESTADO_CHOICES = [
        ('activa', 'Activa'),
        ('inactiva', 'Inactiva'),
    ]

    titulo = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    salario = models.FloatField()
    requerimientos = models.CharField(max_length=255)
    fecha_publicacion = models.DateTimeField()
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='activa')
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo

class Postulacion(models.Model):
    fecha_inicio = models.DateTimeField()
    oferta_trabajo = models.ForeignKey(OfertaTrabajo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.usuario} - {self.oferta_trabajo}"

class Contratacion(models.Model):
    oferta_trabajo = models.ForeignKey(OfertaTrabajo, on_delete=models.CASCADE)

    def __str__(self):
        return f"Contratación {self.oferta_trabajo}"
