/*
  # Add email subscriptions table

  1. New Tables
    - `email_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `email_subscriptions` table
    - Add policy for public inserts
*/

CREATE TABLE IF NOT EXISTS email_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert email subscriptions"
  ON email_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);