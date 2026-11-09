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

// Toggle a note's favourite status
export const toggleFavorite = async (id, isFavorite) => {
  const response = await apiRequest(`/api/notes/${id}/favorite`, {
    method: "PATCH",
    body: JSON.stringify({
      is_favorite: isFavorite,
    }),
  });

  return response.note;
};

// Delete a note
export const deleteNote = async (id) => {
  return await apiRequest(`/api/notes/${id}`, {
    method: "DELETE",
  });
};import { apiRequest } from "./api.js";

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

// Toggle a note's favourite status
export const toggleFavorite = async (id, isFavorite) => {
  const response = await apiRequest(`/api/notes/${id}/favorite`, {
    method: "PATCH",
    body: JSON.stringify({
      is_favorite: isFavorite,
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