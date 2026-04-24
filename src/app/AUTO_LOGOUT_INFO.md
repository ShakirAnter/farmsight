# Auto-Logout Security Feature

## Overview
The FarmSight application now includes an automatic logout feature that enhances security by logging users out when they leave the page.

## How It Works

### When Auto-Logout Triggers
Users will be automatically logged out in the following scenarios:

1. **Closing the browser tab** - When the user closes the tab containing FarmSight
2. **Closing the browser window** - When the user closes the entire browser
3. **Navigating away** - When the user navigates to a different website
4. **Page refresh** - When the user refreshes the page (they'll need to log in again)

### What Happens During Auto-Logout
1. The Supabase authentication session is terminated
2. The access token is cleared from the application state
3. User data is removed from memory
4. The user is returned to the login page on their next visit

## Implementation Details

### Technical Implementation
The auto-logout feature is implemented using browser event listeners:

- **`beforeunload` event**: Triggered when the page is about to be unloaded
- **`pagehide` event**: Triggered when the page is hidden (more reliable on mobile)

Both events ensure the user is logged out regardless of how they leave the page.

### Code Location
The auto-logout logic is implemented in `/App.tsx`:

```typescript
useEffect(() => {
  const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
    if (accessToken) {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      setAccessToken(null)
      setUsername('')
    }
  }

  const handlePageHide = async () => {
    if (accessToken) {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
    }
  }

  window.addEventListener('beforeunload', handleBeforeUnload)
  window.addEventListener('pagehide', handlePageHide)

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    window.removeEventListener('pagehide', handlePageHide)
  }
}, [accessToken])
```

## User Experience

### Visual Indicators
Users are informed about the auto-logout feature through:

1. **Login Page Notice**: A green info box on the login page informs users about the auto-logout security feature
2. **Dashboard Notice**: A blue security notice at the top of the dashboard reminds users they'll be logged out when closing the tab

### User Benefits
- **Enhanced Security**: Prevents unauthorized access if a user forgets to log out
- **Shared Computer Protection**: Ideal for farmers using shared computers or internet cafes
- **Data Privacy**: Ensures sensitive farm data isn't accessible after the session ends

### Considerations
- Users will need to log in again each time they visit the site
- Any unsaved work may be lost (though reports are saved to the database before generation)
- This is a security-first approach prioritizing data protection

## For Farmers Using Shared Computers

This feature is especially important for farmers who may be accessing FarmSight from:
- Internet cafes
- Community centers
- Shared family computers
- Public access points

The auto-logout ensures that even if they forget to log out manually, their account remains secure.

## Testing the Feature

To test that auto-logout is working:

1. Log in to FarmSight
2. Notice you're on the dashboard
3. Close the browser tab
4. Open FarmSight again
5. You should be back on the login page (not automatically logged in)

## Future Enhancements

Potential improvements to consider:
- Optional "Remember Me" feature for trusted devices
- Session timeout warning before auto-logout
- Ability to save draft reports before logout
- Different logout policies for different security levels

## Security Best Practices

This auto-logout feature follows security best practices:
- ✅ No persistent sessions across page loads
- ✅ Immediate logout on page unload
- ✅ Clear communication to users about the feature
- ✅ Works on both desktop and mobile browsers
- ✅ Handles multiple logout scenarios (close tab, close browser, navigate away)

## Support

If farmers have questions about the auto-logout feature:
- Use the Feedback button to send questions
- The feature is always active and cannot be disabled (for security)
- This is a protective measure to keep farm data safe
