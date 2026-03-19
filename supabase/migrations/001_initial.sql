-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Only service role can insert (server-side API)
CREATE POLICY "Service role can insert contacts" ON contacts
  FOR INSERT TO service_role WITH CHECK (true);

-- Only service role can read contacts
CREATE POLICY "Service role can read contacts" ON contacts
  FOR SELECT TO service_role USING (true);

-- Index for rate limiting queries
CREATE INDEX idx_contacts_email_created ON contacts (email, created_at DESC);

-- Visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT,
  user_agent TEXT,
  path TEXT DEFAULT '/',
  referrer TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Service role can insert
CREATE POLICY "Service role can insert visitors" ON visitors
  FOR INSERT TO service_role WITH CHECK (true);

-- Service role can read
CREATE POLICY "Service role can read visitors" ON visitors
  FOR SELECT TO service_role USING (true);

-- Anon can read count only (for client-side visitor counter)
CREATE POLICY "Anon can read visitor count" ON visitors
  FOR SELECT TO anon USING (true);

-- Index for unique visitor counting
CREATE INDEX idx_visitors_ip_created ON visitors (ip_address, created_at DESC);
CREATE INDEX idx_visitors_created ON visitors (created_at DESC);

-- Unique visitors view (optional, for easy querying)
CREATE OR REPLACE VIEW visitor_stats AS
SELECT
  COUNT(*) as total_visits,
  COUNT(DISTINCT ip_address) as unique_visitors,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as visits_today,
  COUNT(DISTINCT ip_address) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as unique_today
FROM visitors;
