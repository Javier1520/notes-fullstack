from .models import Note, Category

class NoteRepository:
    def get_notes_by_user(self, user, is_archived=False, category_id=None):
        queryset = Note.objects.filter(user=user, is_archived=is_archived)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset

    def get_note_by_id(self, note_id):
        return Note.objects.get(id=note_id)

    def create_note(self, user, title, content, category=None):
        return Note.objects.create(user=user, title=title, content=content, category=category)

    def update_note(self, note, title=None, content=None, is_archived=None, category_id=None):
        if title:
            note.title = title
        if content:
            note.content = content
        if is_archived is not None:
            note.is_archived = is_archived
        if category_id:
            category = Category.objects.get(id=category_id)
            note.category = category
        note=note.save()
        return note

    def delete_note_category(self, note):
        note.category = None
        note.save()

    def delete_note(self, note):
        note.delete()


class CategoryRepository:
    def get_categories_by_user(self, user):
        return Category.objects.filter(user=user)

    def create_category(self, user, name):
        return Category.objects.create(user=user, name=name)

    def get_category_by_id(self, category_id):
        return Category.objects.get(id=category_id)

    def delete_category(self, category):
        category.delete()