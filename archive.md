---
layout: default
title: Archive
permalink: /archive/
---

# Post Archive

<div class="archive-container">
  {% for post in site.posts %}
    {% assign currentdate = post.date | date: "%Y" %}
    {% if currentdate != date %}
      {% unless forloop.first %}</div>{% endunless %}
      <h2 class="archive-year">{{ currentdate }}</h2>
      <div class="archive-posts">
      {% assign date = currentdate %}
    {% endif %}
    
    <article class="archive-post">
      <div class="archive-date">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %d" }}</time>
      </div>
      <div class="archive-content">
        <h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
        {% if post.categories.size > 0 %}
          <div class="archive-categories">
            {% for category in post.categories %}
              <span class="category-tag">{{ category }}</span>
            {% endfor %}
          </div>
        {% endif %}
      </div>
    </article>
    
    {% if forloop.last %}</div>{% endif %}
  {% endfor %}
</div>

<style>
.archive-container {
  max-width: 800px;
  margin: 0 auto;
}

.archive-year {
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
  margin: 2rem 0 1rem 0;
}

.archive-posts {
  margin-bottom: 2rem;
}

.archive-post {
  display: flex;
  align-items: flex-start;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.archive-post:hover {
  background-color: #f8f9fa;
  padding-left: 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  border-radius: 0.25rem;
}

.archive-date {
  flex-shrink: 0;
  width: 80px;
  margin-right: 1rem;
  text-align: right;
}

.archive-date time {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.archive-content {
  flex-grow: 1;
}

.archive-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
}

.archive-content h3 a {
  color: #333;
  text-decoration: none;
}

.archive-content h3 a:hover {
  color: #667eea;
}

.archive-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

.category-tag {
  background: #e9ecef;
  color: #495057;
  padding: 0.1rem 0.4rem;
  border-radius: 0.2rem;
  font-size: 0.75rem;
  text-transform: capitalize;
}

@media (max-width: 600px) {
  .archive-post {
    flex-direction: column;
  }
  
  .archive-date {
    width: auto;
    margin-right: 0;
    margin-bottom: 0.25rem;
    text-align: left;
  }
}
</style>