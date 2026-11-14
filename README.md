# Research portfolio — Md Hashibul Hossain

Jekyll site for GitHub Pages. Full design rationale and launch checklist: `BLUEPRINT.md`.

## How the site is organised
Four **problem pages** carry the work (`soil-water`, `plant-disease`, `forests-carbon`, `cities-wildlife`).
The five disciplines are tools and live on the **Methods** page. Every project, paper and repo links to the others.

## Update content (no HTML)
| To change | Edit |
|---|---|
| Bio, email, links, ORCID | `_data/profile.yml` |
| Add or edit a project | `_data/projects.yml` (`problem:` decides its page, `disciplines:` its methods, `finding:` its headline) |
| Problem page text (question, measured, found, next) | `_data/problems.yml` |
| Add a paper / mark accepted | `_data/publications.yml` (set `status: published`, `doi:`, and `project:` to link it) |
| Feature a repo | `_data/repos.yml` |
| Discipline skills | `_data/disciplines.yml`, `_data/shared_tools.yml` |
| Menu | `_data/nav.yml` |
| Colours / fonts | `:root` block at top of `assets/css/site.css` |
| CV | replace `assets/cv/Hashibul_Hossain_CV.pdf` (same filename) |

## Add photos (no code)
Upload a photo to `assets/photos/` named after its slot, e.g. `soil-water.jpg`, `home-1.jpg`, `agarwood.jpg`.
It appears by itself; empty slots show nothing. The full slot list with status is at `/photos.html` on the site.
Captions are optional and live in `_data/photos.yml`. Keep photos about 1600 px wide and under 500 KB.

Figures go in `assets/img/` (≤ 1400 px wide JPG keeps pages fast); PDFs in `assets/pdf/`.

## Before launch
Search the repo for `TODO` and fix each one. Red lines on the site mark the same gaps.

## Preview offline
`pip install python-liquid pyyaml && python3 tools/preview_build.py` then open `_preview/index.html`.

