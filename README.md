# 🔥 ThoughtBox

**ThoughtBox** is an **offline-first notes application** built with **React + Supabase** that works seamlessly even without an internet connection.  
Notes are cached locally, synced intelligently, and resolved automatically when conflicts occur.

> ✨ Built to demonstrate **custom offline architecture**, **real-time sync**, and modern backend engineering

---

## 🚀 Live Features

- 📴 **Offline-First Experience**  
- 🔄 Automatic Sync on Reconnect  
- ⚡ Real-Time Updates (via Supabase Realtime)  
- 🔐 Secure Authentication  
- 🧠 Smart Conflict Resolution  
- 🤖 **RAG-Powered Chatbot (ThoughtBot)**

---

## 🧠 Why ThoughtBox?

Most apps break when the internet drops.  
**ThoughtBox doesn’t.**

Instead of relying on built-in backend persistence, ThoughtBox implements a **custom offline-first architecture**:

- Local caching using IndexedDB  
- Write queue for offline mutations  
- Version-based conflict resolution  
- Intelligent sync engine with Supabase backend  

This makes ThoughtBox:

- Resilient  
- Predictable  
- Scalable  
- Production-ready

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React |
| Backend | Supabase |
| Database | PostgreSQL |
| Auth | Supabase Auth |
| Offline Cache | IndexedDB |
| Realtime | Supabase Realtime |
| AI Chatbot | RAG Architecture |
| Hosting | Vercel / Netlify |

---

## 🏗 Architecture Overview

ThoughtBox follows a layered architecture:

- **UI Layer** – React + Tailwind CSS  
- **Application Layer** – Use cases & orchestration  
- **Domain Layer** – Business logic & sync engine  
- **Infrastructure Layer** – Supabase client + IndexedDB  

This separation ensures scalability and clean system boundaries.

---

## 🗂️ Project Structure

