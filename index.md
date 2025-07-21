---
layout: home
title: Welcome to TritonNotes
---

<div class="hero-section">
  <h1>Welcome to TritonNotes 🌊</h1>
  <p class="hero-subtitle">Your comprehensive collection of computer science and engineering notes, tutorials, and resources.</p>
</div>

<div class="features-grid">
  <div class="feature-card">
    <div class="feature-icon">📚</div>
    <h3>Course Notes</h3>
    <p>Detailed notes from various CS and engineering courses, organized and searchable.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🎯</div>
    <h3>Tutorials</h3>
    <p>Step-by-step guides for programming concepts, tools, and best practices.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🔧</div>
    <h3>Resources</h3>
    <p>Helpful references, cheat sheets, and documentation for quick lookup.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">💻</div>
    <h3>Projects</h3>
    <p>Code examples, project walkthroughs, and implementation guides.</p>
  </div>
</div>

## Latest Posts

{% if site.posts.size > 0 %}
  <div class="posts-list">
    {% for post in site.posts limit:5 %}
      <article class="post-preview fade-in">
        <h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
          {% if post.categories.size > 0 %}
            <span class="category-badge">{{ post.categories | join: ", " }}</span>
          {% endif %}
        </p>
        <div class="post-excerpt">
          {{ post.excerpt }}
        </div>
        <a href="{{ post.url | relative_url }}" class="btn read-more">Read more →</a>
      </article>
    {% endfor %}
  </div>
  
  {% if site.posts.size > 5 %}
    <div class="view-all">
      <a href="/archive/" class="btn">View all posts</a>
    </div>
  {% endif %}
{% else %}
  <div class="empty-state">
    <div class="empty-icon">📝</div>
    <h3>No posts yet</h3>
    <p>Check back soon for new content!</p>
  </div>
{% endif %}

## Quick Access

<div class="quick-links">
  <a href="/notes/" class="quick-link">
    <div class="quick-link-icon">📖</div>
    <div>
      <h4>Browse Notes</h4>
      <p>Explore organized topics and tutorials</p>
    </div>
  </a>
  
  <a href="https://github.com/sasidharreddy999/TritonNotes" class="quick-link">
    <div class="quick-link-icon">⚡</div>
    <div>
      <h4>Contribute</h4>
      <p>Help improve and expand the knowledge base</p>
    </div>
  </a>
</div>

---

<div class="footer-note">
  <p><em>This site is built with Jekyll and hosted on GitHub Pages. All content is open source and available on <a href="https://github.com/sasidharreddy999/TritonNotes">GitHub</a>.</em></p>
</div>