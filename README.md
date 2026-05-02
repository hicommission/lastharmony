# Redemption Frequency — pitch site

Static one-page pitch deck for **Redemption Frequency**, a musico-spiritual epic in development at hicommission.

Lives at `https://hicommission.github.io/lastharmony/` once Pages is enabled.

## Structure

```
.
├── index.html              # the whole pitch, top to bottom
├── css/styles.css          # cinematic palette: ink, bone, gold
├── js/main.js              # scroll-reveal + footer year
├── assets/                 # drop image files here (see below)
└── .nojekyll               # tells Pages to skip Jekyll
```

## Drop in the images

The site renders gracefully without these (placeholders show where they go), but it sings with them. Save the reference-sheet images at:

| Path                              | What                                                            |
|-----------------------------------|-----------------------------------------------------------------|
| `assets/amara-cole.jpg`           | Amara Cole — portrait (4:5, ideally 1200×1500 or larger)        |
| `assets/daughters-of-ife.jpg`     | The Daughters of Ife — ensemble image (16:10)                   |
| `assets/og-image.jpg`             | Optional. 1200×630 social preview (used in OpenGraph meta tag)  |

Filenames are case-sensitive on GitHub Pages. Keep them lowercase.

## Enable GitHub Pages

> ⚠️ **Private repos can't publish Pages on free GitHub accounts.** If `hicommission` is a free org/user, you have three options:
>
> 1. Make this repo **public** (free, instant)
> 2. Upgrade to **GitHub Pro / Team / Enterprise** (Pages from private repos becomes available)
> 3. Host elsewhere — **Netlify**, **Vercel**, or **Cloudflare Pages** all serve private repos free

Once visibility/plan allows it:

1. Repo → **Settings** → **Pages**
2. **Source**: *Deploy from a branch*
3. **Branch**: `main` / **Folder**: `/ (root)`
4. Save — first deploy takes ~1 minute

## Local preview

No build step. Either open `index.html` directly in a browser, or:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing

- **Copy lives in `index.html`** — sections are clearly commented (`<!-- HERO -->`, `<!-- DAUGHTERS OF IFE -->`, etc.)
- **Colors live in `css/styles.css`** — change once at the top in `:root { ... }`
- **Sections fade in on scroll** — add `data-reveal` to any new section to inherit the behaviour

## Sections (in order)

1. Hero
2. Logline
3. Synopsis
4. Amara Cole — protagonist
5. The Daughters of Ife — ensemble
6. The Chord — mechanism
7. The Convergence — three-card layout
8. The Reckoning — split panel
9. Themes — chalkboard motif (History / Resistance / Identity / Future)
10. Format & Vision
11. Contact / CTA
12. Footer

---

© hicommission. *Redemption Frequency* — a musico-spiritual epic.
