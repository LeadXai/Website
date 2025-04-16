/*
  # Create demo requests table

  1. New Tables
    - `demo_requests`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `business_email` (text)
      - `company_name` (text)
      - `service_needed` (text)
      - `challenges` (text)
      - `additional_info` (text, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `demo_requests` table
    - Add policy for inserting demo requests
*/

CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  business_email text NOT NULL,
  company_name text NOT NULL,
  service_needed text NOT NULL,
  challenges text NOT NULL,
  additional_info text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert demo requests"
  ON demo_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view demo requests"
  ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);