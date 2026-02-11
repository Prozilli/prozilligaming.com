# Quick Update Guide - SOP Hero Images

## How to Replace Hero Images (60 Second Guide)

### Option A: Update to Real Photo

1. **Get Your Image** (1920x600px recommended)
   - AI generate using prompts in `HERO_IMAGES_README.md`
   - Or use stock photo from Unsplash/Pexels
   - Or capture GTA V screenshot

2. **Save Image**
   ```bash
   # Create images directory if it doesn't exist
   mkdir -p /Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/images

   # Save your image (WebP preferred)
   cp your-lspd-hero.webp /Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/images/hero-lspd.webp
   ```

3. **Update HTML** (Find the hero section in the file)
   ```html
   <!-- FIND THIS: -->
   <div class="hero-section" style="background: radial-gradient(circle at center, rgba(163,0,0,0.3) 0%, transparent 70%), url('data:image/svg+xml,...');">

   <!-- REPLACE WITH: -->
   <div class="hero-section" style="background: linear-gradient(135deg, rgba(163,0,0,0.7) 0%, rgba(13,13,13,0.9) 50%, rgba(163,0,0,0.7) 100%), url('images/hero-lspd.webp');">
   ```

4. **Test** - Open the HTML file in browser and verify

### Option B: Update SVG Design

1. **Open the HTML file** (e.g., `lspd.html`)

2. **Find the hero section** (search for `<!-- Hero Image Section -->`)

3. **Edit the SVG data URI** - It's the part after `url('data:image/svg+xml,...')`

4. **Use this SVG encoder** - https://yoksel.github.io/url-encoder/

5. **Paste your new SVG** → Copy encoded result → Replace old data URI

6. **Save and test**

## File Locations Quick Reference

```
/Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/
├── lspd.html           # LSPD SOP + Hero Image (Line 337)
├── bcso.html           # BCSO SOP + Hero Image (Line 435)
├── sasp.html           # SASP SOP + Hero Image (Line 394)
├── ems.html            # EMS SOP + Hero Image (Line 394)
├── doj.html            # DOJ SOP + Hero Image (Line 394)
├── images/             # (Create this folder for photos)
│   ├── hero-lspd.webp
│   ├── hero-bcso.webp
│   ├── hero-sasp.webp
│   ├── hero-ems.webp
│   └── hero-doj.webp
├── HERO_IMAGES_README.md       # Full documentation
├── IMPLEMENTATION_SUMMARY.md   # What was done
└── QUICK_UPDATE_GUIDE.md       # This file
```

## Hero Section Template

Copy this template and fill in your values:

```html
<!-- Hero Image Section -->
<div class="hero-section" style="background: radial-gradient(circle at center, rgba([R],[G],[B],0.3) 0%, transparent 70%), url('[IMAGE_URL]');">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">[DEPARTMENT_NAME]</h1>
    <p class="hero-subtitle">Excellence • Integrity • Service</p>
  </div>
</div>
```

**Values:**
- `[R],[G],[B]` - Department primary color (see table below)
- `[IMAGE_URL]` - Either SVG data URI or `images/hero-[dept].webp`
- `[DEPARTMENT_NAME]` - Full department name

## Department Colors Cheat Sheet

| Department | RGB Color | Hex Code | Usage |
|------------|-----------|----------|-------|
| LSPD | 163,0,0 | #a30000 | Dark red for cityscape |
| BCSO | 139,115,85 | #8B7355 | Brown for desert |
| SASP | 65,105,225 | #4169e1 | Royal blue for highway |
| EMS | 46,204,113 | #2ecc71 | Medical green |
| DOJ | 230,126,34 | #e67e22 | Bronze/orange for justice |

## One-Line Commands

### Generate image directory
```bash
mkdir -p /Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/images
```

### Open SOP in browser (macOS)
```bash
open /Users/widlersanon/Projects/prozilligaming.com/public/zo/sop/lspd.html
```

### Convert PNG to WebP (requires cwebp)
```bash
cwebp -q 85 input.png -o hero-lspd.webp
```

### Optimize existing WebP
```bash
cwebp -q 85 hero-lspd.webp -o hero-lspd-optimized.webp
```

## Common Issues & Fixes

### Issue: Image doesn't show
- **Fix:** Check file path. Must be `images/hero-lspd.webp` relative to HTML file
- **Fix:** Verify image exists and has correct permissions

### Issue: Text is unreadable
- **Fix:** Increase overlay opacity: Change `rgba(..., 0.7)` to `rgba(..., 0.85)`
- **Fix:** Make gradient darker: Change second gradient stop to `rgba(13,13,13,0.95)`

### Issue: Image is too large (slow loading)
- **Fix:** Compress with TinyPNG.com or Squoosh.app
- **Fix:** Target 100-200KB file size
- **Fix:** Use WebP format instead of PNG/JPG

### Issue: SVG data URI broke
- **Fix:** Re-encode using https://yoksel.github.io/url-encoder/
- **Fix:** Ensure no line breaks in data URI
- **Fix:** Check for unescaped special characters

## AI Generation Quick Prompts

### LSPD
```
Los Santos police car cityscape night blue red lights cinematic --ar 16:5
```

### BCSO
```
Desert sheriff patrol vehicle sunset mountains western style --ar 16:5
```

### SASP
```
Highway state trooper patrol car checkered pattern motion blur --ar 16:5
```

### EMS
```
Hospital ambulance emergency medical green lights professional --ar 16:5
```

### DOJ
```
Courthouse justice scales columns neoclassical architecture gold --ar 16:5
```

## Testing Checklist

- [ ] Image loads in Chrome
- [ ] Image loads in Firefox
- [ ] Image loads in Safari
- [ ] Mobile view (resize window to 400px width)
- [ ] Text is readable over image
- [ ] File size under 300KB
- [ ] Image aspect ratio correct (16:5)
- [ ] Department colors match brand guide

## Need Help?

- Full docs: `HERO_IMAGES_README.md`
- Implementation details: `IMPLEMENTATION_SUMMARY.md`
- SVG encoder: https://yoksel.github.io/url-encoder/
- WebP converter: https://squoosh.app/
- Image optimizer: https://tinypng.com/

---

**Last Updated:** February 11, 2026
**Quick Tip:** Always backup the file before editing!
