# RSVP Reader

Lightweight Rapid Serial Visual Presentation (RSVP) reader built with Vite + React + Tailwind.

Quick start

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

This project is a browser-based RSVP reader app built with Vite, React, and Tailwind.

## What it does

- Lets the user paste text or load a `.txt` file.
- Parses the text into word tokens and calculates the optimal recognition point (ORP) for each word.
- Displays one word at a time in the center of the screen.
- Highlights the ORP character in the accent color and shows a subtle guide line.
- Advances words automatically based on configured WPM and punctuation pauses.
- Provides play/pause/stop controls, seek support, and keyboard shortcuts.
- Supports exporting the reading session as a `.webm` video using canvas recording.

## Key features

- **Rapid Serial Visual Presentation**: fast single-word display for speed reading.
- **ORP highlighting**: focal letter is visually emphasized for quicker recognition.
- **Live configuration**: WPM, font size, accent color, and context toggle are adjustable.
- **Video export**: records the RSVP session to a downloadable webm file.
- **Keyboard controls**: space toggles play/pause, arrow keys seek forward/back.

## Architecture

- `src/App.jsx` – main app shell, state management, and keyboard shortcuts.
- `src/components/TextInput.jsx` – text entry, file loading, and word count display.
- `src/components/RSVPPlayer.jsx` – renders the current word with ORP styling.
- `src/components/Controls.jsx` – playback buttons and progress seek bar.
- `src/components/ConfigPanel.jsx` – user settings persisted to `localStorage`.
- `src/components/VideoExporter.jsx` – export controls and progress UI.
- `src/hooks/useRSVP.js` – playback timing and current-word management.
- `src/hooks/useConfig.js` – configuration state and persistence.
- `src/hooks/useVideoExport.js` – canvas-based video recording logic.
- `src/utils/textParser.js` – tokenizes raw text and computes ORP/pause multipliers.
- `src/utils/canvasRenderer.js` – draws each export frame onto a canvas.

## Notes

This README focuses on explaining the app rather than deployment details. The app is intended as a foundation for a browser-native RSVP reader with export capability.
