# Portfolio Blueprint — Md Hashibul Hossain

Dual-track academic portfolio: **Environmental Microbiology & Bioimaging** (wet lab) and **GIS, Remote Sensing & Computer Vision** (dry lab), joined by an interdisciplinary "bridge". Built as a Jekyll site for GitHub Pages; every file referenced here is in this repo.

---

## Phase 1 — Platform & Architecture Strategy

### 1.1 Platform comparison

| Criterion | GitHub Pages + Jekyll | Google Sites |
|---|---|---|
| Cost | Free, custom domain free (HTTPS included) | Free, custom domain via Google Domains/registrar |
| Aesthetic control | Full: own CSS, fonts, layout | Fixed themes; limited fonts, spacing, colour |
| Data-driven content | Yes: YAML files → pages (add a paper = 8 lines) | No: every card is placed by hand |
| Live GitHub stats | Yes (client-side API script) | Only via third-party embed widgets |
| PDF viewer / downloads | Native `<object>` + download links | Drive embeds (good), but Drive-dependent |
| Credibility signal to CS/GIS reviewers | High: the site *is* a repo with history | Neutral |
| Learning curve | Moderate (edit YAML, `git push`) | Very low (drag and drop) |
| Speed / SEO | Static HTML, ~150 KB/page excl. figures; sitemap + OpenGraph plugins | Good, but heavier JS |
| Lock-in | None: plain files, portable to Netlify/Cloudflare | Google-only, no export |

**Recommendation: GitHub Pages + Jekyll.** Your Track B audience (GIS, ML, computer vision) will read a GitHub-hosted, version-controlled site as evidence of the reproducible-workflow skills your CV claims. The data-file design removes the main Jekyll drawback: you never touch HTML to add content. Choose Google Sites only if you want zero Git exposure and accept a template look.

### 1.2 Modular framework

```
_config.yml            site title, URL, plugins
_data/                 ← THE ONLY FILES YOU NORMALLY EDIT
  profile.yml          name, bio, links, ORCID, headline metrics
  projects.yml         every project; `tracks: [micro, geo, bridge]` routes it to pages
  publications.yml     papers, posters, reports; status + DOI + PDF
  repos.yml            GitHub repos to feature (live stats fetched in browser)
  training.yml         certified trainings, tagged by track
  nav.yml              menu order and track colours
_layouts/
  default.html         shell: head, header, footer, scripts
  track.html           shared template for both track pages
  (+ _data/cv.yml, strengths.yml, interests.yml in v2)
_includes/             reusable components (one card = one file)
  project-card.html  pub-card.html  repo-card.html  scale-bar.html  header.html  footer.html
index.html  research.html  microbiology.html  geospatial.html
publications.html  code.html  cv.html
assets/css/site.css    all styling; palette lives in :root tokens
assets/js/             site.js (menu, theme, filters) · github.js · orcid.js
assets/img|pdf|cv/     figures, poster PDFs, CV
```

Rules that keep it from breaking:
- Content lives in YAML; layout lives in includes. A new project never needs new HTML.
- One project can appear on several pages via its `tracks` list, so there is no duplicated text.
- Empty fields (`doi: ""`, `pdf: ""`) hide their buttons automatically.
- Lines containing `TODO` render in red so gaps are visible in preview and impossible to miss before launch.

### 1.3 Visual language

**Concept: "From 10 µm to 10 km."** Your work spans a microscope field and a satellite scene. The recurring motif is the **scale bar**, a convention both fields share: a 50 µm bar heads the microbiology page, a 500 m grid bar heads the geospatial page (your real thesis grid size).

| Token | Light | Dark | Role |
|---|---|---|---|
| `--ink` | #18211E | #E6ECE8 | text, buttons, interface cues |
| `--paper` | #F4F5F2 | #101513 | background |
| `--micro` | #1F6B4F forest green | #6CC49B | Track A: fungi, plants, wet lab |
| `--geo` | #255F80 petrol blue | #7FB3D5 | Track B: satellites, remote sensing |
| `--bridge` | #8A5D16 soil brass | #D8A957 | bridge, used sparingly |
| `--rule` | #D5DDD7 | #2A3631 | hairlines, card borders |

Colour encodes track everywhere (nav dots, chips, card tops, pipeline steps), so a reviewer always knows which pathway they are reading. Dark mode is automatic, with a manual toggle.

**Typography** (Google Fonts, free):
- Display: **Spectral** 600 — a screen serif with scholarly weight (and a fitting name for remote sensing).
- Body: **IBM Plex Sans** 400/500 — technical, very legible at small sizes.
- Data/labels: **IBM Plex Mono** — units, tags, dates, DOIs.
- Scale: h1 clamp(2–3.25 rem) · h2 1.35–1.75 rem · h3 1.2 rem · body 1 rem / 1.6 · labels 0.7–0.8 rem uppercase +0.07 em tracking. Running text capped near 65 characters.

### 1.4 Navigation

`Microbiology ● | Geospatial & CV ● | Bridge ● | Publications | Code | CV & Contact`

The two tracks sit first and as equals; the bridge sits between them in the menu and in the home-page card row. Publications and code are filterable/tagged by track rather than split, so co-authored GIS papers and fungal papers share one credible list.

---

## Phase 2 — Page-by-Page Blueprint & Content Map

**Sitemap (v2):** Home · Research · Microbiology (Track A) · Geospatial & CV (Track B) · Publications · Code · CV (+ Contact button in the header → `cv.html#contact`). The old "Bridge" page is now part of Research.

**Clickability rule:** every card, chip, metric, timeline step, diagram node and pipeline step is a link to its evidence (project anchor, publication anchor or CV section).

### Home `/` — strengths shown as evidence
**v4 — fungus → satellite chain:** the hero's right column is a clickable 5-level chain (Fungus 10 µm → Plant 10 cm → Canopy 10 m → Ecosystem 1 km → Satellite 100 km). A section of the same name below the metrics gives each level a question, linked evidence and the link to the next level (e.g. "colonise roots, infect leaves, cycle nutrients"). Edit in `_data/chain.yml`.
1. **Hero:** role + "MSc With Distinction" eyebrow → name → tagline → 5 proof chips (ICP-OES, dose–response, GEE, YOLO/spore vision, open code), each linked → buttons: Explore research, Read the CV, Contact. Linked "lenses": 10 µm → Track A, 10⁹× → scale diagram, 10 km → Track B.
2. **Metric strip** (each cell links to proof): 3.80 CGPA → CV · 27 isolates → project · 6 sensors → project · 3 manuscripts → Publications.
3. **What I bring to a lab** (`_data/strengths.yml`, 8 cards): headlines state facts ("Calibrates and runs the ICP-OES himself", "Fused 6 satellite sensors on one 500 m grid", "Builds spore- and pest-detection models in industry") instead of adjectives.
4. **Two tracks, one question:** Track A · Research · Track B cards.
5. **From petri dish to pixels:** 6-step timeline 2018 → 2026 (`cv.yml → journey`), each step linked to the CV entry.
6. **Selected work:** 3 featured projects (`featured: true`) with figures.
7. **Recent outputs + Open code:** side-by-side link lists.
8. **CTA band:** "Open to …" + Get in touch + Download CV.

### Research `/research.html`
1. Hero = central question; jump links.
2. **Interest map** (SVG): 6 clickable nodes (wet-lab left, spatial/vision right) around the core question.
3. **One organism, five scales** (SVG): 10 µm spore → 1 cm colony → 10 cm microcosm → 100 m site → 10 km landscape, with the method at each scale.
4. **Six interests** (`_data/interests.yml`): illustration · question · "What I have done" (evidence links) · "What I want to do next".
5. **Proposed PhD direction** (SVG loop): choose sites → culture assays → imaging → vision models → bench validation → map and predict → next sampling round.
6. **Field → lab → model:** 5 linked pipeline steps, thesis figure, bridge projects.

### Track A / Track B pages
Track hero with scale bar → capability columns (`#capabilities`) → auto-filtered project cards (each with `#id` anchor) → training list (Track B adds the hydrology raster figure).

### Publications `/publications.html`
Track filter; grouped Manuscripts / Conference / Posters / Reports; each card has `#id`, status pill, bold own name, DOI badge, ResearchGate, PDF; ORCID live feed when the iD is set.

### Code `/code.html` (v3, built from your 8 GitHub repos)
1. Hero with linked summary tiles: 14.7k lines of Python, 668 tests, 3 reproducible R studies, 12 practices.
2. **Flagship: Avispria** (drone RGB photogrammetry toolkit). Logo (light/dark), status pill "Pre-alpha · not yet flight-tested", 4 numbered parts, flight-plan illustration, live stats, links to install guide and ADRs.
3. **Reproducible research studies** (filterable by track): figure, question, result (bridge-coloured rule), data with DOI, methods, practice chips, live stars/forks/last push, links to Methods / Decisions log.
4. **How I write research code** (`_data/practices.yml`): 12 cards, each opening the exact file that proves it (validation script, pre-written predictions, sensitivity table, LOSO script, renv.lock, Makefile…).
5. **Course and early work**: compact cards.
Projects, strengths, home "Open code", Research interests, Track B capabilities and the CV "Research software" section all link back to these anchors.

### CV `/cv.html` — designed HTML CV (`_data/cv.yml`)
Header band: name, role, contact row, 4 linked fact tiles (CGPA, IELTS, manuscripts, trainings), Download PDF. Sticky section index (chips on mobile). Sections: Profile · Education and Experience (dated timelines, colour-coded by track) · Research projects (linked) · Publications (citation style, linked) · Skills (4 grouped panels) · Training · Leadership · Awards · Languages · Referees · Contact (copy email). Print stylesheet hides navigation.

---

## Phase 3 — Integration Code & Template Skeletons

All code is in the repo and working. Key pieces:

**Add a project** (`_data/projects.yml`):
```yaml
- id: drone-ortho
  title: "UAV RGB photogrammetry of mangrove canopy"
  period: "2027"
  status: ongoing            # ongoing | complete | planned
  tracks: [geo, bridge]      # pages it appears on
  summary: "Orthomosaic and DSM from RGB flights; canopy disease index."
  methods: [WebODM, QGIS, ExG index]
  image: /assets/img/drone-ortho.jpg
  image_alt: "Orthomosaic of …"
  repo: drone-canopy-index   # optional GitHub repo name
```

**Add / update a paper** (`_data/publications.yml`): when accepted, change `status: published`, fill `venue`, `year`, `doi`. The DOI badge appears automatically.

**GitHub live stats** (`assets/js/github.js`): for each `<article class="repo" data-repo="Mraz11/name">` it calls `https://api.github.com/repos/Mraz11/name`, caches one hour in `sessionStorage`, and writes stars/forks/pushed date. No token, so nothing secret is exposed.

**ORCID feed** (`assets/js/orcid.js`): reads `https://pub.orcid.org/v3.0/<ORCID>/works` (public, CORS-enabled) and renders title, year, venue and DOI badge.

**ResearchGate**: RG has no public API and no reliable embed widget; scraping it breaks and violates their terms. The template therefore (a) links each item to its RG page via the `researchgate:` field, (b) shows a "Follow on ResearchGate" button, and (c) uses ORCID as the automated feed. Practical setup: connect ORCID ↔ ResearchGate so new items appear in both.

**Optional GitHub "pinned repos" badge** (no JS) for README or cards:
```markdown
![Stars](https://img.shields.io/github/stars/Mraz11/dose-time-metallotolerance-fungi?style=flat-square)
```

**Preview locally without Ruby**: `pip install python-liquid pyyaml && python3 tools/preview_build.py` → open `_preview/index.html`.

---

## Phase 4 — Asset Audit & Required Materials

### 4.1 What the ZIP contained (36 files, 93 MB; `FCV.zip` and `files.zip` inside it are exact duplicates of the loose files)

| Group | Files | Used on site |
|---|---|---|
| CV + cover letter | `Academic_CV.md/.docx`, `PhD_Cover_Letter.md/.docx` | All text content; CV converted to PDF for the viewer |
| Theses / reports | `MHHossain_MSc_Thesis.pdf` (91 pp), `MHHossain_BSc_Project.pdf` (46 pp) | 4 thesis figures extracted (pipeline, study area, atmospheric and hydrology rasters); PDFs not published |
| Publication list | `Publiction_List.pdf` | Cross-checked against CV; consistent |
| Posters | `RMSTU_Conference_Poster`, `Forest_Day_Poster2023`, `Poster_Contemporary_Trends_in_Forestry` | Published as PDFs with thumbnails |
| Degree records | BSc/MSc certificates and transcripts | **Not published** (on request) |
| Employment letters | Research Assistant, Research Associate, USAID internship | Not published; content used |
| Trainings | ICP-OES, NGS, Bioinformatics, PDS (Python), BRAC EO, WEkEO (19.6 MB), i-Tree, PKSF.png (12,501 × 8,838 px) | Listed by track; certificates not published |
| Awards / service | 6 Olympiad certificates, Eco Olympiad 2025, G-Studio, GES APS | In CV PDF only |
| Language | `IELTS.pdf` | Not published (score is in CV) |

### 4.2 Missing before launch

**Critical**
1. **ORCID iD** — none in any file. Register free at orcid.org, then set `profile.yml → links.orcid`; it activates the live feed.
2. **Professional portrait** — no photo in the pack (square, ≥ 800 px).
3. **Public-ready CV PDF** — the CV still has placeholders: `[City, Country]`, `[phone]`, `[dataset size, model type, metric]`, `[number of samples/species]`, `[add data source…]`, `[biological problem]`, the CredoSense referee. Fix in the .docx, export, replace `assets/cv/Hashibul_Hossain_CV.pdf`.
4. **CredoSense numbers** — dataset sizes, classes and metrics for spore and pest detection (red TODO lines on the site). Confirm what your employer allows you to disclose.
5. **Drone / UAV material** — now covered by the Avispria repo (planning, photo QA, WebODM processing). It is not yet flight-tested, and the site says so. Add an orthomosaic screenshot and flight details after your first test flight.

**Important**
6. **GitHub fixes** — see `GITHUB_AUDIT.md`: revoke the Roboflow key exposed in PDS-12-Project, fill the empty profile README, delete or replace the placeholder `mhhossain` template site, fix Avispria's CITATION.cff and the dose-time README command.
7. **ResearchGate item URLs** for the RMSTU paper and the two reports (`researchgate:` fields).
8. **Permission to post thesis figures** — from your supervisors, since related manuscripts are in review.
9. **Karnaphuli project details**, i-Tree training date.
10. **Banner / hero imagery** — optional; the design does not need a photo banner. If you want one, a high-res micrograph (≥ 2400 px wide) works best.

**Nice to have**: Google Scholar profile; permanent email (student address may expire); favicon; custom domain.
