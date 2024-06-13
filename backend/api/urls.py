from django.urls import path
from .views import (
    NoteListCreateAPIView, SingleNoteAPIView, ArchivedNoteListAPIView, CategoryListCreateAPIView, SingleCategoryAPIView, UnsetNoteCategoryAPIView
)

urlpatterns = [
    path('notes', NoteListCreateAPIView.as_view(), name='note-list-create'),
    path('notes/<int:id>', SingleNoteAPIView.as_view(), name='single-note'),
    path('notes/<int:note_id>/unset-category', UnsetNoteCategoryAPIView.as_view(), name='unset-note-category'),
    path('notes/archived', ArchivedNoteListAPIView.as_view(), name='archived-note-list'),
    path('categories', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<int:id>', SingleCategoryAPIView.as_view(), name='single-category'),
]
