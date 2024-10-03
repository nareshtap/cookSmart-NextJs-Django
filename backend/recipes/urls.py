from django.urls import path
from .views import RecipeListCreateView, RecipeDetailView,LikedRecipesView,UserCreatedRecipesView,LikeRecipeView,DislikeRecipeView

urlpatterns = [
    path('recipes/', RecipeListCreateView.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view(), name='recipe-detail'),
    path('recipes/liked-recipes/', LikedRecipesView.as_view(), name='liked-recipes'),
    path('recipes/created-recipes/', UserCreatedRecipesView.as_view(), name='created-recipes'),
    path('recipes/<int:pk>/like/', LikeRecipeView.as_view(), name='like-recipe'),
    path('recipes/<int:pk>/dislike/', DislikeRecipeView.as_view(), name='dislike-recipe')
]
