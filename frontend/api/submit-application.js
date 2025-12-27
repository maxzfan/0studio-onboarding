export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, birthday, instagram, tiktok, vibes, otherVibe, videoFileName } = req.body;

    console.log('[API] Received application:', { name, email, birthday, instagram, tiktok, vibes, otherVibe, videoFileName });

    // Validate required fields
    if (!name || !email || !birthday) {
      console.error('[API] Missing required fields');
      return res.status(400).json({ error: 'Missing required fields: name, email, birthday' });
    }

    // Format the vibes list
    const vibesList = vibes && vibes.length > 0 ? vibes.map(vibe => {
      if (vibe === 'other' && otherVibe) {
        return `Other: ${otherVibe}`;
      }
      return vibe;
    }).join(', ') : 'None selected';

    // Format social media links
    const socialMedia = [];
    if (instagram) socialMedia.push(`Instagram: @${instagram}`);
    if (tiktok) socialMedia.push(`TikTok: @${tiktok}`);
    const socialMediaText = socialMedia.join('\n');

    // Create email content
    const emailSubject = `[ADARI] New Creator Application - ${name}`;
    const emailBody = `
New Creator Application Received
================================

Name: ${name}
Email: ${email}
Birthday: ${birthday}
Age: ${calculateAge(birthday)} years old

Social Media:
${socialMediaText}

Vibes/Categories: ${vibesList}

Video Prompt Response: ${videoFileName || 'No file name available'}

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
    `.trim();

    // Send email using Resend API
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const IS_LOCAL = process.env.NODE_ENV !== 'production';
    
    if (!RESEND_API_KEY) {
      console.error('[API] RESEND_API_KEY not configured');
      
      // In local development, just log the email instead of failing
      if (IS_LOCAL) {
        console.log('\n========== EMAIL PREVIEW (LOCAL MODE) ==========');
        console.log('From: Adari Applications <applications@adari.app>');
        console.log('To: cik@mit.edu, colinikkim@gmail.com');
        console.log('Subject:', emailSubject);
        console.log('\n--- Email Body ---');
        console.log(emailBody);
        console.log('=================================================\n');
        
        return res.status(200).json({ 
          success: true, 
          message: 'Local mode: Email logged to console',
          emailPreview: emailBody 
        });
      }
      
      return res.status(500).json({ error: 'Email service not configured - RESEND_API_KEY missing' });
    }

    console.log('[API] Sending email via Resend...');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Adari Applications <onboarding@resend.dev>',
        to: ['cik@mit.edu'],
        subject: emailSubject,
        text: emailBody,
        html: `
          <div style="font-family: 'Geist Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #000; font-weight: 300; font-size: 24px; margin-bottom: 30px;">New Creator Application Received</h1>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="font-weight: 300; font-size: 18px; margin-top: 0;">Applicant Information</h2>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 8px 0;"><strong>Birthday:</strong> ${birthday}</p>
              <p style="margin: 8px 0;"><strong>Age:</strong> ${calculateAge(birthday)} years old</p>
            </div>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="font-weight: 300; font-size: 18px; margin-top: 0;">Social Media</h2>
              ${instagram ? `<p style="margin: 8px 0;"><strong>Instagram:</strong> <a href="https://instagram.com/${instagram}" target="_blank">@${instagram}</a></p>` : ''}
              ${tiktok ? `<p style="margin: 8px 0;"><strong>TikTok:</strong> <a href="https://tiktok.com/@${tiktok}" target="_blank">@${tiktok}</a></p>` : ''}
            </div>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="font-weight: 300; font-size: 18px; margin-top: 0;">Vibes/Categories</h2>
              <p style="margin: 8px 0;">${vibesList}</p>
            </div>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="font-weight: 300; font-size: 18px; margin-top: 0;">Video Prompt Response</h2>
              <p style="margin: 8px 0;">${videoFileName || 'No file name available'}</p>
              <p style="margin: 8px 0; color: #666; font-size: 14px;"><em>Note: Video file needs to be accessed separately from the submission system.</em></p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 14px; margin: 0;">Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[API] Resend API error:', data);
      console.error('[API] Response status:', response.status);
      console.error('[API] Response statusText:', response.statusText);
      return res.status(response.status).json({ 
        error: 'Failed to send email', 
        details: data,
        status: response.status,
        message: data.message || 'Unknown error from Resend API'
      });
    }

    console.log('[API] Email sent successfully:', data.id);
    return res.status(200).json({ success: true, emailId: data.id });
  } catch (error) {
    console.error('[API] Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message, stack: error.stack });
  }
}

function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
