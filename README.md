# TaskFlow Frontend

Frontend application for TaskFlow, a task management platform developed with React and Vite.

## Overview

TaskFlow Frontend provides a modern and responsive interface for interacting with the TaskFlow API. Users can authenticate, manage their tasks, and track their productivity through an intuitive dashboard.

## Technologies

* React
* Vite
* JavaScript
* Axios
* React Router DOM

## Project Structure

```text
src
├── assets
├── components
├── pages
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── services
│   └── api.js
├── styles
├── App.jsx
└── main.jsx
```

## Features

### Current Features

* React project setup
* Project structure organization
* Login page
* API integration configuration with Axios

### Planned Features

* User authentication
* User registration
* JWT token storage
* Protected routes
* Dashboard
* Task listing
* Task creation
* Task editing
* Task deletion
* Responsive design

## Backend Repository

TaskFlow API:

https://github.com/AugustoSouza126/Taskflow

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
cd taskflow-frontend
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

The frontend communicates with the TaskFlow backend through Axios.

Default backend URL:

```text
http://localhost:8080
```

## Author

Augusto Souza

Computer Science Student
