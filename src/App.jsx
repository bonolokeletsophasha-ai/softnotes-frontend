import { useState } from "react";

import {
  LayoutDashboard,
  FileText,
  Star,
  Trash2,
  Search,
  Plus,
  Moon,
  Sun,
  Menu,
  X,
  Clock,
  Pencil,
} from "lucide-react";

function App() {
  const [notes, setNotes] = useState([]);

  const [showNoteForm, setShowNoteForm] = useState(false);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // Create a new note
  const handleCreateNote = (e) => {
    e.preventDefault();

    if (!noteTitle.trim() || !noteContent.trim()) {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: noteTitle,
      content: noteContent,
      createdAt: new Date().toLocaleDateString(),
    };

    setNotes((previousNotes) => [newNote, ...previousNotes]);

    setNoteTitle("");
    setNoteContent("");
    setShowNoteForm(false);
  };

  // Delete a note
  const handleDeleteNote = (id) => {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );
  };

  // Search notes
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

            <button className="flex w-full items-center gap-3 rounded-xl bg-[#DCEFE2] px-4 py-3 text-left font-medium text-[#344E41]">
              <LayoutDashboard size={19} />
              Dashboard
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-500 transition hover:bg-[#EAF3EC] hover:text-[#3F7657]">
              <FileText size={19} />
              All Notes
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-500 transition hover:bg-[#EAF3EC] hover:text-[#3F7657]">
              <Star size={19} />
              Favourites
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-500 transition hover:bg-[#EAF3EC] hover:text-[#3F7657]">
              <Trash2 size={19} />
              Trash
            </button>

          </nav>

          {/* Information Card */}
          <div className="mt-auto rounded-2xl bg-[#EAF3EC] p-5">

            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#3F7657]">
              <Moon size={20} />
            </div>

            <h3 className="font-semibold text-[#344E41]">
              Your thoughts matter.
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep your ideas organised and your personal notes in one safe place.
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
                  Your Dashboard
                </h2>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <button className="rounded-xl border border-[#DCE4DD] bg-white p-3 text-[#344E41] transition hover:bg-[#EAF3EC]">
                <Sun size={19} />
              </button>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8DFCE] font-semibold text-[#344E41]">
                U
              </div>

            </div>

          </header>

          {/* Welcome Banner */}
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
                onClick={() => setShowNoteForm(true)}
                className="mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#344E41] transition hover:bg-[#EAF3EC]"
              >
                <Plus size={19} />
                Create a note
              </button>

            </div>

          </section>

          {/* Notes Section */}
          <section>

            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <h3 className="text-xl font-bold text-[#26332B]">
                  Your Notes
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {notes.length} {notes.length === 1 ? "note" : "notes"} in your workspace
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

            {/* Display Notes */}
            {filteredNotes.length > 0 ? (

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

                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Delete note"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    <h3 className="mb-2 break-words text-lg font-semibold text-[#344E41]">
                      {note.title}
                    </h3>

                    <p className="mb-5 flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-500">
                      {note.content}
                    </p>

                    <div className="flex items-center gap-2 border-t border-[#EAF3EC] pt-4 text-xs text-slate-400">
                      <Clock size={14} />
                      {note.createdAt}
                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#C8DFCE] bg-white px-6 py-12 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DCEFE2] text-[#3F7657]">
                  <FileText size={30} />
                </div>

                <h3 className="text-lg font-semibold text-[#344E41]">
                  {searchTerm ? "No matching notes found." : "Your space is waiting."}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  {searchTerm
                    ? "Try searching with a different word or phrase."
                    : "You haven't created any notes yet. Start writing down your thoughts, ideas, and reminders."}
                </p>

                {!searchTerm && (
                  <button
                    onClick={() => setShowNoteForm(true)}
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

      {/* Create Note Modal */}
      {showNoteForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">

          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-[#344E41]">
                  Create a Note
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Write down whatever is on your mind.
                </p>
              </div>

              <button
                onClick={() => setShowNoteForm(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-[#EAF3EC] hover:text-[#344E41]"
              >
                <X size={22} />
              </button>

            </div>

            <form onSubmit={handleCreateNote}>

              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-[#344E41]">
                  Note Title
                </label>

                <input
                  type="text"
                  placeholder="Give your note a title..."
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#DCE4DD] bg-[#F8FAF8] px-4 py-3 text-sm outline-none transition focus:border-[#6B9678] focus:ring-2 focus:ring-[#DCEFE2]"
                />

              </div>

              <div className="mb-6">

                <label className="mb-2 block text-sm font-semibold text-[#344E41]">
                  Your Note
                </label>

                <textarea
                  placeholder="Start writing your thoughts..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  required
                  rows={7}
                  className="w-full resize-none rounded-xl border border-[#DCE4DD] bg-[#F8FAF8] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#6B9678] focus:ring-2 focus:ring-[#DCEFE2]"
                />

              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowNoteForm(false)}
                  className="rounded-xl border border-[#DCE4DD] px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-[#F2F4F1]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#344E41] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#263C32]"
                >
                  <Plus size={18} />
                  Save Note
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