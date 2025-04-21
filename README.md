# repo-267-notification-system-design
here giving my doc , nextjs,nodejs,mongodb


```markdown
# Notification System Project

This project includes both a frontend (built with Next.js) and a backend (Node.js/Express or similar) to build a complete notification system.

---

## 🚀 Frontend

###  Location:
`/client`

###  Setup & Run:

```bash
cd client
npm install
npm run dev
```

This will start the Next.js development server at `http://localhost:3000`.

---

## 🔧 Backend

###  Location:
`/server`

###  Setup & Run:

```bash
cd server
npm install
npm run dev
```

This will start the backend development server at `http://localhost:5000` (or your configured port).

---

##  Build (Frontend)

To create a static build of the frontend:

1. In `next.config.mjs`, ensure you have:

   ```js
   export default {
     output: 'export',
     reactStrictMode: true,
   };
   ```

2. Then run:

   ```bash
   npm run build
   ```

The static site will be available in the `out/` directory for deployment (e.g., to Netlify).

---

## ✅ Notes

- Frontend uses **Next.js 15 + React 19**
- Backend uses **Node.js + Express**

---

