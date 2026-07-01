/* ═══════════════════════════════════════════════════
   Cloudflare Pages Function — /contact
   Handles both quick contact and intake form
   with full attachment support via Resend API

   Environment variable (Cloudflare dashboard):
     RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxx
═══════════════════════════════════════════════════ */

export async function onRequestPost(context) {
    const { request, env } = context;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    /* ── Parse body ── */
    let body;
    try {
        body = await request.json();
    } catch {
        return jsonRes({ ok: false, error: 'Invalid request body.' }, 400, corsHeaders);
    }

    const { name, email, message, formType } = body;

    /* ── Server-side field validation ── */
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return jsonRes({ ok: false, error: 'Missing required fields.' }, 422, corsHeaders);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return jsonRes({ ok: false, error: 'Invalid email address.' }, 422, corsHeaders);
    }

    /* ── Validate + sanitise attachments ── */
    // Strip data URI prefix if browser sent it — Resend needs raw base64 only
    // e.g. "data:image/png;base64,AAAA…" → "AAAA…"
    let attachments = [];
    if (Array.isArray(body.attachments) && body.attachments.length > 0) {
        attachments = body.attachments
            .filter(a => a && a.filename && a.content)
            .map(a => ({
                filename: String(a.filename),
                content: String(a.content).includes(',')
                    ? String(a.content).split(',')[1]   // strip data URI prefix
                    : String(a.content),                // already clean base64
            }));
    }

    const isQuickContact = formType === 'quick';
    const subjectLine = isQuickContact
        ? `💬 Quick Message From ${name} — 3D Printing Service`
        : `🖨️ New Print Order From ${name} — 3D Printing Service`;

    /* ── Build attachment summary for email body ── */
    const attachmentSummaryHtml = attachments.length > 0
        ? `
      <div class="field">
        <div class="label">Attached Files (${attachments.length})</div>
        <div class="value">${attachments.map(a => `📎 ${escHtml(a.filename)}`).join('<br />')}</div>
      </div>`
        : '';

    /* ── Email HTML ── */
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        body         { font-family: Inter, Arial, sans-serif; background:#0c1520; color:#d8e8f2; margin:0; padding:0; }
        .wrap        { max-width:580px; margin:0 auto; padding:32px 24px; }
        .header      { background:#1e2d3d; border-bottom:3px solid #f2c100; padding:24px 28px; border-radius:10px 10px 0 0; }
        .header h1   { font-size:1.1rem; font-weight:800; color:#f2c100; margin:0; }
        .header p    { font-size:.78rem; color:#8aa4bc; margin:5px 0 0; }
        .body        { background:#162333; padding:28px; border-radius:0 0 10px 10px; border:1px solid rgba(255,255,255,.07); border-top:none; }
        .field       { margin-bottom:20px; }
        .label       { font-size:.65rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:#f2c100; margin-bottom:5px; }
        .value       { font-size:.9rem; color:#d8e8f2; background:#0c1520; border:1px solid rgba(255,255,255,.07); border-radius:6px; padding:10px 13px; line-height:1.65; white-space:pre-wrap; word-break:break-word; }
        .badge       { display:inline-block; background:rgba(242,193,0,.12); color:#f2c100; border:1px solid rgba(242,193,0,.26); font-size:.62rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; padding:3px 10px; border-radius:4px; margin-bottom:18px; }
        .footer-note { margin-top:22px; font-size:.72rem; color:#506a82; text-align:center; }
        .footer-note a { color:#f2c100; text-decoration:none; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="header">
          <h1>3D Printing Service</h1>
          <p>${isQuickContact ? 'Quick Contact Form' : 'Project Specs Intake Form'}</p>
        </div>
        <div class="body">
          <div class="badge">${isQuickContact ? 'Quick Message' : 'Print Order Inquiry'}</div>

          <div class="field">
            <div class="label">Sender Name</div>
            <div class="value">${escHtml(name)}</div>
          </div>

          <div class="field">
            <div class="label">Reply-To Email</div>
            <div class="value">
              <a href="mailto:${escHtml(email)}" style="color:#f2c100;">${escHtml(email)}</a>
            </div>
          </div>

          ${body.stream ? `
          <div class="field">
            <div class="label">Print Stream</div>
            <div class="value">${escHtml(body.stream)}</div>
          </div>` : ''}

          ${body.material ? `
          <div class="field">
            <div class="label">Preferred Material</div>
            <div class="value">${escHtml(body.material)}</div>
          </div>` : ''}

          ${body.qty ? `
          <div class="field">
            <div class="label">Quantity</div>
            <div class="value">${escHtml(String(body.qty))}</div>
          </div>` : ''}

          ${body.colour ? `
          <div class="field">
            <div class="label">Colour / Finish</div>
            <div class="value">${escHtml(body.colour)}</div>
          </div>` : ''}

          ${body.deadline ? `
          <div class="field">
            <div class="label">Deadline</div>
            <div class="value">${escHtml(body.deadline)}</div>
          </div>` : ''}

          <div class="field">
            <div class="label">Message / Brief</div>
            <div class="value">${escHtml(message)}</div>
          </div>

          ${attachmentSummaryHtml}

          <div class="footer-note">
            Submitted via <a href="https://baldo.qa">baldo.qa</a>
            &nbsp;·&nbsp; Reply to
            <a href="mailto:${escHtml(email)}">${escHtml(email)}</a>
          </div>
        </div>
      </div>
    </body>
    </html>`;

    /* ── Build Resend payload ── */
    const resendPayload = {
        from: 'onboarding@resend.dev',   // ← swap to your verified domain when ready
        to: ['spyarrow39@gmail.com'],
        reply_to: email,
        subject: subjectLine,
        html: emailHtml,
    };

    // Only add attachments key if there are files — Resend errors on empty array
    if (attachments.length > 0) {
        resendPayload.attachments = attachments;
    }

    /* ── Call Resend ── */
    try {
        const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resendPayload),
        });

        if (!resendRes.ok) {
            const errText = await resendRes.text();
            console.error('Resend API error:', resendRes.status, errText);
            return jsonRes(
                { ok: false, error: `Email delivery failed (${resendRes.status}). Please try again.` },
                502, corsHeaders
            );
        }

        const result = await resendRes.json();
        console.log('Resend success, id:', result.id);
        return jsonRes({ ok: true, id: result.id }, 200, corsHeaders);

    } catch (err) {
        console.error('Fetch error:', err);
        return jsonRes({ ok: false, error: 'Server error. Please try again later.' }, 500, corsHeaders);
    }
}

/* OPTIONS preflight */
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

/* ── Helpers ── */
function jsonRes(data, status, headers) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json', ...headers },
    });
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}