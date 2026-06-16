# Piano Decoded — Harmony Glossary

A hierarchical music theory reference. Every concept links to its prerequisites so you can trace the stack as deep as you need.

## Structure

```
index.html          — concept listing
style.css           — shared styles
concepts/           — one HTML file per concept
```

## Adding a concept

1. Create `concepts/your-concept.html` — copy any existing page as a template
2. Add prerequisites in the `.prereqs` block (link to the concepts this one depends on)
3. Add an entry to `index.html`

That's it. No build step, no framework, no database.

## Hosting

Hosted via GitHub Pages. Push to `main` and it deploys automatically.
