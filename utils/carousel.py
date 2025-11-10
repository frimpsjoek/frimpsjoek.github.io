"""Reusable Bootstrap carousel helpers for Quarto Python documents.

Example
-------

```python
from utils.carousel import carousel

items = [
    {"caption": "Item 1", "image": "assets/img/foo.jpg", "link": "https://example.com"},
    {"caption": "Item 2", "image": "assets/img/bar.jpg", "link": "#"},
]
html = carousel("gallery-carousel", 4000, items)
```

The returned HTML string can be rendered with `display(HTML(html))`
or embedded inside a Quarto document chunk with `results: asis`.
"""
from __future__ import annotations

from html import escape
from typing import Iterable, Mapping

CarouselItem = Mapping[str, str]


def _indicator(target_id: str, index: int) -> str:
    attrs = [
        "type='button'",
        f"data-bs-target='#{escape(target_id)}'",
        f"data-bs-slide-to='{index}'",
        f"aria-label='Slide {index + 1}'",
    ]
    if index == 0:
        attrs.append("class='active'")
        attrs.append("aria-current='true'")
    return f"<button {' '.join(attrs)}></button>"


def _item_markup(item: CarouselItem, index: int, duration: int | None) -> str:
    caption = escape(item.get("caption", ""))
    image = escape(item.get("image", ""), quote=True)
    link = item.get("link", "")
    interval_attr = f" data-bs-interval='{int(duration)}'" if duration else ""
    active_class = " active" if index == 0 else ""
    img_html = f"<img src='{image}' class='d-block mx-auto border rounded' alt='{caption}'>"
    if link:
        img_html = f"<a href='{escape(link, quote=True)}'>{img_html}</a>"
    caption_html = (
        f"<div class='carousel-caption d-none d-md-block'><p class='fw-light'>{caption}</p></div>"
        if caption
        else ""
    )
    return f"<div class='carousel-item{active_class}'{interval_attr}>{img_html}{caption_html}</div>"


def carousel(carousel_id: str, duration: int | None, items: Iterable[CarouselItem]) -> str:
    """Return Bootstrap carousel HTML for a sequence of items."""
    items = list(items)
    if not items:
        return ""

    indicators_html = "\n".join(_indicator(carousel_id, idx) for idx in range(len(items)))
    slides_html = "\n".join(
        _item_markup(item, idx, duration)
        for idx, item in enumerate(items)
    )
    controls = "\n".join(
        _nav_button(carousel_id, direction, label)
        for direction, label in (("prev", "Previous"), ("next", "Next"))
    )

    return (
        f"<div id='{escape(carousel_id)}' class='carousel carousel-dark slide' data-bs-ride='carousel'>"
        f"<div class='carousel-indicators'>{indicators_html}</div>"
        f"<div class='carousel-inner'>{slides_html}</div>"
        f"{controls}</div>"
    )


def _nav_button(target_id: str, direction: str, text: str) -> str:
    icon_class = f"carousel-control-{direction}-icon"
    return (
        f"<button class='carousel-control-{direction}' type='button' "
        f"data-bs-target='#{escape(target_id)}' data-bs-slide='{direction}'>"
        f"<span class='{icon_class}' aria-hidden='true'></span>"
        f"<span class='visually-hidden'>{escape(text)}</span>"
        "</button>"
    )

__all__ = ["carousel"]
