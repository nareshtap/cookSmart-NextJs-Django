from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Recipe(models.Model):
    name = models.CharField(max_length=200)
    ingredients = models.JSONField()  
    instructions = models.JSONField()
    likes = models.ManyToManyField(User, related_name='liked_recipes', blank=True)
    cuisine_type = models.CharField(max_length=100)
    photo_link = models.URLField(max_length=500, blank=True, null=True)
    preparation_time = models.IntegerField(help_text='Preparation time in minutes')
    cooking_time = models.IntegerField(help_text='Cooking time in minutes')
    yields = models.IntegerField(help_text='Number of servings')
    is_vegetarian = models.BooleanField(default=False)
    created_by = models.ForeignKey(User,null=True, on_delete=models.CASCADE, related_name='created_recipes')

    def __str__(self):
        return self.name
