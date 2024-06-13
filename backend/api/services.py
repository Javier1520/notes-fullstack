from .repositories import NoteRepository, CategoryRepository

class NoteService:
    def __init__(self):
        self.repository = NoteRepository()

    def create_note(self, user, title, content, category=None):
        return self.repository.create_note(user, title, content, category)

    def edit_note(self, note_id, title=None, content=None, is_archived=None, category_id=None):
        note = self.repository.get_note_by_id(note_id)
        return self.repository.update_note(note, title, content, is_archived, category_id)

    def delete_note(self, note_id):
        note = self.repository.get_note_by_id(note_id)
        self.repository.delete_note(note)

    def list_notes(self, user, is_archived=False, category_id=None):
        return self.repository.get_notes_by_user(user, is_archived, category_id)

    def unset_note_category(self, note_id):
        note = self.repository.get_note_by_id(note_id)
        return self.repository.delete_note_category(note)


class CategoryService:
    def __init__(self):
        self.category_repository = CategoryRepository()

    def list_categories(self, user):
        return self.category_repository.get_categories_by_user(user)

    def create_category(self, user, name):
        return self.category_repository.create_category(user, name)

    def delete_category(self, category_id):
        category = self.category_repository.get_category_by_id(category_id)
        self.category_repository.delete_category(category)
