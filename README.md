# Oauth-auth-system
Oauth 2.0 Authentication System

## Features
- JWT Access + Refresh tokens
- Redis token storage + blacklist
- Rate limiting
- IP whitelisting
- Next.js App Router frontend
- Zustand auth state

## Setup

### Backend
cd backend
npm install
cp .env.example .env
npm run dev

### Frontend
cd frontend
npm install
npm run dev