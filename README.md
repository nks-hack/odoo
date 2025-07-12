# Skill Swap Platform

A full-featured platform where people connect, learn, and grow by exchanging skills. Built for curious learners, makers, and mentors.

### Team Members

* Abhishek Dudhpachare – [abhishek.dudhpachare@walchandsangli.ac.in](mailto:abhishek.dudhpachare@walchandsangli.ac.in)
* Atharva Pandey – [atharva2004pandey@gmail.com](mailto:atharva2004pandey@gmail.com)
* Mihir Pusadkar – [mpusadkar633@gmail.com](mailto:mpusadkar633@gmail.com)
* Viraj Gotmare – [virajchronos@gmai.com](mailto:virajchronos@gmai.com)

---
## Demo Video Link - https://drive.google.com/file/d/1CVffGBL9_sq08l3-T4UqxzI73v0ApVEn/view?usp=sharing
---
## What It Does

Users list what they can teach and what they want to learn. They find matches, chat, set up learning sessions, and grow together. There’s a built-in feedback loop, a gamified experience, and a slick interface across devices.

---

## Core Features

### Authentication & Security

* JWT authentication with secure, HTTP-only cookies
* Passwords hashed with bcrypt
* All sensitive routes locked down

### User Profiles

* Add skills, learning goals, availability
* Upload profile photo (Cloudinary)
* Choose public or private visibility

### Skill Matching

* Smart search across skills, availability, interests
* Skill-based suggestions
* Profile filtering with fast response

### Swap Requests

* Send, accept, reject, cancel
* Instant notifications
* Built-in messaging

### Co-learning Rooms

* Video-ready setup
* Collaborative whiteboard
* Live session tracking
* Recording support

### Feedback & Gamification

* Rate your partner, leave comments
* Earn points, unlock badges
* Celebratory animations that feel good

### Leaderboard

* Tracks top users by impact
* Points, badges, stats, rankings – live

### Clean UI & Experience

* Tailwind CSS for a responsive layout
* Smooth animations (Framer Motion)
* Fast loading, clean transitions
* Confetti. Because progress deserves celebration

---

## Tech Stack

* **Frontend**: Next.js 14, React, Tailwind CSS
* **Backend**: Next.js API Routes (Node.js)
* **Database**: MongoDB (Mongoose)
* **Auth**: JWT with HTTP-only cookies
* **Real-time**: Socket.IO
* **Media**: Cloudinary
* **Animations**: Framer Motion, Canvas Confetti

---

## Setup Guide

1. Clone the repo

```bash
git clone https://github.com/nks-hack/odoo.git
cd skill-swap-platform
```

2. Install packages

```bash
npm install
```

3. Create your environment config

```bash
cp .env.example .env.local
```

Fill in your variables:

* MongoDB URI
* JWT secret
* Cloudinary credentials
* Socket server URL

4. Run the app

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Deployment Tips

**Frontend (Vercel)**

* Link repo, set env vars, deploy

**Database (MongoDB Atlas)**

* Create a cluster, plug in the URI

**Media Storage (Cloudinary)**

* Create account, grab API keys

---

## Project Structure

```
skill-swap-platform/
├── app/              # Next.js app structure
│   ├── api/          # API routes
│   ├── (pages)/      # Page components
│   ├── globals.css   # Global styles
│   └── layout.jsx    # Root layout
├── components/       # Reusable UI
├── contexts/         # Global state
├── lib/              # Helpers and utils
├── models/           # Mongoose models
├── public/           # Static assets
└── README.md
```

---

## Environment Variables (`.env.local`)

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NODE_ENV=development
```

---

## Under the Hood

### Auth Flow

* Users log in with email and password
* JWTs stored in secure cookies
* Each protected route checks token validity

### Matching Logic

* Skills offered and wanted are cross-referenced
* Availability helps prioritize matches
* Location and tags can help refine

### Real-Time Sync

* Socket.IO pushes request and leaderboard updates
* Message and session notifications land instantly

### Gamification Engine

* Complete swaps, get points
* Ratings drive your rep
* Badges and confetti make it fun

### Video Sessions

* Whiteboard (Excalidraw) lets ideas flow
* Sessions can be recorded


