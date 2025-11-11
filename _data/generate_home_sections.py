#!/usr/bin/env python3
"""Generate homepage include snippets for latest posts and news."""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "blog" / "posts"
NEWS_FILE = ROOT / "_data" / "news.yml"
LATEST_POSTS_INCLUDE = ROOT / "_data" / "home-latest-posts.md"
NEWS_INCLUDE = ROOT / "_data" / "home-news.md"


def parse_front_matter(text: str) -> dict:
    if not text.startswith("---\n"):
        return {}
    end = text.find("\n---", 4)
    if end == -1:
        return {}
    fm = text[4:end]
    # treat front matter as YAML but fall back to simple dict parsing
    try:
        import yaml  # type: ignore
    except Exception:
        data = {}
        for line in fm.splitlines():
            if ":" in line:
                key, value = line.split(":", 1)
                data[key.strip()] = value.strip().strip('"')
        return data
    else:
        return yaml.safe_load(fm) or {}


def latest_posts(max_items: int = 3) -> list[dict]:
    entries: list[tuple[datetime, dict, Path]] = []
    for post_dir in BLOG_DIR.glob("*/index.qmd"):
        meta = parse_front_matter(post_dir.read_text())
        if not meta:
            continue
        # Normalize draft flag: only treat explicit true/yes/1 as draft
        draft_val = meta.get("draft")
        is_draft = False
        if isinstance(draft_val, bool):
            is_draft = draft_val
        elif isinstance(draft_val, str):
            is_draft = draft_val.strip().lower() in {"true", "yes", "1", "on"}
        if is_draft:
            continue
        date_str = meta.get("date", "")
        try:
            dt = datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            dt = datetime.min
        entries.append((dt, meta, post_dir))
    entries.sort(reverse=True)
    return [
        {
            "title": meta.get("title", "Untitled"),
            "date": dt.strftime("%b %d, %Y") if dt != datetime.min else "",
            "path": f"blog/posts/{post_dir.parent.name}/",
        }
        for dt, meta, post_dir in entries[:max_items]
    ]


def write_latest_posts():
    items = latest_posts()
    if not items:
        content = "No posts yet. Check back soon!\n"
    else:
        lines = [
            f"- **{item['date']}** – [{item['title']}]({item['path']})"
            for item in items
        ]
        content = "\n".join(lines) + "\n"
    LATEST_POSTS_INCLUDE.write_text(content)


def write_news():
    raw = NEWS_FILE.read_text()
    try:
        entries = json.loads(raw)
    except json.JSONDecodeError:
        try:
            import yaml  # type: ignore
        except Exception:
            entries = []
        else:
            entries = yaml.safe_load(raw) or []
    news_items: list[tuple[datetime, dict]] = []
    for entry in entries:
        date_str = entry.get("date", "")
        try:
            dt = datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            dt = datetime.min
        news_items.append((dt, entry))
    news_items.sort(reverse=True)
    if not news_items:
        NEWS_INCLUDE.write_text("No news yet.\n")
        return
    lines = []
    for dt, entry in news_items:
        date_label = dt.strftime("%b %d, %Y") if dt != datetime.min else ""
        title = entry.get("title", "Update")
        summary = entry.get("summary")
        line = f"- **{date_label}** – {title}"
        if summary:
            line += f" — {summary}"
        lines.append(line)
    NEWS_INCLUDE.write_text("\n".join(lines) + "\n")


if __name__ == "__main__":
    write_latest_posts()
    write_news()
