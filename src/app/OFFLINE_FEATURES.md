# FarmSight Offline Features

FarmSight is a Progressive Web App (PWA) that works seamlessly both online and offline, ensuring farmers in Uganda can access their data anytime, anywhere, even without internet connectivity.

## 🌟 Key Offline Capabilities

### 1. **Full App Functionality Offline**
- Access all your farm data without internet
- View crop information and reports
- Use the farming calendar
- Check cached market prices
- Generate and download PDF reports
- Browse disease guides and farming tips

### 2. **Automatic Data Synchronization**
- All changes made offline are automatically queued
- Data syncs seamlessly when connection is restored
- Smart conflict resolution
- No data loss - everything is preserved locally

### 3. **Progressive Web App (PWA)**
- Install FarmSight on your phone or computer
- Works like a native app
- Launches from home screen
- Runs in fullscreen mode
- Gets regular updates automatically

### 4. **Smart Caching**
- Market prices are cached for offline viewing
- All static assets are stored locally
- Images and resources load instantly
- Farming guides always available

## 📱 Installation

### On Mobile (Android/iOS):
1. Open FarmSight in your browser (Chrome, Safari, etc.)
2. Tap the "Install" button when prompted
3. Or use browser menu: "Add to Home Screen"
4. Launch FarmSight from your home screen

### On Desktop (Windows/Mac/Linux):
1. Open FarmSight in Chrome, Edge, or another supported browser
2. Click the install icon (➕) in the address bar
3. Or use browser menu: "Install FarmSight..."
4. Launch from your applications menu

## 🔄 How Offline Sync Works

### When You Go Offline:
1. **Persistent Banner**: An orange banner appears showing you're in offline mode
2. **Local Storage**: All your actions are saved to your device
3. **Sync Queue**: Changes are added to a queue for later synchronization
4. **Full Functionality**: Continue working normally

### When You Come Back Online:
1. **Automatic Detection**: App detects internet connection
2. **Sync Notification**: Green notification shows syncing is in progress
3. **Background Sync**: All queued changes upload automatically
4. **Completion**: Success notification when everything is synced

### What Gets Synced:
- ✅ Crop data and reports
- ✅ Feedback and suggestions
- ✅ User preferences and settings
- ✅ Profile updates

## 💾 Local Storage

FarmSight uses IndexedDB for secure, efficient local storage:

### Stored Data:
- **Authentication**: Your login session (securely stored)
- **Crops**: All your crop information
- **Reports**: Generated farming reports
- **Market Prices**: Latest cached market prices
- **Sync Queue**: Pending changes to upload
- **User Settings**: Language, theme, preferences

### Storage Limits:
- Typical browsers: 50-100 MB minimum
- Chrome/Edge: Several hundred MB available
- Safari/iOS: At least 50 MB
- More than enough for thousands of crop records!

## 🎯 Offline Features by Section

### Market Prices 📊
- **Online**: Live prices update every 30 seconds
- **Offline**: Shows cached prices with timestamp
- **Auto-refresh**: Updates automatically when back online

### Crop Management 🌾
- **Add Crops**: Save locally, sync later
- **View Reports**: Access all saved reports
- **Export PDF**: Works completely offline

### Farming Calendar 📅
- **View Tasks**: All calendar data cached
- **Seasonal Info**: Always available offline
- **Reminders**: Local notifications

### Disease Guide 🔬
- **Browse Diseases**: Complete guide cached
- **View Solutions**: All remedies available offline
- **Search**: Works on cached data

### Tutorials 📚
- **Watch Videos**: Video links work when online
- **Read Guides**: All text content cached
- **Step-by-Step**: Instructions always available

## 🔐 Security & Privacy

### Data Protection:
- All local data encrypted by browser
- No sensitive data in plain text
- Automatic cleanup on logout
- Secure sync over HTTPS only

### Privacy:
- Data stays on your device when offline
- Only syncs when you have internet
- You control what gets saved
- Clear all data anytime

## 🚀 Performance Benefits

### Speed Improvements:
- **Instant Loading**: App loads from cache (< 1 second)
- **No Loading Delays**: Navigate instantly between sections
- **Offline PDFs**: Generate reports without internet
- **Cached Images**: All resources load immediately

### Data Savings:
- Reduced internet usage (cache reuse)
- Only sync what changed
- Compress uploaded data
- Smart resource loading

## 🛠️ Technical Details

### Service Worker:
- Version: Auto-updated
- Cache Strategy: Network-first for APIs, Cache-first for assets
- Update Policy: Background updates, no interruption
- Offline Fallback: Custom offline page

### IndexedDB:
- Database: FarmSightDB
- Version: 2
- Stores: 6 object stores (Auth, Crops, Reports, Market Prices, Sync Queue, Settings)
- Indexes: Optimized for fast queries

### Browser Support:
- ✅ Chrome/Edge (Android, Desktop)
- ✅ Safari (iOS, macOS)
- ✅ Firefox (Desktop, Android)
- ✅ Samsung Internet
- ✅ Opera

## 📞 Troubleshooting

### App Not Installing?
- Ensure you're using HTTPS (secure connection)
- Try a different browser
- Clear browser cache and try again
- Check device storage space

### Data Not Syncing?
- Check internet connection
- Look for orange "syncing" indicator
- Check sync queue in settings
- Try force sync (if available)

### Storage Full?
- Clear old reports you don't need
- Export important data
- Clear browser cache
- Contact support for help

### App Not Working Offline?
- Ensure service worker is registered
- Visit app while online first (for initial cache)
- Check browser support for PWA features
- Try reinstalling the app

## 🎓 Best Practices

### For Best Offline Experience:
1. **Visit While Online First**: Let app cache resources
2. **Install the App**: Better offline performance
3. **Regular Syncs**: Connect periodically to sync
4. **Keep Updated**: Accept app updates when prompted
5. **Manage Storage**: Clear old data periodically

### Data Management:
- Export important reports regularly
- Don't store unnecessary data
- Clear completed tasks
- Keep app updated for best performance

## 📈 Future Enhancements

We're working on:
- [ ] Offline map support
- [ ] Voice input (offline)
- [ ] Offline image upload queuing
- [ ] Advanced conflict resolution
- [ ] Peer-to-peer sync
- [ ] Expanded offline storage

## 💡 Tips & Tricks

### Battery Saving:
- Disable auto-refresh when not needed
- Close app when done (clears RAM)
- Use dark mode (saves battery on OLED screens)

### Data Efficiency:
- Sync during WiFi connection when possible
- Use compressed export formats
- Clear old cached data regularly

### Productivity:
- Install on home screen for quick access
- Use offline mode intentionally (focus time)
- Pre-load data before going to field
- Export PDFs while online for offline viewing

---

## Need Help?

- **In-App Feedback**: Use the feedback form (works offline!)
- **Email**: support@farmsight.ug
- **Community**: Join our farmer community
- **Documentation**: Check other guides in `/guidelines`

---

**Last Updated**: January 11, 2026  
**Version**: 1.0.0  
**Service Worker Version**: 1.0.0
