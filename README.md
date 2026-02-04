# Mission Control - Kanban Task Board

A modern, dark-themed Kanban task board built with React, featuring drag-and-drop functionality, activity tracking, and a sleek UI inspired by mission control interfaces.

![Mission Control Kanban Board](https://img.shields.io/badge/React-v18-blue) ![Vite](https://img.shields.io/badge/Vite-v6-646CFF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38BDF8)

## ✨ Features

- **🎨 Dark Theme UI** - Sleek, modern interface with subtle borders and dark backgrounds
- **📊 4 Kanban Columns** - Recurring, Backlog, In Progress, Review
- **🔄 Drag & Drop** - Intuitive task management with @dnd-kit
- **🏷️ Color-Coded Tags** - Organize tasks with bug, feature, improvement, urgent, and documentation labels
- **📈 Stats Dashboard** - Track tasks this week, in progress, total count, and completion rate
- **📋 Activity Feed** - Real-time sidebar showing recent actions (created, moved, completed, deleted)
- **💾 Local Storage** - All data persists in browser, no backend needed
- **✏️ Full CRUD** - Add, edit, delete, and complete tasks with ease
- **⏱️ Smart Timestamps** - Relative time display (e.g., "2h ago")

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mission-control-kanban.git
cd mission-control-kanban
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **@dnd-kit** - Drag and drop functionality
- **LocalStorage API** - Data persistence

## 📦 Project Structure

```
mission-control-kanban/
├── src/
│   ├── components/
│   │   ├── ActivityFeed.jsx    # Activity sidebar
│   │   ├── Column.jsx           # Kanban column container
│   │   ├── StatsBar.jsx         # Top statistics bar
│   │   ├── TaskCard.jsx         # Individual task card
│   │   └── TaskModal.jsx        # Add/edit task modal
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── tailwind.config.js
└── package.json
```

## 🎯 Usage

### Creating Tasks
1. Click "+ New Task" button
2. Fill in title, description, select column, and add tags
3. Click "Create Task"

### Managing Tasks
- **Drag & Drop**: Click and drag tasks between columns
- **Edit**: Hover over a task and click the ✏️ icon
- **Complete**: Click the ✓ icon to mark as done (moves to activity feed)
- **Delete**: Click the 🗑️ icon to remove

### Activity Feed
The right sidebar shows all recent actions with timestamps, keeping you updated on task movements and changes.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite - click "Deploy"

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/mission-control-kanban",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```js
export default defineConfig({
  base: '/mission-control-kanban/',
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run deploy
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  dark: {
    bg: '#0a0a0f',      // Main background
    card: '#15151f',    // Card background
    border: '#2a2a3a',  // Border color
    hover: '#1f1f2f',   // Hover state
  }
}
```

### Tags
Add or modify tags in `src/components/TaskModal.jsx`:

```js
const AVAILABLE_TAGS = ['bug', 'feature', 'improvement', 'urgent', 'documentation'];
```

### Columns
Modify columns in `src/App.jsx`:

```js
const COLUMNS = ['Recurring', 'Backlog', 'In Progress', 'Review'];
```

## 📝 License

MIT License - feel free to use this project however you'd like!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

Built with ❤️ using React + Vite + Tailwind CSS
