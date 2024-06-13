import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    getNotes();
    getArchivedNotes();
    getCategories();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data.results);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getArchivedNotes = () => {
    api
      .get("/api/notes/archived")
      .then((res) => res.data)
      .then((data) => {
        setArchivedNotes(data.results);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getCategories = () => {
    api
      .get("/api/categories")
      .then((res) => res.data)
      .then((data) => {
        setCategories(data.results);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/${id}`)
      .then((res) => {
        if (res.status === 204) alert("Note successfully deleted!");
        else alert("Failed to delete note.");
        getNotes();
        getArchivedNotes();
      })
      .catch((error) => alert(error));
  };

  const unsetCategory = (noteId) => {
    api
      .post(`/api/notes/${noteId}/unset-category`)
      .then((res) => {
        if (res.status === 200) {
          alert("Category unset successfully!");
          getNotes();
          getArchivedNotes();
        } else {
          alert("Failed to unset category.");
        }
      })
      .catch((error) => alert(error));
  };

  const updateNote = (id, updatedNote) => {
    api
      .patch(`/api/notes/${id}`, updatedNote)
      .then((res) => {
        if (res.status === 200) {
          alert("Note updated successfully!");
          getNotes();
          getArchivedNotes();
        } else {
          alert("Failed to update note.");
        }
      })
      .catch((error) => alert(error));
  };

  const handleNoteEdit = (id, updatedNote) => {
    updateNote(id, updatedNote);
  };

  const setCategory = (noteId, categoryId) => {
    api
      .patch(`/api/notes/${noteId}`, { category_id: categoryId })
      .then((res) => {
        if (res.status === 200) {
          alert("Category set successfully!");
          getNotes();
          getArchivedNotes();
        } else {
          alert("Failed to set category.");
        }
      })
      .catch((error) => alert(error));
  };

  const archiveNote = (id, is_archived) => {
    api
      .patch(`/api/notes/${id}`, { is_archived })
      .then((res) => {
        if (res.status === 200) {
          alert("Note archived successfully!");
          getNotes();
          getArchivedNotes();
        } else {
          alert("Failed to archive note.");
        }
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    const createNoteWithCategory = (categoryId = null) => {
      const newNote = { content, title, category_id: categoryId };
      api
        .post("/api/notes", newNote)
        .then((res) => {
          if (res.status === 201) {
            alert("Note created!");
            setTitle("");
            setContent("");
            setSelectedCategory("");
            setNewCategory("");
            getNotes();
          } else {
            alert("Failed to create note.");
          }
        })
        .catch((err) => alert(err));
    };

    if (newCategory) {
      // If new category is specified, create the category first
      api
        .post("/api/categories", { name: newCategory })
        .then((res) => {
          if (res.status === 201) {
            const categoryId = res.data.id;
            createNoteWithCategory(categoryId);
            getCategories(); // Update the categories list after creating a new category
          } else {
            alert("Failed to create category.");
          }
        })
        .catch((err) => alert(err));
    } else {
      createNoteWithCategory(selectedCategory || null);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/logout"; // Redirect to /logout endpoint
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        <button className="logout-button" onClick={logout}>Logout</button> {/* Logout button */}
        {notes.map((note) => (
          <Note
            note={note}
            onDelete={deleteNote}
            onUnsetCategory={unsetCategory}
            onSetCategory={setCategory}
            onArchive={archiveNote} // Pass the archive function
            onNoteEdit={handleNoteEdit}
            categories={categories}
            key={note.id}
          />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <label htmlFor="category">Category:</label>
        <br />
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">None</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="new-category">Or create a new category:</label>
        <br />
        <input
          type="text"
          id="new-category"
          name="new-category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
      <div>
        <h2>Archived Notes</h2>
        {archivedNotes.map((note) => (
          <Note
            note={note}
            onDelete={deleteNote}
            onUnsetCategory={unsetCategory}
            onSetCategory={setCategory}
            onArchive={archiveNote} // Pass the archive function
            onNoteEdit={handleNoteEdit}
            categories={categories}
            key={note.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
