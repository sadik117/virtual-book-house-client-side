📚 Virtual Book House
🌐 Live Site:
https://virtual-book-house.netlify.app

🎯 Project Purpose
Everyone keeps scattered lists of books they want to read, are currently reading, or have finished. Virtual Book House centralizes those lists into one interactive web app that:

📘 Organizes and visualizes a user’s reading journey

🗣️ Encourages discovery through reviews and upvotes

📊 Motivates readers with progress tracking and category-based charts

💸 Helps users avoid expensive hardcopy books by sharing digital records

✨ Key Features
Area	Highlights
Authentication & Authorization	Firebase Email/Password & Google Sign-in. JWT-protected APIs and private routes.
Bookshelf	Add books with cover, category & status → Search, filter, and up-vote others’ books.
Reading Tracker	Update status Want-to-Read → Reading → Read (owner only). Visual tracker on book detail page.
Reviews	One review per user per book. Edit/Delete your own reviews.
My Books	Update or delete books you added. Confirmation with SweetAlert2.
Charts	Pie chart in user profile summarizing books per category.
Responsive UI	Mobile-first layout using Tailwind CSS + Framer Motion animations.

🛠️ Tech Stack
🔹 Front-End
React 18

Tailwind CSS + Autoprefixer

React Router v6

Framer Motion

Firebase v10

React Toastify

SweetAlert2 + with-react-content

Lucide-react

Axios

AOS

🔸 Back-End
Node.js v20

Express v5

MongoDB Atlas

Mongoose v8

jsonwebtoken (JWT)

cookie-parser

dotenv

cors

🔑 Important NPM Packages
Package	Purpose
react-router-dom	Routing & protected routes
axios	HTTP client with JWT interceptors
framer-motion	Smooth animations and page transitions
react-toastify	Toast notifications for actions (add, update, delete)
sweetalert2	Elegant modal confirmations
lucide-react	Clean and modern icon components
firebase	User authentication and session handling
jsonwebtoken	Issue and verify secure tokens
express	Backend routing and middleware
mongoose	MongoDB object modeling
cors, dotenv, cookie-parser	Middleware for security and configuration

⚙️ How to Run Locally
🔧 Prerequisites
Node.js v18 or above

npm or yarn installed

MongoDB Atlas account (or local MongoDB instance)

1. Clone the Project
bash
Copy
Edit
git clone https://github.com/sadik117/virtual-book-house-client-side
cd virtual-book-house
2. Set Up the Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
The React app will start on http://localhost:5173

3. Set Up the Backend
bash
Copy
Edit
cd server
npm install
Create a .env file in the server folder with the following:

ini
Copy
Edit
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Now run the backend server:

bash
Copy
Edit
npm run dev
The backend API will run on http://localhost:3000

🔐 Firebase Setup
You must create a Firebase project at https://console.firebase.google.com, then:

Enable Email/Password and Google sign-in methods

Replace your Firebase config in the frontend (firebase.config.js) with your own project credentials

📱 Responsive Design
Fully mobile-first and responsive, with optimized views for:

Smartphones

Tablets

Desktop

