# Nur Hasan — UI/UX Product Designer Portfolio

A luxury monochrome portfolio website for **Nur Hasan**, Lead UI/UX Product Designer & Computer Science graduate based in Dhaka, Bangladesh.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Supabase**, **Cloudflare Pages** compatibility, and **Vanilla CSS Design System**.

---

## ⚡ Highlights & Implemented Features

1. **Monochrome Brutalist Aesthetic**: High-contrast, pitch blacks, crisp whites, subtle border dividers, and subtle grain overlay.
2. **Hero Section**:
   - Giant fluid typography: `LET'S MAKE YOUR PROJECT BEAUTIFUL` (~260px desktop clamp)
   - Bold subheadline: `I'M UI/UX DESIGNER` (~120px desktop clamp)
   - Compact bio pitch, live status indicator, and direct action CTAs.
3. **Sticky In-Line Navbar**:
   - Positioned beneath the hero section in normal flow.
   - Pinned to the top on scroll with frosted glass backdrop blur (`sticky top-0`).
   - Inline items separated by contrast color shade dividers.
   - Night / Day mode toggle: **icon only** (Sun / Moon).
4. **Scroll Motion & Gradienting Typography**:
   - Dynamic scroll-progress word illumination and kinetic gradient tracking.
5. **Slow-Motion Animating Info Cards**:
   - Fluid floating cards (`animate-float-a`, `animate-float-b`, `animate-float-c`), hover tilt, and designer portrait showcase.
6. **Real Scraped Works from Dribbble**:
   - **AmiBachelor App**: Live student accommodation & mess management mobile app.
   - **Cellfin App Redesign Concept**: Modern banking & motion teaser video.
   - **Anonymous Investor Hub**: Private equity & angel dealroom web app.
   - **E-Commerce Web Experience**: Minimalist direct-to-consumer store.
   - **Kids Juice E-Commerce**: Nutrition & juice subscription UI.
   - **ISP Dashboard**: Enterprise network operations telemetry.
7. **White Desk Agency Integration**:
   - Studio lab showcase utilizing White Desk logo assets (dark & light theme responsive).
8. **Supabase Integration**:
   - Ready-to-go contact form in `src/lib/supabase.ts` with offline/local fallback.
9. **Mobile Testing & Network Access**:
   - Configured with `0.0.0.0` host so you can view it directly on your phone on local Wi-Fi.

---

## 📱 Testing Locally & On Mobile Phone

The development server is running locally on port **3001**:

- **On your Computer**: [http://localhost:3001](http://localhost:3001)
- **On your Phone (Connected to same Wi-Fi)**: [http://192.168.0.54:3001](http://192.168.0.54:3001)

To run it again anytime:
```bash
cd /Users/nurhasan/.gemini/antigravity-ide/scratch/nurhasan-portfolio
npm run dev
```

---

## 🗄️ Supabase Setup (Optional for Inquiries)

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Run this quick SQL snippet in the Supabase SQL editor:
```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  project_type text,
  budget text,
  message text not null,
  created_at timestamptz default now()
);
```
3. Copy `.env.example` to `.env.local` and add your project keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🚀 Deploying to Cloudflare Pages & GitHub

### 1. Push to GitHub:
```bash
cd /Users/nurhasan/.gemini/antigravity-ide/scratch/nurhasan-portfolio
git remote add origin https://github.com/<your-username>/nurhasan-portfolio.git
git branch -M main
git push -u origin main
```

### 2. Connect to Cloudflare Pages:
1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your repository.
3. Configure build settings:
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next` (or `out` if using static export)
4. Click **Save and Deploy**!
