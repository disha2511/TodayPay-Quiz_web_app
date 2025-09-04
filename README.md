# Quiz App — New UI

This project is a redesigned Quiz App (Vite + React + Tailwind).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

Notes:
- The app will try to fetch OpenTDB via `/api/...` (configure vite proxy in vite.config.js). If API fails, it falls back to `src/data/questions.json`.
