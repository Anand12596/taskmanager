# Task Manager Application

A full-stack Task Manager web application built using Django REST Framework and React.js.

## Live Demo

Frontend:
https://taskmanager-p8st.vercel.app

Backend:
https://taskmanager-cbgy.onrender.com

GitHub Repository:
https://github.com/Anand12596/taskmanager

---

# Features

## User Authentication
- User Registration
- User Login
- JWT Authentication

## Project Management
- Create Projects
- View Projects
- Delete Projects

## Task Management
- Create Tasks
- Delete Tasks
- Task Status Tracking
- Task Priority
- Due Dates

## Dashboard
- Total Tasks
- Todo Tasks
- In Progress Tasks
- Done Tasks

## Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- PostgreSQL Database

---

# Tech Stack

## Frontend
- React.js
- Bootstrap
- Axios

## Backend
- Django
- Django REST Framework
- JWT Authentication

## Database
- PostgreSQL

## Deployment
- Vercel
- Render

---

# Installation

## Backend Setup

```bash
git clone https://github.com/Anand12596/taskmanager.git

cd taskmanager

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

## Frontend Setup

```bash
cd frontend

npm install

npm start
```