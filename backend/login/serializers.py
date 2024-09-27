from rest_framework import serializers
from .models import User 

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password", "phone_number")

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            phone_number=validated_data.get("phone_number", ""),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already taken.")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone_number', 'is_active']