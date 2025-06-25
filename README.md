📚 Virtual Book House

🌐 Live Site

https://virtual-book-house.netlify.app/

🎯 Project Purpose

Everyone keeps scattered lists of books they want to read, are reading, or already finished. Virtual Bookshelf centralises those lists, turning them into an interactive shelf that:

Organises and visualises a user’s reading journey.

Encourages discovery through reviews and up‑votes.

Motivates readers with a progress tracker and category charts.

Save money from buying hardcopy expensive books

✨ Key Features

Area

Highlights

Authentication

Authorization

Email/password & Google sign‑in with Firebase. JWT‑protected APIs and private routes.

Bookshelf

Add books with cover, category & status ➜ Search, filter by status, and up‑vote others’ books.

Reading Tracker

Update status Want‑to‑Read → Reading → Read (owner only). Visual tracker on book detail page.

Reviews

One review per user per book. Edit/Delete own reviews.

My Books

Update or delete only the books you added. Confirmation with SweetAlert2.

Charts

Pie chart on profile summarising books per category.

Responsive UI

React + Tailwind + Framer Motion animations, mobile‑first adaptive layout.


🛠️ Tech Stack

Front‑End

React 18

Tailwind CSS + Autoprefixer

Framer Motion – page & element animations

React Router v6 – client‑side routing

Firebase v10 – auth 

React Toastify – toast notifications

SweetAlert2 + with‑react‑content – modal confirmations

Lucide‑react – icon set

Axios – HTTP client

Back‑End

Node.js 20

🔑 Important NPM Packages

Package

Why we use it

react-router-dom

Routing & protected routes

axios

Simplified HTTP requests with interceptors for JWT

framer-motion

Smooth animations & page transitions

react-toastify

Non‑blocking toast notifications

sweetalert2

Elegant confirmation dialogs

lucide-react

Modern iconography

firebase

Auth & Google sign‑in

jsonwebtoken

Issue & verify access tokens on server

Express 5

MongoDB Atlas with Mongoose 8

jsonwebtoken (JWT) – auth tokens

cors, dotenv, cookie‑parser
