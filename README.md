# TaskFlow Frontend

Frontend application for TaskFlow, a task management platform developed with React and Vite.

## Overview

TaskFlow Frontend provides a modern and responsive interface for task management. Users can create accounts, authenticate with JWT, manage tasks, and monitor productivity through an intuitive dashboard.

## Live Demo

Frontend:
https://taskflow-frontend-eight-psi.vercel.app

Backend API:
[https://taskflow-api-zytv.onrender.com](https://taskflow-api-zytv.onrender.com/swagger-ui/index.html)

## Technologies

* React
* Vite
* JavaScript
* Axios
* React Router DOM
* CSS3
* JWT Authentication

## Features

### Authentication

* User registration
* User login
* JWT token authentication
* Protected dashboard access
* Persistent login session

### Task Management

* Create tasks
* View all tasks
* Edit tasks
* Delete tasks
* Task status management
* Task filtering by status

### Dashboard

* Personalized welcome message
* Total tasks counter
* Pending tasks counter
* In Progress tasks counter
* Completed tasks counter

### Responsive Design

* Desktop support
* Tablet support
* Mobile support

## Project Structure

```text
src
├── pages
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── services
│   └── api.js
├── components
├── styles
├── App.jsx
└── main.jsx
```

## Backend Repository

TaskFlow API:

https://github.com/AugustoSouza126/taskflow-api

## Getting Started

### Prerequisites

* Node.js 20+
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/AugustoSouza126/Taskflow-frontend.git
```

Enter the project folder:

```bash
cd Taskflow-frontend
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## API Configuration

The frontend communicates with the TaskFlow API using Axios.

Local development:

```javascript
http://localhost:8081
```

Production:

```javascript
https://taskflow-api-zytv.onrender.com
```

## Screenshots

### Login

Modern authentication page with JWT login.

### Dashboard

Task management dashboard with statistics, filters, and CRUD operations.

## Author

Augusto Souza

Computer Science Student – URI Santiago

GitHub:
https://github.com/AugustoSouza126

LinkedIn:
https://www.linkedin.com/in/augusto-souza-795324313/
