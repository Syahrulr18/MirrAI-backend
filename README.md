# MirrAI Backend

MirrAI Backend is a RESTful API that powers all data services for the MirrAI application. It handles user authentication, practice session storage, evaluation scoring, analytics, learning modules, script templates, and AI assistant integration.

---

## Backend Architecture

MirrAI Backend follows a clean Layered Architecture pattern to maintain separation of concerns:

1. Routing Layer (Routes): Receives HTTP requests from the frontend and directs them to the corresponding handlers.
2. Middleware Layer: Handles JWT authentication, Zod input validation, global error handling, rate limiting, and CORS headers.
3. Service & Library Layer: Implements core business logic, external AI integration (OpenAI API), and data processing.
4. Database Layer (Prisma ORM & PostgreSQL): Manages interaction with the PostgreSQL database using Prisma Client for safe, type-secure data operations.

---

## Features & API Endpoints Overview

- Authentication & User (`/api/auth`, `/api/user`): Account registration, JWT-based login, user profiles, and account statistics.
- Session Management (`/api/session`): Saves practice session metrics including duration, eye contact percentage, posture flags, filler word counts, and overall score.
- Evaluation & Scorecard (`/api/scorecard`): Calculates and retrieves detailed evaluations for each practice session.
- Analytics & History (`/api/analytics`): Provides performance trend data and monthly practice consistency heatmap data.
- Learning Modules (`/api/learning`): Delivers educational public speaking content filtered by topic and language (English & Indonesian).
- Script Templates (`/api/scripts`): Provides pre-made speech script templates for scenarios like thesis defense, job interviews, and public speeches.
- AI Chatbot Assistant (`/api/chatbot`): An AI-driven speech consultant for script reviews and public speaking Q&A.
- Gamification (`/api/gamification`): Manages user streak counts and practice achievements.

---

## Tech Stack

- Language & Runtime: Node.js, TypeScript, Express.js (v5)
- Database & ORM: PostgreSQL, Prisma ORM (@prisma/client)
- Security & Auth: JSON Web Token (JWT), bcryptjs, Helmet, Express Rate Limit, CORS
- Input Validation: Zod
- AI Integration: OpenAI API
- Tooling: tsx, TypeScript Compiler (tsc), Dotenv

---

## Directory Structure

```text
MirrAI-backend/
├── prisma/
│   ├── schema.prisma      # Database schema definitions (User, Session, Article, Template, etc.)
│   └── seed.ts            # Database seed script for initial content
├── src/
│   ├── config/            # PrismaClient, PostgreSQL, and environment configuration
│   ├── lib/               # Utilities and internal helpers
│   ├── middleware/        # Authentication, Zod validation, and error handling middleware
│   ├── routes/            # API endpoint definitions (Auth, Analytics, Session, Chatbot, etc.)
│   ├── schemas/           # Zod validation schemas for request payloads
│   ├── services/          # Business logic and external service integrations (OpenAI)
│   └── index.ts           # Main Express.js server entry point
├── prisma.config.ts       # Prisma CLI configuration
├── package.json           # Backend dependency manifest & scripts
└── tsconfig.json          # TypeScript configuration
```

---

## Key Database Models (Prisma)

- User: Stores user profiles, credentials, and language preferences.
- PracticeSession: Stores detailed metrics for each session (duration, filler words, eye contact, WPM, final score).
- LearningArticle: Stores bilingual educational public speaking articles.
- ScriptTemplate: Stores ready-made speech script templates.
- UserStreak / Gamification: Tracks daily practice consistency and streaks.

---

## Local Development Setup

### Prerequisites

- Node.js (Version 18 or higher)
- PostgreSQL Database (or Supabase Connection String)

### Setup Steps

1. Navigate to the backend directory:
   ```bash
   cd MirrAI-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and set environment variables:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/mirrai_db"
   JWT_SECRET="your_jwt_secret_key"
   OPENAI_API_KEY="your_openai_api_key"
   ```

4. Push schema migrations and seed initial data:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```

6. The API server will run at `http://localhost:5000`.

---

## Key Commands

- `npm run dev`: Runs the backend server with auto-reloading (tsx watch).
- `npm run build`: Compiles TypeScript into JavaScript inside the `dist` directory.
- `npm run start`: Runs the compiled production code from `dist/index.js`.
- `npx prisma studio`: Opens the Prisma Studio GUI to explore and edit database records.
