---
layout: home
title: Welcome to TritonNotes
---

# Welcome to TritonNotes 🌊

Your comprehensive collection of computer science and engineering notes, tutorials, and resources.

## What you'll find here:

- **Course Notes**: Detailed notes from various CS and engineering courses
- **Tutorials**: Step-by-step guides for programming concepts and tools
- **Resources**: Helpful references, cheat sheets, and documentation
- **Projects**: Code examples and project walkthroughs

## Latest Posts

{% if site.posts.size > 0 %}
  <div class="posts-list">
    {% for post in site.posts limit:5 %}
      <article class="post-preview">
        <h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
          {% if post.categories.size > 0 %}
            in {{ post.categories | join: ", " }}
          {% endif %}
        </p>
        <div class="post-excerpt">
          {{ post.excerpt }}
        </div>
        <p><a href="{{ post.url | relative_url }}">Read more →</a></p>
      </article>
    {% endfor %}
  </div>
  
  {% if site.posts.size > 5 %}
    <p><a href="/archive/">View all posts →</a></p>
  {% endif %}
{% else %}
  <p>No posts yet. Check back soon!</p>
{% endif %}

## Latest Notes

Check out the [Notes](/notes) section for organized topics and tutorials.

---

*This site is built with Jekyll and hosted on GitHub Pages. All content is open source and available on [GitHub](https://github.com/sasidharreddy999/TritonNotes).*