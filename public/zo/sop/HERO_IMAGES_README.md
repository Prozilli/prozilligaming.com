# SOP Hero Images - Implementation Guide

## Current Status

All 5 SOP pages now have enhanced SVG hero images with department-specific themes:

### Implemented Hero Images

1. **LSPD** (`lspd.html`) - Los Santos cityscape with police badge
2. **BCSO** (`bcso.html`) - Desert landscape with sheriff star
3. **SASP** (`sasp.html`) - Highway scene with state trooper badge
4. **EMS** (`ems.html`) - Hospital building with medical cross and heartbeat line
5. **DOJ** (`doj.html`) - Courthouse with justice scales

All hero images are inline SVG embedded in the `style` attribute of the `.hero-section` div using data URIs. They feature:
- Department-specific color schemes
- Subtle background elements (buildings, landscapes, vehicles)
- Department badges/emblems at 25% opacity
- Professional gradient overlays for text readability
- Responsive design (300px desktop, 200px mobile)

## File Locations

- `/Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/lspd.html`
- `/Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/bcso.html`
- `/Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/sasp.html`
- `/Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/ems.html`
- `/Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/doj.html`

## Upgrading to Real Images

To replace the SVG placeholders with actual photographic images, use these AI generation prompts:

### LSPD Hero Image Prompt

```
Cinematic photograph of Los Santos downtown skyline at night, modern city buildings with illuminated windows, police car with red and blue emergency lights in foreground, professional law enforcement aesthetic, dark moody atmosphere, shallow depth of field, high contrast lighting, police badge subtly visible, urban environment, photorealistic style, 1920x600px aspect ratio, cinematic color grading with deep blues and reds, professional photography --ar 16:5 --style cinematic
```

**Keywords:** Los Santos, LSPD, police car, city skyline, night scene, emergency lights, urban patrol, badge
**Colors:** Dark red (#a30000), dark blue (#0a4a9e), gold accents (#c4a265)
**Style:** Urban, professional, cinematic night photography

### BCSO Hero Image Prompt

```
Wide-angle photograph of desert landscape at sunset, Blaine County rural setting, sheriff patrol vehicle on dusty road, desert mountains in background, saguaro cacti silhouettes, golden hour lighting, warm earthy tones, sheriff star badge subtly integrated, professional law enforcement aesthetic, expansive sky, dust particles in air, photorealistic western style, 1920x600px aspect ratio --ar 16:5 --style cinematic
```

**Keywords:** Desert, Blaine County, sheriff, rural patrol, mountains, sunset, western, badge
**Colors:** Brown/gold (#8B7355), desert sand (#d4a574), dark earth tones
**Style:** Western, rural, golden hour photography

### SASP Hero Image Prompt

```
Dynamic photograph of California highway at dusk, state police patrol car on freeway, checkered pattern on vehicle visible, highway stretching into distance, motion blur effect, professional state trooper aesthetic, blue emergency lights reflecting on road, mountain landscape in background, clean modern composition, photorealistic style, 1920x600px aspect ratio, high-speed pursuit aesthetic --ar 16:5 --style cinematic
```

**Keywords:** Highway patrol, state police, freeway, checkered pattern, California, trooper, speed
**Colors:** Royal blue (#4169e1), white checkers, gray asphalt
**Style:** Dynamic, motion, modern patrol photography

### EMS Hero Image Prompt

```
Professional photograph of Pillbox Medical Center exterior at twilight, modern hospital building with illuminated windows, ambulance with green emergency lights in front, medical cross symbol visible, clean medical aesthetic, professional healthcare setting, Los Santos architecture, emergency department entrance, photorealistic style, 1920x600px aspect ratio, soft medical lighting with green accents --ar 16:5 --style professional
```

**Keywords:** Hospital, ambulance, EMS, medical center, emergency, healthcare, green lights, medical cross
**Colors:** Medical green (#2ecc71), white hospital facade, soft lighting
**Style:** Professional medical photography, clean and modern

### DOJ Hero Image Prompt

```
Majestic photograph of San Andreas courthouse building, neoclassical architecture with columns, justice scales symbol subtly integrated, formal government building aesthetic, golden hour lighting on facade, marble pillars, grand staircase, professional legal setting, photorealistic style, 1920x600px aspect ratio, elegant composition with gold and bronze accents --ar 16:5 --style architectural
```

**Keywords:** Courthouse, justice scales, legal, government building, columns, marble, formal, architecture
**Colors:** Bronze/gold (#e67e22), marble white, judicial gold (#c4a265)
**Style:** Architectural photography, formal and elegant

## Technical Specifications

### Image Requirements
- **Dimensions:** 1920x600px (16:5 aspect ratio)
- **Format:** WebP (for web performance) or JPG/PNG as fallback
- **File size:** Target 100-200KB after optimization
- **Color profile:** sRGB
- **Quality:** 85% compression for WebP

### Integration Steps

1. Generate images using the prompts above (DALL-E 3, Midjourney, Leonardo AI, etc.)
2. Save images to `/Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/images/`
3. Name format: `hero-[dept].webp` (e.g., `hero-lspd.webp`, `hero-bcso.webp`)
4. Replace SVG data URI in each HTML file:

```html
<!-- BEFORE (SVG) -->
<div class="hero-section" style="background: radial-gradient(...), url('data:image/svg+xml,...');">

<!-- AFTER (Real Image) -->
<div class="hero-section" style="background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('images/hero-lspd.webp');">
```

### Recommended Overlay Configuration

To maintain text readability over photographic images, use these overlay gradients:

```css
/* LSPD - Dark red overlay */
background: linear-gradient(135deg, rgba(163,0,0,0.7) 0%, rgba(13,13,13,0.9) 50%, rgba(163,0,0,0.7) 100%), url('images/hero-lspd.webp');

/* BCSO - Desert gold overlay */
background: linear-gradient(135deg, rgba(139,115,85,0.7) 0%, rgba(13,13,13,0.9) 50%, rgba(139,115,85,0.7) 100%), url('images/hero-bcso.webp');

/* SASP - State blue overlay */
background: linear-gradient(135deg, rgba(65,105,225,0.7) 0%, rgba(13,13,13,0.9) 50%, rgba(65,105,225,0.7) 100%), url('images/hero-sasp.webp');

/* EMS - Medical green overlay */
background: linear-gradient(135deg, rgba(46,204,113,0.7) 0%, rgba(13,13,13,0.9) 50%, rgba(46,204,113,0.7) 100%), url('images/hero-ems.webp');

/* DOJ - Justice gold overlay */
background: linear-gradient(135deg, rgba(230,126,34,0.7) 0%, rgba(13,13,13,0.9) 50%, rgba(230,126,34,0.7) 100%), url('images/hero-doj.webp');
```

## Alternative Image Sources

If AI generation isn't available, consider these options:

1. **Stock Photography**
   - Unsplash: Search "police car city night", "desert sheriff", "highway patrol"
   - Pexels: Free high-quality emergency services photos
   - Pixabay: Public domain law enforcement images

2. **GTA V Screenshots**
   - Capture in-game screenshots from ZO Syndicate server
   - Use ReShade/ENB for cinematic enhancement
   - Match department color schemes in post-processing

3. **Custom Photography**
   - Commission photographer for custom department-themed shoots
   - Create mockups with department vehicles/locations
   - Brand with ZSR/Prozilli logos in post-production

## Brand Consistency

All hero images should maintain:
- **Prozilli Entertainment** branding (gold #c4a265)
- **ZO Syndicate RP** server identity
- Professional law enforcement/medical aesthetic
- Dark, moody, cinematic color grading
- Department-specific color accents
- Subtle badge/emblem integration (25% opacity)

## Performance Optimization

After adding real images:
1. Run through TinyPNG/Squoosh.app for compression
2. Generate WebP and fallback formats
3. Add lazy loading attribute: `loading="lazy"`
4. Consider responsive images with `srcset` for mobile
5. Preload hero images for above-the-fold content

## Current Implementation Details

### HTML Structure
```html
<!-- Hero Image Section -->
<div class="hero-section" style="background: [gradients and SVG data URI];">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">[Department Name]</h1>
    <p class="hero-subtitle">Excellence • Integrity • Service</p>
  </div>
</div>
```

### CSS Classes
- `.hero-section` - Main container (300px height desktop, 200px mobile)
- `.hero-overlay` - Gradient overlay for text readability
- `.hero-content` - Text content container
- `.hero-title` - Department name (48px font)
- `.hero-subtitle` - Motto text (18px font)

All styling is inline in `<style>` tags within each HTML file.

## Maintenance

- Update this README when hero images are changed
- Document any new departments/divisions added
- Keep backup of SVG versions for fallback
- Test hero images on multiple devices/browsers
- Verify accessibility (contrast ratios, alt text)

---

**Last Updated:** February 11, 2026
**Version:** 1.0 (SVG Placeholders)
**Next Step:** Generate photographic hero images using AI prompts above
