# Email Setup Guide for FarmSight Feedback System

The feedback form is configured to send emails to **farmsight11@gmail.com** using the Resend API.

## Current Status
Your server code is correctly configured to send emails. You have your Resend API key ready to add to your Supabase project.

## Setup Instructions

### Step 1: Your Resend API Key (Ready to Use!)

✅ **Your API Key:** `re_EyKSUrMf_Ju5dbTvkmuair5uYXZmNqg99`

This is your Resend API key that you'll add to Supabase in Step 2 below.

### Step 2: Add the API Key to Supabase

🚀 **Follow these steps to activate email notifications:**

1. Go to your Supabase project dashboard: [https://supabase.com/dashboard/project/idbgvqilomnfpfgcgkrl](https://supabase.com/dashboard/project/idbgvqilomnfpfgcgkrl)
2. Click on **Edge Functions** in the left sidebar
3. Click on the **server** function (or `make-server-f40baa9e`)
4. Click on the **Secrets** or **Environment Variables** tab
5. Click **Add new secret** or **Add variable**
6. Enter exactly:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_EyKSUrMf_Ju5dbTvkmuair5uYXZmNqg99`
7. Click **Save** or **Add secret**

⚠️ **Important:** Make sure to copy the API key exactly as shown above, with no extra spaces.

### Step 3: Redeploy the Function (if needed)

After adding the secret, you may need to redeploy your Edge Function:
1. In the Supabase dashboard, go to **Edge Functions**
2. Find your function and click **Deploy**
3. Or use the Supabase CLI: `supabase functions deploy server`

### Step 4: Test the Feedback Form

1. Go to your FarmSight application
2. Navigate to the Feedback page
3. Fill out the form and submit
4. Check your email at **farmsight11@gmail.com** for the feedback message

## Troubleshooting

### "Email service not configured" error
- This means the RESEND_API_KEY environment variable is not set in Supabase
- Follow Step 2 above to add it

### "Failed to send email" error
- Check that your Resend API key is valid
- Verify you copied the entire API key without extra spaces
- Check the Resend dashboard for any errors or sending limits

### Emails not arriving
- Check your spam/junk folder
- Verify the email address in the server code is correct (currently set to `farmsight11@gmail.com`)
- Check Resend dashboard for sending logs

## Important Notes

### Free Tier Limits
Resend's free tier includes:
- 100 emails per day
- 3,000 emails per month

This should be more than sufficient for feedback emails.

### From Address
The emails are sent from `onboarding@resend.dev` (Resend's default sender). 

If you want to use a custom domain:
1. Add and verify your domain in Resend
2. Update line 155 in `/supabase/functions/server/index.tsx` to use your domain:
   ```typescript
   from: 'FarmSight Feedback <feedback@yourdomain.com>',
   ```

### Reply-To Address
The system is configured so when you reply to a feedback email, it will go directly to the user's email address (the `reply_to` field is set to their email).

## Current Configuration

**Feedback emails are sent to:** farmsight11@gmail.com  
**Email format:** HTML with professional styling  
**Includes:**
- Sender's name
- Sender's email (for replies)
- Subject line
- Full message
- Timestamp (stored in database)

## Need Help?

If you're still having issues after following these steps:
1. Check the Supabase Edge Functions logs for error messages
2. Verify the API key is correctly set as a secret
3. Test with a simple feedback message
4. Check the Resend dashboard for delivery status