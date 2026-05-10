import fs from 'node:fs';
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const required = [
  'Landing Doktoru',
  '24 saatte',
  '2.500 TL',
  'Audit talep et',
  'mailto:goktug@datrick.com',
  '/api/leads'
];
const missing = required.filter((text) => !html.includes(text));
if (missing.length) {
  console.error('Missing required content:', missing.join(', '));
  process.exit(1);
}
const api = fs.readFileSync(new URL('../api/leads.js', import.meta.url), 'utf8');
const apiRequired = ['No lead destination configured yet', 'TELEGRAM_BOT_TOKEN', 'LEAD_WEBHOOK_URL', 'Next action'];
const apiMissing = apiRequired.filter((text) => !api.includes(text));
if (apiMissing.length) {
  console.error('Missing API guard/content:', apiMissing.join(', '));
  process.exit(1);
}
console.log('Smoke passed: landing content and lead API guard are present.');
