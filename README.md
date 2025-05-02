# Hangman HW

This is an upgraded Hangman game built with React. It tracks player win/loss stats and stores them in a MongoDB database using a Node.js/Express backend. The full app—including frontend, backend, and database—can be run using Docker Compose.

## Features
- React-based interactive Hangman game
- Tracks and stores win/loss records per player
- REST API built with Express + MongoDB
- Dockerized setup for easy development and deployment

---

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs required dependencies

### `npm start`
Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

---

## 🐳 Docker Instructions

### Prerequisites
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed

### Running the Full App

To run the frontend, backend, and MongoDB together:

```bash
docker-compose up --build
