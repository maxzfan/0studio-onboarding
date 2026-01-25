import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if we're in development or production
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// Get the correct base path
const getBasePath = () => {
  if (isDev) {
    return __dirname;
  }
  // In production, Electron app is in app.asar, so we need to get the app path
  return app.getAppPath();
};

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
    // Icon is optional - Electron will use default if not found
    // icon: join(__dirname, '../public/136784.png'),
    titleBarStyle: 'hiddenInset', // macOS style
  });

  // Load the app
  if (isDev) {
    // In development, load from Vite dev server
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from built files
    const basePath = getBasePath();
    const indexPath = join(basePath, 'dist', 'index.html');
    if (existsSync(indexPath)) {
      mainWindow.loadFile(indexPath);
    } else {
      console.error('Built files not found at:', indexPath);
      console.error('Please run "pnpm run build" first.');
    }
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
