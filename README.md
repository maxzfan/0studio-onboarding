# Adari

A modern landing page for Adari Creator - connect brands with content creators.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Adari/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions
│   │   ├── assets/         # Static assets
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── api/                # Serverless API functions
│   ├── public/             # Public static assets
│   ├── index.html          # HTML template
│   ├── package.json        # Dependencies
│   ├── vite.config.js      # Vite configuration
│   └── vercel.json         # Vercel deployment config
├── vercel.json             # Root Vercel config
└── README.md               # This file
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing

## 🚢 Deployment

The app is configured for deployment on Vercel. Push to your repository and Vercel will automatically build and deploy.

## 📄 License

MIT
