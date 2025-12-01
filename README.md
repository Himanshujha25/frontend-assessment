Frontend Technical Assessment — Next.js + MUI + Zustand + NextAuth + DummyJSON API

This project is a fully functional Admin Dashboard built for a Frontend Technical Assessment.

It includes:

Secure authentication

Protected routes

User & product management

Global state using Zustand

Fully responsive UI using Material UI

🚀 Live Features Demonstrated
✅ Authentication (NextAuth + DummyJSON API)

Credential-based login using DummyJSON /auth/login

JWT stored in Zustand + localStorage

Protected routes using a custom ProtectedRoute component

Redirects based on logged-in status

✅ Users Module

Users list with search, pagination & skeleton loader

Detailed user profile with:

Personal info

Address

Company details

Avatar

Glass UI effects

✅ Products Module

Product catalogue with:

Category filter

Search bar

Pagination

Loading skeletons

Product detail page

Responsive design

✅ Zustand Global Store

Manages:

Authentication state

Users list (with caching)

Products list (with caching)

API calls + async states

Optimizations:

API-side pagination

Debounced search (lodash)

Cached results

Minimized re-renders

✅ Material UI (MUI)

Fully responsive components

Cards, grids, tables, dialogs, skeleton loaders

Custom theme

Smooth animations

Gradient hero sections

🛠️ Tech Stack
Technology	Purpose
Next.js	React framework (pages router)
NextAuth	Authentication
Material UI	UI framework
Zustand	State management
Axios	API calls
DummyJSON API	Data source
Lodash.debounce	Optimized search
📁 Folder Structure
src/
├── pages/
│   ├── index.jsx              # Home page
│   ├── login.jsx              # Login page
│   ├── dashboard.jsx          # Protected dashboard
│   ├── users/
│   │   ├── index.jsx          # User list
│   │   └── [id].jsx           # User details
│   ├── products/
│   │   ├── index.jsx          # Product list
│   │   └── [id].jsx           # Product details
│   └── api/auth/[...nextauth].js   # NextAuth config
│
├── components/
│   ├── Layout.jsx
│   ├── ProtectedRoute.jsx
│
├── stores/
│   ├── authStore.js
│   ├── userStore.js
│   ├── productStore.js
│
├── lib/
│   ├── api.js                 # Axios instance
│   └── theme.js               # MUI theme config
│
└── styles/
    └── globals.css

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Himanshujha25/frontend-assessment
cd frontend-assessment

2️⃣ Install dependencies
npm install

3️⃣ Create .env.local
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000


Generate secure secret:

openssl rand -base64 32

4️⃣ Start development server
npm run dev


App will run at:
👉 http://localhost:3000

🔐 Authentication Flow Explained

User logs in using:

Username: emilys
Password: emilyspass


NextAuth verifies credentials via DummyJSON API

Token + user details stored in Zustand

Token saved to localStorage

Protected pages become accessible

ProtectedRoute automatically redirects unauthorized users

🧠 Zustand Store Overview
Auth Store

Saves JWT token

Saves logged-in user

Persists login state

Users Store

Functions:

fetchUsers(limit, skip, search)

fetchSingleUser(id)

Includes caching to avoid extra API calls

Products Store

fetchProducts(limit, skip, search, category)

fetchCategories()

fetchSingleProduct(id)

Supports:

Pagination

Filters

Cached results

🚀 Deployment Guide (Vercel)
1️⃣ Push project to GitHub
2️⃣ Go to: https://vercel.com
3️⃣ Import your GitHub repo
4️⃣ Add environment variables:
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://yourproject.vercel.app

5️⃣ Click Deploy

🎉 Your project will be live in minutes.

📌 Final Notes & Highlights

Production-quality folder structure

Smooth UI/UX with animations

Defensive coding for categories & filtering

optimized API calls

Uses global state effectively

Modern & scalable architecture

Perfect for real-world dashboards & admin portals
