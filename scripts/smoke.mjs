import fs from 'node:fs';
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const required = [
  'Landing Doktoru',
  '24 saatte',
  '2.500 TL',
  'Audit talep et',
  'mailto:goktug@datrick.com',
  '/api/leads',
  'sample.html'
];
const missing = required.filter((text) => !html.includes(text));
if (missing.length) {
  console.error('Missing required content:', missing.join(', '));
  process.exit(1);
}
const sample = fs.readFileSync(new URL('../sample.html', import.meta.url), 'utf8');
const sampleRequired = ['Örnek Audit', 'Hero rewrite örneği', 'öncelikli fix listesi', '2.500 TL'];
const sampleMissing = sampleRequired.filter((text) => !sample.includes(text));
if (sampleMissing.length) {
  console.error('Missing sample page content:', sampleMissing.join(', '));
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
