# Store Security RBAC - Frontend + Backend

This project adds a separate React frontend and Node/Express backend around the existing MySQL project.

IMPORTANT: The SQL files in `database/` are copied from the original project and must not be modified.

## Requirements
- Node.js 20+
- MySQL 8+

## 1. Start backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Linux/macOS:
```bash
cp .env.example .env
```

Edit `.env` with your MySQL connection information.

## 2. Start frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Then open the URL printed by Vite.
