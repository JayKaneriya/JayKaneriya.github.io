# Jay Kaneriya — Portfolio

Personal portfolio of **Jay Kaneriya**, Senior Full Stack Developer (Laravel · Vue.js · React.js), based in Rajkot, India.

**Live site:** https://jaykaneriya.github.io

## Features

- Dark, animated single-page design (GSAP ScrollTrigger + Lenis smooth scroll)
- Animated character intro with optional voice introduction (Web Speech API, plays on click only)
- Pinned horizontal-scroll project gallery on desktop, vertical on mobile
- Bento-grid tech stack, glassmorphism cards, magnetic buttons, custom cursor
- Full SEO: JSON-LD structured data, Open Graph card, sitemap, robots.txt
- Respects `prefers-reduced-motion`; full `noscript` fallback

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire site (single file: HTML + CSS + JS) |
| `cv.html` | Source for the CV — edit this, then re-print to PDF |
| `Jay_Kaneriya_CV_2026.pdf` | Generated CV served by the Download CV button |
| `og-card.html` | Source for the social preview image (`og-image.jpg`) |
| `jay-avatar.jpg` / `jay-avatar-talk.jpg` | Character frames (closed / open mouth) |
| `logo.svg` | Vector logo — favicons are exported from this |
| `backup/` | Previous versions (not part of the live site) |

## Regenerating the CV

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="Jay_Kaneriya_CV_2026.pdf" "file:///<full-path>/cv.html"
```

## Contact

- **Email:** jay.kaneriya8@gmail.com
- **LinkedIn:** [linkedin.com/in/jaykaneriya](https://www.linkedin.com/in/jaykaneriya/)
- **GitHub:** [github.com/JayKaneriya](https://github.com/JayKaneriya)
