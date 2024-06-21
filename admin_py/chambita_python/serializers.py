from rest_framework import serializers
from .models import User, Rol, DatosPostulantes, Sector, Empresa, OfertaTrabajo, Postulacion, Contratacion

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'rol')

class DatosPostulantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosPostulantes
        fields = '__all__'

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class OfertaTrabajoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfertaTrabajo
        fields = '__all__'

class PostulacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulacion
        fields = '__all__'

class ContratacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contratacion
        fields = '__all__'
