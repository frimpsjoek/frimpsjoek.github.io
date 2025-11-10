// Dark mode toggle functionality for Quarto website
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle function
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('quarto-color-scheme', newTheme);
        
        // Update toggle icons
        updateToggleIcons(newTheme);
    };
    
    // Update toggle icons based on theme
    const updateToggleIcons = (theme) => {
        const lightIcon = document.getElementById('light-icon');
        const darkIcon = document.getElementById('dark-icon');
        if (lightIcon && darkIcon) {
            lightIcon.style.display = theme === 'dark' ? 'none' : 'inline';
            darkIcon.style.display = theme === 'dark' ? 'inline' : 'none';
        }
    };
    
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('quarto-color-scheme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    document.documentElement.setAttribute('data-bs-theme', initialTheme);
    
    // Add toggle button to navbar
    const addThemeToggle = () => {
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            const toggleButton = document.createElement('li');
            toggleButton.className = 'nav-item';
            toggleButton.innerHTML = `
                <button class="nav-link btn btn-link" id="theme-toggle" style="border: none; background: none; color: var(--global-text-color);">
                    <i class="bi bi-sun-fill" id="light-icon" style="display: ${initialTheme === 'dark' ? 'none' : 'inline'}; font-size: 1.2rem;"></i>
                    <i class="bi bi-moon-stars-fill" id="dark-icon" style="display: ${initialTheme === 'dark' ? 'inline' : 'none'}; font-size: 1.2rem;"></i>
                </button>
            `;
            navbar.appendChild(toggleButton);

            // Add event listener to the button
            const toggleBtn = document.getElementById('theme-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', toggleTheme);
            }
        }
    };
    
    // Add theme toggle after a small delay to ensure DOM is ready
    setTimeout(addThemeToggle, 100);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('quarto-color-scheme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            updateToggleIcons(newTheme);
        }
    });
});