# Dynamic Timezone Clock

A simple, lightweight browser-based clock that displays time for any timezone with customizable display codes and background colours. Perfect for embedding in websites, OBS overlays, or standalone displays. The clock is based on the system time of the browser viewing the page.

## ✨ Features

- 🌍 **Any Timezone** - Supports all IANA timezones
- 🎨 **Customizable Colors** - Set custom colors for the background, clock text, and weather text.
- 🏷️ **Custom Display Codes** - Show any 3-letter code (airport codes, city abbreviations, etc.)
- ⚡ **Real-time Updates** - Updates every second automatically
- 📱 **Responsive Design** - Scales perfectly on any screen size
- 🎛️ **Easy Configuration** - Web-based form to generate URLs
- 🔗 **URL Parameters** - Simple query string configuration
- 🎯 **Zero Dependencies** - Just HTML, CSS, and JavaScript (uses Luxon.js from CDN)

## ⏱️ Timer

A versatile countdown timer with two modes, an optional scheduled start, and customizable display options.

### Timer Configuration
Create your custom timer by visiting the configuration page:
```
https://clock.efrm.net/timer-config.html
```

### Timer Features
- **Two Countdown Modes**:
  - **Duration**: Counts down for a specific length of time (e.g., 10 minutes).
  - **Time of Day**: Counts down to a specific time (e.g., 5:00 PM).
- **Scheduled Start**: Optionally set a date, time, and timezone for the timer to begin. If the start time is in the future, a "Starting in..." message will be displayed.
- **Flexible Duration Formats**: Specify durations like `10m`, `1h30m`, or `01:30:00`.
- **Customizable Display**: Change the title and colors to match your needs.
- **Live Preview**: See your timer in action before you use it.

### Timer URL Parameters
- **`mode`**: `duration` or `timeOfDay`.
- **`title`**: The text to display above the timer.
- **`dur`**: The duration for the timer (e.g., `10m`, `1h30m`). Used when `mode=duration`.
- **`time`**: The end time for the countdown (e.g., `17:00`). Used when `mode=timeOfDay`.
- **`startDate`**: The date for a scheduled start (e.g., `2025-12-31`).
- **`startTime`**: The time for a scheduled start (e.g., `09:00`).
- **`timezone`**: The IANA timezone for the scheduled start (e.g., `America/New_York`).
- **`showTitle`**: `true` to include the title in the "Starting in..." message.
- **`bg`**, **`timer_color`**: Color options for the display.

---

- ☁️ **Weather Display** - Show current weather (temperature, wind, rain chance, condition) for any supported timezone or custom coordinates
- 🌡️ **Selectable Units** - Choose temperature (°C/°F) and wind speed (KPH/MPH/m/s) units; units are respected in both API fetch and display
- 🗺️ **Instant Coordinate Lookup** - AU/NZ and major world cities have instant fallback for weather coordinates. You can also search for any location to automatically populate its coordinates.
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
- **`bg`** - Background colour (e.g., `transparent`, `black`, `#ff0000`, `rgba(0,0,0,0.5)`)
- **`clock_color`** - Color of the clock text (e.g., `#FFFFFF`)
- **`weather_color`** - Color of the weather text (e.g., `#FFFFFF`)

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
The clock's appearance can be customized via the configuration page or by passing URL parameters. For more advanced styling, you can modify the CSS files in the `/css` directory.

### Adding More Timezone Codes
The configuration page includes auto-suggestions for timezone codes. To add more local mappings, edit the `LOCAL_TIMEZONE_CODE_MAP` object in `js/timezone-data.js`:
```javascript
const LOCAL_TIMEZONE_CODE_MAP = {
    'Europe/Stockholm': 'STO',
    'Asia/Kolkata': 'BOM',
    // Add your custom mappings here
};
```

## 🌐 Customizing the Generated URL Base
The configuration page now generates clock URLs dynamically using the current domain and protocol. This is achieved with JavaScript in `js/app.js`. This ensures the generated URL always matches the domain the user is visiting.

**Reference:** See the `generateURL` function in `js/app.js` for where this is implemented.

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
├── css/
│   ├── clock.css
│   ├── config.css
│   └── style.css
├── js/
│   ├── app.js
│   └── timezone-data.js
├── tests/
│   └── ...
├── index.html          # Main clock display
├── config.html         # Configuration page
├── ... (other project files)
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