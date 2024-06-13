from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, NoteSerializer, CategorySerializer
from .services import NoteService, CategoryService
from .models import Note, Category

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

note_service = NoteService()
category_service = CategoryService()

class NoteListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')
        return note_service.list_notes(self.request.user, is_archived=False, category_id=category_id)

    def perform_create(self, serializer):
        category_id = self.request.data.get('category_id')
        category = None
        if category_id:
            category = get_object_or_404(Category, id=category_id)

        note = note_service.create_note(
                self.request.user,
                serializer.validated_data['title'],
                serializer.validated_data['content'],
                category=category
        )
        serializer.instance = note
        return serializer.data


class SingleNoteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            try:
                note_service.edit_note(
                    instance.id,
                    serializer.validated_data.get('title'),
                    serializer.validated_data.get('content'),
                    serializer.validated_data.get('is_archived'),
                    serializer.validated_data.get('category_id')
                )
            except Category.DoesNotExist as e:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        note = Note.objects.get(id=instance.id)
        serializer = NoteSerializer(note)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        note_service.delete_note(instance.id)


class UnsetNoteCategoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, note_id):
        note = note_service.unset_note_category(note_id)
        return Response(status=status.HTTP_200_OK)


class ArchivedNoteListAPIView(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        category_id = self.request.query_params.get('category')
        return note_service.list_notes(self.request.user, is_archived=True, category_id=category_id)

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return category_service.list_categories(self.request.user)

    def perform_create(self, serializer):
        category = category_service.create_category(
            self.request.user,
            serializer.validated_data['name']
        )
        serializer.instance = category
        return serializer.data

class SingleCategoryAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_destroy(self, instance):
        category_service.delete_category(instance.id)