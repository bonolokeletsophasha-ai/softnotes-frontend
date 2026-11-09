import { apiRequest } from "./api.js";

// Get all notes belonging to the logged-in user
export const getNotes = async () => {
  const response = await apiRequest("/api/notes", {
    method: "GET",
  });

  return response.notes;
};

// Create a new note
export const createNote = async (title, content) => {
  const response = await apiRequest("/api/notes", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
  });

  return response.note;
};

// Update an existing note
export const updateNote = async (id, title, content) => {
  const response = await apiRequest(`/api/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });

  return response.note;
};

// Delete a note
export const deleteNote = async (id) => {
  return await apiRequest(`/api/notes/${id}`, {
    method: "DELETE",
  });
};