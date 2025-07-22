// Modern Table of Contents with Smooth Interactions - Lei.Chat Style
document.addEventListener('DOMContentLoaded', function() {
  generateTOC();
  initializeScrollSpy();
  initializeTOCToggle();
  initializeSmoothScrolling();
  initializeKeyboardShortcuts();
});

// Generate clean table of contents
function generateTOC() {
  const tocList = document.getElementById('toc-list');
  const headings = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4');
  
  if (!tocList || headings.length === 0) {
    const tocNav = document.querySelector('.toc-navigation');
    if (tocNav) tocNav.style.display = 'none';
    return;
  }
  
  let tocHTML = '<ul>';
  
  headings.forEach((heading, index) => {
    const id = heading.id || `heading-${index}`;
    heading.id = id;
    
    const level = parseInt(heading.tagName.substring(1));
    const text = heading.textContent.trim();
    const levelClass = `toc-h${level}`;
    
    tocHTML += `
      <li class="${levelClass}">
        <a href="#${id}" data-heading="${id}">${text}</a>
      </li>
    `;
  });
  
  tocHTML += '</ul>';
  tocList.innerHTML = tocHTML;
}

// Advanced scroll spy with smooth active state updates
function initializeScrollSpy() {
  const headings = Array.from(document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4'));
  const tocLinks = Array.from(document.querySelectorAll('#toc-list a'));
  
  if (headings.length === 0 || tocLinks.length === 0) return;
  
  let isScrolling = false;
  let currentActiveLink = null;
  
  function updateActiveHeading() {
    if (isScrolling) return;
    
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Find the currently visible heading
    let activeHeading = null;
    let closestDistance = Infinity;
    
    headings.forEach(heading => {
      const rect = heading.getBoundingClientRect();
      const absoluteTop = scrollTop + rect.top;
      
      // Check if heading is in the upper half of the viewport
      if (rect.top <= windowHeight * 0.3 && rect.top >= -rect.height) {
        const distance = Math.abs(rect.top - 100);
        if (distance < closestDistance) {
          closestDistance = distance;
          activeHeading = heading;
        }
      }
    });
    
    // If no heading in viewport, use the last passed heading
    if (!activeHeading && scrollTop > 100) {
      for (let i = headings.length - 1; i >= 0; i--) {
        const rect = headings[i].getBoundingClientRect();
        if (rect.top <= windowHeight * 0.3) {
          activeHeading = headings[i];
          break;
        }
      }
    }
    
    // Update active link
    const newActiveLink = activeHeading ? 
      document.querySelector(`a[data-heading="${activeHeading.id}"]`) : null;
    
    if (newActiveLink !== currentActiveLink) {
      // Remove previous active state
      if (currentActiveLink) {
        currentActiveLink.classList.remove('active');
      }
      
      // Add new active state
      if (newActiveLink) {
        newActiveLink.classList.add('active');
        
        // Smooth scroll TOC to keep active item visible
        const tocContent = document.querySelector('.toc-content');
        if (tocContent) {
          const linkRect = newActiveLink.getBoundingClientRect();
          const tocRect = tocContent.getBoundingClientRect();
          
          if (linkRect.bottom > tocRect.bottom || linkRect.top < tocRect.top) {
            newActiveLink.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }
        }
      }
      
      currentActiveLink = newActiveLink;
    }
  }
  
  // Optimized scroll listener
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveHeading();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Initial update
  updateActiveHeading();
}

// TOC collapse/expand functionality
function initializeTOCToggle() {
  const toggleButton = document.getElementById('toc-toggle');
  const tocContent = document.getElementById('toc-content');
  
  if (!toggleButton || !tocContent) return;
  
  let isCollapsed = false;
  
  toggleButton.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    
    if (isCollapsed) {
      tocContent.style.display = 'none';
      toggleButton.classList.add('collapsed');
      toggleButton.setAttribute('aria-expanded', 'false');
    } else {
      tocContent.style.display = 'block';
      toggleButton.classList.remove('collapsed');
      toggleButton.setAttribute('aria-expanded', 'true');
    }
  });
  
  // Initialize as expanded
  toggleButton.setAttribute('aria-expanded', 'true');
}

// Smooth scrolling for TOC links
function initializeSmoothScrolling() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('#toc-list a[href^="#"]');
    if (!link) return;
    
    e.preventDefault();
    
    const targetId = link.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;
    
    // Mark as scrolling to prevent scroll spy interference
    let isScrolling = true;
    
    // Calculate offset for better positioning
    const headerOffset = 80;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    // Smooth scroll to target
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update URL without triggering scroll
    history.replaceState(null, null, `#${targetId}`);
    
    // Re-enable scroll spy after scroll completes
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
    
    // Immediate visual feedback
    document.querySelectorAll('#toc-list a.active').forEach(activeLink => {
      activeLink.classList.remove('active');
    });
    link.classList.add('active');
  });
}

// Keyboard shortcuts for navigation
function initializeKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ignore if user is typing in an input
    if (e.target.matches('input, textarea, [contenteditable]')) return;
    
    const tocLinks = document.querySelectorAll('#toc-list a');
    const currentActive = document.querySelector('#toc-list a.active');
    
    if (tocLinks.length === 0) return;
    
    switch (e.key) {
      case 'j': // Next heading
        e.preventDefault();
        navigateToHeading(tocLinks, currentActive, 1);
        break;
        
      case 'k': // Previous heading
        e.preventDefault();
        navigateToHeading(tocLinks, currentActive, -1);
        break;
        
      case 't': // Toggle TOC
        e.preventDefault();
        const toggleButton = document.getElementById('toc-toggle');
        if (toggleButton) toggleButton.click();
        break;
        
      case 'g':
        if (e.shiftKey) { // G - Go to bottom
          e.preventDefault();
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else { // g - Go to top
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;
    }
  });
}

// Helper function for keyboard navigation
function navigateToHeading(tocLinks, currentActive, direction) {
  const currentIndex = currentActive ? 
    Array.from(tocLinks).indexOf(currentActive) : -1;
  
  let nextIndex = currentIndex + direction;
  
  // Wrap around
  if (nextIndex >= tocLinks.length) nextIndex = 0;
  if (nextIndex < 0) nextIndex = tocLinks.length - 1;
  
  if (tocLinks[nextIndex]) {
    tocLinks[nextIndex].click();
  }
}

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
  const hash = window.location.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

// Initialize reading progress indicator (optional enhancement)
function initializeReadingProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(to right, #2563eb, #7c3aed);
    z-index: 1000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  function updateProgress() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    
    progressBar.style.width = Math.min(scrollPercent, 100) + '%';
  }
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// Initialize reading progress on load
document.addEventListener('DOMContentLoaded', initializeReadingProgress);