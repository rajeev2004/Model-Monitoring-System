## 🚀 Model Monitoring — Mini

A lightweight ML Observability & Model Performance Dashboard, inspired by TrueFoundry’s real-world monitoring workflows.

## This mini-project demonstrates:

### Model registration

### Version deployment

### Live metric streaming

### Time-series visualization

### API-driven architecture

### Frontend dashboards for ML ops teams

## ⭐ Features

### 📌 Model Management

Create new ML models

View model list

Switch between models

Version tracking (v1.0, v1.1, etc.)

### 📈 Live Metrics Dashboard

Real-time charts for:

errorRate

latency

throughput

Color-coded, multi-axis visualization

Time-series updates with each “Push Metric”

### ⚡ Model Versioning

Deploy new model versions with a button click

Track deployment timestamp

### 🛰 API-Driven Architecture

## Backend provides:

Model storage

Metric computation

Version history

Live metric pushing

## Frontend consumes:

/models

/models/:id/metrics

/models/:id/push

/models/:id/version

## 🏗 Tech Stack

### Frontend

React.js (Vite)

Recharts (graphs)

Axios (API client)

Vanilla CSS (light styling)

### Backend

Node.js + Express

In-memory store (simulated DB)

Randomized metrics generator

REST APIs

## 🛠 Local Setup

### 1. Clone repo

```bash
git clone https://github.com/yourname/model-monitoring-mini
cd model-monitoring-mini
```


### 2.▶ Run Backend

```bash
cd backend
npm install
nodemon index.js
```

### Backend runs at:

http://localhost:5000

### 3.▶ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

### Frontend runs at:

http://localhost:5173


## 🌍 Live Demo

🔗 Live URL: https://rajeev2004.github.io/Model-Monitoring-System/ 
