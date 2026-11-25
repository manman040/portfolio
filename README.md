# Aiman Farhan – Developer Portfolio

Portfolio site for my software development projects and experience, built with Next.js (App Router), TypeScript, Tailwind CSS, and Motion. It is exported as a static site and hosted on GitHub Pages.

Live site: https://manman040.github.io/portfolio/

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Checks:

```sh
npm run lint
npm run typecheck
npm run test:card
npm run build:pages
```

`npm run build:pages` writes the static site to `.next-pages/` with the `/portfolio` base path. `npm run build` and `npm start` run the standard server build.

## Structure

```text
src/data/portfolio.ts          Profile, skills, experience, contact details
src/data/projects.ts           Project cards and case studies
src/app/                       Pages, metadata, styles, sitemap, Open Graph image
src/app/globals.css            Base, navigation, ID card, gallery, and form styles
src/app/sections.css           Homepage sections and case-study styles
src/components/sections.tsx    Homepage sections
src/components/case-study.tsx  Case-study page
src/lib/                       Contact form, guestbook, paths, card physics
resume/resume.html             Source of public/resume.pdf
```

## Content rules

- Each project separates what is implemented from what isn't. Check the repository before adding a feature to the implemented list.
- Urban Drive content comes from the final year project report and the linked repositories. The pilot figures (15 users, 5 drivers) come from my own pilot.
- Screenshots must be real application screenshots. ReadyTech shows its development status, and SteelFit shows the project logo.
- Reviewed repository revisions are listed in `docs/repository-review.md`.

## Résumé

Edit `resume/resume.html`, print it to PDF with Edge or Chrome (A4, no headers or footers), and save it as `public/resume.pdf`.

## ID card

The hero card supports drag, flip, and reduced motion; see `docs/interactive-id-card.md`. To replace the portrait, keep the original outside `public/` and run `node scripts/prepare-portrait.mjs path/to/photo`. The initials are the fallback if the image fails to load.

## Contact form

Messages are sent through Web3Forms. Create an access key at https://web3forms.com with the receiving email address, then add it as the GitHub Actions **variable** `WEB3FORMS_ACCESS_KEY` (locally: `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local`) and redeploy. The key is visible in the browser by design. Without a key, the form opens the visitor's email app. If sending fails, the form keeps the text and offers a direct email link.

## Guestbook (optional)

The guestbook stores comments in Supabase and stays hidden until it is configured:

1. Run `supabase/guestbook.sql` once in the Supabase SQL Editor.
2. Add the GitHub Actions **variable** `SUPABASE_PUBLISHABLE_KEY`. For local use, copy `.env.example` to `.env.local` and fill in the key. Never use a secret or service_role key.
3. Approve comments in Supabase's Table Editor by setting `approved` to true.

Visitors can only read approved comments and submit a name and message. The database limits submissions and rejects links.

## Deployment

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which lints, builds, checks types, and deploys to GitHub Pages. In **Settings → Pages**, the source must be **GitHub Actions**. If the repository name changes, update the base path and site URL in both `scripts/build-pages.mjs` and the workflow.

GitHub Pages serves images without resizing, so raster images are stored as WebP at display size. The sitemap is at `/sitemap.xml`. There is no `robots.txt` because crawlers only read it at the domain root, which a project site doesn't control.

## Credits

Skill logos come from Devicon 2.17.0 (MIT), with XAMPP and Laragon from Simple Icons 15.0.0 (CC0). Company logos belong to Jabil and Myrich Dynasty Network; the Jabil lettering is recolored for a white tile. All logos are trademarks of their owners.
