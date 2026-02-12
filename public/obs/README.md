# OBS Stream Alerts

Real-time stream alerts powered by LISA for all platforms (Twitch, Kick, YouTube, Facebook, Discord, etc.)

## Setup Instructions

### 1. Add Browser Source in OBS

1. Open OBS Studio
2. Add a new **Browser** source to your scene
3. Configure:
   - **URL:** `https://prozilligaming.com/obs/alerts.html`
   - **Width:** 1920
   - **Height:** 1080
   - **FPS:** 30
   - **Custom CSS:** (leave empty)
   - ✅ **Shutdown source when not visible**
   - ✅ **Refresh browser when scene becomes active**
   - ❌ **Control audio via OBS** (no audio yet)

4. Position the source to fill your canvas (1920x1080)
5. The alerts will appear centered and transparent

### 2. Positioning

The alert container is centered by default, but you can:
- Layer it above your game/camera
- Crop it to only show the center area
- Add filters (color correction, chroma key, etc.)

### 3. Testing

To test alerts without going live:
1. Open the URL in a browser: `https://prozilligaming.com/obs/alerts.html`
2. Open browser console (F12)
3. Watch for connection status and events
4. Trigger test events via PRISMAI API

Or use the debug mode:
- Edit `alerts.html` and set `DEBUG = true` (line 240)
- Reload in OBS to see connection status and queue info in bottom-right

## Supported Events

### Subscriptions (Purple)
- New subscriber
- Gift subscription
- Membership
- Server boost

### Donations (Gold)
- PayPal donation
- Fourthwall tip
- Super Chat (YouTube)
- Stars (Facebook)
- Spell (Kick)
- Bits/Cheer (Twitch)
- Shop order

### Community (Cyan/Pink)
- Raid (cyan)
- Follow (pink)
- Hype train
- Channel points redemption
- Milestones

## Customization

Edit `alerts.html` to customize:

### Alert Duration
```javascript
const ALERT_DURATION = 8000; // 8 seconds (line 237)
```

### Colors
Change border colors and glows in the CSS (lines 140-232):
- `.alert-box.sub` - Subscription events (purple)
- `.alert-box.donation` - Donation events (gold)
- `.alert-box.raid` - Raid events (cyan)
- `.alert-box.follow` - Follow events (pink)

### API Endpoint
```javascript
const ALERT_ENDPOINT = 'http://65.109.100.181:5084/alerts/stream'; // line 238
```

Change this if PRISMAI moves to a different server.

### Font Sizes
- Header: 36px (line 104)
- Username: 48px (line 114)
- Amount: 64px (line 134)
- Message: 28px (line 124)

## Troubleshooting

### No alerts showing
1. Check OBS browser source is active
2. Verify PRISMAI is running: `curl http://65.109.100.181:5084/platforms`
3. Enable debug mode and check connection status
4. Check browser console for errors (Ctrl+Shift+I in OBS Browser Source)

### Alerts stuck/frozen
1. Right-click browser source → **Refresh**
2. Check if EventSource connection dropped (debug mode)
3. Restart OBS

### Wrong colors/styling
1. Clear browser cache: Right-click source → **Refresh cache of current page**
2. Hard refresh with Ctrl+F5

## Future Enhancements

- [ ] Sound effects for each event type
- [ ] Animated GIFs/videos
- [ ] Custom alert images per user
- [ ] Text-to-speech for messages
- [ ] Sub/donation goals progress bar
- [ ] Recent events ticker

## File Structure

```
public/obs/
├── alerts.html     - Main alert display (standalone HTML)
└── README.md       - This file
```

## Technical Details

- **Connection:** Server-Sent Events (SSE) from PRISMAI
- **Queue:** Alerts are queued and shown sequentially
- **Duration:** 8 seconds per alert (configurable)
- **Animations:** 3D CSS transforms (slide + rotate)
- **Reconnection:** Automatic with exponential backoff
- **Performance:** Lightweight, no external dependencies

---

**Built by LISA** for Prozilli Gaming
