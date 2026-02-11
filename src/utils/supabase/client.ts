import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

// Singleton Supabase client to avoid multiple instances
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    try {
      supabaseClient = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey,
        {
          auth: {
            persistSession: false, // Don't persist session for faster login
            autoRefreshToken: false, // Don't auto refresh for faster initial login
            detectSessionInUrl: false, // Skip URL session detection
            flowType: 'implicit' // Use implicit flow for faster auth
          },
          global: {
            headers: {
              'x-client-info': 'farmsight-web'
            },
            fetch: (url, options = {}) => {
              // Add timeout to all fetch requests
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 5000);
              
              return fetch(url, {
                ...options,
                signal: controller.signal,
              }).finally(() => clearTimeout(timeoutId));
            }
          }
        }
      )
    } catch (error) {
      console.error('⚠️ Failed to create Supabase client:', error);
      // Return a mock client that will gracefully fail
      throw new Error('Supabase client unavailable');
    }
  }
  return supabaseClient
}