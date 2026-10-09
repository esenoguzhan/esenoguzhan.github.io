# esenoguzhan.github.io

Personal website / CV of **Oguzhan Esen** — Robot Learning & Control Engineer,
served at **https://oguzhanesen.com** (custom domain, see `CNAME`).

A fast static site (no build step) hosted on GitHub Pages.

## Structure

```
index.html                    # main page (hero, about, research, experience, projects, skills, contact)
engagement.html               # engagement model ("How I work")
projects/<slug>/index.html    # one page per project
projects/humanoid_gate_imitation/, projects/amazing_ball/
                              # redirect stubs for old URLs linked from the CV
404.html                      # not-found page
assets/css/main.css           # styles (design system, light/dark theme)
assets/js/main.js             # nav, theme toggle, scroll-spy, reveal animations
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

`/.github/workflows/deploy.yml` copies the site files (all root `*.html`,
`projects/`, `assets/`, `robots.txt`, `sitemap.xml`, `CNAME`) into `dist/` and
publishes them to the `gh-pages` branch on every push to `main`/`master`.
When adding a new top-level file or folder, add it to that workflow too.

## Editing content

- Homepage content lives in `index.html`; project details live in
  `projects/<slug>/index.html`.
- Replace `assets/pdf/Esen_CV.pdf` to refresh the downloadable CV.
- Canonical URLs, Open Graph tags and structured data use
  `https://oguzhanesen.com`; keep them in sync if the domain changes.
