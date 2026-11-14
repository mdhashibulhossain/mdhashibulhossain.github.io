"""Local preview renderer for this Jekyll site (no Ruby needed).

GitHub Pages builds the real site; this script only approximates Jekyll so you can
check layout offline:  python3 tools/preview_build.py  → opens _preview/index.html
Supports: front matter, layouts, includes, site.data, site.static_files, relative_url, where.
"""
import re, sys, shutil, pathlib, yaml
from liquid import Environment, FileSystemLoader

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "_preview"
FM = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)


def split_fm(text):
    m = FM.match(text)
    return (yaml.safe_load(m.group(1)) or {}, text[m.end():]) if m else ({}, text)


def prep(src):
    src = re.sub(r"\{%\s*include\s+([\w.-]+)\s*%\}", r"{% include '\1' %}", src)
    return re.sub(r"\{%\s*seo[^%]*%\}", "", src)


def relative_url(v):
    v = str(v or "")
    if v.startswith("http") or v == "":
        return v
    return "./" if v == "/" else v.lstrip("/")


def where(seq, key, val):
    out = []
    for item in seq or []:
        x = item.get(key) if isinstance(item, dict) else None
        if x == val or (isinstance(x, list) and val in x):
            out.append(item)
    return out


class Loader(FileSystemLoader):
    def get_source(self, env, name, **kw):
        s = super().get_source(env, name, **kw)
        return s._replace(text=prep(s.text)) if hasattr(s, "_replace") else s


env = Environment(loader=Loader(str(ROOT / "_includes")))
env.add_filter("relative_url", relative_url)
env.add_filter("where", where)
import json as _json
env.add_filter("jsonify", lambda v: _json.dumps(v, ensure_ascii=False))

site = yaml.safe_load((ROOT / "_config.yml").read_text())
site["data"] = {p.stem: yaml.safe_load(p.read_text()) for p in (ROOT / "_data").glob("*.yml")}
layouts = {p.stem: split_fm(p.read_text()) for p in (ROOT / "_layouts").glob("*.html")}
# Jekyll's site.static_files (used by the photo slots): every file under assets/
site["static_files"] = [
    {"path": "/" + f.relative_to(ROOT).as_posix(), "name": f.name, "basename": f.stem, "extname": f.suffix}
    for f in sorted((ROOT / "assets").rglob("*")) if f.is_file()
]

if OUT.exists():
    shutil.rmtree(OUT)
shutil.copytree(ROOT / "assets", OUT / "assets")

for page_file in ROOT.glob("*.html"):
    fm, body = split_fm(page_file.read_text())
    if not fm and not body.strip():
        continue
    page = dict(fm, url=fm.get("permalink", "/" + page_file.name))
    html = env.from_string(prep(body)).render(site=site, page=page)
    lay = fm.get("layout")
    while lay:
        lfm, lsrc = layouts[lay]
        html = env.from_string(prep(lsrc)).render(site=site, page=page, content=html)
        lay = lfm.get("layout")
    name = "index.html" if page["url"] == "/" else page["url"].lstrip("/")
    (OUT / name).write_text(html)
    print("built", name)
