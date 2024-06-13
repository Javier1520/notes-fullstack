import React, { useState } from "react";
import "../styles/Note.css";

function Note({ note, onDelete, onUnsetCategory, onSetCategory, onArchive, onNoteEdit, categories }) {
  const formattedCreatedAt = new Date(note.created_at).toLocaleDateString("en-US");
  const formattedUpdatedAt = new Date(note.updated_at).toLocaleDateString("en-US");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSetCategory = () => {
    onSetCategory(note.id, selectedCategory);
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    const updatedNote = { ...note, title: editedTitle, content: editedContent };
    onNoteEdit(note.id, updatedNote);
    setEditing(false); // Exit editing mode after saving
  };

  const handleCancel = () => {
    setEditing(false); // Exit editing mode without saving changes
  };

  const handleArchive = () => {
    onArchive(note.id, !note.is_archived);
  };

  return (
    <div className="note-container">
      {editing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p className="note-title">{note.title}</p>
          <p className="note-content">{note.content}</p>
          {note.category && <p className="note-category">Category: {note.category.name}</p>}
          <p className="note-date">Created: {formattedCreatedAt}</p>
          <p className="note-date">Updated: {formattedUpdatedAt}</p>
          <p className="note-archived">{note.is_archived ? "Archived" : "Active"}</p>
          <div className="button-container">
            <button className="delete-button" onClick={() => onDelete(note.id)}>
              Delete
            </button>
            {note.category ? (
              <button className="unset-category-button" onClick={() => onUnsetCategory(note.id)}>
                Unset Category
              </button>
            ) : (
              <div>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">None</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button className="set-category-button" onClick={handleSetCategory}>
                  Set Category
                </button>
              </div>
            )}
            <button className="edit-button" onClick={handleEditToggle}>
              Edit
            </button>
            <button className="archive-button" onClick={handleArchive}>
              {note.is_archived ? "Unarchive" : "Archive"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
