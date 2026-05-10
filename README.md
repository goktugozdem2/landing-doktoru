# Landing Doktoru

Yeni bağımsız mikro servis projesi: 24 saat içinde landing page dönüşüm auditi.

## Para hedefi
İlk ücretli satış: 1 adet 2.500 TL audit.

## Local verification
```bash
npm install
npm run smoke
npx serve . -l 4173
```

## Lead destination env vars
Form `/api/leads` endpointine POST eder. En az bir hedef bağlanmalı:

- `LEAD_WEBHOOK_URL`, veya
- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`

Hedef yoksa endpoint bilinçli şekilde `503 No lead destination configured yet` döner ve frontend mail fallback açar.
