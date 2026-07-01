// Footer Component
function createFooter(currentPage = 'home') {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="gradient-bg text-white py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto text-center">
          <p class="text-white/80">© ${currentYear} Capital Media Partners. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

// Alternative detailed footer (can be used for other pages if needed)
function createDetailedFooter(currentPage = 'home') {
  let basePath = '';
  if (currentPage === 'service') {
    basePath = '../../';
  } else if (currentPage === 'about' || currentPage === 'contact' || currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'trusted-businesses' || currentPage === '404' || currentPage === 'leads' || currentPage === 'services') {
    basePath = '../';
  }
  const currentYear = new Date().getFullYear();

  return `
    <footer class="gradient-bg text-white py-12 border-t border-white/30">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <!-- Company Info -->
            <div class="md:col-span-2">
              <div class="flex items-center space-x-3 mb-4">
                <div class="flex items-center space-x-3 bg-white rounded-lg p-3">
                  <img src="${basePath}assets/images/logos/Capital-Media-Partners-Logo.png" alt="Capital Media Partners Logo" class="h-10 w-auto">
                  <div class="flex flex-col items-start">
                    <span class="font-[Open_Sans] font-bold text-lg tracking-wide bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">CAPITAL MEDIA PARTNERS</span>
                    <span class="font-[Open_Sans] text-xs font-medium tracking-wider bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] bg-clip-text text-transparent">BE SEEN. BE TRUSTED. BE REMEMBERED</span>
                  </div>
                </div>
              </div>
              <p class="text-white/90 mb-4 max-w-md">
                We help startups, SMEs, and enterprises succeed in New Zealand with innovative marketing solutions, technology & AI services, and cost-effective strategies.
              </p>
              <div class="flex space-x-4">
                <a href="https://www.linkedin.com/company/capital-media-partners-limited/" class="w-10 h-10 bg-white hover:bg-white hover:border hover:border-[var(--primary-color)] rounded-lg flex items-center justify-center text-gray-800 hover:text-[var(--primary-color)] transition-all duration-300">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.facebook.com/people/Capital-Media-Partners/61578754551198/" class="w-10 h-10 bg-white hover:bg-white hover:border hover:border-[var(--secondary-color)] rounded-lg flex items-center justify-center text-gray-800 hover:text-[var(--secondary-color)] transition-all duration-300">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/Capitalmediapartners/" class="w-10 h-10 bg-white hover:bg-white hover:border hover:border-pink-600 rounded-lg flex items-center justify-center text-gray-800 hover:text-pink-600 transition-all duration-300">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="https://x.com/CMP2028" class="w-10 h-10 bg-white hover:bg-white hover:border hover:border-blue-600 rounded-lg flex items-center justify-center text-black hover:text-blue-600 transition-all duration-300">
                  <i class="fa-brands fa-x-twitter"></i>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="font-semibold text-lg mb-4">Quick Links</h4>
              <ul class="space-y-3">
                <li><a href="${basePath}index.html#home" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">Home</a></li>
                <li><a href="${basePath}pages/about.html" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">About</a></li>
                <li><a href="${basePath}index.html#services" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">Services</a></li>
                <li><a href="${basePath}pages/contact.html" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">Contact</a></li>
                <li><a href="${basePath}pages/privacy-policy.html" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">Privacy Policy</a></li>
                <li><a href="${basePath}pages/terms-conditions.html" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">Terms & Conditions</a></li>
              </ul>
            </div>

            <!-- Services -->
            <div>
              <h4 class="font-semibold text-lg mb-4">Our Services</h4>
              <ul class="space-y-3">
                <li><a href="${basePath}pages/services/digital-marketing.html" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">Digital Marketing</a></li>
                <li><a href="${basePath}pages/services/marketing-print-media.html" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">Marketing & Print</a></li>
                <li><a href="${basePath}pages/services/technology-ai.html" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">Technology & AI</a></li>
                <li><a href="${basePath}pages/services/insurance-advisory.html" class="text-white/80 hover:text-white transition-colors duration-300 link-underline inline-block">Insurance Advisory</a></li>
              </ul>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="border-t border-white/20 pt-8 text-center">
            <p class="text-white/80">© ${currentYear} Capital Media Partners. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}