# Maham Tanveer — Digital Biography

<div align="center">

**A story-driven personal portfolio** for educator, researcher, and MSc Project Management candidate *Maham Tanveer*.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![License](https://img.shields.io/badge/License-Private-6B7280?style=for-the-badge)](#)

[Live Demo](https://maham-tanveer-portfolio.vercel.app) · [Contact](mailto:mahamt024@gmail.com) · [LinkedIn](https://www.linkedin.com/in/mahamtanveer24)

</div>

---

## Topics

`portfolio` `nextjs` `typescript` `tailwindcss` `gsap` `framer-motion` `lenis` `personal-website` `education` `biography` `project-management` `academic`

> On GitHub: **About → Topics** and paste the tags above for discoverability.

---

## About

This is not a typical developer résumé site. It is a **single-page digital biography**: warm, academic, and narrative-led. Visitors scroll through Maham's journey from English literature and teaching in Lahore to postgraduate study in the UK.

**Visual direction:** elegant · modern · academic · inspirational  
**Palette:** warm cream, deep navy, gold accents  
**Typography:** Cormorant Garamond (headings) + Manrope (body)

---

## Features

- Story chapters with sticky navigation (Welcome → Contact)
- Hero with graduation portrait and "Explore My Journey" CTA
- Who I Am chapter with personal narrative
- Education cards with campus imagery (UCP + University of Sunderland)
- Alternating professional experience layouts with workplace media
- Leadership chapter (Paws and Claws, conferences)
- Certificate gallery with lightbox preview
- Masonry photo gallery with captions
- Master's progress section (MSc Project Management, Jan 2026 intake)
- Skills as floating tags
- Interactive places map (Lahore · Sunderland · Newcastle)
- Testimonials
- Contact form (Web3Forms or mailto fallback)
- Smooth scrolling (Lenis), GSAP scroll reveals, custom cursor, and decorative wandering fauna
- Custom MT monogram brand mark and favicon

---

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Motion | [GSAP](https://gsap.com/) + ScrollTrigger, Framer Motion, [Lenis](https://lenis.darkroom.engineering/) |
| Components | Radix UI Dialog, Lucide icons |
| Language | TypeScript |
| Content | Typed data in `src/data/biography.ts` |
| Assets | Curated media in `public/media/` |

---

## Getting started

### Prerequisites

- Node.js **20+**
- npm (comes with Node)

### Install & run

```bash
git clone https://github.com/Danyal-0276/Maham-Tanveer-Portfolio.git
cd Maham-Tanveer-Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Environment

Optional contact form via [Web3Forms](https://web3forms.com/):

```bash
# .env.local
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

Without the key, the form opens a prefilled **mailto** draft to Maham's email.

On Vercel, add the same variable under **Project → Settings → Environment Variables** (Production and Preview). Leave Build / Output / Install commands on defaults.

---

## Project structure

```text
src/
  app/                 # App Router layout, page, styles, icons
  components/
    layout/            # Nav, footer, smooth scroll, cursor, fauna, loading
    sections/          # Story chapters (Hero → Contact)
    ui/                # Button, Dialog
  data/biography.ts    # Profile, timeline, experience, media paths
  lib/
    gsap.ts            # GSAP + ScrollTrigger helpers
    utils.ts
public/
  brand/               # MT monogram
  media/               # Hero, portraits, campus, certificates, experience
```

Raw source files may live under `Data/` locally; that folder is gitignored. The site only uses curated files in `public/`.

---

## Content highlights

- **Education:** BS English Language & Literature (UCP) · Intermediate Fine Arts · MSc Project Management (University of Sunderland)
- **Roles:** Literacy instructor, teaching, journalism research, event leadership, UK workplace experience
- **Leadership:** Co-Founder & VP, Paws and Claws Animal Welfare Society

---

## Deploy

Built for [Vercel](https://vercel.com/):

1. Import the GitHub repo
2. Framework preset: **Next.js** (leave build settings on defaults)
3. Optionally add `NEXT_PUBLIC_WEB3FORMS_KEY`
4. Deploy

```bash
npm run build
```

Live site: [maham-tanveer-portfolio.vercel.app](https://maham-tanveer-portfolio.vercel.app)

---

## License & credits

Private portfolio project for **Maham Tanveer**.

Photos, certificates, and brand assets belong to their respective owners and are used here for this personal biography site.

---

<div align="center">

Made with care for a story worth reading.

**Maham Tanveer** · Newcastle upon Tyne · [mahamt024@gmail.com](mailto:mahamt024@gmail.com)

</div>
