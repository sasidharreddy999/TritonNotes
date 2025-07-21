---
layout: page
title: Notes
permalink: /notes/
---

# All Notes

Browse through the collection of notes organized by category and topic.

## Categories

{% assign categories = site.notes | map: 'category' | uniq | sort %}
{% for category in categories %}
### {{ category }}

{% assign notes_in_category = site.notes | where: 'category', category %}
{% for note in notes_in_category %}
- [{{ note.title }}]({{ note.url }}) 
  {% if note.tags %}
    {% for tag in note.tags %}
      <span class="tag">{{ tag }}</span>
    {% endfor %}
  {% endif %}
  {% if note.last_updated %}
    <br><small>Updated: {{ note.last_updated | date: "%B %d, %Y" }}</small>
  {% endif %}
{% endfor %}

{% endfor %}

---

## All Notes (Alphabetical)

{% assign sorted_notes = site.notes | sort: 'title' %}
{% for note in sorted_notes %}
- [{{ note.title }}]({{ note.url }}) - {{ note.category }}
{% endfor %}