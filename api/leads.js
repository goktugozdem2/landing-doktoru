export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const required = ['name', 'email', 'url', 'problem'];
  const missing = required.filter((key) => !String(body?.[key] || '').trim());
  if (missing.length) return res.status(400).json({ error: `Missing: ${missing.join(', ')}` });

  const lead = {
    project: 'landing-doktoru',
    createdAt: new Date().toISOString(),
    name: String(body.name).slice(0, 120),
    email: String(body.email).slice(0, 180),
    url: String(body.url).slice(0, 300),
    problem: String(body.problem).slice(0, 1500),
    source: req.headers.referer || 'direct'
  };

  if (process.env.LEAD_WEBHOOK_URL) {
    const response = await fetch(process.env.LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(lead)
    });
    if (!response.ok) return res.status(502).json({ error: 'Lead webhook failed' });
    return res.status(200).json({ ok: true });
  }

  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    const text = [
      '🩺 Yeni Landing Doktoru lead',
      `Ad: ${lead.name}`,
      `Email: ${lead.email}`,
      `URL: ${lead.url}`,
      `Problem: ${lead.problem}`,
      `Kaynak: ${lead.source}`,
      'Next action: 2.500 TL beta audit teklifini kapat ve teslim tarihini teyit et.'
    ].join('\n');
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text })
    });
    if (!response.ok) return res.status(502).json({ error: 'Telegram notification failed' });
    return res.status(200).json({ ok: true });
  }

  return res.status(503).json({ error: 'No lead destination configured yet' });
}
