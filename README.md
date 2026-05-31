# Dron Edge India — Website

## Tech Stack
- **Next.js 14** (App Router)
- **Tailwind CSS** (Styling)
- **Supabase** (Database + Auth)
- **Resend** (Email)
- **Vercel** (Hosting)

## Setup Instructions

### Step 1 — Clone & Install
```bash
npm install
```

### Step 2 — Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your values:
```bash
cp .env.local.example .env.local
```

### Step 3 — Supabase Database
1. Create a new project at supabase.com
2. Go to SQL Editor
3. Copy and run the contents of `lib/supabase-schema.sql`

### Step 4 — Create Admin User
1. Go to Supabase → Authentication → Users
2. Click "Invite User"
3. Enter your email and set a password

### Step 5 — Run Locally
```bash
npm run dev
```

### Step 6 — Deploy to Vercel
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Pages
- `/` → Redirects to Landing Page
- `/landing` → Division selector
- `/home` → Main home page
- `/about` → About Us
- `/products` → Product catalogue
- `/clients` → Clients & Partners
- `/certifications` → Certifications
- `/contact` → Contact Us
- `/admin/login` → Admin login
- `/admin/dashboard` → Admin panel
- `/admin/products` → Manage products
- `/admin/pages` → Edit page content
- `/admin/enquiries` → View enquiries
- `/admin/leads` → View datasheet leads
- `/admin/team` → Manage team

## Admin Panel
Visit `/admin/login` and sign in with your Supabase credentials.

From the admin panel you can:
- Add/edit/delete products
- Edit all page content (home, about, contact)
- View customer enquiries
- View & export datasheet leads
- Manage team members
