from rest_framework import generics, permissions, status
from .models import Recipe
from .serializers import RecipeSerializer
from django.db.models import Q
from rest_framework.response import Response
class RecipeListCreateView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        elif self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('search', None)

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(ingredients__icontains=search_query) |
                Q(cuisine_type__icontains=search_query) 
            )

        return queryset
        
class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated] 
    
class LikedRecipesView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeSerializer

    def get_queryset(self):
        return Recipe.objects.filter(likes=self.request.user)

class UserCreatedRecipesView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeSerializer

    def get_queryset(self):
        return Recipe.objects.filter(created_by=self.request.user) 
    
class LikeRecipeView(generics.UpdateAPIView):
    queryset = Recipe.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        recipe = self.get_object()
        if recipe.likes.filter(id=request.user.id).exists():
            return Response({"detail": "You have already liked this recipe."}, status=status.HTTP_400_BAD_REQUEST)
        recipe.likes.add(request.user)
        return Response({"detail": "Recipe liked successfully."}, status=status.HTTP_200_OK)