// Easter Egg - Secret Words Interaction
// Type "seen", "trusted", or "remembered" anywhere on the page for a surprise!

(function() {
  'use strict';
  
  // Track typed characters
  let typedBuffer = '';
  const secretWords = ['seen', 'trusted', 'remembered'];
  
  // Load discovered words from localStorage
  const storedWords = localStorage.getItem('cmp_easter_eggs_found');
  const discoveredWords = new Set(storedWords ? JSON.parse(storedWords) : []);
  
  // Check if all Easter eggs already found
  function allEggsFound() {
    return discoveredWords.size >= 3;
  }
  
  // Save discovered words to localStorage
  function saveDiscoveredWords() {
    localStorage.setItem('cmp_easter_eggs_found', JSON.stringify([...discoveredWords]));
  }
  
  // Remove all Easter egg elements and effects
  function removeEasterEggElements() {
    // Remove tooltips
    document.querySelectorAll('.tagline-tooltip').forEach(el => el.remove());
    // Remove subtle-attract class
    document.querySelectorAll('.brand-tagline-word').forEach(el => {
      el.classList.remove('subtle-attract');
    });
  }
  
  // Fun facts/messages for each word
  const wordMessages = {
    seen: {
      title: '👀 You\'ve Been Seen!',
      message: 'Fun fact: The human eye can distinguish about 10 million different colors! At Capital Media Partners, we make sure YOUR brand stands out in all of them.',
      icon: 'fa-eye',
      color: 'from-blue-500 to-cyan-400'
    },
    trusted: {
      title: '🤝 Trust Unlocked!',
      message: 'Did you know? It takes about 7 interactions for someone to remember a brand. We help you build that trust, one connection at a time.',
      icon: 'fa-handshake',
      color: 'from-purple-500 to-pink-400'
    },
    remembered: {
      title: '🧠 Memorable Discovery!',
      message: 'Here\'s a secret: People remember 80% of what they see and do, but only 20% of what they read. That\'s why visual branding matters!',
      icon: 'fa-brain',
      color: 'from-amber-500 to-orange-400'
    }
  };
  
  // Create confetti particle
  function createConfetti() {
    const colors = ['#523784', '#27bdda', '#f472b6', '#fbbf24', '#34d399', '#818cf8'];
    const confettiCount = 50;
    const container = document.createElement('div');
    container.className = 'confetti-container';
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10001;overflow:hidden;';
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 2 + 2;
      const animationDelay = Math.random() * 0.5;
      
      confetti.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation: confetti-fall ${animationDuration}s ease-out ${animationDelay}s forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      container.appendChild(confetti);
    }
    
    document.body.appendChild(container);
    
    // Remove confetti after animation
    setTimeout(() => container.remove(), 4000);
  }
  
  // Create sparkle effect
  function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'easter-sparkle';
      sparkle.innerHTML = '✨';
      sparkle.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 12 + 8}px;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + Math.random() * rect.height}px;
        pointer-events: none;
        z-index: 10002;
        animation: sparkle-float 1s ease-out forwards;
      `;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  }
  
  // Show celebration modal
  function showCelebration(word) {
    const data = wordMessages[word];
    const allDiscovered = discoveredWords.size === 3;
    
    // Create confetti
    createConfetti();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'easter-egg-modal';
    modal.innerHTML = `
      <div class="easter-egg-overlay" onclick="this.parentElement.remove()"></div>
      <div class="easter-egg-content">
        <button onclick="this.parentElement.parentElement.remove()" class="easter-close-btn">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="easter-icon-wrapper bg-gradient-to-br ${data.color}">
          <i class="fas ${data.icon}"></i>
        </div>
        
        <h2 class="easter-title">${data.title}</h2>
        <p class="easter-message">${data.message}</p>
        
        <div class="easter-progress">
          <p class="easter-progress-label">Secret Words Discovered</p>
          <div class="easter-progress-dots">
            <span class="easter-dot ${discoveredWords.has('seen') ? 'discovered' : ''}" title="Seen">👀</span>
            <span class="easter-dot ${discoveredWords.has('trusted') ? 'discovered' : ''}" title="Trusted">🤝</span>
            <span class="easter-dot ${discoveredWords.has('remembered') ? 'discovered' : ''}" title="Remembered">🧠</span>
          </div>
          <p class="easter-progress-count">${discoveredWords.size}/3 Found</p>
        </div>
        
        ${allDiscovered ? `
          <div class="easter-bonus">
            <div class="easter-bonus-icon">🎉</div>
            <p class="easter-bonus-text">Congratulations! You've discovered all secret words! You're officially a Capital Media Partners explorer!</p>
          </div>
        ` : ''}
        
        <button onclick="this.parentElement.parentElement.remove()" class="easter-close-action">
          <span>Continue Exploring</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger animation
    requestAnimationFrame(() => {
      modal.classList.add('active');
    });
    
    // Close on escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }
  
  // Listen for keystrokes
  document.addEventListener('keydown', function(e) {
    // Ignore if typing in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }
    
    // Skip if all eggs already found
    if (allEggsFound()) return;
    
    // Only track letter keys
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      typedBuffer += e.key.toLowerCase();
      
      // Keep buffer manageable
      if (typedBuffer.length > 20) {
        typedBuffer = typedBuffer.slice(-20);
      }
      
      // Check for secret words
      for (const word of secretWords) {
        if (typedBuffer.endsWith(word) && !discoveredWords.has(word)) {
          discoveredWords.add(word);
          saveDiscoveredWords();
          typedBuffer = ''; // Reset buffer after discovery
          
          // Small delay for dramatic effect
          setTimeout(() => {
            showCelebration(word);
            // If all eggs found, remove Easter egg elements after celebration closes
            if (allEggsFound()) {
              setTimeout(removeEasterEggElements, 500);
            }
          }, 100);
          break;
        }
      }
    }
  });
  
  // Add hover effects to tagline words
  function initTaglineInteractions() {
    // Skip on mobile/touch devices - tooltips don't work well there
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }
    
    // Wait for DOM to be ready
    const checkAndInit = () => {
      const taglineElements = document.querySelectorAll('.brand-tagline-word');
      
      if (taglineElements.length > 0) {
        taglineElements.forEach(el => {
          // Skip if tooltip already added
          if (el.querySelector('.tagline-tooltip')) {
            return;
          }
          
          // Add tooltip
          const tooltip = document.createElement('div');
          tooltip.className = 'tagline-tooltip';
          tooltip.innerHTML = '<i class="fas fa-keyboard"></i> Try typing this word!';
          el.appendChild(tooltip);
          
          // Add sparkle effect on hover
          el.addEventListener('mouseenter', () => {
            createSparkles(el);
          });
        });
      }
    };
    
    // Check immediately and also after a delay (for dynamically loaded content)
    checkAndInit();
    setTimeout(checkAndInit, 1000);
    setTimeout(checkAndInit, 2000);
  }
  
  // Add floating hint near the tagline
  function addFloatingHint() {
    const hint = document.createElement('div');
    hint.className = 'easter-hint';
    hint.innerHTML = `
      <span class="easter-hint-icon">🔮</span>
      <span class="easter-hint-text">Psst... there's a secret hidden in plain sight</span>
    `;
    hint.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: linear-gradient(135deg, rgba(82, 55, 132, 0.95), rgba(39, 189, 218, 0.95));
      color: white;
      font-size: 0.8rem;
      font-weight: 500;
      border-radius: 50px;
      box-shadow: 0 4px 20px rgba(82, 55, 132, 0.3);
      cursor: pointer;
      opacity: 0;
      transform: translateX(100px);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    // Show hint after delay
    setTimeout(() => {
      document.body.appendChild(hint);
      requestAnimationFrame(() => {
        hint.style.opacity = '1';
        hint.style.transform = 'translateX(0)';
      });
      
      // Pulse animation
      hint.querySelector('.easter-hint-icon').style.animation = 'easter-pulse 2s ease-in-out infinite';
      
      // Hide on click
      hint.addEventListener('click', () => {
        hint.style.opacity = '0';
        hint.style.transform = 'translateX(100px)';
        setTimeout(() => hint.remove(), 500);
      });
      
      // Auto-hide after 15 seconds
      setTimeout(() => {
        if (hint.parentElement) {
          hint.style.opacity = '0';
          hint.style.transform = 'translateX(100px)';
          setTimeout(() => hint.remove(), 500);
        }
      }, 15000);
    }, 5000);
  }
  
  // Subtle periodic glow animation to attract attention
  function startPeriodicGlow() {
    // Function to trigger the initial glow sequence
    function triggerInitialGlow() {
      const taglineWords = document.querySelectorAll('.brand-tagline-word');
      if (taglineWords.length > 0) {
        // Glow all words in sequence on first load
        taglineWords.forEach((word, index) => {
          setTimeout(() => {
            word.classList.add('subtle-attract');
            setTimeout(() => {
              word.classList.remove('subtle-attract');
            }, 2000);
          }, index * 600); // Stagger each word by 600ms
        });
        return true; // Success
      }
      return false; // Elements not found yet
    }
    
    // Try to trigger initial glow, retry if elements not loaded yet
    let attempts = 0;
    const maxAttempts = 10;
    const tryTrigger = () => {
      attempts++;
      if (!triggerInitialGlow() && attempts < maxAttempts) {
        setTimeout(tryTrigger, 500); // Retry every 500ms
      }
    };
    
    // Start trying after 2 seconds
    setTimeout(tryTrigger, 2000);
    
    // Then continue with periodic random glow (only if not all found)
    setInterval(() => {
      if (allEggsFound()) return;
      
      const taglineWords = document.querySelectorAll('.brand-tagline-word');
      if (taglineWords.length > 0) {
        // Pick a random word to highlight
        const randomWord = taglineWords[Math.floor(Math.random() * taglineWords.length)];
        randomWord.classList.add('subtle-attract');
        
        // Remove the class after animation completes
        setTimeout(() => {
          randomWord.classList.remove('subtle-attract');
        }, 2000);
      }
    }, 90000); // Every 1.5 minutes (90000ms)
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    // Skip Easter egg setup if all eggs already found
    if (allEggsFound()) return;
    
    initTaglineInteractions();
    startPeriodicGlow();
  });
  
  // Also init on load (backup)
  window.addEventListener('load', function() {
    if (!allEggsFound()) {
      initTaglineInteractions();
    }
  });
})();
