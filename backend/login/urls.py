from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView,UserRegistrationView,LogoutView,CurrentUserView


urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path('user/', CurrentUserView.as_view(), name='current_user')
]
