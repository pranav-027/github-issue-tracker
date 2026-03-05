# GitHub Issue Board

A modern React application for visualizing GitHub issues on a Kanban board with drag-and-drop functionality.

## Features

- 🎯 **Issue Visualization**: Paste any GitHub issue URL to add it to the board
- 📊 **Kanban Board**: Four customizable columns (To Start, In Progress, Code Review, Done)
- 🎨 **Drag & Drop**: Easily move issues between columns
- 🔗 **GitHub Integration**: Fetches issue details directly from GitHub API
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Built with Tailwind CSS

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Beautiful DnD** - Drag and drop functionality
- **GitHub API** - Fetch issue data

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Add an Issue**:
   - Paste a GitHub issue URL (e.g., `https://github.com/facebook/react/issues/12345`)
   - Click "Add Issue"
   - The issue will appear in the "To Start" column

2. **Move Issues**:
   - Drag and drop issues between columns to update their status
   - Columns: To Start → In Progress → Code Review → Done

3. **View Details**:
   - Each card shows issue title, number, repository, labels, author, and creation date
   - Click "View on GitHub" to open the original issue

## Project Structure

```
board/
├── src/
│   ├── components/
│   │   ├── IssueInput.jsx    # Input component for adding issues
│   │   ├── Board.jsx          # Kanban board with drag-drop
│   │   └── IssueCard.jsx      # Individual issue card
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
└── vite.config.js            # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Future Enhancements

- Local storage persistence
- Multiple boards
- Custom column names
- Filter and search functionality
- Dark mode
- GitHub authentication for private repos

## License

MIT
