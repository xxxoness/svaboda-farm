# Production Plan

## Architecture

- Frontend: GitHub Pages.
- Backend API: Node.js/Express on free backend hosting for MVP, then VPS when traffic becomes real.
- Database: PostgreSQL through Prisma, preferably Supabase or Neon for the free MVP stage.
- Admin notifications: Telegram bot.
- Payments: disabled at checkout until admin confirms the order.

GitHub Pages cannot run the backend, PostgreSQL, Telegram bot, or admin API. It only hosts the built frontend from `dist`.

## Free MVP Hosting

Recommended free stack:

- GitHub Pages: frontend.
- Vercel Functions, Koyeb, or Render: backend API.
- Supabase or Neon: PostgreSQL.
- Telegram Bot API: admin notifications.

If Koyeb asks to top up the account, skip it and use Vercel Functions for the backend. Render free web services can spin down after inactivity, so the first request after a quiet period can be slow. Keep the backend stateless and store all data in PostgreSQL.

Backend deployment is prepared with:

- `backend/vercel.json` and `backend/api/index.js` for Vercel Functions.
- `backend/Dockerfile` for Docker-based platforms such as Koyeb.
- `backend/render.yaml` for Render.

## Frontend Deploy To GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In GitHub repository settings, enable Pages with GitHub Actions as the source.
3. In repository variables, add:

```txt
VITE_API_URL=https://api.example.com/api
```

4. Push to `main`. The workflow `.github/workflows/deploy-pages.yml` builds and deploys the frontend.

## Backend Production Env

Create `backend/.env` on the server:

```txt
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/svaboda_farm?schema=public"
STORE_DRIVER="prisma"
JWT_SECRET="long_random_secret"
PORT=4000
FRONTEND_URL="https://your-github-pages-url"
CORS_ORIGINS="https://your-github-pages-url"
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=180
AUTH_RATE_LIMIT_WINDOW_MS=900000
AUTH_RATE_LIMIT_MAX=12
ADMIN_EMAIL="owner@example.com"
ADMIN_PASSWORD_HASH="bcrypt_hash_here"
ADMIN_NAME="Owner"
TELEGRAM_BOT_TOKEN="bot_token"
TELEGRAM_ADMIN_CHAT_ID="chat_id"
```

## Backend Deploy Steps

```bash
cd backend
npm ci
npm run prisma:generate
npm run prisma:deploy
npm run start
```

For a VPS, run the backend with PM2 and proxy it through Nginx with HTTPS.

## Vercel Backend Deploy

This is the preferred free fallback when Koyeb requires payment.

1. Create a new Vercel project from the same GitHub repository.
2. Set the project root directory to:

```txt
backend
```

3. Add environment variables from the backend production env section.
4. Use the Supabase PostgreSQL connection string as `DATABASE_URL`.
5. Run schema sync once from your local machine or Vercel CLI:

```bash
npm --prefix backend run prisma:push
```

6. Deploy. Your API will be available at:

```txt
https://your-vercel-project.vercel.app/api
```

7. Put that URL into GitHub repository variable:

```txt
VITE_API_URL=https://your-vercel-project.vercel.app/api
```

## Koyeb Backend Deploy

1. Create a PostgreSQL database in Supabase or Neon.
2. Create a Koyeb app from GitHub.
3. Select Dockerfile deployment and set Dockerfile path:

```txt
backend/Dockerfile
```

4. Add env variables from the backend production env section.
5. Deploy and copy the public API URL.
6. Set GitHub repository variable:

```txt
VITE_API_URL=https://your-koyeb-app.koyeb.app/api
```

## Render Backend Deploy

1. Create a new Render Web Service from GitHub.
2. Use the `backend/render.yaml` blueprint or set manually:

```txt
Root directory: backend
Build command: npm ci && npm run prisma:generate
Start command: npm run prisma:deploy && npm run start
```

3. Add env variables from the backend production env section.
4. Set GitHub Pages variable `VITE_API_URL` to the Render API URL.

## Telegram Setup

1. Create a bot in Telegram through BotFather.
2. Put the bot token into `TELEGRAM_BOT_TOKEN`.
3. Send any message to the bot from the admin account.
4. Get chat id through `https://api.telegram.org/bot<TOKEN>/getUpdates`.
5. Put chat id into `TELEGRAM_ADMIN_CHAT_ID`.

## Current Payment Strategy

At MVP stage, the user sends an order request. The admin confirms stock and delivery, then sends payment details manually:

- ERIP
- bank card
- invoice for legal entities
- cash/card on delivery
- transfer to card

Payment provider integration should be added after the first real order flow is validated.
