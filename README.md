# esenoguzhan.github.io

Website of **Esen Robotics**, a founder-led robot-learning venture by
**Oguzhan Esen**, served at **https://oguzhanesen.com** (custom domain, see `CNAME`).
The original personal website is preserved in Git history. The startup site
does not publish or link to the personal homepage or freelance engagement page.

A fast static site (no build step) hosted on GitHub Pages.

## Structure

```
index.html                    # Esen Robotics startup landing page
engagement.html               # legacy engagement page; excluded from deployment
projects/<slug>/index.html    # one page per project
projects/humanoid_gate_imitation/, projects/amazing_ball/
                              # redirect stubs for old URLs linked from the CV
404.html                      # not-found page
assets/css/main.css           # styles (design system, light/dark theme)
assets/js/main.js             # nav, theme toggle, scroll-spy, reveal animations
assets/css/startup.css         # separate startup page styles
assets/js/startup.js           # startup mobile nav and accessible workflow tabs
assets/img/esen-mark.svg       # startup favicon
assets/img/esen-social.png     # startup social preview
assets/img/esen-social.svg     # editable vector source for the social preview
assets/img/                   # logo, profile photo, social card (og-card.png), project figures
assets/pdf/Esen_CV.pdf        # downloadable CV
robots.txt, sitemap.xml       # SEO; update sitemap.xml when adding pages
CNAME                         # custom domain for GitHub Pages
.nojekyll                     # disables Jekyll so files are served as-is
```

## Local preview

From the repo root:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Asset paths are root-relative (`/assets/...`),
so preview from the repo root rather than opening files directly.

## Deployment

`/.github/workflows/deploy.yml` copies the public site files (`index.html`, `404.html`,
`projects/`, `assets/`, `robots.txt`, `sitemap.xml`, `CNAME`) into `dist/` and
publishes them to the `gh-pages` branch on every push to `main`/`master`.
When adding a new top-level file or folder, add it to that workflow too.

## Editing content

- Startup content lives in `index.html`; project details live in
  `projects/<slug>/index.html`.
- Replace `assets/pdf/Esen_CV.pdf` to refresh the downloadable CV.
- Canonical URLs, Open Graph tags and structured data use
  `https://oguzhanesen.com`; keep them in sync if the domain changes.

## Startup page and application

- Startup: **Esen Robotics**. Founder: **Oguzhan Esen**.
- Business contact: **oguz@oguzhanesen.com**, supplied by the founder. Confirm
  that the mailbox receives mail before submitting an application.
- The founder section explains why the venture uses `oguzhanesen.com`.
- Product copy describes an early-stage direction: a robot-learning workspace
  for demonstrations, reusable manipulation skills, and policy evaluation.
  This proposed positioning should be reviewed by the founder before publishing.
- Claude integration is explicitly planned, rather than represented as shipped.
  The interactive hero is an illustration, not a functioning robotics product.
- Research links point to the founder's existing work. No funding, revenue,
  customer, incorporation, or program-acceptance claims are made.
- The program's published FAQ asks for a company email matching the website
  domain. It does not say the domain must match the startup's brand name.
  See https://claude.com/programs/startups for current requirements.

## Preserve and restore the personal homepage

The personal-site baseline is commit
`678b003ea7eea3ec9eee7e30448d4db405d9cb32`, bookmarked locally as
`personal-site-before-startup-2026-10-08`. Startup work is on
`codex/robot-learning-startup`; creating this branch does not publish the site.

After the startup work has been committed and integrated into `main`, restore
the original homepage without deleting history:

```bash
git switch main
git restore --source=678b003ea7eea3ec9eee7e30448d4db405d9cb32 -- .
git commit -m "Restore personal website"
git push origin main
```

Save/commit any work you want to keep before switching branches. This preserves
Git history and leaves the startup work available for reuse. The restore includes
the original homepage, portfolio navigation, sitemap, and deployment workflow.
To undo the startup changes after they have been committed and merged, revert
the startup commits instead. Avoid resetting or force-pushing shared history.
