# Task Board Application

A frontend-only Kanban task board built with React. All data persists in localStorage.

## Features

- Static login authentication (intern@demo.com / intern123)
- Kanban board with Todo, Doing, Done columns
- Drag & drop tasks between columns
- Create, edit, delete tasks
- Task properties: title, description, priority, due date, tags
- Search by title
- Filter by priority
- Sort by due date
- Activity log tracking all actions
- Reset board functionality
- Remember Me option
- **Dark mode support** with theme toggle
- **Fully responsive design** for mobile, tablet, and desktop
- Theme preference persists in localStorage

## Installation

```bash
npm install
```

## Running the App

```bash
npm start
```

The app will open at http://localhost:3000

## Building for Production

```bash
npm run build
```

The build folder will contain the deployable static files.

## Running Tests

```bash
npm test
```

## Login Credentials

- Email: intern@demo.com
- Password: intern123

## Theme Support

The app includes a dark mode toggle button available on both the login and board screens. Your theme preference is automatically saved and will persist across sessions.

## Responsive Design

The app is fully responsive and adapts to different screen sizes:
- **Mobile** (≤480px): Stacked layout, compact buttons
- **Tablet** (481-768px): Optimized spacing and layout
- **Desktop** (>768px): Full multi-column board view

## Deployment

This app can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

Simply upload the contents of the `build` folder after running `npm run build`.

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Board/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   └── Task.jsx
│   ├── TaskForm.jsx
│   ├── ActivityLog.jsx
│   ├── ConfirmDialog.jsx
│   └── ThemeToggle.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   └── useResponsive.js
├── styles/
│   └── responsive.js
├── utils/
│   └── storage.js
├── App.jsx
└── index.js
```

## Storage

All data is stored in localStorage:
- User session
- Tasks
- Activity log
- Theme preference

Data persists across browser sessions unless cleared manually.
