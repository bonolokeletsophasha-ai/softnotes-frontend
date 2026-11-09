import { apiRequest } from "./api.js";

export const getNotes = async () => {
  const response = await apiRequest("/api/notes", {
    method: "GET",
  });

  return response.notes;
};

export const createNote = async (title, content) => {
  const response = await apiRequest("/api/notes", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });

  return response.note;
};

export const updateNote = async (id, title, content) => {
  const response = await apiRequest(`/api/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });

  return response.note;
};

export const toggleFavorite = async (id, isFavorite) => {
  const response = await apiRequest(`/api/notes/${id}/favorite`, {
    method: "PATCH",
    body: JSON.stringify({
      is_favorite: isFavorite,
    }),
  });

  return response.note;
};

export const deleteNote = async (id) => {
  return await apiRequest(`/api/notes/${id}`, {
    method: "DELETE",
  });
};