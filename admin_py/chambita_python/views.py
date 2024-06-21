# chambita_python/views.py

from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Rol, DatosPostulantes, Sector, Empresa, OfertaTrabajo, Postulacion, Contratacion
from .serializers import UserSerializer, RolSerializer, DatosPostulantesSerializer, SectorSerializer, EmpresaSerializer, OfertaTrabajoSerializer, PostulacionSerializer, ContratacionSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid credentials'}, status=401)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    permission_classes = [AllowAny]

class DatosPostulantesViewSet(viewsets.ModelViewSet):
    queryset = DatosPostulantes.objects.all()
    serializer_class = DatosPostulantesSerializer
    permission_classes = [AllowAny]

class SectorViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
    permission_classes = [AllowAny]

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer
    permission_classes = [AllowAny]

class OfertaTrabajoViewSet(viewsets.ModelViewSet):
    queryset = OfertaTrabajo.objects.all()
    serializer_class = OfertaTrabajoSerializer
    permission_classes = [AllowAny]

class PostulacionViewSet(viewsets.ModelViewSet):
    queryset = Postulacion.objects.all()
    serializer_class = PostulacionSerializer
    permission_classes = [AllowAny]

class ContratacionViewSet(viewsets.ModelViewSet):
    queryset = Contratacion.objects.all()
    serializer_class = ContratacionSerializer
    permission_classes = [AllowAny]
