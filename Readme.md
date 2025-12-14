# SweetShop 🍬

SweetShop is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to browse, search, and purchase traditional Indian sweets. It features a secure authentication system, an admin dashboard for inventory management, and a responsive user interface.

## ✨ Features

*   **Browse Sweets**: View a catalog of delicious sweets with images, descriptions, and prices.
*   **Search & Filter**: dynamic search bar and category filters to find specific treats.
*   **User Authentication**: Secure Login and Registration using JWT (JSON Web Tokens).
*   **Admin Dashboard**: Protected route for admins to Add, Edit, and Delete sweets.
*   **Shopping Simulation**: "Purchase" functionality that updates stock in real-time.
*   **Responsive Design**: Modern UI built with Tailwind CSS that works on all devices.
*   **Notifications**: Interactive toast notifications for user actions (success/error feedback).

## 🛠️ Tech Stack

*   **Frontend**: React.js, Tailwind CSS, Lucide React (Icons), React Router DOM, Axios, React Hot Toast.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose ODM).
*   **Authentication**: JSON Web Tokens (JWT), Bcryptjs.

## 🚀 Installation & Setup

### Prerequisites
*   Node.js installed
*   MongoDB connection string

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SweetShop
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```
Start the development server:
```bash
npm run dev
```

### 4. Seed Database (Optional)
To populate the database with initial data:
```bash
cd backend
npm run seed
```

## 🤖 My AI Usage

### AI Tools Used
*   **Cascade**: An advanced agentic AI coding assistant integrated into the Windsurf IDE.

### How I Used Them
*   **Refactoring & Integration**: I used Cascade to refactor the initial frontend mock data implementation to consume a real RESTful API connected to MongoDB. This involved updating the `SweetContext` to handle async API calls.
*   **Debugging**: I utilized Cascade to troubleshoot and resolve complex issues such as CORS policies between the frontend and backend, and to fix authentication state synchronization issues.
*   **Feature Implementation**:
    *   Asked Cascade to generate the `AdminPage` with full CRUD capabilities.
    *   Requested the implementation of "Eye" icons for password visibility in the Login/Register forms.
    *   Instructed Cascade to integrate `react-hot-toast` for better user feedback, replacing native browser alerts.
*   **Boilerplate Generation**: Used AI to quickly scaffold the backend structure, including models, routes, and controllers, as well as the initial React component structure.

### Reflection
Using AI significantly accelerated the development process. It handled the heavy lifting of writing boilerplate code and connecting the full stack, allowing me to focus on the user experience and business logic. The ability to ask the AI to "fix CORS" or "add authentication" and have it implement changes across multiple files simultaneously was a major productivity booster. It turned what would have been hours of debugging configuration issues into simple, conversational tasks.
