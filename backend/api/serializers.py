from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Category

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class NoteSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(required=False, write_only=True)

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'user', 'is_archived', 'category', 'category_id', 'created_at', 'updated_at']
        extra_kwargs = {'user': {'read_only': True}}