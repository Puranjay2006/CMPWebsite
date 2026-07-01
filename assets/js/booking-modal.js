// Global Booking Modal Component
// This file creates the booking modal and makes it available site-wide

(function() {
  'use strict';
  
  // Determine base path based on current page location
  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/services/')) {
      return '../../';
    } else if (path.includes('/pages/')) {
      return '../';
    }
    return '';
  }
  
  // Create the booking modal HTML
  function createBookingModal() {
    const modalHTML = `
      <!-- Strategy Call Booking Modal -->
      <div id="booking-modal" class="booking-modal">
        <div class="booking-modal-overlay" onclick="closeBookingModal()"></div>
        <div class="booking-modal-content">
          <!-- Decorative top accent bar -->
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--primary-color)] via-[var(--accent-color)] to-[var(--secondary-color)] rounded-t-2xl"></div>
          
          <div class="p-6 sm:p-8">
            <!-- Close Button -->
            <button onclick="closeBookingModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100/80 hover:bg-red-100 flex items-center justify-center transition-all duration-300 group z-10">
              <i class="fas fa-times text-gray-500 group-hover:text-red-500 text-sm transition-colors"></i>
            </button>
            
            <!-- Modal Header - Compact -->
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl shadow-lg mb-3">
                <i class="fas fa-calendar-check text-white text-xl"></i>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Schedule Your Free Strategy Call</h3>
              <p class="text-gray-500 text-sm">15-minute consultation with our experts</p>
            </div>
            
            <!-- Booking Form -->
            <form id="global-booking-form" class="space-y-4">
              <input type="hidden" name="access_key" value="82939ced-5a94-4046-8212-e3acb13e23dc">
              <input type="hidden" name="subject" value="Strategy Call Booking">
              <input type="hidden" name="from_name" value="Capital Media Partners - Strategy Call">
              <input type="hidden" name="page_source" id="booking-page-source" value="">
              
              <!-- Name Fields -->
              <div class="grid grid-cols-2 gap-3">
                <div class="form-group">
                  <label for="global-booking-firstName" class="form-label">
                    <i class="fas fa-user text-[var(--primary-color)] mr-1.5 text-xs"></i>First Name <span class="text-red-400">*</span>
                  </label>
                  <input type="text" id="global-booking-firstName" name="firstName" required placeholder="John"
                    class="form-input">
                </div>
                <div class="form-group">
                  <label for="global-booking-lastName" class="form-label">
                    Last Name <span class="text-red-400">*</span>
                  </label>
                  <input type="text" id="global-booking-lastName" name="lastName" required placeholder="Smith"
                    class="form-input">
                </div>
              </div>
              
              <!-- Email Field -->
              <div class="form-group">
                <label for="global-booking-email" class="form-label">
                  <i class="fas fa-envelope text-[var(--primary-color)] mr-1.5 text-xs"></i>Email Address <span class="text-red-400">*</span>
                </label>
                <input type="email" id="global-booking-email" name="email" required placeholder="john@company.com"
                  class="form-input">
              </div>
              
              <!-- Phone Field -->
              <div class="form-group">
                <label for="global-booking-phone" class="form-label">
                  <i class="fas fa-phone text-[var(--primary-color)] mr-1.5 text-xs"></i>Phone Number
                </label>
                <input type="tel" id="global-booking-phone" name="phone" placeholder="+64 21 123 4567"
                  class="form-input">
              </div>
              
              <!-- Date/Time Fields -->
              <div class="grid grid-cols-2 gap-3">
                <div class="form-group">
                  <label for="global-booking-date" class="form-label">
                    <i class="fas fa-calendar text-[var(--primary-color)] mr-1.5 text-xs"></i>Date <span class="text-red-400">*</span>
                  </label>
                  <input type="date" id="global-booking-date" name="preferred_date" required 
                    class="form-input">
                </div>
                <div class="form-group">
                  <label for="global-booking-time" class="form-label">
                    <i class="fas fa-clock text-[var(--primary-color)] mr-1.5 text-xs"></i>Time <span class="text-red-400">*</span>
                  </label>
                  <select id="global-booking-time" name="preferred_time" required class="form-input form-select">
                    <option value="">Select...</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>
              
              <!-- Company Field -->
              <div class="form-group">
                <label for="global-booking-company" class="form-label">
                  <i class="fas fa-building text-[var(--primary-color)] mr-1.5 text-xs"></i>Company Name
                </label>
                <input type="text" id="global-booking-company" name="company" placeholder="Your Company Ltd"
                  class="form-input">
              </div>
              
              <!-- Message Field -->
              <div class="form-group">
                <label for="global-booking-message" class="form-label">
                  <i class="fas fa-comment text-[var(--primary-color)] mr-1.5 text-xs"></i>What would you like to discuss?
                </label>
                <textarea id="global-booking-message" name="message" rows="2" 
                  class="form-input resize-none"
                  placeholder="Tell us about your goals and challenges..."></textarea>
              </div>
              
              <!-- Honeypot for spam protection -->
              <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
              
              <!-- Submit Button -->
              <button type="submit" id="global-booking-submit-btn" class="w-full cta-btn-primary justify-center py-3.5 mt-2">
                <i class="fas fa-calendar-check"></i>
                <span>Book My Strategy Call</span>
              </button>
              
              <!-- Privacy Note -->
              <p class="text-center text-xs text-gray-400 mt-3">
                <i class="fas fa-lock mr-1"></i>Your information is secure and will never be shared.
              </p>
            </form>
            
            <!-- Success Message (hidden by default) -->
            <div id="global-booking-success" class="hidden text-center py-6">
              <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                <i class="fas fa-check text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Booking Request Received!</h3>
              <p class="text-gray-600 text-sm mb-6">Thank you! We'll confirm your appointment via email within 24 hours.</p>
              <button onclick="closeBookingModal()" class="cta-btn-outline">
                <span>Close</span>
              </button>
            </div>
            
            <!-- Error Message (hidden by default) -->
            <div id="global-booking-error" class="hidden text-center py-3">
              <div class="bg-red-50 border border-red-200 rounded-xl p-3">
                <p class="text-red-600 text-sm"><i class="fas fa-exclamation-circle mr-2"></i>Something went wrong. Please try again.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Insert the modal into the DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstElementChild);
    
    // Initialize the form
    initializeBookingForm();
  }
  
  // Initialize booking form submission
  function initializeBookingForm() {
    const form = document.getElementById('global-booking-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('global-booking-submit-btn');
      const successDiv = document.getElementById('global-booking-success');
      const errorDiv = document.getElementById('global-booking-error');
      
      // Set page source
      const pageSource = document.getElementById('booking-page-source');
      if (pageSource) {
        pageSource.value = document.title + ' – Strategy Call';
      }
      
      // Disable button and show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Submitting...</span>';
      errorDiv.classList.add('hidden');
      
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Show success message
          form.classList.add('hidden');
          successDiv.classList.remove('hidden');
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        errorDiv.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i><span>Book My Strategy Call</span>';
      }
    });
  }
  
  // Global functions for opening/closing modal
  window.openBookingModal = function() {
    // Create modal if it doesn't exist
    if (!document.getElementById('booking-modal')) {
      createBookingModal();
    }
    
    const modal = document.getElementById('booking-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    const dateInput = document.getElementById('global-booking-date');
    if (dateInput) {
      dateInput.setAttribute('min', minDate);
    }
  };
  
  window.closeBookingModal = function() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // Reset the form state after closing
      setTimeout(function() {
        const form = document.getElementById('global-booking-form');
        const successDiv = document.getElementById('global-booking-success');
        const errorDiv = document.getElementById('global-booking-error');
        const submitBtn = document.getElementById('global-booking-submit-btn');
        
        if (form) {
          form.classList.remove('hidden');
          form.reset();
        }
        if (successDiv) successDiv.classList.add('hidden');
        if (errorDiv) errorDiv.classList.add('hidden');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i><span>Book My Strategy Call</span>';
        }
      }, 300);
    }
  };
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeBookingModal();
    }
  });
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    // Preload the modal HTML for faster opening
    // The modal will be created on first open
  });
})();
