// Header Component
function createHeader(currentPage = 'home') {
  let basePath = '';
  if (currentPage === 'service') {
    basePath = '../../';
  } else if (currentPage === 'about' || currentPage === 'contact' || currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'trusted-businesses' || currentPage === 'leads' || currentPage === 'services') {
    basePath = '../';
  }

  return `
    <header class="fixed w-full z-50 max-w-[100vw] transition-all duration-300" id="main-header">
      <div class="glass-effect">
        <div class="container mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <!-- Logo & Brand -->
          <a href="${basePath}index.html" class="flex items-center space-x-2.5 sm:space-x-3 brand-mark flex-shrink-0 hover:opacity-90 transition-all duration-300 group">
            <div class="brand-icon flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img src="${basePath}assets/images/logos/Capital-Media-Partners-Logo.png" alt="Capital Media Partners Logo" class="h-10 w-12 sm:h-12 sm:w-14 lg:h-14 lg:w-16 object-contain">
            </div>
            <div class="brand-text flex flex-col items-start">
              <span class="font-bold text-sm sm:text-lg lg:text-xl tracking-wide bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">CAPITAL MEDIA PARTNERS</span>
              <span class="brand-tagline text-[0.55rem] sm:text-xs lg:text-sm font-medium tracking-widest text-gray-500 uppercase">Be <span class="brand-tagline-word" data-word="seen" data-hint="Type me anywhere...">Seen</span>. Be <span class="brand-tagline-word" data-word="trusted" data-hint="I'm a secret word!">Trusted</span>. Be <span class="brand-tagline-word" data-word="remembered" data-hint="Discover me!">Remembered</span></span>
            </div>
          </a>
          
          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center">
            <ul class="flex items-center gap-1">
              <li>
                <a href="${basePath}index.html${currentPage === 'home' ? '#home' : ''}" class="nav-link-item text-gray-600 hover:text-[var(--primary-color)] transition-all duration-300 relative flex items-center text-sm font-medium ${currentPage === 'home' ? 'active text-[var(--primary-color)]' : ''}" onclick="${currentPage === 'home' ? 'document.getElementById(\'home\').scrollIntoView({behavior: \'smooth\'}); return false;' : ''}">
                  Home
                  <span class="nav-underline"></span>
                </a>
              </li>
              <li>
                <a href="${basePath}pages/about.html" class="nav-link-item text-gray-600 hover:text-[var(--primary-color)] transition-all duration-300 relative flex items-center text-sm font-medium ${currentPage === 'about' ? 'active text-[var(--primary-color)]' : ''}">
                  About
                  <span class="nav-underline"></span>
                </a>
              </li>
              <li class="relative group">
                <a href="${basePath}pages/services.html" class="nav-link-item text-gray-600 hover:text-[var(--primary-color)] transition-all duration-300 relative flex items-center text-sm font-medium whitespace-nowrap ${currentPage === 'services' ? 'active text-[var(--primary-color)]' : ''}">
                  Services
                  <i class="fas fa-chevron-down ml-1.5 text-[0.65rem] transition-transform duration-300 group-hover:rotate-180 opacity-60"></i>
                  <span class="nav-underline"></span>
                </a>
                <div class="absolute top-full right-0 pt-3 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div class="py-2">
                    <a href="${basePath}pages/services/digital-marketing.html" class="flex items-center px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 group/item">
                      <div class="w-9 h-9 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-105 transition-all duration-200">
                        <i class="fas fa-chart-line text-white text-xs"></i>
                      </div>
                      <div class="ml-3">
                        <span class="text-sm font-medium text-gray-700 group-hover/item:text-[var(--primary-color)] transition-colors">Digital Marketing</span>
                        <p class="text-xs text-gray-400 mt-0.5">CRM & lead generation</p>
                      </div>
                    </a>
                    <a href="${basePath}pages/services/marketing-print-media.html" class="flex items-center px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 group/item">
                      <div class="w-9 h-9 bg-gradient-to-br from-[var(--secondary-color)] to-[var(--primary-color)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-105 transition-all duration-200">
                        <i class="fas fa-print text-white text-xs"></i>
                      </div>
                      <div class="ml-3">
                        <span class="text-sm font-medium text-gray-700 group-hover/item:text-[var(--secondary-color)] transition-colors">Marketing & Print</span>
                        <p class="text-xs text-gray-400 mt-0.5">Campaigns & branding</p>
                      </div>
                    </a>
                    <a href="${basePath}pages/services/technology-ai.html" class="flex items-center px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 group/item">
                      <div class="w-9 h-9 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-105 transition-all duration-200">
                        <i class="fas fa-microchip text-white text-xs"></i>
                      </div>
                      <div class="ml-3">
                        <span class="text-sm font-medium text-gray-700 group-hover/item:text-[var(--primary-color)] transition-colors">Technology & AI</span>
                        <p class="text-xs text-gray-400 mt-0.5">AkoDesk & automation</p>
                      </div>
                    </a>
                    <a href="${basePath}pages/services/insurance-advisory.html" class="flex items-center px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 group/item">
                      <div class="w-9 h-9 bg-gradient-to-br from-[var(--secondary-color)] to-[var(--primary-color)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-105 transition-all duration-200">
                        <i class="fas fa-shield-alt text-white text-xs"></i>
                      </div>
                      <div class="ml-3">
                        <span class="text-sm font-medium text-gray-700 group-hover/item:text-[var(--secondary-color)] transition-colors">Insurance Advisory</span>
                        <p class="text-xs text-gray-400 mt-0.5">Protection plans</p>
                      </div>
                    </a>
                    <div class="border-t border-gray-100 mt-2 pt-2 px-3 pb-2">
                      <a href="${basePath}pages/services.html" class="flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                        View All Services
                        <i class="fas fa-arrow-right ml-2 text-xs"></i>
                      </a>
                    </div>
                  </div>
                  </div>
                </div>
              </li>
              
              <li>
                <a href="${basePath}pages/leads.html" class="nav-link-item text-gray-600 hover:text-[var(--primary-color)] transition-all duration-300 relative flex items-center text-sm font-medium ${currentPage === 'leads' ? 'active text-[var(--primary-color)]' : ''}">
                  AI Sales Agent
                  <span class="nav-underline"></span>
                </a>
              </li>

              <li>
                <a href="${basePath}pages/contact.html" class="nav-link-item text-gray-600 hover:text-[var(--primary-color)] transition-all duration-300 relative flex items-center text-sm font-medium ${currentPage === 'contact' ? 'active text-[var(--primary-color)]' : ''}">
                  Contact
                  <span class="nav-underline"></span>
                </a>
              </li>
              
              <!-- CTA Button -->
              <li class="ml-2">
                <button onclick="openBookingModal()" class="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all duration-300 strategy-call-btn">
                  <i class="fas fa-calendar-check text-xs"></i>
                  <span>Book a Free Strategy Call</span>
                </button>
              </li>
            </ul>
          </nav>
          
          <!-- Mobile Menu Button -->
          <button id="menu-btn" class="lg:hidden w-11 h-11 rounded-xl flex items-center justify-center text-gray-600 hover:text-[var(--primary-color)] bg-gray-50 hover:bg-[rgba(82,55,132,0.08)] transition-all duration-300 flex-shrink-0 border border-gray-200/80 shadow-sm">
            <i class="fas fa-bars text-lg"></i>
          </button>
        </div>
      </div>
      <div id="mobile-menu" class="hidden bg-white border-t border-gray-100 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto">
        <ul class="flex flex-col font-medium px-3 py-4 space-y-2">
          <li>
            <a href="${basePath}index.html${currentPage === 'home' ? '#home' : ''}" class="flex items-center gap-3 py-3.5 px-4 rounded-xl transition-all duration-300 ${currentPage === 'home' ? 'text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] shadow-md' : 'text-gray-700 bg-gray-50 hover:bg-gradient-to-r hover:from-[rgba(82,55,132,0.1)] hover:to-[rgba(39,189,218,0.08)] hover:text-[var(--primary-color)] border border-gray-100 hover:border-[rgba(82,55,132,0.2)]'}" onclick="${currentPage === 'home' ? 'document.getElementById(\'home\').scrollIntoView({behavior: \'smooth\'}); return false;' : ''}">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center ${currentPage === 'home' ? 'bg-white/20 text-white' : 'bg-white text-[var(--primary-color)] shadow-sm'}">
                <i class="fas fa-home text-sm"></i>
              </div>
              <span class="font-semibold">Home</span>
            </a>
          </li>
          <li>
            <a href="${basePath}pages/about.html" class="flex items-center gap-3 py-3.5 px-4 rounded-xl transition-all duration-300 ${currentPage === 'about' ? 'text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] shadow-md' : 'text-gray-700 bg-gray-50 hover:bg-gradient-to-r hover:from-[rgba(82,55,132,0.1)] hover:to-[rgba(39,189,218,0.08)] hover:text-[var(--primary-color)] border border-gray-100 hover:border-[rgba(82,55,132,0.2)]'}">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center ${currentPage === 'about' ? 'bg-white/20 text-white' : 'bg-white text-[var(--secondary-color)] shadow-sm'}">
                <i class="fas fa-users text-sm"></i>
              </div>
              <span class="font-semibold">About</span>
            </a>
          </li>
          <li>
            <button id="mobile-services-btn" class="flex items-center justify-between gap-3 py-3.5 px-4 rounded-xl w-full transition-all duration-300 ${currentPage === 'services' ? 'text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] shadow-md' : 'text-gray-700 bg-gray-50 hover:bg-gradient-to-r hover:from-[rgba(82,55,132,0.1)] hover:to-[rgba(39,189,218,0.08)] hover:text-[var(--primary-color)] border border-gray-100 hover:border-[rgba(82,55,132,0.2)]'}">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center ${currentPage === 'services' ? 'bg-white/20 text-white' : 'bg-white text-[var(--primary-color)] shadow-sm'}">
                  <i class="fas fa-th-large text-sm"></i>
                </div>
                <span class="font-semibold">Services</span>
              </div>
              <i class="fas fa-chevron-down text-xs ${currentPage === 'services' ? 'text-white/70' : 'text-gray-400'} transition-transform duration-300" id="mobile-services-icon"></i>
            </button>
            <div id="mobile-services-menu" class="hidden bg-gradient-to-br from-gray-50/80 to-white rounded-xl mx-2 mt-2 border border-gray-100">
              <div class="p-3">
                <div class="space-y-1.5">
                  <a href="${basePath}pages/services/digital-marketing.html" class="group flex items-center p-3 rounded-lg bg-white hover:bg-gradient-to-r hover:from-[rgba(82,55,132,0.05)] hover:to-[rgba(39,189,218,0.03)] transition-all duration-300 border border-transparent hover:border-gray-100">
                    <div class="w-9 h-9 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i class="fas fa-chart-line text-white text-xs"></i>
                    </div>
                    <div class="ml-3 flex-1">
                      <h5 class="font-semibold text-gray-800 text-sm">Digital Marketing</h5>
                      <p class="text-xs text-gray-500">CRM & lead generation</p>
                    </div>
                    <i class="fas fa-chevron-right text-xs text-gray-300 group-hover:text-[var(--primary-color)] transition-colors"></i>
                  </a>

                  <a href="${basePath}pages/services/marketing-print-media.html" class="group flex items-center p-3 rounded-lg bg-white hover:bg-gradient-to-r hover:from-[rgba(39,189,218,0.05)] hover:to-[rgba(82,55,132,0.03)] transition-all duration-300 border border-transparent hover:border-gray-100">
                    <div class="w-9 h-9 bg-gradient-to-br from-[var(--secondary-color)] to-[var(--primary-color)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i class="fas fa-print text-white text-xs"></i>
                    </div>
                    <div class="ml-3 flex-1">
                      <h5 class="font-semibold text-gray-800 text-sm">Marketing & Print</h5>
                      <p class="text-xs text-gray-500">Campaigns & branding</p>
                    </div>
                    <i class="fas fa-chevron-right text-xs text-gray-300 group-hover:text-[var(--secondary-color)] transition-colors"></i>
                  </a>

                  <a href="${basePath}pages/services/technology-ai.html" class="group flex items-center p-3 rounded-lg bg-white hover:bg-gradient-to-r hover:from-[rgba(82,55,132,0.05)] hover:to-[rgba(39,189,218,0.03)] transition-all duration-300 border border-transparent hover:border-gray-100">
                    <div class="w-9 h-9 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i class="fas fa-microchip text-white text-xs"></i>
                    </div>
                    <div class="ml-3 flex-1">
                      <h5 class="font-semibold text-gray-800 text-sm">Technology & AI</h5>
                      <p class="text-xs text-gray-500">AkoDesk & automation</p>
                    </div>
                    <i class="fas fa-chevron-right text-xs text-gray-300 group-hover:text-[var(--primary-color)] transition-colors"></i>
                  </a>

                  <a href="${basePath}pages/services/insurance-advisory.html" class="group flex items-center p-3 rounded-lg bg-white hover:bg-gradient-to-r hover:from-[rgba(39,189,218,0.05)] hover:to-[rgba(82,55,132,0.03)] transition-all duration-300 border border-transparent hover:border-gray-100">
                    <div class="w-9 h-9 bg-gradient-to-br from-[var(--secondary-color)] to-[var(--primary-color)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i class="fas fa-shield-alt text-white text-xs"></i>
                    </div>
                    <div class="ml-3 flex-1">
                      <h5 class="font-semibold text-gray-800 text-sm">Insurance Advisory</h5>
                      <p class="text-xs text-gray-500">Protection plans</p>
                    </div>
                    <i class="fas fa-chevron-right text-xs text-gray-300 group-hover:text-[var(--secondary-color)] transition-colors"></i>
                  </a>
                </div>

                <div class="mt-3 pt-3 border-t border-gray-100">
                  <a href="${basePath}pages/services.html" class="flex items-center justify-center w-full py-2.5 px-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white font-semibold text-sm rounded-lg hover:shadow-md transition-all duration-300">
                    <span>View All Services</span>
                    <i class="fas fa-arrow-right text-xs ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </li>
          
          <li>
            <a href="${basePath}pages/leads.html" class="flex items-center gap-3 py-3.5 px-4 rounded-xl transition-all duration-300 ${currentPage === 'leads' ? 'text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] shadow-md' : 'text-gray-700 bg-gray-50 hover:bg-gradient-to-r hover:from-[rgba(82,55,132,0.1)] hover:to-[rgba(39,189,218,0.08)] hover:text-[var(--primary-color)] border border-gray-100 hover:border-[rgba(82,55,132,0.2)]'}">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center ${currentPage === 'leads' ? 'bg-white/20 text-white' : 'bg-white text-[var(--secondary-color)] shadow-sm'}">
                <i class="fas fa-robot text-sm"></i>
              </div>
              <span class="font-semibold">AI Sales Agent</span>
            </a>
          </li>

          <li>
            <a href="${basePath}pages/contact.html" class="flex items-center gap-3 py-3.5 px-4 rounded-xl transition-all duration-300 ${currentPage === 'contact' ? 'text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] shadow-md' : 'text-gray-700 bg-gray-50 hover:bg-gradient-to-r hover:from-[rgba(82,55,132,0.1)] hover:to-[rgba(39,189,218,0.08)] hover:text-[var(--primary-color)] border border-gray-100 hover:border-[rgba(82,55,132,0.2)]'}">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center ${currentPage === 'contact' ? 'bg-white/20 text-white' : 'bg-white text-[var(--primary-color)] shadow-sm'}">
                <i class="fas fa-envelope text-sm"></i>
              </div>
              <span class="font-semibold">Contact</span>
            </a>
          </li>
          
          <li class="pt-3 mt-1 border-t border-gray-100">
            <button onclick="openBookingModal()" class="w-full flex items-center justify-center gap-2.5 px-4 py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] shadow-lg">
              <i class="fas fa-calendar-check"></i>
              <span>Book a Free Strategy Call</span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  `;
}

// Initialize header functionality
function initializeHeader() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileServicesBtn = document.getElementById('mobile-services-btn');
  const mobileServicesMenu = document.getElementById('mobile-services-menu');
  const mobileServicesIcon = document.getElementById('mobile-services-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (mobileServicesBtn && mobileServicesMenu && mobileServicesIcon) {
    mobileServicesBtn.addEventListener('click', () => {
      mobileServicesMenu.classList.toggle('hidden');
      mobileServicesIcon.classList.toggle('rotate-180');
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // If it's a modal link (has onclick attribute), do nothing here, let the inline onclick handle it
      if (this.getAttribute('onclick')) return; 

      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
      if (mobileServicesMenu) {
        mobileServicesMenu.classList.add('hidden');
      }
      if (mobileServicesIcon) {
        mobileServicesIcon.classList.remove('rotate-180');
      }
    });
  });
}