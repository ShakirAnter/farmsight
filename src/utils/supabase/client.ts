import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

// Singleton Supabase client to avoid multiple instances
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
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
          }
        }
      }
    )
  }
  return supabaseClient
}
