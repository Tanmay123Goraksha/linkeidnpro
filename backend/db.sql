-- Create database (run this first)
-- CREATE DATABASE linkedin_community;

-- Connect to the database and run the following:

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT DEFAULT '',
    avatar VARCHAR(10) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);

-- Comments table (for future implementation)
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert sample data
INSERT INTO users (name, email, password_hash, bio, avatar) VALUES 
(
    'Sarah Johnson', 
    'sarah@example.com', 
    '$2b$10$8K5Q0UYI8VHmrK8Xq9xGJOxY9cHn7FvYHKQZMhMrJCq1y0a4ZQpM6', -- password: demo123
    'Full Stack Developer passionate about React and Node.js. Building innovative solutions for modern web applications.',
    'SJ'
),
(
    'Michael Chen', 
    'michael@example.com', 
    '$2b$10$8K5Q0UYI8VHmrK8Xq9xGJOxY9cHn7FvYHKQZMhMrJCq1y0a4ZQpM6', -- password: demo123
    'UI/UX Designer with 8+ years experience. Love creating beautiful, user-centered digital experiences.',
    'MC'
),
(
    'Emily Rodriguez', 
    'emily@example.com', 
    '$2b$10$8K5Q0UYI8VHmrK8Xq9xGJOxY9cHn7FvYHKQZMhMrJCq1y0a4ZQpM6', -- password: demo123
    'Product Manager | Tech Enthusiast | Helping startups scale their products from 0 to 1.',
    'ER'
);

-- Insert sample posts
INSERT INTO posts (user_id, content, likes_count, comments_count) VALUES 
(
    1, 
    'Just finished building a React application with TypeScript! The type safety really makes a difference in large projects. What''s your favorite development stack?',
    12,
    3
),
(
    2, 
    'Design tip: Always consider accessibility from the start of your design process. It''s not just about compliance—it''s about creating inclusive experiences for everyone.',
    8,
    2
),
(
    3, 
    'Excited to announce that our startup just reached 10K users! Grateful for the amazing team and all the lessons learned along the way.',
    25,
    7
),
(
    1,
    'Working on a new feature for our platform. The challenge is always balancing user needs with technical constraints. Any PMs out there with tips?',
    5,
    1
),
(
    2,
    'Just attended an amazing design conference. Key takeaway: empathy is the most important skill for any designer. Always design with your users in mind! 🎨',
    15,
    4
);

-- Insert some sample likes
INSERT INTO likes (user_id, post_id) VALUES 
(1, 2), (1, 3), (1, 5),
(2, 1), (2, 3), (2, 4),
(3, 1), (3, 2), (3, 4);