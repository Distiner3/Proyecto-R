// Immediately invoke theme setup
const themeHandler = {
    storageKey: 'theme',
    defaultTheme: 'dark',
    
    initialize() {
        // Get saved theme
        const savedTheme = localStorage.getItem(this.storageKey) || this.defaultTheme;
        this.applyTheme(savedTheme);
        
        // Set up mutation observer to handle dynamic content
        this.setupObserver();
        
        // Set up event handlers
        this.setupEventHandlers();
    },
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem(this.storageKey, theme);
        this.updateIcon(theme);
        
        // Notificar cambio de tema a otros componentes
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { 
                theme: theme, 
                isDarkMode: theme === 'dark',
                timestamp: Date.now()
            }
        }));
        
        console.log(`🎨 Theme changed to: ${theme}`);
    },
    
    updateIcon(theme) {
        const toggle = document.querySelector('.theme-toggle i');
        if (toggle) {
            toggle.className = theme === 'dark' ? 'icofont-sun' : 'icofont-moon';
        }
    },
    
    setupObserver() {
        // Watch for changes to ensure theme persistence
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-bs-theme') {
                    const currentTheme = localStorage.getItem(this.storageKey);
                    const documentTheme = document.documentElement.getAttribute('data-bs-theme');
                    if (currentTheme && documentTheme !== currentTheme) {
                        this.applyTheme(currentTheme);
                    }
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-bs-theme']
        });
    },
    
    setupEventHandlers() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                const currentTheme = localStorage.getItem(this.storageKey) || this.defaultTheme;
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.applyTheme(newTheme);
            }
        });
    },
    
    // Método adicional para obtener el tema actual
    getCurrentTheme() {
        return localStorage.getItem(this.storageKey) || this.defaultTheme;
    },
    
    // Método para verificar si está en modo oscuro
    isDarkMode() {
        return this.getCurrentTheme() === 'dark';
    }
};

// Exponer funciones útiles globalmente
window.themeHandler = themeHandler;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => themeHandler.initialize());
} else {
    themeHandler.initialize();
}