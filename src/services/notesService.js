import { apiRequest } from "./api.js";

// Get all active notes
export const getNotes = async () => {
  const response = await apiRequest("/api/notes", {
    method: "GET",
  });

  return response.notes;
};

// Get all deleted notes
export const getTrashNotes = async () => {
  const response = await apiRequest("/api/notes/trash", {
    method: "GET",
  });

  return response.notes;
};

// Create a new note
export const createNote = async (title, content) => {
  const response = await apiRequest("/api/notes", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });

  return response.note;
};

// Update an existing note
export const updateNote = async (id, title, content) => {
  const response = await apiRequest(`/api/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });

  return response.note;
};

// Toggle favourite status
export const toggleFavorite = async (id, isFavorite) => {
  const response = await apiRequest(`/api/notes/${id}/favorite`, {
    method: "PATCH",
    body: JSON.stringify({
      is_favorite: isFavorite,
    }),
  });

  return response.note;
};

// Move a note to Trash
export const deleteNote = async (id) => {
  return await apiRequest(`/api/notes/${id}`, {
    method: "DELETE",
  });
};

// Restore a note from Trash
export const restoreNote = async (id) => {
  const response = await apiRequest(`/api/notes/${id}/restore`, {
    method: "PATCH",
  });

  return response.note;
};

// Permanently delete a note
export const permanentlyDeleteNote = async (id) => {
  return await apiRequest(`/api/notes/${id}/permanent`, {
    method: "DELETE",
  });
};