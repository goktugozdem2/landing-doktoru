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
const kolayikAudit = fs.readFileSync(new URL('../audits/kolayik-demo.html', import.meta.url), 'utf8');
const kolayikRequired = ['Kolay İK demo talep', 'Form sürtünmesi', 'İlk 5 uygulanabilir fix'];
const kolayikMissing = kolayikRequired.filter((text) => !kolayikAudit.includes(text));
if (kolayikMissing.length) {
  console.error('Missing Kolay İK audit content:', kolayikMissing.join(', '));
  process.exit(1);
}
const workcubeAudit = fs.readFileSync(new URL('../audits/workcube-demo.html', import.meta.url), 'utf8');
const workcubeRequired = ['Workcube demo workshop', 'CTA ayrımı', 'İlk 5 uygulanabilir fix'];
const workcubeMissing = workcubeRequired.filter((text) => !workcubeAudit.includes(text));
if (workcubeMissing.length) {
  console.error('Missing Workcube audit content:', workcubeMissing.join(', '));
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
