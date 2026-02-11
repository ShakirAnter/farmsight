# 📧 Email Setup Guide - FarmSight Feedback System

## ✅ FIXED: Email Address Updated
The email address has been corrected from `skvg256@gmail.com` to **`farmsight11@gmail.com`**

---

## 🚀 Quick Setup Steps

### Step 1: Get Your Resend API Key

1. Go to **https://resend.com**
2. Sign up or log in with your account
3. Navigate to **API Keys** in the dashboard
4. Click **Create API Key**
5. Give it a name (e.g., "FarmSight Production")
6. Copy the API key that starts with `re_...`
   - **Example format:** `re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4`

---

### Step 2: Add API Key to Supabase

#### Option A: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project: **https://supabase.com/dashboard/project/YOUR_PROJECT_ID**
2. Click on **Edge Functions** in the left sidebar
3. Click on your edge function (the one named `server`)
4. Go to the **Secrets** or **Environment Variables** section
5. Click **Add new secret** or **Add variable**
6. Enter:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your actual Resend API key (e.g., `re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4`)
7. Click **Save**

#### Option B: Via Supabase CLI

```bash
# Login to Supabase
supabase login

# Set the secret
supabase secrets set RESEND_API_KEY=re_YOUR_ACTUAL_KEY_HERE
```

---

### Step 3: Verify Email Domain (Important!)

#### For Testing (Using Resend's Test Email)
- Default works with `onboarding@resend.dev` 
- This will send to **farmsight11@gmail.com** ✅

#### For Production (Your Own Domain)
1. In Resend Dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `farmsight.com`)
4. Add the DNS records Resend provides to your domain registrar
5. Wait for verification (usually 5-15 minutes)
6. Once verified, update the edge function to use:
   ```typescript
   from: 'FarmSight Feedback <feedback@farmsight.com>'
   ```

---

## 🧪 Testing the Setup

### Test 1: Check if API Key is Set

1. Go to your FarmSight application
2. Navigate to **Feedback** page
3. Fill out the feedback form with test data:
   - Name: `Test User`
   - Email: `your-email@example.com`
   - Subject: `Test Email Setup`
   - Message: `Testing if emails are working`
4. Click **Send Feedback**

### Expected Results:

✅ **If API Key is Configured:**
```
✅ Feedback sent successfully! Thank you for your feedback.
```

⚠️ **If API Key is Missing:**
```
✅ Feedback saved successfully! 
(Note: Email notification could not be sent)
```

❌ **If API Key is Invalid:**
```
✅ Feedback saved successfully
Warning: Email notification failed: Invalid API key
```

---

## 📋 Current Configuration

### Email Settings:
- **From:** `FarmSight Feedback <onboarding@resend.dev>`
- **To:** `farmsight11@gmail.com` ✅
- **Reply-To:** User's email (automatically set)

### What Users See:
When someone submits feedback:
1. Their feedback is **always saved** to the database
2. An email is sent to **farmsight11@gmail.com** (if API key is configured)
3. The user can reply directly to the email to reach the sender

---

## 🔍 Troubleshooting

### Problem: "Email service not configured"
**Solution:** Add the `RESEND_API_KEY` secret to Supabase (see Step 2)

### Problem: Emails not arriving at farmsight11@gmail.com
**Checklist:**
1. ✅ Is `RESEND_API_KEY` set in Supabase?
2. ✅ Is the API key valid? (Check on Resend dashboard)
3. ✅ Check Gmail spam/junk folder
4. ✅ Check Resend dashboard for email logs
5. ✅ Try sending a test email from Resend dashboard

### Problem: "Invalid API key" error
**Solution:** 
- Make sure you copied the entire API key from Resend
- No extra spaces before/after the key
- Format should be: `re_XXXXXXXXXXXXXXXXX`

### Problem: Emails going to spam
**Solution:**
- Set up your own verified domain in Resend
- Add SPF, DKIM, and DMARC records to your domain
- This gives better email deliverability

---

## 📊 Monitoring Email Delivery

### Check Resend Dashboard:
1. Go to **https://resend.com/emails**
2. View all sent emails
3. Check delivery status:
   - ✅ **Delivered** - Email was successfully delivered
   - 📬 **Sent** - Email is in transit
   - ❌ **Bounced** - Email failed to deliver
   - 🚫 **Rejected** - Email was rejected

### Check Supabase Edge Function Logs:
1. Go to Supabase Dashboard → Edge Functions
2. Click on your function
3. View **Logs** tab
4. Look for:
   ```
   📧 Processing feedback request...
   📝 Feedback received from: [Name] ([Email])
   📬 Attempting to send email via Resend API...
   ✅ Feedback email sent successfully!
   ```

---

## 🎯 Quick Checklist

Before testing, ensure:

- [ ] Resend account created
- [ ] API key obtained from Resend
- [ ] `RESEND_API_KEY` added to Supabase secrets
- [ ] Edge function redeployed (if using CLI)
- [ ] Test email sent from feedback form
- [ ] Email received at farmsight11@gmail.com
- [ ] Check spam folder if not in inbox

---

## 💡 Pro Tips

1. **Save API Key Securely:** Store it in a password manager
2. **Use Different Keys:** Use separate API keys for development and production
3. **Monitor Usage:** Resend has usage limits on free plans
4. **Set Up Alerts:** Configure email delivery alerts in Resend
5. **Test Regularly:** Send test feedback weekly to ensure it's working

---

## 📞 Support

If you're still having issues after following this guide:

1. **Check Resend Status:** https://resend.com/status
2. **View Resend Docs:** https://resend.com/docs
3. **Supabase Edge Functions:** https://supabase.com/docs/guides/functions

---

## 🔐 Security Notes

- **Never commit API keys** to version control (Git)
- **Never share API keys** publicly
- **Use environment variables** for all sensitive data
- **Rotate keys regularly** for better security
- **Use separate keys** for different environments

---

## ✅ Success Indicator

You'll know it's working when:
1. User submits feedback
2. Success message appears instantly
3. Email arrives at **farmsight11@gmail.com** within 1-2 minutes
4. Email shows proper formatting with user details
5. You can reply directly to the user's email

---

**Last Updated:** February 10, 2026
**Email Address:** farmsight11@gmail.com ✅ CORRECTED
**Status:** Ready for deployment after adding RESEND_API_KEY
