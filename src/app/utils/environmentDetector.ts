/**
 * Detects the current environment and determines if Supabase should be used
 */

export function isSupabaseAvailable(): boolean {
  // Check if we're in Figma Make or other restricted environments
  const hostname = window.location.hostname;
  
  // Figma Make environments
  if (hostname.includes('figma.com') || hostname.includes('figma')) {
    return false;
  }
  
  // Localhost development (Supabase might not be configured)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return false;
  }
  
  // Check if offline
  if (!navigator.onLine) {
    return false;
  }
  
  return true;
}

export function isDemoEnvironment(): boolean {
  return !isSupabaseAvailable();
}

export function getEnvironmentName(): string {
  const hostname = window.location.hostname;
  
  if (hostname.includes('figma')) {
    return 'Figma Make Preview';
  }
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'Local Development';
  }
  
  if (!navigator.onLine) {
    return 'Offline Mode';
  }
  
  return 'Production';
}
