# SmartSeason Field Monitoring System

A comprehensive Field Monitoring System designed with a React/Vite frontend and a Django REST Framework backend, utilizing a MySQL database.

## 🚀 Features
- **Modern User Interface**: Built with React, Vite, TailwindCSS, and Radix UI primitives.
- **Robust Backend API**: Powered by Django and Django REST Framework.
- **Database**: Integrated with MySQL for scalable data management.
- **Field & Agent Management**: Track fields, assign agents, and monitor status.
- **Responsive Design**: Mobile-friendly layout.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Radix UI, Recharts, React Router
- **Backend**: Python, Django, Django REST Framework
- **Database**: MySQL

## 📂 Project Structure
This is a monorepo containing both frontend and backend:
- `/src` and `/public`: Frontend React application.
- `/backend`: Django backend application (contains apps: `dashboard`, `fields`, `accounts`, `smartseason`).

## ⚙️ Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.9+
- MySQL Server

### 1. Database Setup
1. Create a MySQL database (e.g., `smartseason_db`).
2. Ensure you have the database credentials ready (Host, Port, User, Password).

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set environment variables (create a `.env` file in the `backend` folder):
   ```env
   DB_NAME=smartseason_db
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_HOST=localhost
   DB_PORT=3306
   SECRET_KEY=your-django-secret-key
   DEBUG=True
   ```
5. Apply migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Start the server:
   ```bash
   python manage.py runserver
   ```
   *The API will be available at http://127.0.0.1:8000/*

### 3. Frontend Setup
1. Open a new terminal and navigate to the project root:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:5173/ (or the port shown in terminal).*

## 💡 Architecture & Design Decisions
- **Monorepo Approach**: Keeping frontend and backend together simplifies tracking changes and deploying full features.
- **Component Library**: Radix UI was chosen for accessible, unstyled primitives, combined with TailwindCSS for rapid, customizable styling.
- **Separation of Concerns**: Django strictly functions as an API provider via Django Rest Framework, while Vite handles all UI rendering and routing.