# Task Management System (Frontend)

A responsive, real‐time task management frontend built with Next.js and Chakra UI. Features secure authentication, protected routes, dynamic dashboards, task lists, and in‐app notifications.

---

## 🌐 Live

Frontend: [Deployed on vercel](https://task-management-frontend-pi-taupe.vercel.app/login)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## 📥 Setup

1. **Clone & Install**  
   ```bash
   git clone https://github.com/your-username/task-management-frontend.git
   cd task-management-frontend
   npm install
   npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.





## 🚀 Features

- **Login & Register**  
  `/login` and `/register` pages  
  JWT stored in HTTP-only cookies  
- **Protected Routes**  
  `/dashboard`, `/tasks`, `/tasks/[id]`, `/notifications`  
  Users are redirected to `/login` if not authenticated  
- **Dashboard** (`/dashboard`)  
  Overview cards (Assigned, Created, Overdue) with status badges and due dates  
- **Task List** (`/tasks`)  
  Create, edit, delete tasks; table view with status, due date, actions  
- **Task Detail/Edit** (`/tasks/[id]`)  
  Full form for updating task fields  
- **Notifications** (`/notifications`)  
  Real-time bell + list view with message and timestamp  
- **Real-Time Updates**  
  Socket.IO for live in-app notifications  
- **Error Handling**  
  Axios interceptor + Chakra toasts for 401/403, ErrorBoundary for render errors  

---

## 🛠️ Tech Stack

- **Framework:** Next.js  
- **Styling:** Chakra UI  
- **State & Auth:** React Context & JWT  
- **Realtime:** Socket.IO  
- **API Client:** Axios with HTTP-only cookies 

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
