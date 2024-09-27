from rest_framework import serializers
from .models import Recipe
from login.serializers import UserRegistrationSerializer  

class RecipeSerializer(serializers.ModelSerializer):
    created_by = UserRegistrationSerializer(read_only=True)
    liked_by = UserRegistrationSerializer(many=True, source='likes',read_only=True)

    class Meta:
        model = Recipe
        fields = [
            'id', 'name', 'ingredients', 'instructions', 
            'liked_by','created_by',
            'cuisine_type', 'photo_link', 
            'preparation_time', 'cooking_time', 
            'yields', 'is_vegetarian'
        ]
