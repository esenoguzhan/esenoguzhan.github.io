# esenoguzhan.github.io

Personal website / CV of **Oguzhan Esen** — Robotics & Control Engineer.

A fast, single-page static site (no build step) hosted on GitHub Pages.

## Structure

```
index.html              # the entire page
assets/css/main.css      # styles (design system, light/dark theme)
assets/js/main.js        # nav, theme toggle, scroll-spy, reveal animations
assets/pdf/Esen_CV.pdf   # downloadable CV
.nojekyll                # disables Jekyll so files are served as-is
```

## Local preview

From the repo root:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

`/.github/workflows/deploy.yml` publishes the static files to the `gh-pages`
branch on every push to `main`/`master`. Because `.nojekyll` and `index.html`
live at the repo root, GitHub Pages can also serve directly from the branch
root with no build.

## Editing content

All content lives in `index.html`. Update the relevant section (hero,
experience, research, projects, skills, remote, contact) and replace
`assets/pdf/Esen_CV.pdf` to refresh the downloadable CV.
