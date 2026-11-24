# Aiman Farhan · Developer Portfolio

A responsive, dark bento portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React, Lucide icons, and locally bundled Montserrat text and Geist Mono code fonts. Personal experience is described conservatively; all project visuals are CSS concept illustrations, not claimed screenshots.

## Run locally

Install Node.js 22 or newer (Node.js 24 LTS recommended) and npm, then run:

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

A portable Node.js runtime was downloaded and checksum-verified in this workspace because Node was not on the system PATH. In this existing checkout, you can use it from PowerShell without a system installation:

```powershell
$env:PATH = "$PWD\.tools\node-v24.22.3-win-x64;$env:PATH"
npm.cmd run dev
```

The ignored `.tools` directory is local tooling and should not be committed or deployed.

Direct dependencies are pinned to exact versions. Use `npm ci` for reproducible installs.

## Personalize before publishing

Personal information, skills, experience, and contact destinations live in `src/data/portfolio.ts`. Verified project metadata, repository links, source references, and case-study copy live in `src/data/projects.ts`.

- Your email, GitHub, LinkedIn, and résumé download are configured. Replace `public/resume.pdf` whenever you update your résumé.
- Set `siteUrl` to the final HTTPS domain to enable canonical metadata.
- Education and internship employer are configured from your latest answers. Diploma completed June 2026; convocation November 2027.
- Public repository links are configured for all three case studies. No unverified live-demo buttons or runtime GitHub requests are used.
- Replace conceptual project illustrations in `src/components/project-preview.tsx` with actual screenshots when available. Use `next/image`, explicit dimensions, and descriptive alt text.
- Urban Drive reflects your independently developed Flutter/Dart, PHP, and Firebase FYP. The unconfirmed smart fan project and IoT skill claims have been removed.
- The contact section automatically hides its pending-details notice once an email and résumé are configured.

Missing destinations are `null`: the UI renders clearly marked, non-interactive “Coming soon” placeholders rather than broken anchors or invented URLs. No résumé PDF, email address, screenshot, employer, or external project URL has been fabricated.

## Structure

```text
src/app/                    App Router page, layout, global design system, favicon, OG image
src/components/navbar.tsx   Active-section navigation and accessible mobile menu
src/components/sections.tsx Semantic page sections
src/components/ui.tsx       Shared heading, tags, and destination components
src/components/reveal.tsx   Reduced-motion-aware scroll reveals
src/components/project-preview.tsx  CSS project illustrations
src/data/portfolio.ts       Personal content, experience, and contact details
src/data/projects.ts        Typed project metadata and source references
src/app/projects/<project>/    Statically generated project detail routes
src/components/case-study.tsx Reusable case-study presentation
docs/repository-review.md   Repository review scope and evidence
public/                    Add résumé and real screenshots here
```

The page and sections are Server Components. Only navigation and reveal behavior use Client Components. Native `<details>` exposes project contributions without additional JavaScript. Fonts ship through the `@fontsource-variable/montserrat` and `geist` packages and do not require build-time Google Fonts downloads. There are no backend secrets or trackers. The guestbook is the only optional external service.

## Deploy to Vercel

1. Replace the missing details above and run the validation commands.
2. Push this project, including `package-lock.json`, to your Git repository.
3. Import the repository in Vercel and select the **Next.js** preset.
4. Set Node.js to a supported version matching your local runtime (24 LTS recommended). Keep the default build command `npm run build` and output directory.
5. Deploy. Set `siteUrl` in the data file to the production URL or custom domain and redeploy.

No hosting account or remote repository has been created by this implementation.

## Dependency audit

The production dependency audit reports zero vulnerabilities. The full audit currently reports a moderate `minimatch` advisory (GHSA-g3hv-75wg-m249) through the TypeScript ESLint development toolchain. `npm audit fix` did not resolve it within the current compatible dependency ranges. This toolchain is not part of the deployed application runtime; monitor upstream updates and rerun `npm audit` when updating dependencies.

## Manual acceptance checks

Check at 360px, 768px, and 1440px widths. Confirm no horizontal overflow, mobile menu open/close and Escape behavior, visible keyboard focus, active navigation, contribution disclosure, and reduced-motion behavior. Confirm all configured contact and project links plus the résumé download. Test with a keyboard and a screen reader before publishing.

## Verification performed

- ESLint, TypeScript, and the production build passed.
- Headless Edge checks passed at 360px, 390px, 768px, and 1440px: no horizontal overflow, expected sections and project cards, project disclosures, mobile navigation closing after selection, and Escape closing the menu and returning focus.
- Reduced-motion scrolling, absence of dummy anchors, successful Open Graph PNG response, and absence of browser console/runtime errors were verified.
- Desktop and mobile screenshots were visually inspected. Local screenshots and the browser verification script are in the ignored `.tools` directory.
- Contact hrefs and the downloadable résumé are configured. External account ownership and availability have not been independently verified.

## Résumé

The site content is the reference for the résumé. `public/resume.pdf` has no source file in this repository and has not been re-exported yet. The next export should change: LinkedIn/relocation header (Penang, remote OK), the UrbanDrive stack (Flutter/Dart, PHP, Firebase), SteelFit data storage (SQL Server), and add the merged internship modules, skills, and ReadyTech. Delete this note after replacing the PDF.

## Skill icons

Skill logos in `public/skills/` come from Devicon 2.17.0 (MIT), with XAMPP and Laragon from Simple Icons 15.0.0 (CC0) in brand colors. Logos are trademarks of their owners. Skills without a logo use Lucide symbols; mappings live in `src/components/skill-icons.tsx`.

## Company logos

Experience logos are stored locally in `public/companies/`. The MDN crest comes from https://mdnsb.com/images/logo-mdnsb.png. The Jabil wordmark comes from https://www.jabil.com/.resources/jabil-main/themes/jabil-one-26/src/img/2024/logos/logo-jabil.svg, with white lettering changed to navy for the white tile. Company website links and logo paths are centralized in the experience data.

## V2 projects and attribution

Featured work now contains Urban Drive / PerdaRide, ReadyTech, and SteelFit. Penang Smart Kariah and GoMasjid / GoMasjidPro appear only under the internship, as team contributions. Jabil remains an application support role.

Case studies are statically generated at `/projects/urban-drive`, `/projects/readytech`, and `/projects/steelfit`. They include overview, motivation, role, implemented features, architecture, source-supported decisions, screenshot placeholders, repository links, and review limitations. Unknown slugs return 404. Each route has its own title, description, and social metadata.

The Urban Drive case study groups PerdaRide-App, AdminUrbanDrive, and urbandrive-toyyibpay based on code-level relationships. ReadyTech is presented as a development project; its README metrics and future phases are not independently verified. SteelFit is described as a Java/SQL Server academic prototype, with incomplete booking scaffolding identified.

The SteelFit preview uses its existing repository logo, stored locally in `public/projects/steelfit-logo.webp`; it is not an application screenshot. Urban Drive now uses original screenshots extracted from the supplied final FYP report, including a role-filtered gallery and full-screen viewer. ReadyTech uses a marked placeholder until real screenshots are supplied. Verified demo URLs remain to be provided. See `docs/repository-review.md` for inspected revisions and research scope. No credentials, GitHub PAT, or runtime GitHub integration are needed.

### V2 validation

Lint, TypeScript, and production build passed with all three case-study routes generated statically. Headless Edge checks at 360px, 390px, 768px, and 1440px covered card-to-case-study navigation, back links, repository links, internship/project separation, per-page metadata, image loading, and horizontal overflow. Unknown project URLs returned 404; reduced-motion scrolling and absence of runtime errors were checked. Hero content and CTA spacing were checked on mobile and desktop. Browser checks used a temporary production server on port 3002 because an existing server occupied port 3000.

## Urban Drive report update

The supplied `Urban Drive - Laporan Projek (final).docx` was read as project evidence. The original document is not published. Relevant content was summarized into the case study: WhatsApp booking problems, objectives, three user roles, rider/driver workflows, SDLC Waterfall and Figma design work, Firebase and PHP integration, testing approach, lessons, and clearly labeled future proposals. The developer confirmed a small pilot of 15 users and 5 drivers; these are labeled developer-reported figures, without an invented duration or measured impact.

Six original captures are stored in `public/projects/urban-drive/`: rider dashboard (Figure 3.8.1), booking preview (3.8.3), driver acceptance (3.7.5), arrival and completion (3.7.6), and admin dashboard (3.9.2). Login, profile, chat, payment-contact, and account-list captures were omitted. Gallery filters and the native-dialog image viewer support keyboard operation, Escape, focus return, and body-scroll restoration. The report version is distinguished from the related repository remake, and dashboard figures are not presented as business outcomes.

The report’s proposed improvements—more dependable location/notification updates, more detailed payment history, additional payment options, and emergency assistance—remain labeled future work. The report contains some mixed map-provider wording and generic group-work phrasing; the portfolio uses the documented Mapbox development stack and the developer’s explicit confirmation of independent authorship. It does not repeat the report’s broad claims of error-free or secure operation as proven guarantees.

Recommended next additions: a 60–90 second video showing rider → driver → admin; a dated pilot summary with participant feedback; and a compact test-results table for important workflows. Do not invent those results.

Report-update validation: lint, TypeScript, and production build passed. Browser checks at 360px, 390px, 768px, and 1440px passed for the six-image gallery, role filters, fullscreen viewer, next/previous and arrow-key controls, Escape, focus return, body-scroll restoration, 15-user/5-driver pilot figures, and absence of overflow or browser errors. Existing case-study navigation, image loading, metadata, unknown-project 404, and reduced-motion behavior also passed.

## Entrance and developer card

The homepage includes a short numeric entrance sequence, a floating navigation dock, a static star-field accent, and an original violet hanging developer card. The intro runs once per browser-tab session, has Skip/Escape controls, exits automatically, and is omitted for reduced-motion preferences. The count is an entrance-animation sequence rather than a claimed download percentage; the page remains available without JavaScript. Case-study route transitions do not replay it. Open a fresh tab to see the intro again.

The card supports two-axis pointer dragging with a gravity-driven pendulum simulation, release momentum, constrained rotation, and a connected SVG lanyard. The keyboard-operable flip button and reverse contact links remain available. Hidden-side links are excluded from keyboard navigation. Touch gestures are captured only on the badge; the surrounding page scrolls normally. Reduced motion disables physics and flip transitions. No WebGL or physics dependency was added.

The card currently uses an AF monogram. To personalize it, run `node scripts/prepare-portrait.mjs path/to/photo` (keep the original outside `public/`) and set `portfolio.portrait` in `src/data/portfolio.ts` to `"/portrait"`. The monogram remains the fallback if the image fails to load. The card layout and colors are original; no portrait, logo, card artwork, or audio was copied from the reference site.

`data-scroll-behavior="smooth"` is set on the root HTML element to let Next.js manage route transitions without the missing-data-scroll-behavior warning.

Entrance/card validation: ESLint, TypeScript, and production build passed. Headless Edge checks at 360px, 390px, 768px, and 1440px verified no horizontal overflow, hero spacing, and navigation. First-session intro, repeat-session bypass, skip, card flip, hidden-side tab stops, reduced motion, and case-study return navigation passed. Browser checks found no smooth-scroll warning or runtime errors. A mobile drag check verified no overflow during dragging, spring return, and that the reverse-side content fits without clipping.

## Contact and guestbook

The contact form prepares a `mailto:` draft that the visitor sends from their own email app.

The guestbook stores comments in Supabase and is hidden until it is configured:

1. Run `supabase/guestbook.sql` once in the Supabase SQL Editor.
2. In GitHub, add the Actions **variable** `SUPABASE_PUBLISHABLE_KEY`. For local use, copy `.env.example` to `.env.local` and fill in the key. Never use a secret or service_role key.
3. Approve comments in Supabase's Table Editor by setting `approved` to true; delete unwanted rows.

Visitors can only read approved comments and submit a name and message. The database limits submissions (20 per hour and 200 pending, site-wide) and rejects links; the form has a honeypot field. There are no photo uploads or visitor tracking, so a determined spammer could fill the hourly limit.

## Images and search metadata

GitHub Pages serves images without resizing, so raster images are stored as WebP at display-appropriate sizes. The sitemap is generated at `/sitemap.xml` (submit its full URL in Google Search Console), and the homepage includes ProfilePage structured data. There is no `robots.txt`: crawlers only read it at the domain root, which this project site does not control.

## GitHub Pages

This project is prepared for `https://manman040.github.io/portfolio/` in the `manman040/portfolio` repository. `.github/workflows/deploy-pages.yml` installs locked dependencies, lints, builds, checks TypeScript, uploads the static artifact, and deploys it to GitHub Pages on pushes to `main`.

In repository **Settings → Pages**, select **GitHub Actions** as the source. No deployment secrets or personal access token are required by the workflow. Repository Pages permissions must allow deployment.

Run `npm run build:pages` locally to generate the static site in `.next-pages/`. The helper sets `GITHUB_PAGES=true`, `NEXT_PUBLIC_BASE_PATH=/portfolio`, and `NEXT_PUBLIC_SITE_URL=https://manman040.github.io/portfolio`. The standard `npm run dev` and `npm run build` keep their normal local/server behavior. After a Pages build, run `npm run build` before using `npm start` for a server deployment.

The Pages build uses static export, trailing-slash routes, and unoptimized local image delivery because GitHub Pages cannot run Next.js’s image server. `publicPath()` prefixes public assets and downloads; Next.js Link prefixes internal routes. The Open Graph image is explicitly static, and `.nojekyll` preserves underscore-named asset directories. Contact email drafts run in the browser; the guestbook calls Supabase directly. The intro, developer card, gallery, project pages, résumé, and company logos are included.

If the repository name changes, update the base path and site URL in the Pages build helper and workflow together. A custom domain usually needs an empty base path and matching production site URL.

Pages verification: the exported /portfolio/ site passed mobile/desktop checks for all project routes, image loading, résumé download, overflow, and browser errors. Explicit static case-study pages and static-host document navigation avoid route-prefetch requests that require a Next.js server; normal server builds retain Next.js Link navigation. The static output folder is `.next-pages/`, matching the workflow artifact path.
