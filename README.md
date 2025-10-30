# SignWriting Word Processor

A Progressive Web App (PWA) for creating and editing SignWriting documents offline, similar to Google Docs but specialized for SignWriting.

## Features

- **PWA Installable**: Can be installed as a standalone app on desktop and mobile
- **Offline Support**: Full functionality without internet connection
- **SignWriting Components**: Uses official sgnw-components for rendering signs
- **SignMaker Integration**: Edit signs using the SignMaker tool in a modal iframe
- **File Management**: Save and load .sgnw files
- **Sign Operations**: Add, edit, copy, and delete signs
- **File Association**: Double-clicking .sgnw files opens them in the app (when PWA is installed)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to the URL shown (typically http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy

Deploy the `dist` folder to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## Usage

1. **Add New Sign**: Click "Add New Sign" to open the SignMaker modal
2. **Edit Sign**: Click "Edit" on any sign to modify it
3. **Copy Sign**: Click "Copy" to duplicate a sign
4. **Delete Sign**: Click "Delete" to remove a sign
5. **Save Document**: Click "Save" to download a .sgnw file with all signs
6. **Load Document**: Click "Load" to open a saved .sgnw file

## PWA Installation

Once deployed to HTTPS:
1. Visit the app in Chrome/Edge
2. Look for the install icon in the address bar
3. Click to install as a standalone app

## File Format

The app saves documents as .sgnw files containing space-separated SWU (SignWriting in Unicode) strings.

## TODO

- Add PWA icons (see public/icon-note.txt)

## Technologies

- React
- Vite
- vite-plugin-pwa
- sgnw-components (SignWriting web components)
- SignMaker (embedded iframe)

## License

MIT
