# Deployment Guide

Your new Quarto academic website is ready for deployment! Here are the steps to get it online.

## Quick Start

The site is currently running locally at: **http://localhost:4200**

To stop the preview server:
```bash
quarto preview --stop
```

## Deployment Options

### 1. GitHub Pages (Recommended)

```bash
# Navigate to your project directory
cd "Quarto website"

# Deploy to GitHub Pages
quarto publish gh-pages

# Follow the prompts to configure GitHub repository
```

### 2. Netlify

1. Push your project to a GitHub repository
2. Connect Netlify to your repository
3. Set build command: `quarto render`
4. Set publish directory: `_site`
5. Deploy automatically on every push

### 3. Vercel

1. Push your project to a GitHub repository  
2. Import project in Vercel
3. Vercel will auto-detect Quarto and configure build settings
4. Deploy automatically

### 4. Manual Deployment

```bash
# Build the site
quarto render

# Upload contents of _site/ folder to your web server
```

## Pre-Deployment Checklist

- [ ] Update contact information in `_quarto.yml`
- [ ] Replace placeholder content with your actual information
- [ ] Add your publications to `_bibliography/papers.bib`
- [ ] Update social media links in navigation
- [ ] Add your actual profile picture
- [ ] Test all links and navigation
- [ ] Review and customize the styling if needed

## Domain Configuration

If using a custom domain:

1. **GitHub Pages**: Add CNAME file with your domain
2. **Netlify**: Configure domain in site settings
3. **Vercel**: Add domain in project settings

## SSL/HTTPS

All modern hosting platforms provide free SSL certificates. Ensure your site uses HTTPS for:
- Better SEO rankings
- Secure connections
- Professional appearance

## Site Maintenance

### Adding New Blog Posts

```bash
# Create new post directory
mkdir "blog/posts/YYYY-MM-DD-post-title"

# Create index.qmd with frontmatter:
---
title: "Your Post Title"
description: "Brief description"
author: "Joseph Frimpong"
date: "2024-01-15"
categories: [category1, category2]
---
```

### Updating Publications

Add new entries to `_bibliography/papers.bib` in standard BibTeX format.

### Modifying Styling

Edit `styles/custom.scss` to customize colors, fonts, and layouts.

## Performance Optimization

Your site is already optimized with:
- ✅ Responsive images
- ✅ Minified CSS/JS
- ✅ Clean HTML structure
- ✅ Fast loading times
- ✅ Mobile-friendly design

## Analytics & SEO

Consider adding:
- Google Analytics
- Search Console verification
- OpenGraph meta tags (already included)
- XML sitemap (auto-generated)

## Support

For Quarto-specific issues:
- [Quarto Documentation](https://quarto.org/docs/)
- [Quarto Community](https://github.com/quarto-dev/quarto-cli/discussions)

For website content questions:
- Review this README.md
- Check example content in blog posts
- Refer to original site structure

## Backup Strategy

1. Keep source code in Git repository
2. Regular commits for content updates
3. Export/backup `_bibliography/papers.bib`
4. Save any custom assets/images

Your new academic website combines the best of modern web development with academic functionality. Enjoy showcasing your research and insights!