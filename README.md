# Dynamic Timezone Clock

A simple, lightweight browser-based clock that displays time for any timezone with customizable display codes and background colours. Perfect for embedding in websites, OBS overlays, or standalone displays. The clock is based on the system time of the browser viewing the page.

## ✨ Features

- 🌍 **Any Timezone** - Supports all IANA timezones
- 🎨 **Customizable Background** - Transparent, solid colours, or RGBA
- 🏷️ **Custom Display Codes** - Show any 3-letter code (airport codes, city abbreviations, etc.)
- ⚡ **Real-time Updates** - Updates every second automatically
- 📱 **Responsive Design** - Scales perfectly on any screen size
- 🎛️ **Easy Configuration** - Web-based form to generate URLs
- 🔗 **URL Parameters** - Simple query string configuration
- 🎯 **Zero Dependencies** - Just HTML, CSS, and JavaScript (uses Luxon.js from CDN)

---

- ☁️ **Weather Display** - Show current weather (temperature, wind, rain chance, condition) for any supported timezone or custom coordinates
- 🌡️ **Selectable Units** - Choose temperature (°C/°F) and wind speed (KPH/MPH/m/s) units; units are respected in both API fetch and display
- 🗺️ **Instant Coordinate Lookup** - AU/NZ and major world cities have instant fallback for weather coordinates
- 🧭 **Custom Weather Location** - Override weather location with your own latitude/longitude
- 🧩 **Live Preview with Transparency Checkerboard** - Preview window shows a crosshatch pattern when background is transparent, so you can see transparency in action
- 📝 **All Weather Options via URL** - Use `weather=true`, `temp_unit`, `wind_unit`, `weather_lat`, and `weather_lon` in the URL for full control

## 🚀 Quick Start

### Option 1: Use GitHub Pages Hosted Version
Visit the configuration page to generate your custom clock URL:
```
https://clock.efrm.net/config
```


### Option 2: Self-Host with Server Rewrites

For clean URLs like `/config`, you'll need a web server with rewrite capabilities.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jackcrombie/dynamic-timezone-clock.git
   cd dynamic-timezone-clock
   ```

2. **Deploy files to your web server:**
   ```bash
   # For Caddy (recommended)
   sudo cp *.html /var/www/clock/
   sudo chown -R www-data:www-data /var/www/clock/
   
   # For Apache/Nginx
   cp *.html /var/www/html/clock/
   ```

3. **Configure your web server** (see [Configuration](#configuration) section)

## 🎯 Usage

### Basic URL Format
```
https://your-domain.com/?tz=TIMEZONE&code=CODE&bg=BACKGROUND
```

### Parameters
- **`tz`** - IANA timezone (e.g., `America/New_York`, `Australia/Sydney`)
- **`code`** - Display code (e.g., `NYC`, `SYD`, `LON`)
- **`bg`** - Background colour (e.g., `transparent`, `black`, `#ff0000`, `rgba(0,0,0,0.5)`, `alpha`)

### Defaults if parameters are not included in the request URL:
tz=Australia/Sydney
code=SYD
bg=transparent

### Examples

**Sydney Time with Black Background:**
```
https://your-domain.com/?tz=Australia/Sydney&code=SYD&bg=black
```

**New York Time with Transparent Background:**
```
https://your-domain.com/?tz=America/New_York&code=NYC&bg=transparent
```

**London Time with Custom RGBA Background:**
```
https://your-domain.com/?tz=Europe/London&code=LON&bg=rgba(255,0,0,0.3)
```

## ⚙️ Configuration

### Caddy Web Server (Recommended)

Add this to your `Caddyfile`:

```caddyfile
your-domain.com {
    root * /var/www/clock
    
    # Handle /config path
    handle /config {
        rewrite * /config.html
        file_server
    }
    
    # Handle root path - serve index.html
    handle / {
        rewrite * /index.html
        file_server
    }
    
    file_server
    
    header {
        Cache-Control "no-cache, no-store, must-revalidate"
        Pragma "no-cache"
        Expires "0"
        Access-Control-Allow-Origin "*"
        Access-Control-Allow-Methods "GET, OPTIONS"
        Access-Control-Allow-Headers "Content-Type"
    }
}
```

### Apache Web Server

Create `.htaccess` in your clock directory:

```apache
RewriteEngine On
RewriteRule ^config$ config.html [L]
RewriteRule ^$ index.html [L]

Header always set Cache-Control "no-cache, no-store, must-revalidate"
Header always set Pragma "no-cache"
Header always set Expires "0"
Header always set Access-Control-Allow-Origin "*"
```

### Nginx Web Server

Add to your server block:

```nginx
location / {
    try_files $uri $uri/ /index.html;
    
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires "0";
    add_header Access-Control-Allow-Origin "*";
}

location = /config {
    try_files /config.html =404;
}
```

## 🎨 Customization

### Styling the Clock

The clock uses CSS custom properties for easy theming. You can modify the CSS in `index.html`:

```css
.clock {
    font-size: 8vw;          /* Size relative to viewport */
    font-weight: 500;        /* Font weight */
    letter-spacing: 0.1vw;   /* Character spacing */
    color: white;            /* Text colour */
    font-family: 'Roboto', sans-serif;
}
```

### Adding More Timezone Codes

The configuration page includes auto-suggestions for timezone codes. To add more local mappings, edit the `localTimezoneMap` object in `config.html`:

```javascript
const localTimezoneMap = {
    'Europe/Stockholm': 'STO',
    'Asia/Kolkata': 'BOM',
    // Add your custom mappings here
};
```

## 🌐 Customizing the Generated URL Base

By default, the configuration page now generates clock URLs dynamically using the current domain and protocol. This is achieved with JavaScript in `config.html`:

```js
let url = `${window.location.origin}/?tz=${encodeURIComponent(timezone)}&code=${encodeURIComponent(code.toUpperCase())}`;
```

This ensures the generated URL always matches the domain the user is visiting, which is useful if your webhost serves the same files for multiple domains. You do not need to hardcode your domain; the config page will automatically use the correct base URL.

**Reference:** See the `generateURL` function in `config.html` for where this is implemented.

## 🛠️ Development

### Prerequisites
- Web server (Caddy, Apache, Nginx)
- Modern web browser
- Text editor

### Local Development
1. Clone the repository
2. Edit files in your preferred editor
3. Use the included `updateclock.sh` script to deploy changes:
   ```bash
   ./updateclock.sh
   ```

### File Structure
```
dynamic-timezone-clock/
├── index.html          # Main clock display
├── config.html         # Configuration page
├── updateclock.sh      # Deployment script
├── Caddyfile.example   # Example Caddy configuration
├── LICENSE             # MIT License
└── README.md           # This file
```

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

Requires JavaScript and modern CSS support.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Keep it simple and lightweight
2. Maintain browser compatibility
3. Test with multiple timezones
4. Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Luxon.js](https://moment.github.io/luxon/) for timezone handling
- [Google Fonts](https://fonts.google.com/) for Roboto font (How good are monospaced fonts for clocks.)
- [WorldTimeAPI](http://worldtimeapi.org/) for timezone data
- [IANA Timezone Database](https://www.iana.org/time-zones) for timezone standards

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/jackcrombie/dynamic-timezone-clock/issues)
- 💡 **Feature Requests**: [Open an issue](https://github.com/jackcrombie/dynamic-timezone-clock/issues)
- 📧 **Questions**: Check existing issues or open a new one

## 🗺️ Roadmap

- [ ] Multiple clock layouts (grid, list)
- [ ] Date display options
- [ ] More font choices
- [ ] Timezone search improvements
- [ ] Mobile app version
- [ ] Widget embedding tools

---

**Live Demo:** [https://clock.efrm.net/](https://clock.efrm.net/)  
**Configuration:** [https://clock.efrm.net/config](https://clock.efrm.net/config)