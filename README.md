# SoftNotes – Frontend

## Project Overview

SoftNotes is a private note-taking web application designed to help users create, manage, organise and securely store their personal notes.

The frontend provides a clean, responsive and user-friendly interface where authenticated users can manage their notes, mark favourites, search for specific notes and manage deleted notes.

The application includes light and dark themes to improve the user experience and allows users to retain their preferred theme when returning to the application.

## Features

- User registration and login.
- Secure authentication through the backend API.
- Protected dashboard accessible to authenticated users.
- Create, view and edit notes.
- Delete notes by moving them to the Trash.
- Restore deleted notes.
- Permanently delete notes.
- Mark and unmark favourite notes.
- Search through notes.
- Responsive layout for desktop and mobile devices.
- Mobile navigation menu.
- Light and dark mode.
- Theme preference saved using local storage.
- Persistent notes stored in Supabase.

## Technologies Used

- React – Frontend library.
- Vite – Development environment and build tool.
- Tailwind CSS – Styling and responsive layouts.
- JavaScript – Application functionality.
- React Router DOM – Routing support.
- Lucide React – Interface icons.
- Fetch API – Communication with the backend.
- Supabase – Database and authentication services.

## Project Structure

```text
softnotes-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── AuthPage.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── notesService.js
│   │
│   ├── App.jsx
│   ├── AuthGate.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/bonolokeletsophasha-ai/softnotes-frontend.git
```

### 2. Navigate into the project folder

```bash
cd softnotes-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add:

```env
VITE_API_URL=http://localhost:5000
```

This variable specifies the URL of the SoftNotes backend API.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

**Important:** The backend server must also be running for authentication and note management to work.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server. |
| `npm run build` | Builds the application for production. |
| `npm run preview` | Previews the production build. |

## Backend Integration

The frontend communicates with the SoftNotes backend through REST API requests.

The application uses the Fetch API and includes credentials with requests so that the authentication cookie can be sent to the backend.

The backend handles authentication, note management and communication with Supabase.

## Design

SoftNotes uses a green and grey colour palette to create a calm and organised workspace.

The interface includes:

- Dark moss green.
- Light tropical green.
- Pale green.
- Neutral grey backgrounds.
- Dark and light themes.

The design is responsive and adapts to different screen sizes.

## Security

- Authentication is handled by the backend.
- Protected API requests use HTTP-only authentication cookies.
- Users must be authenticated to access their notes.
- The frontend does not directly access the Supabase database.

## Author

**SoftNotes Project**

Frontend developed using React and Tailwind CSS.
