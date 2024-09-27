from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegistrationSerializer,CurrentUserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.exceptions import TokenError

User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username 
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True) 
        
        user = serializer.save()  

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = request.auth
            if token:
                try:
                    token.blacklist()
                except AttributeError:
                    raise TokenError("Token cannot be blacklisted.")
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except TokenError as e:
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = CurrentUserSerializer

    def get_object(self):
        return self.request.user 