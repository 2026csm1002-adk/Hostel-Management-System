<div align="center">

# 🏠 Hostel Management System

**A centralized web platform for hostel complaints, room-cleaning bookings and room-swap requests — connecting students, caretakers, cleaning supervisors and wardens.**

PGSL · CS509 Course Project · Team **Dev-Dynamo**

![Next.js](https://img.shields.io/badge/Next.js-TypeScript-black?logo=nextdotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-shadcn%2Fui-38BDF8?logo=tailwindcss&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-Google%20OAuth-4285F4?logo=google&logoColor=white)
![Turso](https://img.shields.io/badge/Turso-libSQL-4FF8D2)
![Drizzle](https://img.shields.io/badge/ORM-Drizzle-C5F74F)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![Status](https://img.shields.io/badge/status-in%20development-orange)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [User Roles](#-user-roles)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Team](#-team)

---

## 📖 Overview

Hostels in a multi-hostel college often rely on manual handling of cleaning requests, complaints and room-swap approvals. The **Hostel Management System** replaces that with a single, role-based web application where every request is structured, trackable and routed to the right person.

Students store their hostel, wing and room details **once** in their profile, and every later request reuses that information automatically.

## 🎯 Problem Statement

- Cleaning-slot capacity is hard to manage without a shared system.
- Complaints are scattered and difficult to track to resolution.
- Room-swap requests lack a clear, auditable approval process.
- Students repeatedly re-enter hostel, wing and room details for each request.
- Communication between students, caretakers, supervisors and wardens is fragmented.

## ✨ Key Features

### 1. Student Profile & Hostel Information
Profile created once with hostel, wing, room, course and batch; auto-attached to all future requests. Student ID is read-only.

### 2. Room-Cleaning Booking
- Floor-wise, one-hour slots with a capacity of **3 rooms per slot per floor**
- Bookings allowed **2 to 4 days ahead**
- Seat allocation (1–3) enforced by a database `UNIQUE` constraint, so a full slot can never be double-booked
- Supervisor board with schedule view and **CSV / PDF export**

### 3. Hostel Complaint Management
- Categorised complaints (Electrical, Carpenter, Pest Control, Other, …) with no slot selection needed
- Status flow: `Open → In Progress → Resolved`
- Caretakers see only complaints from **their own hostel**
- Unresolved complaints older than 7 days can be **re-registered**
- Complaint export for caretakers

### 4. Room-Swap Workflow
- Student submits a request with a reason and optional attachment
- Caretaker reviews and **forwards** to the warden
- Warden decides: `Accept` · `Reject` · `Waiting` (comment required for Reject / Waiting)
- Accepted requests move to `AwaitingRoom` → `RoomAssigned`
- **Privacy-preserving statistics:** batch- and course-wise counts, with no student identities exposed

### 5. Role-Based Access & Status Tracking
Auth.js session checks and middleware route guards ensure each user only sees what their role allows, while students can track the status of every request they submit.

## 👥 User Roles

| Role | Responsibilities |
|---|---|
| **Student** | Manage profile, book cleaning, raise complaints, request room swaps, track statuses |
| **Caretaker** | Handle complaints for their hostel, review and forward room-swap requests |
| **Cleaning Supervisor** | Monitor cleaning bookings and workload per hostel and floor, export schedules |
| **Warden** | Review forwarded swap requests, decide Accept / Reject / Waiting, assign rooms |

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) with TypeScript |
| UI | React, Tailwind CSS, shadcn/ui |
| Authentication | Auth.js with Google OAuth 2.0 (institute email sign-in) |
| Validation | Zod |
| ORM / Database | Drizzle ORM + libSQL client, Turso database |
| File Storage | Google Drive / Blob storage (swap-request attachments) |
| CI / CD | GitHub Actions (lint, type-check, tests) → Vercel (preview + production) |


### Main API Routes

| Module | Endpoints |
|---|---|
| Auth & Profile | `/api/auth/*`, `GET/PUT /api/profile` |
| Room Cleaning | `GET /api/cleaning/slots`, `POST /api/cleaning/bookings`, `GET /api/cleaning/schedule`, `GET /api/cleaning/export` |
| Complaints | `POST/GET /api/complaints`, `PATCH /api/complaints/:id/status`, `POST /api/complaints/:id/reregister`, `GET /api/complaints/export` |
| Room Swap | `POST/GET /api/swaps`, `POST /api/swaps/:id/forward`, `POST /api/swaps/:id/decision`, `POST /api/swaps/:id/assign-room`, `GET /api/swaps/stats` |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A [Turso](https://turso.tech) database
- Google OAuth 2.0 credentials (Google Cloud Console)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/2026csm1002-adk/Hostel-Management-System.git
cd Hostel-Management-System

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Set up the database schema
npx drizzle-kit push

# 5. Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables

```env
# Auth.js
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Turso (libSQL)
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

### Useful Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## 📂 Project Structure

```text
.
├── docs/
│   ├── images/          # HLD, LLD and ER diagrams
│   ├── prototype/       # Static HTML UI prototype
│   └── PGSL_Week1_Hostel_Management_System.md
├── src/                 # Application source (pages, API routes, services, repositories)
├── .github/workflows/   # CI pipeline
└── README.md
```

> Adjust this tree to match your actual folder layout as the code grows.

## 🗺 Roadmap

- [x] Problem definition, scope and team roles (Week 1)
- [x] High-level design, low-level design and ER diagram
- [x] Static UI prototype
- [ ] **Alpha** – profile, login for all four roles, cleaning booking with capacity rules, complaints, swap workflow, batch-wise swap counts
- [ ] **Beta** – refined UI, dashboards, request history, search & filtering, validation, notifications (if feasible), multi-hostel testing, deployment

**Should-have:** request history, cleaning-slot calendar, status notifications, filtering by hostel / wing / floor, basic statistics.
**Optional:** complaint and workload reports, PDF/Excel export, historical swap analysis.

## 🤝 Team

**Team Dev-Dynamo**

| Member | Roll No. | Role |
|---|---|---|
| Aditya Kumar | 2026CSM1002 | Backend, Database and Testing Lead |
| Aryan Shrivastva | 2026CSM1007 | Frontend and UI Lead |
| Akash Maurya | 2026CSM1018 | Hostel Module, Workflow and Authentication Lead |
| Shahid Alam | 2026CSM1024 | Integration and Deployment Lead |


---

<div align="center">

Built for **PGSL CS509** by Team Dev-Dynamo

</div>
