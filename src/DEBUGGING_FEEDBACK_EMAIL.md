# Debugging Feedback Email Issues

## What Was Fixed

I've added comprehensive logging and error handling to help diagnose email sending issues:

### ✅ Improvements Made

1. **Detailed Console Logging** - Every step now logs with emoji indicators:
   - 📧 Processing feedback request
   - 📝 Feedback received details
   - ✅ Success messages
   - ❌ Error messages
   - ⚠️ Warnings

2. **Better Error Messages** - Specific error details from Resend API
3. **Graceful Degradation** - Feedback is always saved even if email fails
4. **Debug Information** - Error responses include debug data

## How to Debug

### Step 1: Check Supabase Logs

1. Go to: https://supabase.com/dashboard/project/idbgvqilomnfpfgcgkrl
2. Click **Edge Functions** → **server**
3. Click **Logs** tab
4. Submit a feedback and watch for:
   - `📧 Processing feedback request...`
   - `📝 Feedback received from: [name] ([email])`
   - `✅ Feedback saved to database successfully`
   - `📬 Attempting to send email via Resend API...`
   - `📊 Resend API response status: [code]`

### Step 2: Verify API Key

The logs will show one of these:

**If API key is missing:**
```
⚠️ RESEND_API_KEY not configured
```
**Solution:** Add the API key to Supabase secrets:
- Name: `RESEND_API_KEY`
- Value: `re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4`

**If API key is present:**
```
📬 Attempting to send email via Resend API...
```

### Step 3: Check Resend API Response

Look for the response status:

**Success (200):**
```
📊 Resend API response status: 200
✅ Feedback email sent successfully! Email ID: [id]
```

**Common Errors:**

#### 403 Forbidden
```
❌ Resend API error - Status: 403
```
**Causes:**
- Invalid API key
- API key doesn't have permission to send from `onboarding@resend.dev`

**Solution:** 
- Verify API key is correct: `re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4`
- Check Resend dashboard to ensure key is active
- Verify you haven't exceeded rate limits

#### 422 Unprocessable Entity
```
❌ Resend API error - Status: 422
```
**Causes:**
- Invalid email format
- Invalid "from" address

**Solution:**
- Verify the "from" address is allowed
- Check if you need to verify your domain in Resend

#### 429 Too Many Requests
```
❌ Resend API error - Status: 429
```
**Cause:** Rate limit exceeded

**Solution:**
- Free tier: 100 emails/day, 3,000/month
- Wait or upgrade plan

### Step 4: Check Resend Dashboard

1. Go to: https://resend.com/emails
2. Log in with your Resend account
3. Check the **Emails** section for:
   - Sent emails
   - Failed emails
   - Bounce/complaint logs

### Step 5: Test Email Delivery

After fixing issues, test:

1. Open FarmSight app
2. Go to Feedback page
3. Submit test feedback
4. Check Supabase logs for success message
5. Check farmsight11@gmail.com inbox (and spam folder!)

## Common Issues & Solutions

### Issue: "Failed to send email"

**Diagnostic Steps:**

1. **Check Supabase Edge Function Logs** for exact error
2. **Verify API Key** is set in Supabase secrets
3. **Check Resend Dashboard** for API key status
4. **Verify Email Address** `farmsight11@gmail.com` is valid

### Issue: Email sent but not received

**Check:**
1. Spam/Junk folder in Gmail
2. Gmail filters (search for "FarmSight")
3. Resend dashboard delivery status
4. Email ID in success response

### Issue: API Key Not Working

**Verify:**
1. API key format: `re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4`
2. No extra spaces when copying
3. Secret name is exactly: `RESEND_API_KEY`
4. Edge Function was redeployed after adding secret

## Testing Checklist

- [ ] API key added to Supabase secrets
- [ ] Edge Function redeployed (if using CLI)
- [ ] Logs show API key is detected
- [ ] Resend API returns 200 status
- [ ] Email ID is returned in response
- [ ] Email appears in Resend dashboard as "sent"
- [ ] Email received in farmsight11@gmail.com
- [ ] Reply-to works correctly

## Support

If you're still experiencing issues:

1. **Copy Supabase logs** showing the error
2. **Check Resend dashboard** for sending status
3. **Verify** all settings match this guide
4. **Note** the exact error message from the response

## API Key Reference

Your Resend API Key: `re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4`

Add this to Supabase:
- Navigate to: Edge Functions → server → Secrets
- Name: `RESEND_API_KEY`
- Value: `re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4`