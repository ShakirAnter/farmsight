# Install Button Guide

## 📱 PWA Installation Feature

The FarmSight application now includes a prominent **Install App** button in the sidebar, positioned at the bottom under the Dark Mode toggle and above the Language selector.

---

## ✨ Button Features

### Visual Design
- **Location**: Bottom section of sidebar (last button in the utility section)
- **States**:
  - **Not Installed + Installable**: Vibrant green gradient with pulsing animation
  - **Not Installed + Not Installable**: Standard outline button style
  - **Installed**: Disabled state with checkmark (✓)

### Multi-language Support
- **English**: "Install App" / "Installed ✓"
- **Luganda**: "Teeka ku Ssimu" / "Yateekeddwa"
- **Swahili**: "Sakinisha" / "Imesakinishwa"

---

## 🎯 How It Works

### Automatic Installation (Supported Browsers)
When the browser supports PWA installation:
1. User clicks "Install App" button
2. Browser shows native install prompt
3. User accepts → App installs to home screen
4. Button changes to "Installed ✓" (disabled)
5. Success toast appears

### Manual Installation (iOS/Unsupported Browsers)
When automatic installation isn't available:
1. User clicks "Install App" button
2. Toast notification shows platform-specific instructions:

   **iOS Devices:**
   ```
   1. Tap the Share button (⬆️)
   2. Scroll down and tap "Add to Home Screen"
   3. Tap "Add" to confirm
   ```

   **Android Devices:**
   ```
   Tap the menu (⋮) and select 
   "Add to Home Screen" or "Install App"
   ```

   **Desktop:**
   ```
   Look for the install icon (⊕) in your 
   browser address bar, or use the browser menu.
   ```

---

## 🔍 Technical Details

### Detection
- Uses `usePWAInstall` hook
- Listens for `beforeinstallprompt` event
- Detects standalone mode (already installed)
- Platform detection for custom instructions

### Supported Platforms
- ✅ Chrome/Edge (Android, Desktop, ChromeOS)
- ✅ Safari (iOS 16.4+)
- ✅ Firefox (Android)
- ✅ Opera (Android, Desktop)
- ✅ Samsung Internet

### Installation Benefits
- Works completely offline
- Launches in fullscreen (no browser UI)
- Appears in app drawer/launcher
- Faster loading times
- Native app experience
- Background sync when available

---

## 🎨 Button Styling

### Active State (Installable)
```css
bg-gradient-to-r from-green-600 to-emerald-600
hover:from-green-700 hover:to-emerald-700
text-white font-semibold
shadow-lg shadow-green-500/50
animate-pulse
```

### Installed State
```css
variant="outline"
disabled
Shows checkmark (✓)
```

---

## 📍 Button Position in Sidebar

```
┌─────────────────────┐
│ LOGO & USER INFO    │
├─────────────────────┤
│ Navigation Menu     │
│ • Dashboard         │
│ • Calendar          │
│ • Comparison        │
│ • Market Prices     │
│ • Tips              │
│ • Diseases          │
│ • Tutorials         │
│ • About             │
│ • Feedback          │
├─────────────────────┤
│ 🌐 Language         │
│ 🌙 Dark Mode        │
│ 📥 Install App ★    │ ← HERE!
└─────────────────────┘
```

---

## 🔧 Troubleshooting

### Button Not Visible
- Check if app is already installed (standalone mode)
- Button will be disabled with checkmark if installed

### Install Not Working
- Browser must support PWA installation
- HTTPS is required (or localhost for testing)
- Manifest.json must be valid
- Service worker must be registered

### Already Installed Detection
App detects installation via:
- `window.matchMedia('(display-mode: standalone)')`
- `navigator.standalone` (iOS)
- `document.referrer` contains 'android-app://'

---

## 💡 User Benefits

1. **Quick Access**: One-tap launch from home screen
2. **Offline First**: Full functionality without internet
3. **Native Feel**: Fullscreen experience without browser UI
4. **Auto Updates**: App updates automatically in background
5. **Data Sync**: Seamless sync when connection restored
6. **Storage**: More reliable than browser tabs

---

## 🎉 Success Messages

### Installation Success
```
Title: "FarmSight installed successfully! 🎉"
Description: "You can now access FarmSight from your home screen."
Duration: 5 seconds
```

### Already Installed
```
Title: "FarmSight is already installed! 🎉"
Description: "Access it from your home screen or app drawer."
```

### Manual Instructions (varies by platform)
```
Title: "Install FarmSight on [Platform]"
Description: [Step-by-step instructions]
Duration: 6-8 seconds
```

---

**Implementation Date**: February 11, 2026  
**Developer**: Sujal Kerai  
**Project**: FarmSight - Senior 3 Class Project
