from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = [
            'id', 'name', 'ingredients', 'instructions', 
            'liked_by','created_by',
            'cuisine_type', 'photo_link', 
            'preparation_time', 'cooking_time', 
            'yields', 'is_vegetarian'
        ]
