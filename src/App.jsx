import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  FileText,
  Star,
  Trash2,
  Search,
  Plus,
  Sun,
  Menu,
  X,
  Clock,
  Pencil,
  LogOut,
  Heart,
  RotateCcw,
} from "lucide-react";

import {
  getNotes,
  getTrashNotes,
  createNote,
  updateNote,
  deleteNote,
  toggleFavorite,
  restoreNote,
  permanentlyDeleteNote,
} from "./services/notesService.js";

import { logoutUser } from "./services/authService.js";

function App({ user, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [trashNotes, setTrashNotes] = useState([]);

  const [activePage, setActivePage] = useState("dashboard");

  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [loadingNotes, setLoadingNotes] = useState(true);
  const [loadingTrash, setLoadingTrash] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  const [error, setError] = useState("");

  // Load active notes
  const loadNotes = async () => {
    try {
      setLoadingNotes(true);
      setError("");

      const savedNotes = await getNotes();
      setNotes(savedNotes || []);
    } catch (err) {
      setError(err.message || "Unable to load your notes.");
    } finally {
      setLoadingNotes(false);
    }
  };

  // Load deleted notes
  const loadTrashNotes = async () => {
    try {
      setLoadingTrash(true);

      const deletedNotes = await getTrashNotes();
      setTrashNotes(deletedNotes || []);
    } catch (err) {
      setError(err.message || "Unable to load your Trash.");
    } finally {
      setLoadingTrash(false);
    }
  };

  // Load notes when the app opens
  useEffect(() => {
    loadNotes();
    loadTrashNotes();
  }, []);

  // Open a new note form
  const handleNewNote = () => {
    setEditingNoteId(null);
    setNoteTitle("");
    setNoteContent("");
    setError("");
    setShowNoteForm(true);
  };

  // Close and reset the note form
  const handleCloseForm = () => {
    setShowNoteForm(false);
    setEditingNoteId(null);
    setNoteTitle("");
    setNoteContent("");
  };

  // Create or update a note
  const handleCreateNote = async (e) => {
    e.preventDefault();

    if (!noteTitle.trim() || !noteContent.trim()) {
      setError("Please enter both a title and note content.");
      return;
    }

    try {
      setSavingNote(true);
      setError("");

      if (editingNoteId) {
        await updateNote(
          editingNoteId,
          noteTitle.trim(),
          noteContent.trim()
        );
      } else {
        await createNote(
          noteTitle.trim(),
          noteContent.trim()
        );
      }

      handleCloseForm();

      await loadNotes();
    } catch (err) {
      setError(err.message || "Unable to save your note.");
    } finally {
      setSavingNote(false);
    }
  };

  // Open an existing note for editing
  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setError("");
    setShowNoteForm(true);
  };

  // Toggle favourite status
  const handleToggleFavorite = async (note) => {
    try {
      setError("");

      const updatedNote = await toggleFavorite(
        note.id,
        !note.is_favorite
      );

      setNotes((previousNotes) =>
        previousNotes.map((item) =>
          item.id === note.id ? updatedNote : item
        )
      );
    } catch (err) {
      setError(err.message || "Unable to update favourite status.");
    }
  };

  // Move a note to Trash
  const handleDeleteNote = async (id) => {
    const confirmDelete = window.confirm(
      "Move this note to the Trash?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await deleteNote(id);

      setNotes((previousNotes) =>
        previousNotes.filter((note) => note.id !== id)
      );

      await loadTrashNotes();
    } catch (err) {
      setError(err.message || "Unable to move note to Trash.");
    }
  };

  // Restore a note from Trash
  const handleRestoreNote = async (id) => {
    try {
      setError("");

      await restoreNote(id);

      setTrashNotes((previousNotes) =>
        previousNotes.filter((note) => note.id !== id)
      );

      await loadNotes();
    } catch (err) {
      setError(err.message || "Unable to restore note.");
    }
  };

  // Permanently delete a note
  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this note? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await permanentlyDeleteNote(id);

      setTrashNotes((previousNotes) =>
        previousNotes.filter((note) => note.id !== id)
      );
    } catch (err) {
      setError(err.message || "Unable to permanently delete note.");
    }
  };

  // Log out
  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmLogout) return;

    try {
      await logoutUser();
      onLogout();
    } catch (err) {
      setError(err.message || "Unable to log out.");
    }
  };

  // Format note date
  const formatDate = (date) => {
    if (!date) return "Recently updated";

    return new Date(date).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Favourite notes
  const favoriteNotes = notes.filter(
    (note) => note.is_favorite
  );

  // Select notes based on active page
  const pageNotes =
    activePage === "favorites"
      ? favoriteNotes
      : activePage === "trash"
      ? trashNotes
      : notes;

  // Search notes
  const filteredNotes = pageNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Change page
  const navigateTo = (page) => {
    setActivePage(page);
    setSearchTerm("");
    setError("");

    if (page === "trash") {
      loadTrashNotes();
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F1] text-[#26332B]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-[#DCE4DD] bg-white px-6 py-8 md:flex">

          {/* Logo */}
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#344E41] text-xl font-bold text-white">
              S
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#26332B]">
                SoftNotes
              </h1>

              <p className="text-xs text-slate-400">
                Your space, your thoughts.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-2">

            <button
              onClick={() => navigateTo("dashboard")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition ${
                activePage === "dashboard"
                  ? "bg-[#DCEFE2] text-[#344E41]"
                  : "text-slate-500 hover:bg-[#EAF3EC] hover:text-[#3F7657]"
              }`}
            >
              <LayoutDashboard size={19} />
              Dashboard
            </button>

            <button
              onClick={() => navigateTo("all")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition ${
                activePage === "all"
                  ? "bg-[#DCEFE2] text-[#344E41]"
                  : "text-slate-500 hover:bg-[#EAF3EC] hover:text-[#3F7657]"
              }`}
            >
              <FileText size={19} />
              All Notes
            </button>

            <button
              onClick={() => navigateTo("favorites")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-medium transition ${
                activePage === "favorites"
                  ? "bg-[#DCEFE2] text-[#344E41]"
                  : "text-slate-500 hover:bg-[#EAF3EC] hover:text-[#3F7657]"
              }`}
            >
              <span className="flex items-center gap-3">
                <Star size={19} />
                Favourites
              </span>

              <span className="rounded-full bg-[#EAF3EC] px-2 py-1 text-xs text-[#344E41]">
                {favoriteNotes.length}
              </span>
            </button>

            <button
              onClick={() => navigateTo("trash")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-medium transition ${
                activePage === "trash"
                  ? "bg-[#DCEFE2] text-[#344E41]"
                  : "text-slate-500 hover:bg-[#EAF3EC] hover:text-[#3F7657]"
              }`}
            >
              <span className="flex items-center gap-3">
                <Trash2 size={19} />
                Trash
              </span>

              <span className="rounded-full bg-[#EAF3EC] px-2 py-1 text-xs text-[#344E41]">
                {trashNotes.length}
              </span>
            </button>

          </nav>

          {/* Information Card */}
          <div className="mt-auto rounded-2xl bg-[#EAF3EC] p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#3F7657]">
              <Heart size={20} />
            </div>

            <h3 className="font-semibold text-[#344E41]">
              Your thoughts matter.
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep your ideas organised and your personal notes in one safe
              place.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-5 py-6 md:px-10 md:py-9">

          {/* Header */}
          <header className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">

              <button className="rounded-lg p-2 text-[#344E41] hover:bg-[#DCEFE2] md:hidden">
                <Menu size={23} />
              </button>

              <div>
                <p className="text-sm text-slate-400">
                  Welcome to your workspace
                </p>

                <h2 className="text-2xl font-bold text-[#26332B] md:text-3xl">
                  {activePage === "favorites"
                    ? "Your Favourites"
                    : activePage === "all"
                    ? "All Notes"
                    : activePage === "trash"
                    ? "Your Trash"
                    : "Your Dashboard"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">

              <button className="rounded-xl border border-[#DCE4DD] bg-white p-3 text-[#344E41] transition hover:bg-[#EAF3EC]">
                <Sun size={19} />
              </button>

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-[#344E41]">
                  {user?.email?.split("@")[0] || "Workspace User"}
                </p>

                <p className="text-xs text-slate-400">
                  Personal Workspace
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8DFCE] font-semibold text-[#344E41]">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>

              <button
                onClick={handleLogout}
                title="Log out"
                className="rounded-xl border border-[#DCE4DD] bg-white p-3 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
              >
                <LogOut size={19} />
              </button>
            </div>
          </header>

          {/* Welcome Banner */}
          {activePage === "dashboard" && (
            <section className="mb-9 overflow-hidden rounded-3xl bg-gradient-to-r from-[#263C32] via-[#344E41] to-[#6B9678] p-7 text-white md:p-10">
              <div className="max-w-xl">
                <p className="mb-3 text-sm font-medium text-[#DCEFE2]">
                  YOUR PERSONAL SPACE
                </p>

                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  A little space for all your thoughts.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-[#EAF3EC] md:text-base">
                  Capture your ideas, organise your plans, and keep everything
                  important in one place.
                </p>

                <button
                  onClick={handleNewNote}
                  className="mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#344E41] transition hover:bg-[#EAF3EC]"
                >
                  <Plus size={19} />
                  Create a note
                </button>
              </div>
            </section>
          )}

          {/* Trash Information Banner */}
          {activePage === "trash" && (
            <section className="mb-8 rounded-2xl border border-[#DCE4DD] bg-white p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#344E41]">
                  <Trash2 size={23} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#344E41]">
                    Your deleted notes
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Notes in the Trash can be restored whenever you need them.
                    If you permanently delete a note, it cannot be recovered.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              <span>{error}</span>

              <button
                onClick={() => setError("")}
                className="ml-4"
                aria-label="Dismiss error"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Notes Section */}
          <section>

            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <h3 className="text-xl font-bold text-[#26332B]">
                  {activePage === "favorites"
                    ? "Saved Favourites"
                    : activePage === "trash"
                    ? "Deleted Notes"
                    : "Your Notes"}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {activePage === "favorites"
                    ? `${favoriteNotes.length} favourite ${
                        favoriteNotes.length === 1 ? "note" : "notes"
                      }`
                    : activePage === "trash"
                    ? `${trashNotes.length} ${
                        trashNotes.length === 1 ? "deleted note" : "deleted notes"
                      }`
                    : `${notes.length} ${
                        notes.length === 1 ? "note" : "notes"
                      } in your workspace`}
                </p>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 rounded-xl border border-[#DCE4DD] bg-white px-4 py-3">
                <Search size={18} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Search your notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-48"
                />
              </div>
            </div>

            {/* Loading State */}
            {(activePage === "trash" ? loadingTrash : loadingNotes) ? (
              <div className="flex min-h-72 items-center justify-center rounded-3xl bg-white">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#DCEFE2] border-t-[#344E41]" />

                  <p className="text-sm text-slate-500">
                    Loading your notes...
                  </p>
                </div>
              </div>
            ) : filteredNotes.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="group flex min-h-56 flex-col rounded-2xl border border-[#DCE4DD] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                  >

                    <div className="mb-4 flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCEFE2] text-[#3F7657]">
                        <FileText size={20} />
                      </div>

                      {/* Active Note Actions */}
                      {activePage !== "trash" ? (
                        <div className="flex items-center gap-1">

                          <button
                            onClick={() => handleToggleFavorite(note)}
                            title={
                              note.is_favorite
                                ? "Remove from favourites"
                                : "Add to favourites"
                            }
                            className={`rounded-lg p-2 transition ${
                              note.is_favorite
                                ? "bg-[#DCEFE2] text-[#344E41]"
                                : "text-slate-400 hover:bg-[#EAF3EC] hover:text-[#344E41]"
                            }`}
                          >
                            <Star
                              size={18}
                              fill={
                                note.is_favorite
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>

                          <button
                            onClick={() => handleEditNote(note)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-[#EAF3EC] hover:text-[#344E41]"
                            title="Edit note"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                            title="Move to Trash"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      ) : (
                        /* Trash Note Actions */
                        <div className="flex items-center gap-1">

                          <button
                            onClick={() => handleRestoreNote(note.id)}
                            className="rounded-lg p-2 text-[#3F7657] transition hover:bg-[#EAF3EC]"
                            title="Restore note"
                          >
                            <RotateCcw size={18} />
                          </button>

                          <button
                            onClick={() => handlePermanentDelete(note.id)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                            title="Delete forever"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      )}
                    </div>

                    <h3 className="mb-2 break-words text-lg font-semibold text-[#344E41]">
                      {note.title}
                    </h3>

                    <p className="mb-5 flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-500">
                      {note.content}
                    </p>

                    <div className="flex items-center gap-2 border-t border-[#EAF3EC] pt-4 text-xs text-slate-400">
                      <Clock size={14} />
                      {formatDate(note.updated_at || note.created_at)}
                    </div>

                    {activePage === "trash" && (
                      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[#9A6B42]">
                        <Trash2 size={13} />
                        In Trash
                      </div>
                    )}

                  </div>
                ))}

              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#C8DFCE] bg-white px-6 py-12 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DCEFE2] text-[#3F7657]">
                  {activePage === "favorites" ? (
                    <Star size={30} />
                  ) : activePage === "trash" ? (
                    <Trash2 size={30} />
                  ) : (
                    <FileText size={30} />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-[#344E41]">
                  {searchTerm
                    ? "No matching notes found."
                    : activePage === "favorites"
                    ? "No favourites yet."
                    : activePage === "trash"
                    ? "Your Trash is empty."
                    : "Your space is waiting."}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  {searchTerm
                    ? "Try searching with a different word or phrase."
                    : activePage === "favorites"
                    ? "Click the star on any note to save it here."
                    : activePage === "trash"
                    ? "Notes you move to Trash will appear here. You can restore them or delete them forever."
                    : "You haven't created any notes yet. Start writing down your thoughts, ideas, and reminders."}
                </p>

                {activePage !== "favorites" &&
                  activePage !== "trash" &&
                  !searchTerm && (
                    <button
                      onClick={handleNewNote}
                      className="mt-6 flex items-center gap-2 rounded-xl bg-[#344E41] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#263C32]"
                    >
                      <Plus size={18} />
                      Create your first note
                    </button>
                  )}

              </div>
            )}

          </section>
        </main>
      </div>

      {/* Create / Edit Note Modal */}
      {showNoteForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">

            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#344E41]">
                  {editingNoteId ? "Edit Note" : "Create a Note"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Write down whatever is on your mind.
                </p>
              </div>

              <button
                onClick={handleCloseForm}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-[#EAF3EC] hover:text-[#344E41]"
                aria-label="Close note form"
              >
                <X size={22} />
              </button>
            </div>

            {/* Note Form */}
            <form onSubmit={handleCreateNote}>

              <div className="mb-5">
                <label
                  htmlFor="noteTitle"
                  className="mb-2 block text-sm font-semibold text-[#344E41]"
                >
                  Note Title
                </label>

                <input
                  id="noteTitle"
                  type="text"
                  placeholder="Give your note a title..."
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#DCE4DD] bg-[#F8FAF8] px-4 py-3 text-sm outline-none transition focus:border-[#6B9678] focus:ring-2 focus:ring-[#DCEFE2]"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="noteContent"
                  className="mb-2 block text-sm font-semibold text-[#344E41]"
                >
                  Your Note
                </label>

                <textarea
                  id="noteContent"
                  placeholder="Start writing your thoughts..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  required
                  rows={7}
                  className="w-full resize-none rounded-xl border border-[#DCE4DD] bg-[#F8FAF8] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#6B9678] focus:ring-2 focus:ring-[#DCEFE2]"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="rounded-xl border border-[#DCE4DD] px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-[#F2F4F1]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingNote}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#344E41] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#263C32] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingNote
                    ? "Saving..."
                    : editingNoteId
                    ? "Save Changes"
                    : "Save Note"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;