
# Academic Site Starter (No Build Tools)

A multi-page academic/personal website inspired by simple personal sites and lab pages. 
It includes an **editable CV page** that reads from `data/cv.json` (just edit that file).

## 1) Preview locally

**Why?** Browsers block `fetch()` when opening files directly.

- Using Python:
  ```bash
  cd academic-site-starter
  python -m http.server 5500
  ```
  Then open: http://localhost:5500

- Or use VS Code's *Live Server*.

## 2) Customize

- Update your name and links in `partials/nav.html` and `partials/footer.html`.
- Edit page content in the `.html` files (e.g., `index.html`, `projects.html`).
- **Edit your CV** in `data/cv.json`. The page `cv.html` renders it automatically.
- Style tweaks in `assets/styles.css`.

## 3) Publish on GitHub Pages

Option A — user/organization site (recommended for personal site):
1. Create a repo named `USERNAME.github.io` (replace with your GitHub username).
2. Upload all files/folders in this project to the repo root.
3. In **Settings → Pages**, set **Source: Deploy from a branch**, select `main` and root (`/`).
4. Your site will be available at `https://USERNAME.github.io/`.

Option B — project site:
1. Create any repo (e.g., `my-site`).
2. Upload files to repo root.
3. In **Settings → Pages**, set Source to `main`, root (`/`).
4. Your site will be at `https://USERNAME.github.io/my-site/`.

> Tip: If you use a project site (Option B), keep all links relative (as in this template).

## 4) Git commands (optional)

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
```

## 5) Edit your CV (examples)

Open `data/cv.json` and change fields. Example item:

```json
{
  "title": "Postdoctoral Research Associate",
  "org": "Dept. of Earth Sciences, University of Cambridge",
  "start": "2023",
  "end": "present",
  "location": "Cambridge, UK",
  "description": "Research on coccolithophore biomineralization and carbonate chemistry."
}
```

Add more arrays to `positions`, `education`, `publications`, `awards`, and `skills`.

---

## Notes

- This template uses tiny JS helpers to load a shared nav/footer and to render the CV from JSON.
- Everything is static — perfect for GitHub Pages.
- You can later migrate to Jekyll/Hugo if you want Markdown-driven pages.
