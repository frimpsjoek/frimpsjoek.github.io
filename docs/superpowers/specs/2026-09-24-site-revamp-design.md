# Site revamp — design (approved 2026-09-24)

Reference: basicappleguy.com (fonts, menubar, hierarchy, grid blog). Approved in chat.

## Requirements

- R1 Type system, site-wide: Roboto Condensed (nav, titles, meta; nav/meta uppercase, titles title-case),
  body in a light weight (Myriad Pro via Adobe Fonts kit if provided, else Source Sans 3 Light, tracked).
  Weights: 300 body, 400 titles, 500 active nav. Code: JetBrains Mono. One definition, every page.
- R2 Menubar: full width, translucent off-white with backdrop blur; name left, uppercase links left,
  active link underlined; icons (GitHub, X, LinkedIn, email, theme toggle) right; simple mobile menu.
  Page background off-white.
- R3 Blog index: two views with a Grid | List toggle, choice remembered per visitor.
  Grid (default): 3 / 2 / 1 columns, 3:2 rounded image with soft shadow, meta line
  `M/D/YY | CATEGORIES`, condensed title, 2-line light description, underlined "Read More".
  List: the original Quarto default listing (image, date, title, reading time, description,
  categories, sort, filter).
- R4 Posts read like a paper: meta line, condensed title, light subtitle, header image capped in
  height; ~720px text column, TOC in right margin; numbered equations/figures with cross-refs;
  footnotes and citations in the margin; reference list from .bib; "Cite this post" appendix +
  Google Scholar metadata. Reading-progress bar 2px.
- R5 Other pages (home, CV, publications, news, teaching, projects) use the same menu, fonts and
  heading hierarchy; content unchanged.
- R6 Replace legacy custom.scss (~4000 lines, entrance animations, !important layering) with one
  clean theme. Keep and restyle used components: bio photo, social links, tools row, CV header,
  publications list/search, news timeline, projects grid, footer, collapsible code.
- R7 Dark mode works on every page with matching colors and no light flash on load.
- R8 No entrance/looping animations; hover = color/opacity only (+ subtle blog image zoom).

## Validation

- V1 Full `quarto render` succeeds with no warnings from site sources.
- V2 Headless audit, light + dark, 390px and 1512px: computed fonts match R1 on every page;
  zero hidden text nodes; WCAG contrast pass; no horizontal overflow.
- V3 Blog toggle switches views and persists across reload.
- V4 Demo post (draft) renders numbered eq/fig refs, margin footnote + citation, reference list,
  citation appendix, `citation_*` meta tags.
- V5 Progress bar computed height 2px; navbar has backdrop-filter and translucent background.

## Evidence (2026-09-24, Quarto 1.7.32, headless Chromium)

- V1 `quarto render`: no warnings from site sources. Draft demo rendered with `-M draft:false`.
- V2 11 pages x {light, dark} x {1512, 390}px: body Source Sans 3 (300), h1 and nav Roboto Condensed
  (nav uppercase); 0 hidden text nodes; 0 WCAG contrast failures; 0 horizontal overflow; 0 JS errors.
- V3 Grid default, 3 tiles with loaded images, 3/2/1 columns at 1512/900/390px; List shows 3 posts
  with categories; choice persists across reload.
- V4 Demo post: "Equation 1" / "Figure 1" cross-refs, (1) equation number, margin footnote, margin
  note, margin citation, end reference list (2 entries), Citation appendix with BibTeX,
  `citation_title` meta; header image capped (340px).
- V5 Progress bar 2px (posts only); navbar `backdrop-filter: saturate(1.8) blur(20px)`, background alpha 0.72.

Notes: `smooth-scroll` turned off (Quarto's zenscroll raised a require.js "mismatched define" error on
Jupyter pages); CSS `scroll-behavior: smooth` replaces it. With `citation-location: margin` Quarto
omits the end bibliography, so `_includes/after-body.html` rebuilds it from the margin entries.

## Variant: serif headings (branch famous-glowworm, 2026-09-24)

Same design, except headings and titles (h1-h3, grid/list post titles, publication, news and
project titles, callout titles, publication year watermark) use Newsreader, a modern editorial
serif with optical sizing. Navigation, meta labels, h4-h6, buttons, TOC and appendix labels keep
Roboto Condensed; body stays Source Sans 3 Light.
