-- =============================================
-- DRON EDGE — SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. PRODUCTS TABLE
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  category text not null,
  sub_category text,
  model_number text,
  description text,
  specs jsonb default '{}',
  images text[] default '{}',
  datasheet_url text,
  tags text[] default '{}',
  badge text,
  is_featured boolean default false,
  is_visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. ENQUIRIES TABLE
create table enquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  company text,
  division text not null,
  product text,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

-- 3. LEADS TABLE (datasheet downloads)
create table leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  product text not null,
  product_id uuid references products(id),
  created_at timestamptz default now()
);

-- 4. TEAM MEMBERS
create table team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  department text,
  image text,
  "order" int default 0,
  is_visible boolean default true
);

-- 5. SITE CONTENT (CMS)
create table site_content (
  id uuid default gen_random_uuid() primary key,
  section text not null,
  key text not null,
  value text,
  type text default 'text',
  updated_at timestamptz default now(),
  unique(section, key)
);

-- 6. CERTIFICATIONS
create table certifications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  issuer text,
  description text,
  number text,
  icon text,
  is_visible boolean default true,
  "order" int default 0
);

-- 7. CLIENTS
create table clients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text,
  logo text,
  is_visible boolean default true,
  "order" int default 0
);

-- 8. TESTIMONIALS
create table testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text,
  company text,
  text text not null,
  initials text,
  is_visible boolean default true,
  "order" int default 0
);

-- =============================================
-- DEFAULT SITE CONTENT (Editable from Admin)
-- =============================================
insert into site_content (section, key, value, type) values
-- Home Hero
('home', 'hero_title', 'India''s Leading Network Infrastructure Company', 'text'),
('home', 'hero_subtitle', 'Optical Fiber Cables, Network Switches, Telecom Equipment', 'text'),
('home', 'stat_clients', '1000+', 'text'),
('home', 'stat_products', '500+', 'text'),
('home', 'stat_years', '10+', 'text'),
('home', 'stat_turnover', '₹25Cr+', 'text'),
-- About
('about', 'company_story', 'Founded in 2015 in Noida, Uttar Pradesh, Dron Edge India Private Limited has grown into one of India''s most trusted manufacturers and exporters.', 'richtext'),
('about', 'vision', 'To be India''s most trusted and innovative manufacturer of network infrastructure.', 'text'),
('about', 'mission', 'To manufacture and deliver world-class networking products that meet the highest quality standards.', 'text'),
-- Contact
('contact', 'phone', '+91 79426 31533', 'text'),
('contact', 'email', 'info@dronedge.in', 'text'),
('contact', 'address', 'A-93, Sector 65, Noida, Gautam Buddha Nagar, UP — 201301', 'text'),
('contact', 'hours', 'Monday – Saturday, 9:00 AM – 6:30 PM IST', 'text'),
('contact', 'whatsapp', '917942631533', 'text');

-- =============================================
-- DEFAULT CERTIFICATIONS
-- =============================================
insert into certifications (name, issuer, description, number, icon, "order") values
('RDSO Approved', 'Indian Railways', 'RDSO approval for optical fiber cables for railway projects', 'Approved Vendor', '🛡️', 1),
('GST Registration', 'Government of India', 'Valid GST registration under UP jurisdiction', '09AAFCD3524N1ZE', '🏛️', 2),
('IEC Code', 'DGFT, India', 'Import Export Code for international trade', 'AAFCD3524N', '🌐', 3),
('MCA Registration', 'Ministry of Corporate Affairs', 'Registered Private Limited Company under Companies Act 2013', 'U74140BR2015PTC024256', '📋', 4);

-- =============================================
-- DEFAULT CLIENTS
-- =============================================
insert into clients (name, type, "order") values
('Indian Railways', 'Government', 1),
('BSNL', 'Telecom PSU', 2),
('MTNL', 'Telecom PSU', 3),
('Smart City Projects', 'Government', 4),
('State Govt PSUs', 'Government', 5),
('ISP Networks', 'Telecom', 6),
('EPC Contractors', 'Enterprise', 7),
('IT Integrators', 'System Integrator', 8),
('Defence Projects', 'Government', 9),
('Data Centers', 'Enterprise', 10);

-- =============================================
-- DEFAULT TESTIMONIALS
-- =============================================
insert into testimonials (name, role, company, text, initials, "order") values
('R.K. Sharma', 'Procurement Manager', 'Railways Contractor', 'Dron Edge has been our preferred supplier for optical fiber cables for over 3 years. RDSO-approved products pass all quality checks and delivery is always on time.', 'RK', 1),
('Amit Singh', 'Director', 'Regional ISP — UP', 'Excellent pricing, genuine products and their technical support team is very responsive. Highly recommended for network switches and ONT devices.', 'AS', 2),
('Priya Gupta', 'Projects Head', 'IT Integrator — Delhi NCR', 'As a system integrator, we need reliable partners. Dron Edge consistently delivers quality fiber and switching products with proper documentation.', 'PG', 3);

-- =============================================
-- DEFAULT TEAM MEMBERS
-- =============================================
insert into team_members (name, role, department, "order") values
('Director', 'Founder & CEO', 'Strategic Leadership', 1),
('Kundan Pandey', 'Manager Corporate Sales', 'B2G & Enterprise Accounts', 2),
('Technical Head', 'Head of Engineering', 'Product Quality & R&D', 3),
('Operations Head', 'Head of Operations', 'Supply Chain & Logistics', 4);

-- =============================================
-- RLS POLICIES (Security)
-- =============================================
alter table products enable row level security;
alter table enquiries enable row level security;
alter table leads enable row level security;
alter table site_content enable row level security;
alter table team_members enable row level security;
alter table certifications enable row level security;
alter table clients enable row level security;
alter table testimonials enable row level security;

-- Public can read products, content, certifications, clients, testimonials
create policy "Public read products" on products for select using (is_visible = true);
create policy "Public read content" on site_content for select using (true);
create policy "Public read certs" on certifications for select using (is_visible = true);
create policy "Public read clients" on clients for select using (is_visible = true);
create policy "Public read testimonials" on testimonials for select using (is_visible = true);
create policy "Public read team" on team_members for select using (is_visible = true);

-- Anyone can insert enquiries and leads
create policy "Anyone can enquire" on enquiries for insert with check (true);
create policy "Anyone can lead" on leads for insert with check (true);

-- Service role can do everything (admin panel uses service role key)
