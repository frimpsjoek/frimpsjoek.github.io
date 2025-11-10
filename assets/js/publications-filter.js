/**
 * Publications filtering and search functionality
 * Inspired by https://mickael.canouil.fr/talks
 */

class PublicationsFilter {
  constructor() {
    this.publications = [];
    this.filteredPublications = [];
    this.currentFilter = 'all';
    this.searchQuery = '';
    
    // Wait for DOM to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.loadPublications();
    this.setupEventListeners();
    this.setupKeyboardShortcuts();
  }

  loadPublications() {
    // Get all publication items
    const pubElements = document.querySelectorAll('.publication-item');
    this.publications = Array.from(pubElements).map(el => ({
      element: el,
      year: parseInt(el.dataset.year) || 0,
      title: el.dataset.title || '',
      authors: el.dataset.authors || '',
      journal: el.dataset.journal || '',
      abstract: el.dataset.abstract || '',
      doi: el.dataset.doi || '',
      searchText: (el.dataset.title + ' ' + el.dataset.authors + ' ' + el.dataset.journal + ' ' + el.dataset.abstract).toLowerCase()
    }));
    
    this.filteredPublications = [...this.publications];
    this.updateYearFilters();
  }

  updateYearFilters() {
    // Get unique years and sort in descending order
    const years = [...new Set(this.publications.map(pub => pub.year))]
      .filter(year => year > 0)
      .sort((a, b) => b - a);
    
    // Update year filter buttons
    const yearFilters = document.getElementById('year-filters');
    if (yearFilters) {
      yearFilters.innerHTML = `
        <button class="filter-btn active" data-filter="all">All (${this.publications.length})</button>
        ${years.map(year => {
          const count = this.publications.filter(pub => pub.year === year).length;
          return `<button class="filter-btn" data-filter="${year}">${year} (${count})</button>`;
        }).join('')}
      `;
    }
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('pub-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.applyFilters();
      });
    }

    // Filter buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        this.currentFilter = e.target.dataset.filter;
        this.applyFilters();
      }
    });

    // Abstract toggle buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('abstract-toggle')) {
        const abstract = e.target.nextElementSibling;
        const isVisible = abstract.style.display !== 'none';
        
        abstract.style.display = isVisible ? 'none' : 'block';
        e.target.textContent = isVisible ? 'show abstract' : 'hide abstract';
        e.target.innerHTML = isVisible ? 
          '<i class="fas fa-chevron-down"></i> show abstract' : 
          '<i class="fas fa-chevron-up"></i> hide abstract';
      }
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Focus search on 'f', '/', or 's' key
      if ((e.key === 'f' || e.key === '/' || e.key === 's') && 
          !e.ctrlKey && !e.metaKey && !e.altKey &&
          e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('pub-search');
        if (searchInput) {
          searchInput.focus();
        }
      }
    });
  }

  applyFilters() {
    this.filteredPublications = this.publications.filter(pub => {
      // Year filter
      const yearMatch = this.currentFilter === 'all' || pub.year.toString() === this.currentFilter;
      
      // Search filter
      const searchMatch = this.searchQuery === '' || pub.searchText.includes(this.searchQuery);
      
      return yearMatch && searchMatch;
    });

    this.renderPublications();
    this.updateResultsCount();
  }

  renderPublications() {
    // Sort by year (descending) then by title
    this.filteredPublications.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

    // Show/hide publications
    this.publications.forEach(pub => {
      pub.element.style.display = this.filteredPublications.includes(pub) ? 'block' : 'none';
    });
  }

  updateResultsCount() {
    const resultCount = document.getElementById('results-count');
    if (resultCount) {
      const count = this.filteredPublications.length;
      const total = this.publications.length;
      resultCount.textContent = `Showing ${count} of ${total} publications`;
    }
  }
}

// Initialize when script loads
new PublicationsFilter();