# Email Setup Instructions

This application uses [Resend](https://resend.com) to send email notifications when someone submits the application form.

## Setup Steps

1. **Create a Resend Account**
   - Go to https://resend.com and sign up for a free account
   - The free tier includes 100 emails/day and 3,000 emails/month

2. **Get Your API Key**
   - Navigate to https://resend.com/api-keys
   - Click "Create API Key"
   - Give it a name (e.g., "Creator Landing Page")
   - Select "Full Access" permissions
   - Copy the API key (it will only be shown once)

3. **Configure Domain (Optional but Recommended)**
   - Go to https://resend.com/domains
   - Add your domain and verify it with DNS records
   - This allows you to send from `applications@yourdomain.com`
   - If you skip this, emails will be sent from a Resend test domain

4. **Set Environment Variable**
   
   **For Local Development:**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Add your Resend API key to `.env.local`:
     ```
     RESEND_API_KEY=re_your_actual_api_key_here
     ```

   **For Vercel Deployment:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add a new variable:
     - Name: `RESEND_API_KEY`
     - Value: Your Resend API key
     - Scope: Production (and Preview/Development if needed)
   - Redeploy your application

## Email Recipients

Emails are sent to:
- cik@mit.edu
- colinikkim@gmail.com

To change recipients, edit `/api/submit-application.js` line 53.

## Email Format

The email includes:
- Applicant name, email, birthday, and age
- Instagram and TikTok handles (with clickable links)
- Selected vibe categories
- Video file name
- Submission timestamp

## Testing

To test the email functionality:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/apply` and fill out the form

3. Check your Resend dashboard at https://resend.com/emails to see sent emails

4. Check the recipient inboxes to verify delivery

## Troubleshooting

- **Email not sending:** Check that `RESEND_API_KEY` is set correctly
- **Email in spam:** Verify your domain in Resend to improve deliverability
- **API errors:** Check the browser console and Vercel logs for error details
- **Rate limits:** Free tier has daily/monthly limits - upgrade if needed

## API Endpoint

The form submission is handled by `/api/submit-application.js`, which is deployed as a Vercel serverless function.
