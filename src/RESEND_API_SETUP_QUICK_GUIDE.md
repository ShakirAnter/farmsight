# Quick Guide: Activate Email Notifications

## 🎯 Your Resend API Key
```
re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4
```

## ⚡ Steps to Activate (5 minutes)

### Option A: Add via Supabase Dashboard (Recommended)

1. **Open your Supabase project:**
   - Go to: https://supabase.com/dashboard/project/idbgvqilomnfpfgcgkrl

2. **Navigate to Edge Functions:**
   - Click **Edge Functions** in the left sidebar
   - Click on the **server** function

3. **Add the Secret:**
   - Click the **Secrets** or **Environment Variables** tab
   - Click **Add new secret**
   - Enter:
     * Name: `RESEND_API_KEY`
     * Value: `re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4`
   - Click **Save**

4. **Done!** Test by submitting feedback in your app

---

### Option B: Add via Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase secrets set RESEND_API_KEY=re_XuR6sWaF_JeNTy6XNQGB9ZdMnbVPWAMs4
```

Then redeploy:
```bash
supabase functions deploy server
```

---

## ✅ How to Test

1. Open your FarmSight application
2. Go to the **Feedback** page
3. Fill out and submit the form
4. Check **skvg256@gmail.com** for the feedback email (check spam folder too!)

---

## 📝 What Happens Now

Once you add the API key:
- ✅ All feedback will be **saved to the database** (already working)
- ✅ Email notifications will be **sent to skvg256@gmail.com** (will work after adding key)
- ✅ You can **reply directly** to feedback emails to respond to users
- ✅ Professional HTML-formatted emails with sender details

---

## 🆘 Troubleshooting

**If emails don't arrive:**
1. Check your spam/junk folder
2. Verify the API key was copied exactly (no extra spaces)
3. Check the Edge Function logs in Supabase for errors
4. Verify the secret is saved in Supabase dashboard

**Still not working?**
- Ensure the Edge Function is deployed (see `/FIXING_DEPLOYMENT_403_ERROR.md`)
- Check Resend dashboard at https://resend.com/emails for sending logs

---

## 📊 Resend Free Tier Limits

Your free tier includes:
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ More than enough for feedback emails!

---

## 🔒 Security Note

The API key is stored securely as a Supabase secret and is never exposed to the client-side code. It's only accessible by your Edge Function running on Supabase's servers.
