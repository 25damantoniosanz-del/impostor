# Impostor Game

A local multiplayer social deduction game ("pass and play") built with React, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js (v18 or later recommended)

## Setup

1. Open a terminal in this folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to Netlify

1. Push this code to a GitHub repository.
2. Connect the repository to Netlify.
3. Use the following build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

## PWA Features

This app is a Progressive Web App (PWA). It can be installed on mobile devices and works offline.
- **Manifest:** Generated automatically by `vite-plugin-pwa`.
- **Icons:** Located in `public/`.
- **Offline:** Service worker caches assets.

## Game Rules

1. **Setup:** Choose number of players and impostors.
2. **Pass & Play:** Pass the device to each player. They hold the screen to see their secret word.
3. **Discuss:** Once everyone knows their role, discuss and try to find the impostor!
