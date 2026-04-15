# Contributing to Canary

Welcome to the team. This guide will get your local development environment running so you can view and contribute to the app on your phone.

---

## Prerequisites

Make sure you have the following before starting:

- A Mac or Windows machine
- A smartphone (iPhone or Android)
- **Expo Go** installed on your phone — available on the [App Store](https://apps.apple.com/app/expo-go/id982107779) and [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **VSCode** — [code.visualstudio.com](https://code.visualstudio.com)
- **Git** — pre-installed on Mac; Windows users download from [git-scm.com](https://git-scm.com)

---

## Step 1 — Install NVM

NVM (Node Version Manager) manages your Node.js installation cleanly and avoids common permissions errors.

**Mac:**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

**Windows:** Download and run the installer from [github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

After installing, **restart your terminal**, then verify:
```bash
nvm --version
```

Expected output: `0.39.x` or higher

---

## Step 2 — Install Node.js via NVM

```bash
nvm install 22
nvm use 22
node -v
```

Expected output: `v22.x.x`

> **Why NVM instead of installing Node directly?** Direct Node installs on Mac often require root permissions for global packages, causing errors. NVM avoids this entirely.

---

## Step 3 — Clone the Repository

```bash
cd ~/Desktop
git clone https://github.com/vaniab-mp3/canary.git
cd canary
```

---

## Step 4 — Install Dependencies

```bash
npm install
```

This reads `package.json` and installs all required packages into a local `node_modules/` folder. This folder is not committed to git — every developer generates their own copy with this command.

---

## Step 5 — Start the Development Server

```bash
npx expo start
```

A QR code will appear in your terminal.

- **iPhone** — open the native Camera app and point it at the QR code
- **Android** — open Expo Go and tap "Scan QR code"

The app will load on your phone. Any time you save a file in VSCode, the app will hot-reload automatically.

> **Important:** Your phone and laptop must be connected to the **same WiFi network** for this to work.

---

## Staying in Sync

Whenever you pull new changes from the repository, always run:

```bash
git pull
npm install
```

Always run `npm install` after pulling. If a teammate added a new package, your app will break until you install it locally.

---

## Recommended VSCode Extensions

Install these for the best development experience:

- **ES7+ React/Redux/React-Native snippets** — fast component scaffolding
- **Prettier** — auto-formats code on save
- **ESLint** — catches errors as you type
- **GitLens** — better git visibility inside VSCode

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `EACCES permission denied` | Node installed without NVM | Redo Steps 1–2 |
| `Unable to find expo in this project` | Dependencies not installed | Run `npm install` |
| `QR code won't scan` | Different WiFi networks | Connect phone and laptop to same network |
| `Metro bundler error` | Corrupted cache | Run `npx expo start --clear` |
| `Cannot find module '...'` | New package added by teammate | Run `npm install` |

---

## Project Structure

```
canary/
├── app/
│   ├── _layout.jsx          # Root layout — controls auth vs main app routing
│   ├── (auth)/              # Login, signup, onboarding screens
│   └── (tabs)/              # Main app tab screens
│       ├── _layout.jsx      # Tab bar configuration
│       ├── index.jsx        # Home / Map
│       ├── report.jsx       # Report screen
│       ├── ping.jsx         # Emergency ping
│       ├── vault.jsx        # Document vault
│       └── settings.jsx     # Settings
├── assets/                  # Icons, images, fonts
├── app.json                 # Expo app configuration
└── package.json             # Dependencies and scripts
```

---

## Questions

Reach out to the team on your group channel before opening an issue. If something in this guide is broken or outdated, open a PR with the fix.