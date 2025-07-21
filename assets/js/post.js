// Table of Contents Generator and Post Navigation
document.addEventListener('DOMContentLoaded', function() {
  generateTableOfContents();
  initializeScrollspy();
  initializeSmoothScrolling();
});

// Generate table of contents
function generateTableOfContents() {
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
  let openSections = []; // Track open sections
  
  headings.forEach(function(heading, index) {
    const id = 'heading-' + index;
    heading.id = id;
    const level = parseInt(heading.tagName.substring(1));
    const indent = level === 3 ? 'toc-h3' : level === 4 ? 'toc-h4' : '';
    
    // Close previous sections if needed
    while (openSections.length > 0 && openSections[openSections.length - 1] >= level) {
      tocHTML += '</ul></li>';
      openSections.pop();
    }
    
    // Add collapsible functionality for h2 headings
    if (level === 2) {
      tocHTML += `<li class="toc-section">
        <div class="toc-section-header" onclick="toggleSection(this)">
          <span class="toc-arrow">▶</span>
          <a href="#${id}">${heading.textContent}</a>
        </div>
        <ul class="toc-subsection">`;
      openSections.push(level);
    } else {
      tocHTML += `<li class="${indent}"><a href="#${id}">${heading.textContent}</a></li>`;
    }
  });
  
  // Close all remaining open sections
  while (openSections.length > 0) {
    tocHTML += '</ul></li>';
    openSections.pop();
  }
  
  tocHTML += '</ul>';
  toc.innerHTML = tocHTML;
}

// Toggle table of contents visibility
function toggleTOC() {
  const content = document.getElementById('toc-content');
  const toggle = document.getElementById('toc-toggle');
  
  if (!content || !toggle) return;
  
  if (content.style.display === 'none') {
    content.style.display = 'block';
    toggle.textContent = '▼';
    toggle.style.transform = 'rotate(0deg)';
  } else {
    content.style.display = 'none';
    toggle.textContent = '▶';
    toggle.style.transform = 'rotate(-90deg)';
  }
}

// Toggle individual sections in TOC
function toggleSection(header) {
  const arrow = header.querySelector('.toc-arrow');
  const subsection = header.parentElement.querySelector('.toc-subsection');
  
  if (!arrow || !subsection) return;
  
  if (subsection.style.display === 'none') {
    subsection.style.display = 'block';
    arrow.textContent = '▼';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    subsection.style.display = 'none';
    arrow.textContent = '▶';
    arrow.style.transform = 'rotate(-90deg)';
  }
}

// Initialize scrollspy for active heading highlighting
function initializeScrollspy() {
  let ticking = false;
  
  function updateActiveHeading() {
    const headings = document.querySelectorAll('.linear-article h2, .linear-article h3, .linear-article h4');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    let activeHeading = null;
    
    headings.forEach(function(heading) {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 100) {
        activeHeading = heading;
      }
    });
    
    // Remove active class from all links
    tocLinks.forEach(function(link) {
      link.classList.remove('active');
      link.parentElement.classList.remove('active');
    });
    
    // Add active class to current heading
    if (activeHeading) {
      const activeLink = document.querySelector(`a[href="#${activeHeading.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
        activeLink.parentElement.classList.add('active');
        
        // Expand parent section if needed
        const sectionHeader = activeLink.closest('.toc-section')?.querySelector('.toc-section-header');
        if (sectionHeader) {
          const subsection = sectionHeader.parentElement.querySelector('.toc-subsection');
          const arrow = sectionHeader.querySelector('.toc-arrow');
          if (subsection && arrow && subsection.style.display === 'none') {
            subsection.style.display = 'block';
            arrow.textContent = '▼';
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

// Initialize smooth scrolling for TOC links
function initializeSmoothScrolling() {
  document.addEventListener('click', function(e) {
    if (e.target.matches('.table-of-contents a')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update URL without triggering scroll
        history.pushState(null, null, '#' + targetId);
      }
    }
  });
}

// Sidebar scroll position persistence
function saveSidebarScrollPosition() {
  const sidebar = document.querySelector('.post-sidebar');
  if (sidebar) {
    sessionStorage.setItem('sidebarScrollTop', sidebar.scrollTop);
  }
}

function restoreSidebarScrollPosition() {
  const sidebar = document.querySelector('.post-sidebar');
  const savedScrollTop = sessionStorage.getItem('sidebarScrollTop');
  if (sidebar && savedScrollTop) {
    sidebar.scrollTop = parseInt(savedScrollTop);
  }
}

// Save scroll position before page unload
window.addEventListener('beforeunload', saveSidebarScrollPosition);

// Restore scroll position after page load
window.addEventListener('load', restoreSidebarScrollPosition);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  // Toggle TOC with 'T' key
  if (e.key === 't' || e.key === 'T') {
    if (!e.target.matches('input, textarea')) {
      e.preventDefault();
      toggleTOC();
    }
  }
  
  // Navigate to next/previous sections with arrow keys
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (!e.target.matches('input, textarea')) {
      const activeLink = document.querySelector('.table-of-contents a.active');
      if (activeLink) {
        e.preventDefault();
        const allLinks = Array.from(document.querySelectorAll('.table-of-contents a'));
        const currentIndex = allLinks.indexOf(activeLink);
        
        let targetIndex;
        if (e.key === 'ArrowUp' && currentIndex > 0) {
          targetIndex = currentIndex - 1;
        } else if (e.key === 'ArrowDown' && currentIndex < allLinks.length - 1) {
          targetIndex = currentIndex + 1;
        }
        
        if (targetIndex !== undefined) {
          allLinks[targetIndex].click();
        }
      }
    }
  }
});

// Print functionality
function initializePrintStyles() {
  const printButton = document.createElement('button');
  printButton.innerHTML = '🖨️ Print';
  printButton.className = 'btn print-btn';
  printButton.style.position = 'fixed';
  printButton.style.bottom = '2rem';
  printButton.style.right = '2rem';
  printButton.style.zIndex = '1000';
  printButton.onclick = window.print;
  
  document.body.appendChild(printButton);
}

// Initialize print functionality
document.addEventListener('DOMContentLoaded', initializePrintStyles);