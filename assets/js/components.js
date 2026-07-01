// Component Loader System
class ComponentLoader {
  constructor() {
    this.currentPage = this.detectCurrentPage();
    if (this.currentPage === 'service') {
      this.basePath = '../../';
    } else if (this.currentPage === 'about' || this.currentPage === 'contact' || this.currentPage === 'privacy' || this.currentPage === 'terms' || this.currentPage === '404' || this.currentPage === 'leads' || this.currentPage === 'services') {
      this.basePath = '../';
    } else {
      this.basePath = '';
    }
    
    // Performance: Track loaded resources
    this.loadedScripts = new Set();
  }

  // Detect current page based on URL
  detectCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('about.html')) return 'about';
    if (path.includes('contact.html')) return 'contact';
    if (path.includes('privacy-policy.html')) return 'privacy';
    if (path.includes('terms-conditions.html')) return 'terms';
    if (path.includes('404.html')) return '404';
    if (path.includes('leads.html')) return 'leads';
    if (path.endsWith('services.html') || path.endsWith('services')) return 'services';
    if (path.includes('services/')) return 'service';
    return 'home';
  }

  // Load and render header component
  async loadHeader() {
    try {
      await this.loadScript(`${this.basePath}assets/js/components/header.js?v=10`);

      let headerContainer = document.getElementById('header-component');
      if (!headerContainer) {
        headerContainer = document.createElement('div');
        headerContainer.id = 'header-component';
        document.body.insertBefore(headerContainer, document.body.firstChild);
      }

      // Render header (Now includes the Business Button from header.js)
      headerContainer.innerHTML = createHeader(this.currentPage);
      initializeHeader();

      // Initialize the Modal Logic so the buttons work
      this.initModalSystem();
      
      // Initialize header scroll behavior
      this.initHeaderScroll();

      console.log('Header component loaded successfully');
    } catch (error) {
      console.error('Error loading header component:', error);
    }
  }

  // Load and render footer component
  async loadFooter() {
    try {
      await this.loadScript(`${this.basePath}assets/js/components/footer.js?v=4`);

      let footerContainer = document.getElementById('footer-component');
      if (!footerContainer) {
        footerContainer = document.createElement('div');
        footerContainer.id = 'footer-component';
        document.body.appendChild(footerContainer);
      }

      footerContainer.innerHTML = createDetailedFooter(this.currentPage);
      console.log('Footer component loaded successfully');
    } catch (error) {
      console.error('Error loading footer component:', error);
    }
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      if (this.loadedScripts.has(src) || document.querySelector(`script[src="${src}"]`)) {
        this.loadedScripts.add(src);
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        this.loadedScripts.add(src);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadAllComponents() {
    try {
      await Promise.all([this.loadHeader(), this.loadFooter()]);
      // Load the global booking modal script
      await this.loadScript(`${this.basePath}assets/js/booking-modal.js?v=1`);
      console.log('All components loaded successfully');
    } catch (error) {
      console.error('Error loading components:', error);
    }
  }

  // Header scroll behavior - shrink on scroll
  initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    
    let lastScrollY = 0;
    let ticking = false;
    
    const updateHeader = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      
      // Hide header on scroll down, show on scroll up (optional - disabled by default)
      // if (scrollY > lastScrollY && scrollY > 100) {
      //   header.style.transform = 'translateY(-100%)';
      // } else {
      //   header.style.transform = 'translateY(0)';
      // }
      
      lastScrollY = scrollY;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  replaceExistingHeader() {
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
      const headerContainer = document.createElement('div');
      headerContainer.id = 'header-component';
      existingHeader.parentNode.replaceChild(headerContainer, existingHeader);
    }
  }

  replaceExistingFooter() {
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
      const footerContainer = document.createElement('div');
      footerContainer.id = 'footer-component';
      existingFooter.parentNode.replaceChild(footerContainer, existingFooter);
    }
  }

  // === MODAL SYSTEM: POPUP LOGIC ===
  initModalSystem() {
    // 1. Inject Modal HTML if it doesn't exist
    if (!document.getElementById('business-modal')) {
      const modalHTML = `
        <div id="business-modal" class="fixed inset-0 z-[9999] hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity opacity-0" id="business-modal-backdrop"></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" id="business-modal-panel">
                        <div class="h-2 bg-gradient-to-r from-[#6d28d9] to-[#00bcd4]"></div>
                        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(84,60,248,0.1)] sm:mx-0 sm:h-10 sm:w-10">
                                    <i class="fas fa-rocket text-[#6d28d9] text-lg"></i>
                                </div>
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 class="text-xl font-bold leading-6 text-gray-900" id="modal-title">Building the Hub</h3>
                                    <div class="mt-4">
                                        <p class="text-sm text-gray-500">We are curating an exclusive directory of New Zealand's most trusted businesses. A place to connect, collaborate, and grow together.</p>
                                        <div class="mt-4 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Expected Launch: Late 2025</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" onclick="closeBusinessModal()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 2. Define Global Functions called by the HTML
    window.openBusinessModal = (e) => {
      if (e) e.preventDefault();
      const modal = document.getElementById('business-modal');
      const backdrop = document.getElementById('business-modal-backdrop');
      const panel = document.getElementById('business-modal-panel');

      if (modal) {
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
          backdrop.classList.remove('opacity-0');
          panel.classList.remove('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
          panel.classList.add('opacity-100', 'translate-y-0', 'sm:scale-100');
        }, 10);
      }
    };

    window.closeBusinessModal = () => {
      const modal = document.getElementById('business-modal');
      const backdrop = document.getElementById('business-modal-backdrop');
      const panel = document.getElementById('business-modal-panel');

      if (modal) {
        backdrop.classList.add('opacity-0');
        panel.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100');
        panel.classList.add('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 300);
      }
    };

    // 3. Inject Leads Modal HTML if it doesn't exist
    if (!document.getElementById('leads-modal')) {
      const leadsModalHTML = `
        <div id="leads-modal" class="fixed inset-0 z-[9999] hidden" aria-labelledby="leads-modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity opacity-0" id="leads-modal-backdrop"></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" id="leads-modal-panel">
                        <div class="h-2 bg-gradient-to-r from-[#6d28d9] to-[#00bcd4]"></div>
                        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(84,60,248,0.1)] sm:mx-0 sm:h-10 sm:w-10">
                                    <i class="fas fa-chart-line text-[#6d28d9] text-lg"></i>
                                </div>
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 class="text-xl font-bold leading-6 text-gray-900" id="leads-modal-title">Leads Coming Soon</h3>
                                    <div class="mt-4">
                                        <p class="text-sm text-gray-500">We are developing a powerful leads management system to help you connect with potential clients and grow your business. Stay tuned for updates!</p>
                                        <div class="mt-4 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" onclick="closeLeadsModal()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', leadsModalHTML);
    }

    // 4. Define Global Functions for Leads Modal
    window.openLeadsModal = (e) => {
      if (e) e.preventDefault();
      const modal = document.getElementById('leads-modal');
      const backdrop = document.getElementById('leads-modal-backdrop');
      const panel = document.getElementById('leads-modal-panel');

      if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
          backdrop.classList.remove('opacity-0');
          panel.classList.remove('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
          panel.classList.add('opacity-100', 'translate-y-0', 'sm:scale-100');
        }, 10);
      }
    };

    window.closeLeadsModal = () => {
      const modal = document.getElementById('leads-modal');
      const backdrop = document.getElementById('leads-modal-backdrop');
      const panel = document.getElementById('leads-modal-panel');

      if (modal) {
        backdrop.classList.add('opacity-0');
        panel.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100');
        panel.classList.add('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 300);
      }
    };
  }

  // Initialize Scroll Progress Indicator
  initScrollProgress() {
    function updateScrollProgress() {
      const scrollProgress = document.getElementById('scroll-progress');
      if (!scrollProgress) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }
    
    // Passive scroll listener for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    // Initial call
    updateScrollProgress();
  }

  // Hide page loader
  hidePageLoader() {
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
      pageLoader.classList.add('loaded');
    }
    // Add page-loaded class to body to trigger fade-in animations
    document.body.classList.add('page-loaded');
  }

  async init() {
    try {
      this.replaceExistingHeader();
      this.replaceExistingFooter();
      await this.loadAllComponents();
      this.initScrollProgress();
      // Hide the page loader after everything is loaded
      this.hidePageLoader();
    } catch (error) {
      console.error('Error initializing component system:', error);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const componentLoader = new ComponentLoader();
  componentLoader.init();
});

window.ComponentLoader = ComponentLoader;