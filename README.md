# KisanKart 🌾

A two-sided marketplace connecting farmers directly with vendors — no middlemen, fair prices, transparent trade.

**Live Demo:** [kisankart-teal.vercel.app](https://kisankart-teal.vercel.app)

---

## The Problem

Small farmers in India are forced to sell through distributors and mandis, losing 30–50% of their earnings to middlemen. Vendors on the other side pay inflated prices without knowing the source. KisanKart removes that gap.

---

## Features

**For Farmers**
- Register and create a profile as a farmer
- Post produce listings (crop, quantity, price, location)
- Edit or remove listings anytime
- View and manage incoming orders — accept or reject

**For Vendors**
- Browse all available produce listings
- Filter by crop name or location
- Place orders directly with farmers
- Track order status in real time

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT (access token), bcryptjs |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas |

---

## System Design

```
Client (React + Vite)
      │
      │  REST API calls (Axios + JWT in headers)
      ▼
Express Server (Node.js)
      │
      ├── /api/auth     → register, login (role-based)
      ├── /api/produce  → CRUD for farmers, browse for vendors
      └── /api/orders   → place order, view orders, accept/reject
      │
      ▼
MongoDB Atlas
```

**Role-based access:** Every protected route checks the JWT and the user's role before processing the request. A vendor cannot create listings. A farmer cannot place orders.

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/kisankart.git
cd kisankart

# Backend
cd backend
npm install
cp .env.example .env   # add your values
npm start

# Frontend
cd ../frontend
npm install
npm run dev
```

**Environment variables (backend):**
```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
PORT=5000
```

**Environment variables (frontend):**
```
VITE_API_URL=http://localhost:5000/api
```

---

## API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register as farmer or vendor |
| POST | /api/auth/login | Public | Login, returns JWT |
| POST | /api/produce | Farmer | Create produce listing |
| GET | /api/produce | Public | Browse listings (filter: ?crop= &location=) |
| GET | /api/produce/my | Farmer | Get own listings |
| PUT | /api/produce/:id | Farmer | Update listing |
| DELETE | /api/produce/:id | Farmer | Delete listing |
| POST | /api/orders | Vendor | Place an order |
| GET | /api/orders/my | Vendor | View own orders |
| GET | /api/orders/received | Farmer | View received orders |
| PUT | /api/orders/:id | Farmer | Accept or reject order |

---

## Folder Structure

```
kisankart/
├── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Route logic
│   ├── middleware/     # JWT protect middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routers
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/        # Axios instance
│   │   ├── components/ # Reusable components
│   │   ├── context/    # AuthContext
│   │   └── pages/      # Farmer + Vendor pages
│   └── vite.config.js
└── README.md
```

---

## Author

Built by Durga prasad K —  CSE'27 student at RGUKT  Ongole
<!-- [LinkedIn](https://linkedin.com/in/durga) · 
 --> [GitHub](https://github.com/iamkdp)