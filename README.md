# 🚀 Mini LinkedIn Community Platform

A modern, full-stack social networking platform built with React, Node.js, Express, and PostgreSQL. Features user authentication, post creation, user profiles, and a responsive design.
<img width="1919" height="945" alt="image" src="https://github.com/user-attachments/assets/7b519b68-4c19-43a0-8ee2-dcaf3ccc40f5" />
<img width="1919" height="949" alt="image" src="https://github.com/user-attachments/assets/d4926f0b-fd18-4951-9907-a03f5f9b8bb0" />




## ✨ Features

### 🔐 Authentication & User Management
- **Secure Registration/Login** with JWT tokens
- **Password hashing** with bcrypt
- **Profile management** with bio and avatar
- **Protected routes** and middleware

### 📝 Social Features
- **Create and share posts** (text-based)
- **Interactive timeline** with real-time updates
- **Like/unlike posts** with optimistic UI
- **User profiles** with post history
- **Responsive design** for all devices

### 🛡️ Security & Performance
- **Rate limiting** for API endpoints
- **Input validation** and sanitization
- **CORS protection**
- **Security headers** with Helmet
- **Database connection pooling**

## 🛠 Tech Stack

### Frontend
- **React 18** with Hooks
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive design**

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** authentication
- **bcrypt** for password hashing
- **Rate limiting** and security middleware

### DevOps & Deployment
- **Docker** containerization
- **Docker Compose** for development
- **GitHub Actions** CI/CD
- **Multiple deployment options** (Render, Vercel, Railway, Fly.io)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/linkedin-community-platform.git
cd linkedin-community-platform
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL=postgresql://username:password@localhost:5432/linkedin_community
# JWT_SECRET=your-super-secret-jwt-key-here

# Create database
createdb linkedin_community

# Run migrations
npm run migrate

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🐳 Docker Setup

### Development with Docker Compose
```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment
```bash
# Build and start production containers
docker-compose up -d

# Scale backend instances
docker-compose up -d --scale backend=3
```

## 📊 Database Schema

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT DEFAULT '',
    avatar VARCHAR(10) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Likes table
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);
```

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login user
GET  /api/auth/me          # Get current user
```

### Posts
```
GET    /api/posts          # Get all posts (paginated)
POST   /api/posts          # Create new post
DELETE /api/posts/:id      # Delete post
POST   /api/posts/:id/like # Like/unlike post
```

### Users
```
GET /api/users/:id         # Get user profile
GET /api/users/:id/posts   # Get user's posts
PUT /api/users/profile     # Update user profile
GET /api/search/users      # Search users
```

### Health Check
```
GET /api/health            # Server health status
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/linkedin_community

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## 🚀 Deployment

### Option 1: Render (Recommended)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy automatically

### Option 2: Vercel + PlanetScale
```bash
# Deploy frontend to Vercel
npm install -g vercel
vercel --prod

# Use PlanetScale for database
# Set DATABASE_URL in Vercel environment
```

### Option 3: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

### Option 4: Self-hosted with Docker
```bash
# Build and deploy
docker-compose up -d

# Set up reverse proxy with nginx
# Configure SSL certificates
```

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run integration tests
npm run test:integration

# Generate test coverage
npm run test:coverage
```

## 👥 Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| sarah@example.com | demo123 | Developer |
| michael@example.com | demo123 | Designer |
| emily@example.com | demo123 | Product Manager |


## 🗺️ Project Structure

```
linkedin-community-platform/
├── backend/
│   ├── middleware/           # Custom middleware
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── tests/               # Test files
│   ├── logs/                # Application logs
│   ├── server.js            # Main server file
│   ├── package.json         # Dependencies
│   └── .env.example         # Environment template
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/
