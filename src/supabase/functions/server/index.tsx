import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors())
app.use('*', logger(console.log))

// Health check
app.get('/make-server-f40baa9e/health', (c) => {
  return c.json({ status: 'ok' })
})

// Signup endpoint
app.post('/make-server-f40baa9e/signup', async (c) => {
  try {
    const { email, password, username } = await c.req.json()
    
    if (!email || !password || !username) {
      return c.json({ error: 'Email, password, and username are required' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // First check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const userExists = existingUsers?.users?.some(u => u.email === email)
    
    if (userExists) {
      console.log(`Signup attempt for existing email: ${email}`)
      return c.json({ 
        error: 'An account with this email already exists. Please log in instead.',
        code: 'user_exists'
      }, 409)
    }

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { username },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (error) {
      console.error('Error creating user during signup:', error)
      return c.json({ error: error.message }, 400)
    }

    console.log(`Successfully created user: ${email}`)
    return c.json({ success: true, user: data.user })
  } catch (error) {
    console.error('Server error during signup:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Save report endpoint
app.post('/make-server-f40baa9e/save-report', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id || authError) {
      console.error('Authorization error while saving report:', authError)
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const reportData = await c.req.json()
    
    // Store report with user ID
    const reportKey = `report:${user.id}:${Date.now()}`
    await kv.set(reportKey, {
      ...reportData,
      userId: user.id,
      createdAt: new Date().toISOString()
    })

    return c.json({ success: true, reportKey })
  } catch (error) {
    console.error('Error saving report:', error)
    return c.json({ error: 'Failed to save report' }, 500)
  }
})

// Get user reports endpoint
app.get('/make-server-f40baa9e/reports', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id || authError) {
      console.error('Authorization error while fetching reports:', authError)
      return c.json({ error: 'Unauthorized' }, 401)
    }

    // Get all reports for this user
    const reports = await kv.getByPrefix(`report:${user.id}:`)
    
    // Sort by created date, newest first
    const sortedReports = reports.sort((a, b) => 
      new Date(b.value.createdAt).getTime() - new Date(a.value.createdAt).getTime()
    )

    return c.json({ reports: sortedReports })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return c.json({ error: 'Failed to fetch reports' }, 500)
  }
})

// Get reports endpoint (alternative route)
app.get('/make-server-f40baa9e/get-reports', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id || authError) {
      console.error('Authorization error while fetching reports:', authError)
      return c.json({ error: 'Unauthorized' }, 401)
    }

    // Get all reports for this user
    const reports = await kv.getByPrefix(`report:${user.id}:`)
    
    // Sort by created date, newest first
    const sortedReports = reports.sort((a, b) => 
      new Date(b.value.createdAt).getTime() - new Date(a.value.createdAt).getTime()
    ).map(r => r.value)

    return c.json({ reports: sortedReports })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return c.json({ error: 'Failed to fetch reports' }, 500)
  }
})

// Get profile endpoint
app.get('/make-server-f40baa9e/get-profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    // Get profile from KV store
    const profileKey = `profile:${user.id}`
    const profile = await kv.get(profileKey)
    
    return c.json({ profile: profile || {} })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return c.json({ error: 'Failed to fetch profile' }, 500)
  }
})

// Update profile endpoint
app.post('/make-server-f40baa9e/update-profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const profileData = await c.req.json()
    
    // Store profile
    const profileKey = `profile:${user.id}`
    await kv.set(profileKey, {
      ...profileData,
      userId: user.id,
      updatedAt: new Date().toISOString()
    })

    return c.json({ success: true })
  } catch (error) {
    console.error('Error updating profile:', error)
    return c.json({ error: 'Failed to update profile' }, 500)
  }
})

// Send feedback endpoint
app.post('/make-server-f40baa9e/send-feedback', async (c) => {
  try {
    console.log('📧 Processing feedback request...')
    const { name, email, subject, message } = await c.req.json()
    
    console.log(`📝 Feedback received from: ${name} (${email})`)
    
    if (!name || !email || !subject || !message) {
      console.error('❌ Missing required fields')
      return c.json({ error: 'All fields are required' }, 400)
    }

    // Store feedback in database for record keeping (always do this first)
    try {
      const feedbackKey = `feedback:${Date.now()}`
      await kv.set(feedbackKey, {
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
        emailSent: false
      })
      console.log('✅ Feedback saved to database successfully')
    } catch (kvError) {
      console.error('⚠️ Error saving to KV store:', kvError)
      // Continue anyway to try sending email
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    // If no API key, still save the feedback but notify that email wasn't sent
    if (!resendApiKey) {
      console.warn('⚠️ RESEND_API_KEY not configured - feedback saved but email not sent')
      console.log(`💾 Feedback saved from ${name} (${email}): ${subject}`)
      return c.json({ 
        success: true, 
        message: 'Feedback saved successfully',
        warning: 'Email notification could not be sent (RESEND_API_KEY not configured)',
        emailSent: false
      })
    }

    console.log('📬 Attempting to send email via Resend API...')
    
    // Try to send email using Resend API
    try {
      const emailPayload = {
        from: 'FarmSight Feedback <onboarding@resend.dev>',
        to: ['farmsight11@gmail.com'],
        reply_to: email,
        subject: `FarmSight Feedback: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16a34a;">New Feedback from FarmSight</h2>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">Message:</h3>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-left: 4px solid #16a34a; border-radius: 4px;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                <strong>Note:</strong> You can reply directly to this email to respond to ${name}.
              </p>
            </div>
          </div>
        `
      }

      console.log('📤 Sending email to:', emailPayload.to)
      console.log('📋 Subject:', emailPayload.subject)

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      })

      console.log(`📊 Resend API response status: ${response.status}`)
      
      const result = await response.json()
      console.log('📦 Resend API response:', JSON.stringify(result))

      if (!response.ok) {
        console.error('❌ Resend API error - Status:', response.status)
        console.error('❌ Error details:', result)
        
        // Provide specific error message
        const errorMsg = result.message || result.error || 'Unknown error from Resend API'
        
        // Feedback is already saved, so return success with warning
        return c.json({ 
          success: true, 
          message: 'Feedback saved successfully',
          warning: `Email notification failed: ${errorMsg}`,
          emailSent: false,
          debugInfo: {
            status: response.status,
            error: errorMsg
          }
        })
      }

      console.log(`✅ Feedback email sent successfully! Email ID: ${result.id}`)
      
      // Update feedback record to mark email as sent
      try {
        const feedbackKey = `feedback:${Date.now()}-sent`
        await kv.set(feedbackKey, {
          name,
          email,
          subject,
          message,
          createdAt: new Date().toISOString(),
          emailSent: true,
          emailId: result.id
        })
        console.log('✅ Updated feedback record with email sent status')
      } catch (kvError) {
        console.error('⚠️ Error updating KV store with email sent status:', kvError)
        // Don't fail the request if KV update fails
      }

      return c.json({ 
        success: true, 
        message: 'Feedback sent successfully', 
        emailSent: true,
        emailId: result.id 
      })
    } catch (emailError) {
      console.error('❌ Error sending email - Exception:', emailError)
      console.error('❌ Error message:', emailError.message)
      if (emailError.stack) {
        console.error('❌ Stack trace:', emailError.stack)
      }
      
      // Feedback is already saved, so return success with warning
      return c.json({ 
        success: true, 
        message: 'Feedback saved successfully',
        warning: `Email notification failed: ${emailError.message}`,
        emailSent: false,
        debugInfo: {
          errorType: emailError.name,
          errorMessage: emailError.message
        }
      })
    }
  } catch (error) {
    console.error('❌ Error processing feedback - Outer catch:', error)
    console.error('❌ Error message:', error.message)
    if (error.stack) {
      console.error('❌ Stack trace:', error.stack)
    }
    
    return c.json({ 
      error: `Failed to process feedback: ${error.message}`,
      details: error.toString()
    }, 500)
  }
})

// Get market prices endpoint with live data
app.get('/make-server-f40baa9e/market-prices', async (c) => {
  try {
    // In a real implementation, this would fetch from an agricultural price API
    // For now, we'll generate realistic prices with variation to simulate live updates
    
    const baseDate = new Date()
    const randomVariation = () => Math.random() * 0.15 - 0.075 // -7.5% to +7.5%
    
    const marketPrices = [
      // Maize prices
      { crop: 'Maize', cropName: 'Maize', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(1800 * (1 + randomVariation())), 
        trend: Math.random() > 0.5 ? 'up' : 'stable' },
      { crop: 'Maize', cropName: 'Maize', market: 'Owino Market', district: 'Kampala', 
        pricePerKg: Math.round(1700 * (1 + randomVariation())), 
        trend: Math.random() > 0.6 ? 'down' : 'stable' },
      { crop: 'Maize', cropName: 'Maize', market: 'Kikuubo Market', district: 'Kampala', 
        pricePerKg: Math.round(1750 * (1 + randomVariation())), 
        trend: 'stable' },
      
      // Beans prices
      { crop: 'Beans', cropName: 'Beans', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(3500 * (1 + randomVariation())), 
        trend: Math.random() > 0.4 ? 'up' : 'stable' },
      { crop: 'Beans', cropName: 'Beans', market: 'Owino Market', district: 'Kampala', 
        pricePerKg: Math.round(3300 * (1 + randomVariation())), 
        trend: 'stable' },
      { crop: 'Beans', cropName: 'Beans', market: 'Mbale Market', district: 'Mbale', 
        pricePerKg: Math.round(3200 * (1 + randomVariation())), 
        trend: 'up' },
      
      // Coffee prices
      { crop: 'Coffee', cropName: 'Coffee', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(8500 * (1 + randomVariation())), 
        trend: 'up' },
      { crop: 'Coffee', cropName: 'Coffee', market: 'Masaka Market', district: 'Masaka', 
        pricePerKg: Math.round(8200 * (1 + randomVariation())), 
        trend: 'up' },
      { crop: 'Coffee', cropName: 'Coffee', market: 'Mbarara Market', district: 'Mbarara', 
        pricePerKg: Math.round(8300 * (1 + randomVariation())), 
        trend: 'stable' },
      
      // Cassava prices
      { crop: 'Cassava', cropName: 'Cassava', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(800 * (1 + randomVariation())), 
        trend: Math.random() > 0.7 ? 'down' : 'stable' },
      { crop: 'Cassava', cropName: 'Cassava', market: 'Lira Market', district: 'Lira', 
        pricePerKg: Math.round(750 * (1 + randomVariation())), 
        trend: 'stable' },
      
      // Sweet Potatoes prices
      { crop: 'Sweet Potatoes', cropName: 'Sweet Potatoes', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(1200 * (1 + randomVariation())), 
        trend: 'stable' },
      { crop: 'Sweet Potatoes', cropName: 'Sweet Potatoes', market: 'Soroti Market', district: 'Soroti', 
        pricePerKg: Math.round(1100 * (1 + randomVariation())), 
        trend: 'up' },
      
      // Matooke prices
      { crop: 'Matooke (Cooking Bananas)', cropName: 'Matooke (Cooking Bananas)', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(1500 * (1 + randomVariation())), 
        trend: Math.random() > 0.5 ? 'up' : 'stable' },
      { crop: 'Matooke (Cooking Bananas)', cropName: 'Matooke (Cooking Bananas)', market: 'Mbarara Market', district: 'Mbarara', 
        pricePerKg: Math.round(1350 * (1 + randomVariation())), 
        trend: 'stable' },
      { crop: 'Matooke (Cooking Bananas)', cropName: 'Matooke (Cooking Bananas)', market: 'Fort Portal Market', district: 'Kabarole', 
        pricePerKg: Math.round(1400 * (1 + randomVariation())), 
        trend: 'up' },
      
      // Groundnuts prices
      { crop: 'Groundnuts (Peanuts)', cropName: 'Groundnuts (Peanuts)', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(4000 * (1 + randomVariation())), 
        trend: 'up' },
      { crop: 'Groundnuts (Peanuts)', cropName: 'Groundnuts (Peanuts)', market: 'Lira Market', district: 'Lira', 
        pricePerKg: Math.round(3800 * (1 + randomVariation())), 
        trend: 'up' },
      
      // Rice prices
      { crop: 'Rice', cropName: 'Rice', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(3800 * (1 + randomVariation())), 
        trend: 'stable' },
      { crop: 'Rice', cropName: 'Rice', market: 'Iganga Market', district: 'Iganga', 
        pricePerKg: Math.round(3600 * (1 + randomVariation())), 
        trend: 'stable' },
      
      // Tomatoes prices
      { crop: 'Tomatoes', cropName: 'Tomatoes', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(2500 * (1 + randomVariation())), 
        trend: Math.random() > 0.6 ? 'down' : 'stable' },
      { crop: 'Tomatoes', cropName: 'Tomatoes', market: 'Owino Market', district: 'Kampala', 
        pricePerKg: Math.round(2400 * (1 + randomVariation())), 
        trend: 'down' },
      { crop: 'Tomatoes', cropName: 'Tomatoes', market: 'Kabale Market', district: 'Kabale', 
        pricePerKg: Math.round(2200 * (1 + randomVariation())), 
        trend: 'stable' },
      
      // Cabbage prices
      { crop: 'Cabbage', cropName: 'Cabbage', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(1800 * (1 + randomVariation())), 
        trend: 'stable' },
      { crop: 'Cabbage', cropName: 'Cabbage', market: 'Kabale Market', district: 'Kabale', 
        pricePerKg: Math.round(1600 * (1 + randomVariation())), 
        trend: 'stable' },
      
      // Irish Potatoes prices
      { crop: 'Irish Potatoes', cropName: 'Irish Potatoes', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(2200 * (1 + randomVariation())), 
        trend: Math.random() > 0.5 ? 'up' : 'stable' },
      { crop: 'Irish Potatoes', cropName: 'Irish Potatoes', market: 'Kabale Market', district: 'Kabale', 
        pricePerKg: Math.round(2000 * (1 + randomVariation())), 
        trend: 'up' },
      { crop: 'Irish Potatoes', cropName: 'Irish Potatoes', market: 'Kisoro Market', district: 'Kisoro', 
        pricePerKg: Math.round(1950 * (1 + randomVariation())), 
        trend: 'stable' },
      
      // Onions prices
      { crop: 'Onions', cropName: 'Onions', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(3000 * (1 + randomVariation())), 
        trend: 'stable' },
      { crop: 'Onions', cropName: 'Onions', market: 'Arua Market', district: 'Arua', 
        pricePerKg: Math.round(2800 * (1 + randomVariation())), 
        trend: 'up' },
      
      // Carrots prices
      { crop: 'Carrots', cropName: 'Carrots', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(2000 * (1 + randomVariation())), 
        trend: 'stable' },
      
      // Pineapples prices
      { crop: 'Pineapples', cropName: 'Pineapples', market: 'Nakasero Market', district: 'Kampala', 
        pricePerKg: Math.round(1500 * (1 + randomVariation())), 
        trend: 'stable' },
      { crop: 'Pineapples', cropName: 'Pineapples', market: 'Masaka Market', district: 'Masaka', 
        pricePerKg: Math.round(1300 * (1 + randomVariation())), 
        trend: 'up' },
    ]
    
    // Add timestamps
    const pricesWithTimestamp = marketPrices.map(price => ({
      ...price,
      price: price.pricePerKg,
      lastUpdated: new Date().toISOString(),
    }))
    
    console.log(`✅ Fetched ${pricesWithTimestamp.length} market prices`)
    return c.json({ prices: pricesWithTimestamp, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Error fetching market prices:', error)
    return c.json({ error: 'Failed to fetch market prices' }, 500)
  }
})

Deno.serve(app.fetch)