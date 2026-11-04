# Research portfolio — Md Hashibul Hossain

Jekyll site for GitHub Pages. Full design rationale and launch checklist: `BLUEPRINT.md`.

## Update content (no HTML)
| To change | Edit |
|---|---|
| Bio, links, ORCID, headline numbers | `_data/profile.yml` |
| Add or edit a project | `_data/projects.yml` (`tracks:` decides which pages show it) |
| Add a paper / mark accepted | `_data/publications.yml` (set `status: published`, `doi:`) |
| Feature a repo | `_data/repos.yml` |
| Menu | `_data/nav.yml` |
| Colours / fonts | `:root` block at top of `assets/css/site.css` |
| CV | replace `assets/cv/Hashibul_Hossain_CV.pdf` (same filename) |

Images go in `assets/img/` (≤ 1400 px wide JPG keeps pages fast); PDFs in `assets/pdf/`.

## Before launch
Search the repo for `TODO` and fix each one. Red lines on the site mark the same gaps.

## Preview offline
`pip install python-liquid pyyaml && python3 tools/preview_build.py` then open `_preview/index.html`.
