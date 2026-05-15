# Arvyonix

Arvyonix is a single-page marketing website for an AI-powered automation and data intelligence brand. It is built with plain HTML, CSS, and JavaScript (no framework/build step required).

## Overview

The site highlights:
- AI-focused services (data annotation, process automation, human-in-the-loop AI, ML pipelines, enterprise integration, QA)
- Team and company information
- Process and feature sections
- Contact form behavior using `mailto:`

## Tech Stack

- **HTML5** (`index.html`)
- **CSS3** (`style.css`)
- **Vanilla JavaScript** (`script.js`)
- External assets via CDN:
  - Google Fonts
  - Font Awesome

## Project Structure

```text
/home/runner/work/Arvyonix/Arvyonix
├── index.html          # Main landing page
├── style.css           # Site styling and responsive layout
├── script.js           # UI interactions and animations
├── logo-export.html    # Utility page for logo export previews
└── arvyonix-logo.png   # Brand logo asset
```

## Run Locally

Because this is a static site, you can run it in either of these ways:

1. **Open directly in browser**
   - Open `index.html` in your browser.

2. **Serve with a local static server (recommended)**
   - Python:
     ```bash
     cd /home/runner/work/Arvyonix/Arvyonix
     python3 -m http.server 8080
     ```
   - Then visit `http://localhost:8080`.

## Interactive Behaviors

`script.js` provides:
- Sticky/scrolled navbar styling
- Mobile menu toggle
- Typewriter animation in hero section
- Animated stat counters
- IntersectionObserver-based fade-in reveal animations
- Contact form `mailto:` submission handling

## Notes

- No package manager, build pipeline, or automated test/lint setup is currently configured.
- Social links in the page are placeholders (`#`) in several sections.
