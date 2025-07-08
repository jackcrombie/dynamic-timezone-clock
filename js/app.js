


// --- SERVICES ---

class WeatherService {
    constructor() {
        this.cache = new Map();
        this.cacheDuration = 5 * 60 * 1000; // 5 minutes
    }

    async getWeatherForTimezone(timezone, overrideLat = null, overrideLon = null, tempUnit = 'C', windUnit = 'KPH') {
        try {
            const cacheKey = `${timezone}_${overrideLat || ''}_${overrideLon || ''}_${tempUnit}_${windUnit}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;

            let coords;
            if (overrideLat && overrideLon) {
                coords = { lat: parseFloat(overrideLat), lon: parseFloat(overrideLon), city: 'Custom Location' };
            } else {
                coords = await this.getCoordinatesForTimezone(timezone);
            }
            
            const weatherData = await this.fetchWeatherData(coords, tempUnit, windUnit);
            this.setCache(cacheKey, weatherData);
            return weatherData;
        } catch (error) {
            console.error('Weather fetch error:', error);
            return this.getFallbackWeather(timezone, tempUnit, windUnit);
        }
    }

    async getCoordinatesForTimezone(timezone) {
        if (FALLBACK_COORDINATES[timezone]) {
            return FALLBACK_COORDINATES[timezone];
        }
        if (TIMEZONE_COORDINATES[timezone]) {
            return TIMEZONE_COORDINATES[timezone];
        }
        
        try {
            const parts = timezone.split("/");
            let city = parts[parts.length - 1].replace(/_/g, " ");
            if (parts.length > 2) {
                city = parts.slice(1).join(" ").replace(/_/g, " ");
            }
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
            const resp = await fetch(url, { headers: { 'Accept-Language': 'en' }, method: 'GET', referrerPolicy: 'no-referrer-when-downgrade' });
            if (!resp.ok) throw new Error('Nominatim lookup failed');
            const data = await resp.json();
            if (data && data.length > 0) {
                return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
            }
        } catch (e) {
            console.error("Nominatim API error:", e);
        }
        return null;
    }

    async fetchWeatherData({ lat, lon }, tempUnit = 'C', windUnit = 'KPH') {
        let temperature_unit = (tempUnit === 'F') ? 'fahrenheit' : 'celsius';
        let windspeed_unit = 'kmh';
        if (windUnit === 'MPH') windspeed_unit = 'mph';
        else if (windUnit === 'MS') windspeed_unit = 'ms';

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
            `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code` +
            `&hourly=precipitation_probability&timezone=auto` +
            `&temperature_unit=${temperature_unit}&windspeed_unit=${windspeed_unit}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
        const data = await response.json();
        return this.formatWeatherData(data);
    }

    formatWeatherData(data) {
        const current = data.current;
        const precipitation = data.hourly.precipitation_probability[0] || 0;
        return {
            temperature: Math.round(current.temperature_2m),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            windDirection: current.wind_direction_10m,
            windCompass: this.degreesToCompass(current.wind_direction_10m),
            precipitationChance: precipitation,
            condition: this.getWeatherCondition(current.weather_code),
            timestamp: Date.now()
        };
    }

    degreesToCompass(degrees) {
        if (degrees === null || degrees === undefined) return 'N';
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    }

    getWeatherCondition(code) {
        const conditions = { 0: 'Clear', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast', 45: 'Foggy', 48: 'Rime Fog', 51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle', 61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain', 71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow', 95: 'Thunderstorm' };
        return conditions[code] || 'Unknown';
    }

    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && (Date.now() - cached.timestamp < this.cacheDuration)) {
            return cached.data;
        }
        return null;
    }

    setCache(key, data) {
        this.cache.set(key, { data: data, timestamp: Date.now() });
    }

    getFallbackWeather(timezone, tempUnit = 'C', windUnit = 'KPH') {
        let temperature = 20;
        if (tempUnit === 'F') temperature = Math.round((temperature * 9/5) + 32);
        let windSpeed = 5;
        if (windUnit === 'MPH') windSpeed = Math.round(windSpeed * 0.621371);
        else if (windUnit === 'MS') windSpeed = Math.round(windSpeed / 3.6);
        return { temperature, humidity: 50, windSpeed, windDirection: 180, windCompass: 'S', precipitationChance: 0, condition: 'Weather Unavailable', isFallback: true, timestamp: Date.now() };
    }
}


// --- PAGE INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('config')) {
        initConfigPage();
    } else {
        initClockPage();
    }
});


// --- CLOCK PAGE LOGIC ---

function initClockPage() {
    const clockEl = document.getElementById("clock");
    const weatherEl = document.getElementById("weather");
    const weatherLineEl = document.querySelector(".weather-line");

    const DateTime = luxon.DateTime;
    const urlParams = new URLSearchParams(window.location.search);
    const timezone = urlParams.get('tz') || 'Australia/Sydney';
    const code = urlParams.get('code') || 'SYD';
    const bgColor = urlParams.get('bg') || 'transparent';
    const clockColor = urlParams.get('clock_color') || '#FFFFFF';
    const weatherColor = urlParams.get('weather_color') || '#FFFFFF';
    const showWeather = urlParams.get('weather') === 'true';
    const weatherLat = urlParams.get('weather_lat');
    const weatherLon = urlParams.get('weather_lon');
    const tempUnit = urlParams.get('temp_unit') || 'C';
    const windUnit = urlParams.get('wind_unit') || 'kph';

    document.body.style.backgroundColor = bgColor;
    clockEl.style.color = clockColor;
    weatherEl.style.color = weatherColor;

    const weatherService = new WeatherService();

    const updateClock = () => {
        const now = DateTime.now().setZone(timezone);
        clockEl.textContent = `${code.toUpperCase()}  ${now.toFormat("HH:mm:ss")}`;
    };

    const displayWeather = (data) => {
        if (!showWeather || !data) {
            weatherEl.style.display = 'none';
            return;
        }
        
        const condition = `<div class="weather-item">${data.condition}</div>`;
        const temp = `<div class="weather-item">${data.temperature}°${tempUnit}</div>`;
        const wind = `<div class="weather-item">${data.windSpeed} ${windUnit} ${data.windCompass}</div>`;
        const rain = `<div class="weather-item">${data.precipitationChance}%</div>`;
        const separator = `<div class="weather-separator">|</div>`;

        weatherLineEl.innerHTML = [condition, separator, temp, separator, wind, separator, rain].join('');
        
        weatherEl.style.display = 'block';
    };

    const updateWeather = () => {
        if (!showWeather) return;
        weatherService.getWeatherForTimezone(timezone, weatherLat, weatherLon, tempUnit, windUnit)
            .then(displayWeather)
            .catch(error => {
                console.error('Weather update failed:', error);
                displayWeather(weatherService.getFallbackWeather(timezone, tempUnit, windUnit));
            });
    };

    updateClock();
    setInterval(updateClock, 1000);

    if (showWeather) {
        updateWeather();
        setInterval(updateWeather, 5 * 60 * 1000);
    }

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && showWeather) {
            updateWeather();
        }
    });

    window.addEventListener('error', (e) => console.error('Clock error:', e.error));
}


// --- CONFIG PAGE LOGIC ---

function initConfigPage() {
    const weatherService = new WeatherService();
    const dom = {
        timezone: document.getElementById("timezone"),
        code: document.getElementById("code"),
        background: document.getElementById("background"),
        colorText: document.getElementById("colorText"),
        clockColor: document.getElementById("clockColor"),
        clockColorText: document.getElementById("clockColorText"),
        weatherColor: document.getElementById("weatherColor"),
        weatherColorText: document.getElementById("weatherColorText"),
        weather: document.getElementById("weather"),
        weatherOptions: document.getElementById("weatherOptions"),
        tempUnit: document.getElementById("tempUnit"),
        windUnit: document.getElementById("windUnit"),
        weatherLat: document.getElementById("weatherLat"),
        weatherLon: document.getElementById("weatherLon"),
        generatedURL: document.getElementById("generatedURL"),
        output: document.getElementById("output"),
        previewFrame: document.getElementById("preview"),
        previewFrameWrapper: document.getElementById("previewFrameWrapper"),
        crosshatchBg: document.getElementById("crosshatchBg"),
        timezoneSuggestions: document.getElementById("timezoneSuggestions"),
        weatherStatus: document.getElementById("weatherStatus"),
        coordinateOverrideGroup: document.getElementById("coordinateOverrideGroup"),
        osmMapEmbed: document.getElementById("osmMapEmbed"),
        osmLargerMapLink: document.getElementById("osmLargerMapLink"),
    };

    let currentSuggestionIndex = -1;

    const updateWeatherStatus = (timezone) => {
        const indicator = dom.weatherStatus.querySelector(".status-indicator");
        if (TIMEZONE_COORDINATES[timezone] || FALLBACK_COORDINATES[timezone]) {
            indicator.className = "status-indicator status-available";
            dom.weatherStatus.innerHTML = '<span class="status-indicator status-available"></span>Weather coordinates available';
        } else {
            indicator.className = "status-indicator status-unavailable";
            dom.weatherStatus.innerHTML = '<span class="status-indicator status-unavailable"></span>No built-in coordinates';
        }
    };

    const handleTimezoneFieldUpdate = async (forceCoords = false) => {
        const tz = dom.timezone.value;
        updateWeatherStatus(tz);
        if (dom.weather.checked) {
            dom.coordinateOverrideGroup.style.display = "block";
            const coords = await weatherService.getCoordinatesForTimezone(tz);
            if (coords && (forceCoords || !dom.weatherLat.value || !dom.weatherLon.value)) {
                dom.weatherLat.value = coords.lat;
                dom.weatherLon.value = coords.lon;
                updateOsmMapEmbed(coords.lat, coords.lon);
            }
        } else {
            dom.coordinateOverrideGroup.style.display = "none";
        }
    };

    const updateOsmMapEmbed = (lat, lon) => {
        const delta = 0.15;
        const bbox = [(lon - delta).toFixed(4), (lat - delta).toFixed(4), (lon + delta).toFixed(4), (lat + delta).toFixed(4)].join('%2C');
        const marker = `${lat},${lon}`;
        dom.osmMapEmbed.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
        dom.osmLargerMapLink.href = `https://www.openstreetmap.org/#map=10/${lat}/${lon}`;
    };

    const selectTimezone = (timezone) => {
        dom.timezone.value = timezone;
        dom.timezoneSuggestions.style.display = "none";
        currentSuggestionIndex = -1;
        updateWeatherStatus(timezone);
        if (LOCAL_TIMEZONE_CODE_MAP[timezone]) {
            dom.code.value = LOCAL_TIMEZONE_CODE_MAP[timezone];
        }
        handleTimezoneFieldUpdate(true);
    };

    const generateURL = () => {
        const timezone = dom.timezone.value || "Australia/Sydney";
        const code = dom.code.value || "SYD";
        const bgColor = dom.colorText.value || "transparent";
        const clockColor = dom.clockColorText.value || "#FFFFFF";
        const weatherColor = dom.weatherColorText.value || "#FFFFFF";
        const showWeather = dom.weather.checked;
        const weatherLat = dom.weatherLat.value;
        const weatherLon = dom.weatherLon.value;
        const tempUnit = dom.tempUnit.value;
        const windUnit = dom.windUnit.value;

        let url = `${window.location.origin}/?tz=${encodeURIComponent(timezone)}&code=${encodeURIComponent(code.toUpperCase())}`;
        if (bgColor !== "transparent") url += `&bg=${encodeURIComponent(bgColor)}`;
        if (clockColor !== "#FFFFFF") url += `&clock_color=${encodeURIComponent(clockColor)}`;
        if (weatherColor !== "#FFFFFF") url += `&weather_color=${encodeURIComponent(weatherColor)}`;

        if (showWeather) {
            url += `&weather=true&temp_unit=${encodeURIComponent(tempUnit)}&wind_unit=${encodeURIComponent(windUnit)}`;
            if (weatherLat && weatherLon) {
                url += `&weather_lat=${encodeURIComponent(weatherLat)}&weather_lon=${encodeURIComponent(weatherLon)}`;
            }
        }
        dom.generatedURL.textContent = url;
        dom.output.classList.remove("hidden");
        return url;
    };

    const toggleInstructions = () => {
        const content = document.getElementById("instructionsContent");
        const toggle = document.querySelector(".instructions-toggle");
        content.classList.toggle("show");
        toggle.classList.toggle("rotated");
    };

    // Event Listeners
    document.querySelector(".instructions-header").addEventListener("click", toggleInstructions);

    document.querySelector(".transparent-btn").addEventListener("click", () => {
        dom.colorText.value = "transparent";
        dom.background.value = "#000000";
    });

    dom.background.addEventListener('input', (e) => dom.colorText.value = e.target.value);
    dom.colorText.addEventListener('input', (e) => { if (e.target.value.match(/^#[0-9a-f]{6}$/i)) dom.background.value = e.target.value; });
    dom.clockColor.addEventListener('input', (e) => dom.clockColorText.value = e.target.value);
    dom.clockColorText.addEventListener('input', (e) => { if (e.target.value.match(/^#[0-9a-f]{6}$/i)) dom.clockColor.value = e.target.value; });
    dom.weatherColor.addEventListener('input', (e) => dom.weatherColorText.value = e.target.value);
    dom.weatherColorText.addEventListener('input', (e) => { if (e.target.value.match(/^#[0-9a-f]{6}$/i)) dom.weatherColor.value = e.target.value; });

    dom.timezone.addEventListener("input", (e) => {
        const input = e.target.value.toLowerCase();
        if (input.length < 2) {
            dom.timezoneSuggestions.style.display = "none";
            return;
        }
        const matches = IANA_TIMEZONES.filter((tz) => tz.toLowerCase().includes(input)).slice(0, 10);
        if (matches.length === 0) {
            dom.timezoneSuggestions.style.display = "none";
            return;
        }
        dom.timezoneSuggestions.innerHTML = matches.map((tz) => `<div class="timezone-suggestion">${tz}</div>`).join("");
        dom.timezoneSuggestions.style.display = "block";
        currentSuggestionIndex = -1;
    });

    dom.timezone.addEventListener("keydown", (e) => {
        const suggestions = dom.timezoneSuggestions.querySelectorAll(".timezone-suggestion");
        if (suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            currentSuggestionIndex = (currentSuggestionIndex + 1) % suggestions.length;
            updateSuggestionHighlight(suggestions);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            currentSuggestionIndex = (currentSuggestionIndex - 1 + suggestions.length) % suggestions.length;
            updateSuggestionHighlight(suggestions);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (currentSuggestionIndex > -1) {
                selectTimezone(suggestions[currentSuggestionIndex].textContent);
            }
        } else if (e.key === "Escape") {
            dom.timezoneSuggestions.style.display = "none";
        }
    });

    const updateSuggestionHighlight = (suggestions) => {
        suggestions.forEach((suggestion, index) => {
            if (index === currentSuggestionIndex) {
                suggestion.classList.add("highlighted");
            } else {
                suggestion.classList.remove("highlighted");
            }
        });
    };

    dom.timezone.addEventListener("change", () => handleTimezoneFieldUpdate(true));
    
    dom.weather.addEventListener("change", () => {
        dom.weatherOptions.classList.toggle('hidden', !dom.weather.checked);
        handleTimezoneFieldUpdate(true)
    });
    
    dom.timezoneSuggestions.addEventListener("click", (e) => {
        if (e.target.classList.contains("timezone-suggestion")) {
            selectTimezone(e.target.textContent);
        }
    });

    document.querySelector(".btn-generate").addEventListener("click", generateURL);
    document.querySelector(".btn-preview").addEventListener("click", () => {
        const url = generateURL();
        dom.previewFrameWrapper.classList.remove("hidden");
        const isTransparent = dom.colorText.value.trim().toLowerCase() === "transparent";
        dom.crosshatchBg.style.display = isTransparent ? "block" : "none";
        dom.previewFrame.src = url;
    });

    document.querySelector(".btn-open").addEventListener("click", () => {
        const url = generateURL();
        window.open(url, '_blank');
    });

    document.querySelector(".copy-btn").addEventListener("click", (e) => {
        navigator.clipboard.writeText(dom.generatedURL.textContent).then(() => {
            const btn = e.target;
            const originalText = btn.textContent;
            btn.textContent = "Copied!";
            btn.style.background = "#28a745";
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = "#6c757d";
            }, 2000);
        });
    });

    // Init
    updateWeatherStatus(dom.timezone.value);
    handleTimezoneFieldUpdate(true);
    dom.weatherOptions.classList.toggle('hidden', !dom.weather.checked);
}
