# Waste Management App

This project is a waste management application built using Vue.js for the frontend and Node.js with Fastify and MongoDB for the backend.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 20 or higher)
- npm (Node package manager)
- MongoDB (You can use a local instance or a cloud instance like MongoDB Atlas)

## Installation

### Backend

1. Clone the repository:

    ```bash
    git clone https://github.com/Enilsson9/waste-management-app.git
    cd waste-management-app/backend
    ```

2. Install the backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI and port:

    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/waste-management
    PORT=3001
    ```

### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

## Running the Application

### Backend

1. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

    The backend server will start on the port specified in the `.env` file (default is `3001`).

### Frontend

1. Start the frontend development server:

    ```bash
    cd frontend
    npm run serve
    ```

    The frontend server will start on `http://localhost:8080`.



