# Security Headers Configuration
# This file contains recommended security headers for web applications
# These headers should be configured at your hosting provider level

# Content Security Policy
# Helps prevent XSS attacks and other code injection attacks
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://images.unsplash.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';

# X-Frame-Options
# Prevents clickjacking attacks
X-Frame-Options: DENY

# X-Content-Type-Options
# Prevents MIME type sniffing
X-Content-Type-Options: nosniff

# Referrer-Policy
# Controls how much referrer information is passed
Referrer-Policy: strict-origin-when-cross-origin

# Permissions-Policy
# Controls which browser features can be used
Permissions-Policy: geolocation=(self), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()

# Strict-Transport-Security
# Forces HTTPS connections
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# X-XSS-Protection
# Legacy XSS protection (for older browsers)
X-XSS-Protection: 1; mode=block

# Cache-Control for HTML files
# Ensures fresh content is always loaded
Cache-Control: no-cache, no-store, must-revalidate

# Access-Control-Allow-Origin
# Configure CORS appropriately for your domain
# Access-Control-Allow-Origin: https://your-domain.com
