// Enhanced Table of Contents Generator for Fixed Sidebar Layout
document.addEventListener('DOMContentLoaded', function() {
  generateFixedTOC();
  initializeTopicExpansion();
  initializeScrollspy();
  initializeSmoothScrolling();
});

// Generate a fixed table of contents with expansion functionality
function generateFixedTOC() {
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
  let currentH2 = null;
  let h2SubTopics = [];
  
  headings.forEach(function(heading, index) {
    const id = 'heading-' + index;
    heading.id = id;
    const level = parseInt(heading.tagName.substring(1));
    const levelClass = 'toc-h' + level;
    
    if (level === 2) {
      // Close previous H2 subtopics if any
      if (currentH2 !== null && h2SubTopics.length > 0) {
        tocHTML += '<div class="subtopics" data-parent="' + currentH2 + '">';
        h2SubTopics.forEach(function(subtopic) {
          tocHTML += subtopic;
        });
        tocHTML += '</div>';
        h2SubTopics = [];
      }
      
      // Add H2 as main topic
      currentH2 = id;
      tocHTML += `<li class="${levelClass}">
        <a href="#${id}" class="topic-link" data-topic="${id}">${heading.textContent.trim()}</a>
      </li>`;
    } else if (level === 3 || level === 4) {
      // Add H3/H4 as subtopics
      h2SubTopics.push(`<li class="${levelClass}">
        <a href="#${id}">${heading.textContent.trim()}</a>
      </li>`);
    }
  });
  
  // Close final H2 subtopics if any
  if (currentH2 !== null && h2SubTopics.length > 0) {
    tocHTML += '<div class="subtopics" data-parent="' + currentH2 + '">';
    h2SubTopics.forEach(function(subtopic) {
      tocHTML += subtopic;
    });
    tocHTML += '</div>';
  }
  
  tocHTML += '</ul>';
  toc.innerHTML = tocHTML;
}

// Initialize topic expansion functionality
function initializeTopicExpansion() {
  let currentlyExpanded = null;
  
  // Handle topic clicks
  document.addEventListener('click', function(e) {
    if (e.target.matches('.topic-link')) {
      e.preventDefault();
      
      const topicId = e.target.getAttribute('data-topic');
      const subtopicsDiv = document.querySelector(`[data-parent="${topicId}"]`);
      
      if (!subtopicsDiv) return;
      
      // Collapse previously expanded topic
      if (currentlyExpanded && currentlyExpanded !== topicId) {
        const prevSubtopics = document.querySelector(`[data-parent="${currentlyExpanded}"]`);
        const prevTopicLink = document.querySelector(`[data-topic="${currentlyExpanded}"]`);
        
        if (prevSubtopics) {
          prevSubtopics.classList.remove('expanded');
        }
        if (prevTopicLink) {
          prevTopicLink.classList.remove('expanded');
        }
      }
      
      // Toggle current topic
      if (currentlyExpanded === topicId) {
        // Collapse current topic
        subtopicsDiv.classList.remove('expanded');
        e.target.classList.remove('expanded');
        currentlyExpanded = null;
      } else {
        // Expand current topic
        subtopicsDiv.classList.add('expanded');
        e.target.classList.add('expanded');
        currentlyExpanded = topicId;
      }
      
      // Scroll to the heading
      const targetElement = document.getElementById(topicId);
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update URL
        history.replaceState(null, null, '#' + topicId);
      }
    }
  });
}

// Enhanced scrollspy for active heading highlighting
function initializeScrollspy() {
  let ticking = false;
  
  function updateActiveHeading() {
    const headings = document.querySelectorAll('.linear-article h2, .linear-article h3, .linear-article h4');
    const tocLinks = document.querySelectorAll('.toc-content-fixed a');
    
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
        
        // Auto-expand parent topic if it's a subtopic
        const parentSubtopics = activeLink.closest('.subtopics');
        if (parentSubtopics && !parentSubtopics.classList.contains('expanded')) {
          const parentId = parentSubtopics.getAttribute('data-parent');
          const parentTopicLink = document.querySelector(`[data-topic="${parentId}"]`);
          
          // Collapse any currently expanded topic first
          const currentExpanded = document.querySelector('.topic-link.expanded');
          if (currentExpanded && currentExpanded !== parentTopicLink) {
            const currentSubtopics = document.querySelector(`[data-parent="${currentExpanded.getAttribute('data-topic')}"]`);
            if (currentSubtopics) {
              currentSubtopics.classList.remove('expanded');
              currentExpanded.classList.remove('expanded');
            }
          }
          
          // Expand the parent topic
          if (parentTopicLink) {
            parentSubtopics.classList.add('expanded');
            parentTopicLink.classList.add('expanded');
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

// Enhanced smooth scrolling for all TOC links
function initializeSmoothScrolling() {
  document.addEventListener('click', function(e) {
    if (e.target.matches('.toc-content-fixed a') && !e.target.matches('.topic-link')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update URL
        history.replaceState(null, null, '#' + targetId);
      }
    }
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Collapse all topics with 'C' key
  if (e.key === 'c' || e.key === 'C') {
    if (!e.target.matches('input, textarea')) {
      e.preventDefault();
      const expandedTopics = document.querySelectorAll('.topic-link.expanded');
      const expandedSubtopics = document.querySelectorAll('.subtopics.expanded');
      
      expandedTopics.forEach(function(topic) {
        topic.classList.remove('expanded');
      });
      
      expandedSubtopics.forEach(function(subtopic) {
        subtopic.classList.remove('expanded');
      });
    }
  }
  
  // Navigate between topics with arrow keys
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (!e.target.matches('input, textarea')) {
      e.preventDefault();
      const topicLinks = document.querySelectorAll('.topic-link');
      const currentActive = document.querySelector('.topic-link.expanded') || topicLinks[0];
      const currentIndex = Array.from(topicLinks).indexOf(currentActive);
      
      let nextIndex;
      if (e.key === 'ArrowUp') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : topicLinks.length - 1;
      } else {
        nextIndex = currentIndex < topicLinks.length - 1 ? currentIndex + 1 : 0;
      }
      
      if (topicLinks[nextIndex]) {
        topicLinks[nextIndex].click();
      }
    }
  }
});

// Initialize with all topics collapsed
document.addEventListener('DOMContentLoaded', function() {
  // Ensure all subtopics start collapsed
  setTimeout(function() {
    const allSubtopics = document.querySelectorAll('.subtopics');
    const allTopicLinks = document.querySelectorAll('.topic-link');
    
    allSubtopics.forEach(function(subtopic) {
      subtopic.classList.remove('expanded');
    });
    
    allTopicLinks.forEach(function(link) {
      link.classList.remove('expanded');
    });
  }, 100);
});