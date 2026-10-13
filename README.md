<div align="center">

# Maham Tanveer
### A story of language, leadership, and new chapters.

An editorial portfolio for an educator, researcher, and MSc Project Management candidate — tracing a journey from Lahore to the North East of England.

[![Next.js](https://img.shields.io/badge/Next.js-16-0F172A?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-0F172A?style=for-the-badge&logo=react&logoColor=F5C542)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-0F172A?style=for-the-badge&logo=typescript&logoColor=F5C542)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=F5C542)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-F5C542?style=for-the-badge&logo=greensock&logoColor=0F172A)](https://gsap.com/)

[Visit the website](https://maham-tanveer-portfolio.vercel.app) · [LinkedIn](https://www.linkedin.com/in/mahamtanveer24) · [Get in touch](mailto:mahamt024@gmail.com)

**Cream & navy · Gold details · Expressive typography · Considered motion**

</div>

---

## The experience

This single-page digital biography brings together academic milestones, professional experience, student leadership, and the photographs between them. Cormorant Garamond headings and Manrope body text give the story a warm, editorial character.

- **A personal introduction.** A full-screen portrait, animated typography, and an interactive graduation portrait reveal, with a button alternative for touch devices.
- **An academic journey.** Education records and a dedicated University of Sunderland master's chapter.
- **UCP Global Leader spotlight.** The supplied university feature, a readable reflection, and details of the International and Global Leaders scholarships.
- **A professional timeline.** Roles flow from the earliest experience to the current chapter, with dated milestones, organization imagery, complete responsibilities, and a scroll-drawn gold line.
- **Leadership with purpose.** A separate Paws and Claws Animal Welfare Society chapter, plus conference leadership and community contributions.
- **An archive to explore.** A full-width certificate timeline with smooth continuous animation, a pause control, enlarged previews, and bright gold flourishes. Smaller cards and a readable pace adapt the animation for phones. Movement pauses for interaction; reduced-motion users see a static grid. The LUMS Digital Journalism feature remains separate.
- **A visual journal.** Pinterest-style masonry, category filters, spacious and compact layouts, original image proportions, and animated rearrangements.
- **A clear way to connect.** Direct contact links and a form that uses Web3Forms when configured, with an email-draft fallback otherwise.

## Motion & interaction

GSAP powers SplitText heading entrances, portrait parallax, rotating and drawn SVG ornaments, a moving story ribbon, timeline progress, and Flip gallery transitions. Native scrolling and anchor navigation keep the journey predictable.

Five navigation groups — Story, Experience, Leadership, Certificates, and Gallery — keep every part of the biography in a clear sequence without a separate chapter menu. Contact is available from the main action button.

The interface includes reduced-motion handling, keyboard focus styles, a skip link, labelled controls, and Radix dialogs for image previews. Photographs reserve their display proportions to reduce layout movement.

## Built with

- **Next.js 16.2 / React 19.2** — App Router with server-rendered story sections and client components for interactive features.
- **TypeScript / Tailwind CSS 4** — typed biography data and responsive styling.
- **GSAP / @gsap/react** — scoped animation lifecycle, ScrollTrigger, SplitText, and Flip.
- **Radix UI / Lucide** — dialogs and interface icons.
- **next/image / next/font/local** — optimized images and locally bundled typography.

## Run locally

Use a Node.js version supported by the installed Next.js release (Node 20.9 or newer) and npm.

```bash
git clone https://github.com/Danyal-0276/Maham-Tanveer-Portfolio.git
cd Maham-Tanveer-Portfolio
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

```bash
npm run lint   # Check source with ESLint
npm run build  # Type-check and generate the production build
npm run start  # Serve the production build
```

If port 3000 is in use, run `npm run dev -- --port 3001` instead.

## Configure contact

Copy `.env.example` to `.env.local` in the project root and add a key to enable the Web3Forms integration:

```dotenv
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

This is a public client-side form access key. Do not put private API secrets in `NEXT_PUBLIC_` variables.

Without a key, the form displays **Open email draft** and prepares a message in the visitor's own email app. The visitor reviews and sends it there; opening a draft does not deliver a message.

## Customize the story

- Edit `src/data/biography.ts` for profile details, education, roles, certificates, and gallery entries. Main navigation groups are defined in `SiteNav.tsx` and arranged in `src/app/page.tsx`.
- Edit `src/data/gallery-media.ts` when adding photographs to keep intrinsic dimensions and categories in sync with the gallery.
- Store published site assets in `public/media/`. Navigation and footer wordmarks are rendered as text; the app icons live in `src/app/`.
- Adjust colors, responsive navigation, timeline details, and gallery layouts in `src/app/globals.css`.
- Adjust shared animation behavior in `src/components/layout/SiteMotion.tsx`; gallery transitions live in `GallerySection.tsx`.
- Update metadata and social sharing details in `src/app/layout.tsx` when changing the portfolio's identity.

```text
src/
├── app/                    # Page, root layout, metadata, fonts, global styles
├── components/
│   ├── layout/             # Navbar, footer, shared motion, SVG ornaments
│   ├── sections/           # Biography chapters, from Hero to Contact
│   └── ui/                 # Buttons, dialogs, image previews
├── data/
│   ├── biography.ts        # Typed profile and chapter content
│   └── gallery-media.ts    # Photograph dimensions and categories
└── lib/                    # GSAP registration and shared utilities
public/media/               # Published portraits, campuses, certificates, features
.env.example                # Optional contact service configuration template
```

## Source archive & repository hygiene

The website only loads curated assets from `public/media/`. Original CVs, photographs, certificates, and source material remain in the local `Data/` directory.

- `Data/unused-site-media/` preserves unused portraits, alternate certificates, campus photographs, and the original logo for future work.
- `Data/implementation-reference/` preserves the edited cursor experiment, companion hook, original content data, and a cleanup manifest.
- `Data/` is ignored by Git and excluded from lint and TypeScript checks. These archives stay on this computer and are **not included in a fresh clone**; back them up separately if you need to transfer them.
- Removed legacy components remain recoverable from Git history. Current animation code uses GSAP; Framer Motion and Lenis are no longer dependencies.
- Dependency folders, build output, local environment files, editor caches, and test output are ignored. Commit `.env.example`, `package-lock.json`, configuration files, and bundled font licenses.

## Deployment

Import the repository into [Vercel](https://vercel.com/) and use the **Next.js** framework preset with its default build settings. Add `NEXT_PUBLIC_WEB3FORMS_KEY` to the relevant deployment environments if needed, then build and deploy.

The README describes the source in this repository; the hosted site reflects its most recent deployment.

## GitHub topics

Suggested repository topics:

`portfolio` `personal-website` `biography` `nextjs` `react` `typescript` `tailwindcss` `gsap` `scrolltrigger` `masonry-gallery` `responsive-design` `education` `academic-portfolio` `project-management`

Add these through the repository's **About → Topics** settings. Listing them here does not change GitHub's repository topics automatically.

## Credits & usage

A personal portfolio project for **Maham Tanveer**. Photos, certificates, logos, and feature material belong to their respective owners. No general reuse license for the project or personal media is granted here.

Manrope and Cormorant Garamond Latin font files are bundled in `src/app/fonts/`. Their SIL Open Font License files are included alongside them.

---

<div align="center">

**Maham Tanveer** · Educator · Researcher · Emerging project leader

[Explore the story](https://maham-tanveer-portfolio.vercel.app/#story)

</div>
