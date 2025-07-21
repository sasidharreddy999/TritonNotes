// Simple Table of Contents Generator for Post Layout
document.addEventListener('DOMContentLoaded', function() {
  generateSimpleTOC();
  initializeScrollspy();
  initializeSmoothScrolling();
});

// Generate a simple, flat table of contents
function generateSimpleTOC() {
  const toc = document.getElementById('toc');
  const headings = document.querySelectorAll('.linear-article h2, .linear-article h3, .linear-article h4');
  
  if (!toc || headings.length === 0) {
    const tocContainer = document.querySelector('.table-of-contents');
    if (tocContainer) {
      tocContainer.style.display = 'none';
    }
    return;
  }
  
  let tocHTML = '<ul>';
  
  headings.forEach(function(heading, index) {
    const id = 'heading-' + index;
    heading.id = id;
    const level = parseInt(heading.tagName.substring(1));
    const levelClass = 'toc-h' + level;
    
    tocHTML += `<li class="${levelClass}">
      <a href="#${id}">${heading.textContent.trim()}</a>
    </li>`;
  });
  
  tocHTML += '</ul>';
  toc.innerHTML = tocHTML;
}

// Simple TOC toggle
function toggleTOC() {
  const content = document.getElementById('toc-content');
  const toggle = document.getElementById('toc-toggle');
  
  if (!content || !toggle) return;
  
  if (content.style.display === 'none') {
    content.style.display = 'block';
    toggle.textContent = '−';
  } else {
    content.style.display = 'none';
    toggle.textContent = '+';
  }
}

// Initialize scrollspy for active heading highlighting
function initializeScrollspy() {
  let ticking = false;
  
  function updateActiveHeading() {
    const headings = document.querySelectorAll('.linear-article h2, .linear-article h3, .linear-article h4');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    let activeHeading = null;
    let closestDistance = Infinity;
    
    // Find the heading closest to the top of the viewport
    headings.forEach(function(heading) {
      const rect = heading.getBoundingClientRect();
      const distance = Math.abs(rect.top - 100);
      
      if (rect.top <= 150 && distance < closestDistance) {
        activeHeading = heading;
        closestDistance = distance;
      }
    });
    
    // Remove active class from all links
    tocLinks.forEach(function(link) {
      link.classList.remove('active');
    });
    
    // Add active class to current heading
    if (activeHeading) {
      const activeLink = document.querySelector(`a[href="#${activeHeading.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
        
        // Scroll the TOC to show the active link
        const tocContent = document.querySelector('.toc-content');
        if (tocContent) {
          const linkRect = activeLink.getBoundingClientRect();
          const tocRect = tocContent.getBoundingClientRect();
          
          if (linkRect.bottom > tocRect.bottom || linkRect.top < tocRect.top) {
            activeLink.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }
        }
      }
    }
    
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateActiveHeading);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll);
  // Initial call
  updateActiveHeading();
}

// Simple smooth scrolling for TOC links
function initializeSmoothScrolling() {
  document.addEventListener('click', function(e) {
    if (e.target.matches('.table-of-contents a')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update URL without triggering scroll
        history.replaceState(null, null, '#' + targetId);
      }
    }
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Toggle TOC with 'T' key
  if (e.key === 't' || e.key === 'T') {
    if (!e.target.matches('input, textarea')) {
      e.preventDefault();
      toggleTOC();
    }
  }
});

// Initialize TOC state
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toc-toggle');
  if (toggle) {
    toggle.textContent = '−'; // Start expanded
  }
});