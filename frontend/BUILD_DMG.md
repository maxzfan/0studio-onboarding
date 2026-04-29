# Building DMG for macOS

This guide explains how to build a DMG (Disk Image) file for macOS from this Electron app.

## Prerequisites

1. **macOS** - You must be on a macOS system to build a DMG
2. **Node.js** and **pnpm** installed
3. All dependencies installed

## Steps to Build DMG

1. **Install dependencies:**
   ```bash
   cd frontend
   pnpm install
   ```

2. **Build the DMG:**
   ```bash
   pnpm run electron:build:mac
   ```

   This will:
   - Build the Vite app (creates `dist/` folder)
   - Package it as an Electron app
   - Create a DMG file in `dist-electron/` directory

3. **Find your DMG:**
   The DMG file will be located at:
   ```
   frontend/dist-electron/0studio Onboarding-1.0.0.dmg
   ```

## Development

To test the Electron app during development:

```bash
# Terminal 1: Start Vite dev server
pnpm run dev

# Terminal 2: Start Electron (in a new terminal)
pnpm run electron
```

Or use the combined command:
```bash
pnpm run electron:dev
```

## Customization

You can customize the DMG appearance and app metadata in `package.json` under the `build` section:

- `appId`: Unique identifier for your app
- `productName`: Name shown in the DMG
- `mac.category`: App category
- `dmg.contents`: Layout of items in the DMG window
- `dmg.window`: Size of the DMG window

## Notes

- The DMG will be signed if you have code signing certificates configured
- For distribution, you may want to notarize the app with Apple
- The icon file (`build/icon.icns`) is optional - if not present, Electron will use a default icon
