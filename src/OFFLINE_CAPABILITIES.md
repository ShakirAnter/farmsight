# FarmSight Offline Capabilities

## 🌐 Overview

FarmSight is designed to work seamlessly both **online and offline**. All your farming data is safe and accessible regardless of your internet connection status.

---

## ✨ Features Available Offline

### Full Functionality
- ✅ **Dashboard Access** - View all your farming data
- ✅ **Crop Management** - Add, edit, and view crop information
- ✅ **Reports Generation** - Create and view farming reports
- ✅ **PDF Downloads** - Export reports as PDF documents
- ✅ **Farming Calendar** - View and manage farming schedules
- ✅ **Disease Guide** - Access comprehensive disease information
- ✅ **Farming Tips** - Browse agricultural best practices
- ✅ **Tutorials** - Learn from farming guides
- ✅ **Crop Comparison** - Compare different crops
- ✅ **Market Prices** - View cached price information
- ✅ **Multi-language Support** - Switch between English, Luganda, and Swahili
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Profile Settings** - Manage your profile information

### Automatic Features
- 🔄 **Auto-sync** - Data syncs automatically when connection is restored
- 💾 **Local Storage** - All data saved securely on your device
- 📱 **PWA Support** - Install as a mobile app
- 🔔 **Offline Notifications** - Clear indicators of offline status
- ⚡ **Fast Performance** - Works smoothly without internet

---

## 🚀 How It Works

### 1. Service Worker
FarmSight uses a **Service Worker** that:
- Caches essential app files
- Intercepts network requests
- Serves cached content when offline
- Updates cache when online

### 2. IndexedDB Storage
All your data is stored locally using **IndexedDB**:
- Crop information
- Reports
- User settings
- Market prices (cached)
- Scheduled activities

### 3. Background Sync
When you come back online:
- Data syncs automatically
- No user intervention needed
- Conflicts resolved intelligently
- Changes reflected immediately

---

## 📱 Installation as PWA

FarmSight can be installed on your device:

### Mobile (Android/iOS)
1. Open FarmSight in your browser
2. Tap the browser menu (⋮)
3. Select "Add to Home Screen"
4. Confirm installation

### Desktop (Chrome/Edge)
1. Open FarmSight in your browser
2. Click the install icon in the address bar
3. Or use the "Add to Home Screen" button in the sidebar
4. Confirm installation

---

## 🔧 Technical Details

### Cache Strategy
- **Static Assets**: Cache-first (HTML, CSS, JS, images)
- **API Calls**: Network-first with cache fallback
- **Images**: Cache-first with background update

### Storage Limits
- **IndexedDB**: Up to 50% of available disk space
- **Cache Storage**: Varies by browser (typically several GB)
- **LocalStorage**: 10MB for settings

### Browser Support
- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari (full support)
- ✅ Opera (full support)

---

## 💡 Tips for Best Offline Experience

1. **First Load Online**: Load the app while online to cache all resources
2. **Regular Syncs**: Connect periodically to keep data fresh
3. **Install as PWA**: Better offline reliability
4. **Update Browser**: Use latest browser version
5. **Clear Cache if Issues**: If problems occur, clear cache and reload

---

## 🛠️ Troubleshooting

### App Not Working Offline?
1. Ensure you loaded the app at least once while online
2. Check browser supports Service Workers
3. Clear cache and reload: Settings → Privacy → Clear browsing data
4. Reinstall PWA if installed

### Data Not Syncing?
1. Check internet connection
2. Reload the page
3. Check console for errors (F12)
4. Contact support if persists

### Calendar Activities Disappearing?
- Activities are automatically removed after their date passes
- This is by design to keep your calendar clean
- Past activities are not shown

---

## 📊 Version Information

- **Cache Version**: 2.0.0
- **Database Version**: 2
- **Last Updated**: February 11, 2026

---

## 🎯 Future Enhancements

Planned offline improvements:
- [ ] Offline image capture for disease detection
- [ ] Advanced conflict resolution
- [ ] Larger offline data limits
- [ ] Predictive caching
- [ ] Offline-first architecture

---

## 📞 Support

If you experience issues with offline functionality:
- Email: farmsight11@gmail.com
- Include: Browser version, device type, error description

---

**Developed by Sujal Kerai**  
Senior 3 Class Project - 2025  
"Utilization of Available Resources for Community Development"
