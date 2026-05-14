# Backend Quickstart

The local backend can still work with JSON storage for demo mode. For production, use PostgreSQL through Prisma with `STORE_DRIVER="prisma"`.

## 1) Install backend deps

```bash
npm run backend:install
```

## 2) Configure owner access

`backend/.env` is already created for local showcase. Change these values before real publication:

- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## 3) Run backend

```bash
npm run backend:dev
```

API URL: `http://localhost:4000/api`

Admin page: `/admin`

## Production Mode

Use:

```bash
cd backend
npm ci
npm run prisma:generate
npm run prisma:deploy
npm run start
```

Production env must include:

- `DATABASE_URL`
- `STORE_DRIVER="prisma"`
- `JWT_SECRET`
- `CORS_ORIGINS`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_ADMIN_CHAT_ID`

To generate a bcrypt password hash:

```bash
npm --prefix backend run hash-password -- "your_password"
```
