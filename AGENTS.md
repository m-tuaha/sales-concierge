# GMS Sales Concierge – Agent Guide

## 1. Project Overview

This repository contains the **GMS Sales Concierge** web application.

It is a **minimalistic internal chatbot website** for GMS (Global Message Services) sales teams.  
The main purpose is to provide **quick links** (SharePoint, Stream, etc.) to sales assets such as:

- Product manuals
- Pricing decks
- Case studies
- Training / webinar recordings

**Phase-1 constraint:**  
The bot is a **“link directory bot”** – it must NOT open or summarize documents.  
It should only return the correct official URLs.

The backbone of the intelligence is an **OpenAI Agent Builder workflow**, exposed via **ChatKit** in this app.

---

## 2. Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript + React
- **Hosting:** Vercel
- **Frontend UI:**
  - Custom layout in `app/App.tsx`
  - ChatKit panel in `components/ChatKitPanel.tsx`
  - Configuration in `lib/config.ts` (prompts, theme, workflow ID, etc.)
- **Backend:**
  - API route for ChatKit sessions in `app/api/create-session/route.ts`
  - Uses `OPENAI_API_KEY` and `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID`
- **OpenAI / ChatKit:**
  - ChatKit web client for frontend chat interface
  - Agent Builder workflow (id: `wf_...`) for brain/logic
  - The domain(s) for this app are added to ChatKit **Domain Allowlist**
- **Deployment:**
  - GitHub → Vercel auto-deploy on `main` pushes
  - Environment variables configured in Vercel

---

## 3. Current Behavior & UX

### 3.1 Layout

The home page (root `/`) renders:

- **Top bar** with:
  - Title: “GMS Sales Concierge”
  - A “Beta” pill
- **Two-column main layout**:
  - **Left column**:
    - Heading: “GMS Sales Concierge”
    - Description explaining Phase-1 link directory behavior
    - “Try asking for” with sample prompt chips
    - Note clarifying that the assistant only returns official links
  - **Right column**:
    - A rounded white card that embeds the ChatKit chat panel (`<ChatKitPanel />`)

`app/page.tsx` currently just renders `<App />`.  
`app/App.tsx` is the main layout component.

### 3.2 Chat behavior

- The chat UI is rendered by `ChatKitPanel` from `components/ChatKitPanel.tsx`.
- ChatKit connects to the Agent Builder workflow via `/api/create-session`.
- `lib/config.ts` provides:
  - `WORKFLOW_ID` (from env)
  - `STARTER_PROMPTS` (Hyber manual, CPaaS pricing deck, etc.)
  - `PLACEHOLDER_INPUT`
  - `GREETING`
  - `getThemeConfig` for light GMS-themed styling

The model used in the workflow is **cost-conscious** (e.g. `gpt-4o-mini` or similar) and the user wants to **keep costs low and predictable**.

---

## 4. Non-Functional Requirements / Principles

When making changes, the agent should follow these principles:

1. **Cost efficiency**
   - Prefer smaller models like `gpt-4o-mini` where possible.
   - Avoid unnecessary long prompts or unnecessary chat history.
   - When implementing multi-turn behavior, think about token usage.

2. **Simplicity & maintainability**
   - The primary user is comfortable with code but is not a full-time engineer.
   - Prefer clear, well-commented solutions over overly clever ones.
   - When possible, use **small, focused changes** and explain them.

3. **Internal-facing by default**
   - The app is intended for internal GMS users (sales, pre-sales, customer-facing roles).
   - Security should be sensible (e.g., gating access) but doesn’t need to be fully enterprise SSO in Phase-1.

4. **Preserve Phase-1 behavior**
   - The bot must remain a **link directory**: no document reading or summarization.
   - Any new features should not break this guarantee unless explicitly requested.

5. **Consistent GMS branding**
   - Keep the existing color palette:
     - `#7fdfb8`, `#d9f6ea`, `#e8e8e8`, `#000000`, `#ffffff`, `#00c072`
   - New UI components should feel consistent with the current layout.

---

## 5. Likely Future Tasks for This Repo

The assistant working on this repo should expect the user to ask for help with:

### 5.1 Auth & Access Control

**Option A – Simple Internal Gate (short term)**

- Add a `/login` page:
  - Single password input
  - Compare against `CONCIERGE_PASS` in env
  - On success, set a cookie (e.g. `auth=ok`)
- Create `middleware.ts` to protect:
  - `/` (main app)
  - `/api/create-session`
- Allow:
  - `/login`, static assets, `/_next/...`
- Goal: **no DB**, simple shared secret to gate access.

**Option B – Real User Accounts with Supabase (later)**

- Integrate **Supabase Auth** for email/password login.
- Create:
  - `supabaseClient.ts` helper
  - `/login` and `/signup` pages using Supabase auth APIs
  - Middleware to protect routes based on Supabase session
- Possibly store:
  - User profile metadata (role, team, etc.)
  - Basic request logs per user

The agent should be able to propose and implement either Option A or B when requested.

### 5.2 UI Enhancements

- Add GMS logo in the header.
- Make quick prompt chips interactive so that clicking them:
  - either pre-fills the chat input, or
  - sends the prompt directly to ChatKit.
- Improve responsive layout on small screens.
- Add a footer with:
  - Phase info (Phase-1)
  - Internal disclaimer
- Possibly add a simple “What’s new” or “Tips” section.

### 5.3 Chat / Behavior Tweaks

- Optionally enforce stricter stateless behavior:
  - Configure ChatKit to **not send full history** if costs become an issue.
- Add “Clear chat” button.
- Add loading states / skeletons while creating sessions.

### 5.4 Observability (later phases)

- Add simple logging of:
  - User queries
  - Returned link categories
- This might use:
  - A simple logging endpoint & file/DB
  - Or an external analytics tool

---

## 6. How the Agent Should Work with This Repo

When making changes, the assistant should:

1. **Read the relevant files first**
   - `app/App.tsx`
   - `app/page.tsx`
   - `components/ChatKitPanel.tsx`
   - `lib/config.ts`
   - `app/api/create-session/route.ts`
   - Any new files related to auth or config

2. **Propose minimal, clear changes**
   - Prefer small diffs over full-file rewrites.
   - When larger refactors are needed, explain them briefly in comments.

3. **Keep deployment in mind**
   - Ensure changes work locally (`npm run dev`) and on Vercel.
   - Any new secrets/config must be added via env vars, not hard-coded.

4. **Respect existing behavior**
   - Don’t break Phase-1 link directory functionality or existing styling unless explicitly asked to.

---

## 7. Summary

This project is:

- A **Next.js + ChatKit** app,
- Hosted on **Vercel**,
- Acting as an internal **“GMS Sales Concierge”**,
- Phase-1 behavior: **link directory bot only**.

The assistant working with this repo should:

- Help implement new features (auth, UI, logging),
- Keep costs low and UX simple,
- Respect the GMS branding and Phase-1 constraints,
- Provide small, understandable code changes with clear explanations.
