# Joseph Frimpong - Academic Website

A modern academic website built with [Quarto](https://quarto.org), featuring enhanced UI, responsive design, and integrated blog functionality.

## Features

- **Modern Design**: Clean, professional layout with enhanced typography and spacing
- **Responsive**: Mobile-friendly design that works across all devices
- **Blog Integration**: Full-featured blog with post listings, categories, and search
- **Academic Focus**: Specialized layouts for publications, CV, and research projects
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content
- **Dark Mode Support**: Automatic dark/light theme switching
- **Bibliography Management**: Integrated BibTeX support for publications

## Site Structure

- **About** (`index.qmd`) - Homepage with biography and research overview
- **Blog** (`blog/`) - Academic blog with posts and insights
- **Publications** (`publications.qmd`) - Research publications with bibliography
- **CV** (`cv.qmd`) - Professional curriculum vitae
- **Projects** (`projects.qmd`) - Research projects showcase
- **Teaching** (`teaching.qmd`) - Teaching and mentoring activities

## Development

### Prerequisites

- [Quarto](https://quarto.org/docs/get-started/) (v1.3+)
- [Python](https://python.org) (for computational content)

### Local Development

1. **Install Quarto**: Follow the [installation guide](https://quarto.org/docs/get-started/)

2. **Clone and navigate to project**:
   ```bash
   cd "Quarto website"
   ```

3. **Preview the site**:
   ```bash
   quarto preview
   ```

4. **Build the site**:
   ```bash
   quarto render
   ```

### Adding Content

#### Blog Posts
Create new posts in `blog/posts/YYYY-MM-DD-post-title/index.qmd`:

```yaml
---
title: "Your Post Title"
description: "Brief description"
author: "Joseph Frimpong"
date: "2024-01-15"
categories: [category1, category2]
---

Your content here...
```

#### Publications
Add entries to `_bibliography/papers.bib` in BibTeX format. They will automatically appear on the publications page.

#### Projects
Edit `projects.qmd` to add new research projects with descriptions and status updates.

## Styling

The site uses a custom SCSS theme based on the original al-folio colors:

- **Main styles**: `styles/custom.scss`
- **Variables**: `styles/_variables.scss`
- **Color scheme**: Maintains academic blue (#0076df) as primary color
- **Typography**: Roboto/Roboto Slab font combination

## Deployment

The site can be deployed to:

- **GitHub Pages**: Use `quarto publish gh-pages`
- **Netlify**: Connect repository and deploy automatically
- **Vercel**: Connect repository for automated deployments

### GitHub Pages Deployment

```bash
# Configure for GitHub Pages
quarto publish gh-pages

# Or manual deployment
quarto render
# Then push _site/ contents to gh-pages branch
```

## Configuration

Main configuration is in `_quarto.yml`. Key sections:

- **Website metadata**: Title, description, URLs
- **Navigation**: Navbar and sidebar configuration  
- **Styling**: Theme and CSS customization
- **Bibliography**: Citation style and references

## Content Migration

This site preserves all content from the original Jekyll al-folio site while modernizing the presentation:

- ✅ Biography and research interests
- ✅ Publications with bibliography
- ✅ Professional CV
- ✅ Research projects
- ✅ Blog functionality
- ✅ Modern responsive design
- ✅ Enhanced typography and styling

## Contributing

Feel free to use this template for your own academic website! If you make improvements, consider submitting a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Joseph Frimpong  
[frimpsjoe@wayne.edu](mailto:frimpsjoe@wayne.edu)  
[GitHub](https://github.com/frimpsjoek)