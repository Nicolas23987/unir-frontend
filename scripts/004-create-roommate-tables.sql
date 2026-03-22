-- Roommate Profiles Table
CREATE TABLE IF NOT EXISTS roommate_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  photo TEXT,
  university VARCHAR(255) NOT NULL,
  major VARCHAR(255) NOT NULL,
  year_of_study INTEGER NOT NULL,
  city_of_origin VARCHAR(255) NOT NULL,
  bio TEXT,
  looking_for VARCHAR(50) CHECK (looking_for IN ('roommate', 'room', 'both')),
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  move_in_date DATE,
  interests TEXT[], -- Array of interests
  
  -- Lifestyle preferences
  sleep_schedule VARCHAR(50) CHECK (sleep_schedule IN ('early-bird', 'night-owl', 'flexible')),
  cleanliness VARCHAR(50) CHECK (cleanliness IN ('very-clean', 'clean', 'moderate', 'relaxed')),
  social_level VARCHAR(50) CHECK (social_level IN ('very-social', 'social', 'moderate', 'quiet')),
  study_habits VARCHAR(50) CHECK (study_habits IN ('library', 'home', 'flexible')),
  smoking BOOLEAN DEFAULT FALSE,
  pets BOOLEAN DEFAULT FALSE,
  cooking VARCHAR(50) CHECK (cooking IN ('often', 'sometimes', 'rarely')),
  guests VARCHAR(50) CHECK (guests IN ('often', 'sometimes', 'rarely')),
  
  -- Preferences for roommate
  preferred_gender VARCHAR(50) CHECK (preferred_gender IN ('male', 'female', 'any')),
  age_range_min INTEGER,
  age_range_max INTEGER,
  same_university BOOLEAN DEFAULT FALSE,
  same_major BOOLEAN DEFAULT FALSE,
  
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(user_id)
);

-- Roommate Forum Posts Table
CREATE TABLE IF NOT EXISTS roommate_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES roommate_profiles(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) CHECK (category IN ('looking-for-roommate', 'looking-for-room', 'advice', 'general')),
  tags TEXT[], -- Array of tags
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Forum Comments Table
CREATE TABLE IF NOT EXISTS forum_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES roommate_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES roommate_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roommate Matches Table
CREATE TABLE IF NOT EXISTS roommate_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id_1 UUID REFERENCES roommate_profiles(id) ON DELETE CASCADE,
  profile_id_2 UUID REFERENCES roommate_profiles(id) ON DELETE CASCADE,
  compatibility_score INTEGER CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
  match_reasons TEXT[], -- Array of reasons for the match
  status VARCHAR(50) CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(profile_id_1, profile_id_2)
);

-- Roommate Connection Requests Table
CREATE TABLE IF NOT EXISTS roommate_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES roommate_profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES roommate_profiles(id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR(50) CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(sender_id, receiver_id)
);

-- Indexes for better query performance
CREATE INDEX idx_roommate_profiles_user_id ON roommate_profiles(user_id);
CREATE INDEX idx_roommate_profiles_university ON roommate_profiles(university);
CREATE INDEX idx_roommate_profiles_city ON roommate_profiles(city_of_origin);
CREATE INDEX idx_roommate_profiles_budget ON roommate_profiles(budget_min, budget_max);
CREATE INDEX idx_roommate_profiles_move_in_date ON roommate_profiles(move_in_date);
CREATE INDEX idx_roommate_posts_author ON roommate_posts(author_id);
CREATE INDEX idx_roommate_posts_category ON roommate_posts(category);
CREATE INDEX idx_roommate_posts_created ON roommate_posts(created_at DESC);
CREATE INDEX idx_forum_comments_post ON forum_comments(post_id);
CREATE INDEX idx_roommate_matches_profiles ON roommate_matches(profile_id_1, profile_id_2);
CREATE INDEX idx_roommate_connections_receiver ON roommate_connections(receiver_id);
