# Oauth-auth-system
Oauth 2.0 Authentication System

A secure and scalable fullstack authentication system built with **Next.js, Node.js, JWT, Redis, and MongoDB**.

This project implements **OAuth 2.0 Authentication** with access tokens, refresh tokens, rate limiting, IP whitelisting, and protected routes.

---

## 🚀 Features

### 🔑 Authentication
- User Registration
- User Login
- JWT Access Token (short expiry)
- Refresh Token (stored in HttpOnly cookies)
- Logout with token revocation

### 🛡️ Security
- Password hashing using bcrypt
- Rate limiting (Redis based)
- IP Whitelisting middleware
- Token blacklist
- Helmet & CORS security
- Centralized error handling

### 🌐 Frontend
- Next.js (App Router)
- Register Page
- Login Page
- Protected Dashboard
- Auth state management (Zustand)
- Secure token handling

---

## 🧱 Tech Stack

### Frontend
- Next.js (React)
- Zustand (state management)
- Fetch API

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- Redis (ioredis)
- JWT (jsonwebtoken)
- bcryptjs

---

## 📂 Project Structure
┣ backend/
┃ ┣ src/
┃ ┃ ┣ config/
┃ ┃ ┣ controllers/
┃ ┃ ┣ middleware/
┃ ┃ ┣ models/
┃ ┃ ┣ routes/
┃ ┃ ┣ utils/
┃ ┃ ┣ app.js
┃ ┃ ┗ server.js
┃ ┗ .env
┣ frontend/
┃ ┣ app/
┃ ┃ ┣ page.js
┃ ┃ ┣ register/page.js
┃ ┃ ┣ login/page.js
┃ ┃ ┗ dashboard/page.js
┃ ┣ store/
┃ ┗ lib/
┗ README.md

## ⚙️ Setup Instructions

### 1️⃣ Clone repository

git clone <https://github.com/KRRAHUL69/Oauth-auth-system.git>
cd auth-system

🔧 Backend Setup
cd backend
npm install

Create .env file -
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
REDIS_URL=your_redis_url
ALLOWED_IPS=127.0.0.1

Run backend -
npm run dev

Server runs at:
http://localhost:5000


🌐 Frontend Setup -
cd ../frontend
npm install
npm run dev

Frontend runs at:
http://localhost:3000


🔌 API Endpoints
Auth APIs
Method	Endpoint	            Description
POST	/api/auth/register	    Register user
POST	/api/auth/login	        Login user
GET	    /api/auth/me	        Get current user
POST	/api/auth/logout	    Logout user


🔐 Authentication Flow
Register → Login → Access Token → Protected API → Refresh Token → Logout

Access Token: stored in memory

Refresh Token: stored in HttpOnly cookie


🧪 Testing

Use Postman or Thunder Client

Steps:

Register user

Login

Copy access token

Call /api/auth/me with Bearer token

📦 Deliverables Covered

✔ Modular folder structure
✔ Auth & security middleware
✔ JWT Access + Refresh tokens
✔ Rate limiting
✔ IP Whitelisting
✔ Frontend auth flow
✔ Protected routes
✔ README + setup instructions


👨‍💻 Author

Rahul Kumar
Fullstack Developer 

📌 Notes

--> This project is built as part of a Fullstack Developer technical assessment
--> Focus is on security, scalability, and clean architecture