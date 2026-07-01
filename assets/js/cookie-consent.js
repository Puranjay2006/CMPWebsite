/**
 * Cookie Consent Management System
 * Handles cookie consent popup and user preferences
 */

class CookieConsent {
  constructor() {
    this.cookieName = 'cmp_cookie_consent';
    this.cookieExpiry = 365; // days
    this.consentTypes = {
      necessary: true, // Always true
      analytics: false,
      marketing: false,
      preferences: false
    };

    this.init();
  }

  init() {
    // Check if consent already given
    if (!this.hasConsent()) {
      this.createConsentPopup();
      this.showConsentPopup();
    }

    // Load analytics if consent given
    if (this.hasConsentForType('analytics')) {
      this.loadAnalytics();
    }

    // Load marketing scripts if consent given
    if (this.hasConsentForType('marketing')) {
      this.loadMarketing();
    }
  }

  getBasePath() {
    // Determine base path based on current page depth
    const path = window.location.pathname;
    if (path.includes('/pages/services/')) {
      return '../../';
    } else if (path.includes('/pages/')) {
      return '../';
    }
    return '';
  }

  createConsentPopup() {
    const popup = document.createElement('div');
    popup.className = 'cookie-consent';
    popup.id = 'cookie-consent-popup';
    const basePath = this.getBasePath();

    popup.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          <h4>
            <i class="fas fa-cookie-bite cookie-icon"></i>
            We use cookies
          </h4>
          <p>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
            By clicking "Accept All", you consent to our use of cookies.
          </p>
          <a href="${basePath}pages/privacy-policy.html" target="_blank" class="privacy-link">Privacy Policy</a>
        </div>
        <div class="cookie-consent-actions">
          <button class="cookie-btn cookie-btn-decline" onclick="cookieConsent.declineAll()">
            Decline
          </button>
          <button class="cookie-btn cookie-btn-settings" onclick="cookieConsent.showSettings()">
            Settings
          </button>
          <button class="cookie-btn cookie-btn-accept" onclick="cookieConsent.acceptAll()">
            Accept All
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);
  }

  showConsentPopup() {
    setTimeout(() => {
      const popup = document.getElementById('cookie-consent-popup');
      if (popup) {
        popup.classList.add('show');
      }
    }, 1000); // Show after 1 second
  }

  hideConsentPopup() {
    const popup = document.getElementById('cookie-consent-popup');
    if (popup) {
      popup.classList.remove('show');
      setTimeout(() => {
        popup.remove();
      }, 400); // Wait for animation to complete
    }
  }

  acceptAll() {
    this.consentTypes = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };

    this.saveConsent();
    this.hideConsentPopup();
    this.loadAnalytics();
    this.loadMarketing();
  }

  declineAll() {
    this.consentTypes = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };

    this.saveConsent();
    this.hideConsentPopup();
  }

  showSettings() {
    // Create settings modal
    const modal = document.createElement('div');
    modal.className = 'cookie-settings-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 1rem;
    `;

    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 24px;
        padding: 2rem;
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h3 style="margin: 0; color: #1f2937; font-size: 1.5rem; font-weight: 600;">Cookie Settings</h3>
          <button onclick="this.closest('.cookie-settings-modal').remove()" style="
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0.5rem;
          ">&times;</button>
        </div>

        <div style="space-y: 1rem;">
          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label style="font-weight: 600; color: #374151;">Necessary Cookies</label>
              <input type="checkbox" checked disabled style="cursor: not-allowed;">
            </div>
            <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">
              Essential cookies for basic website functionality. These cannot be disabled.
            </p>
          </div>

          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label style="font-weight: 600; color: #374151;">Analytics Cookies</label>
              <input type="checkbox" id="analytics-toggle" ${this.consentTypes.analytics ? 'checked' : ''}>
            </div>
            <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">
              Help us understand how visitors interact with our website.
            </p>
          </div>

          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label style="font-weight: 600; color: #374151;">Marketing Cookies</label>
              <input type="checkbox" id="marketing-toggle" ${this.consentTypes.marketing ? 'checked' : ''}>
            </div>
            <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">
              Used to deliver personalized advertisements relevant to you.
            </p>
          </div>

          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label style="font-weight: 600; color: #374151;">Preference Cookies</label>
              <input type="checkbox" id="preferences-toggle" ${this.consentTypes.preferences ? 'checked' : ''}>
            </div>
            <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">
              Remember your settings and preferences for a better experience.
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 2rem;">
          <button onclick="cookieConsent.saveSettings()" style="
            flex: 1;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            Save Settings
          </button>
          <button onclick="this.closest('.cookie-settings-modal').remove()" style="
            flex: 1;
            padding: 0.75rem 1.5rem;
            background: transparent;
            color: #6b7280;
            border: 1px solid #d1d5db;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            Cancel
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  saveSettings() {
    const modal = document.querySelector('.cookie-settings-modal');
    if (modal) {
      this.consentTypes.analytics = modal.querySelector('#analytics-toggle').checked;
      this.consentTypes.marketing = modal.querySelector('#marketing-toggle').checked;
      this.consentTypes.preferences = modal.querySelector('#preferences-toggle').checked;

      this.saveConsent();
      this.hideConsentPopup();
      modal.remove();

      // Load/unload scripts based on new settings
      if (this.consentTypes.analytics) {
        this.loadAnalytics();
      }

      if (this.consentTypes.marketing) {
        this.loadMarketing();
      }
    }
  }

  saveConsent() {
    const consentData = {
      types: this.consentTypes,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    this.setCookie(this.cookieName, JSON.stringify(consentData), this.cookieExpiry);
  }

  hasConsent() {
    return this.getCookie(this.cookieName) !== null;
  }

  hasConsentForType(type) {
    const consent = this.getConsentData();
    return consent && consent.types && consent.types[type] === true;
  }

  getConsentData() {
    const consentString = this.getCookie(this.cookieName);
    if (consentString) {
      try {
        return JSON.parse(consentString);
      } catch (e) {
        console.error('Error parsing consent data:', e);
        return null;
      }
    }
    return null;
  }

  loadAnalytics() {
    // Google Analytics 4 example
    if (typeof gtag === 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      // Replace GA_MEASUREMENT_ID with your actual Google Analytics ID
      // gtag('config', 'GA_MEASUREMENT_ID');
    }
  }

  loadMarketing() {
    // Facebook Pixel, Google Ads, etc.
    // Add your marketing scripts here
    console.log('Marketing cookies accepted - loading marketing scripts');
  }

  // Cookie utility functions
  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=Lax`;
  }

  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  // Method to revoke consent (for privacy policy page)
  revokeConsent() {
    this.deleteCookie(this.cookieName);
    // Reload page to reset everything
    window.location.reload();
  }
}

// Initialize cookie consent when DOM is loaded
let cookieConsent;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    cookieConsent = new CookieConsent();
  });
} else {
  cookieConsent = new CookieConsent();
}

// Global functions for easy access
window.cookieConsent = cookieConsent;