// Multi-clock configuration page logic

document.addEventListener('DOMContentLoaded', () => {
    // Load luxon if not already loaded
    if (typeof luxon === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js';
        document.head.appendChild(script);
    }

    const clocksContainer = document.getElementById('clocksContainer');
    const addClockBtn = document.getElementById('addClockBtn');
    const generateBtn = document.getElementById('generateBtn');
    const previewBtn = document.getElementById('previewBtn');
    const openBtn = document.getElementById('openBtn');
    const columnsSelect = document.getElementById('columns');
    const multiBg = document.getElementById('multiBg');
    const multiBgText = document.getElementById('multiBgText');
    const multiBgTransparent = document.getElementById('multiBgTransparent');
    const generatedURL = document.getElementById('generatedURL');
    const output = document.getElementById('output');
    const previewFrameWrapper = document.getElementById('previewFrameWrapper');
    const previewFrame = document.getElementById('preview');
    const crosshatchBg = document.getElementById('crosshatchBg');
    const copyBtn = document.querySelector('.copy-btn');
    const instructionsToggle = document.querySelector('.instructions-header');
    const instructionsContent = document.getElementById('instructionsContent');

    let clockCount = 0;

    // Toggle instructions
    instructionsToggle.addEventListener('click', () => {
        instructionsContent.classList.toggle('show');
        const toggle = instructionsToggle.querySelector('.instructions-toggle');
        toggle.classList.toggle('rotated');
    });

    // Background color handlers
    multiBg.addEventListener('input', (e) => {
        multiBgText.value = e.target.value;
        multiBgTransparent.parentElement.querySelector('.color-swatch-wrapper').classList.remove('crosshatch');
    });

    multiBgText.addEventListener('input', (e) => {
        const s = new Option().style;
        s.color = e.target.value;
        if (s.color !== '') {
            multiBg.value = e.target.value;
            multiBgTransparent.parentElement.querySelector('.color-swatch-wrapper').classList.remove('crosshatch');
        }
    });

    multiBgTransparent.addEventListener('click', () => {
        multiBgText.value = 'transparent';
        multiBg.value = '#000000';
        multiBgTransparent.parentElement.querySelector('.color-swatch-wrapper').classList.add('crosshatch');
    });

    // Add clock button
    addClockBtn.addEventListener('click', () => {
        addClock();
    });

    // Generate URL button
    generateBtn.addEventListener('click', () => {
        const url = generateURL();
        generatedURL.textContent = url;
        output.classList.remove('hidden');
    });

    // Preview button
    previewBtn.addEventListener('click', () => {
        const url = generateURL();
        generatedURL.textContent = url;
        output.classList.remove('hidden');
        previewFrameWrapper.classList.remove('hidden');
        const isTransparent = multiBgText.value.trim().toLowerCase() === 'transparent';
        crosshatchBg.style.display = isTransparent ? 'block' : 'none';
        previewFrame.src = url;
    });

    // Open button
    openBtn.addEventListener('click', () => {
        const url = generateURL();
        window.open(url, '_blank');
    });

    // Copy button
    copyBtn.addEventListener('click', (e) => {
        navigator.clipboard.writeText(generatedURL.textContent).then(() => {
            const btn = e.target;
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.background = '#28a745';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '#6c757d';
            }, 2000);
        });
    });

    function addClock() {
        const clockId = clockCount++;
        const clockCard = createClockCard(clockId);
        // Note: clockCard is already appended to clocksContainer in createClockCard
        
        // Initialize timezone suggestions for this clock
        initTimezoneSuggestions(clockId);
    }

    function createClockCard(clockId) {
        const card = document.createElement('div');
        card.className = 'clock-config-card';
        card.id = `clock-${clockId}`;

        const header = document.createElement('div');
        header.className = 'clock-config-header';
        
        const title = document.createElement('h3');
        title.className = 'clock-config-title';
        title.textContent = `Clock ${clockId + 1}`;
        title.addEventListener('click', () => toggleClockCollapse(clockId));
        title.style.cursor = 'pointer';
        
        const collapseIcon = document.createElement('span');
        collapseIcon.className = 'collapse-icon';
        collapseIcon.textContent = '▼';
        title.appendChild(collapseIcon);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'btn-remove-clock';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeClock(clockId));

        header.appendChild(title);
        header.appendChild(removeBtn);

        const content = document.createElement('div');
        content.className = 'clock-config-content';
        content.id = `clock-content-${clockId}`;

        // Form fields
        content.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label for="clock${clockId}_timezone">Timezone</label>
                    <div class="help-text">Type or select the timezone</div>
                    <div style="position: relative">
                        <input
                            type="text"
                            id="clock${clockId}_timezone"
                            class="timezone-input"
                            placeholder="e.g., America/New_York"
                            autocomplete="off"
                        />
                        <div
                            id="clock${clockId}_timezoneSuggestions"
                            class="timezone-suggestions"
                        ></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="clock${clockId}_code">Display Code</label>
                    <div class="help-text">3-letter code</div>
                    <input
                        type="text"
                        id="clock${clockId}_code"
                        maxlength="5"
                        placeholder="NYC"
                    />
                </div>
            </div>
            <div class="form-group">
                <label for="clock${clockId}_location">Location Name (Optional)</label>
                <div class="help-text">Display between clock and weather</div>
                <input
                    type="text"
                    id="clock${clockId}_location"
                    placeholder="e.g., New York, USA"
                />
            </div>
            <div class="form-group">
                <label>Display Colours</label>
                <table class="color-table">
                    <tr>
                        <td><label for="clock${clockId}_bg">Background</label></td>
                        <td>
                            <div class="color-group">
                                <div class="color-swatch-wrapper">
                                    <input type="color" id="clock${clockId}_bg" value="#000000" style="color-scheme: light" />
                                </div>
                                <button type="button" class="transparent-btn" data-clock="${clockId}" data-type="bg">Transparent</button>
                                <input type="text" class="color-preview" id="clock${clockId}_bgText" value="transparent" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="clock${clockId}_clockColor">Clock Text</label></td>
                        <td>
                            <div class="color-group">
                                <div class="color-swatch-wrapper">
                                    <input type="color" id="clock${clockId}_clockColor" value="#FFFFFF" style="color-scheme: light" />
                                </div>
                                <input type="text" class="color-preview" id="clock${clockId}_clockColorText" value="#FFFFFF" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="clock${clockId}_weatherColor">Weather Text</label></td>
                        <td>
                            <div class="color-group">
                                <div class="color-swatch-wrapper">
                                    <input type="color" id="clock${clockId}_weatherColor" value="#FFFFFF" style="color-scheme: light" />
                                </div>
                                <input type="text" class="color-preview" id="clock${clockId}_weatherColorText" value="#FFFFFF" />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="form-group">
                <div class="checkbox-group">
                    <input type="checkbox" id="clock${clockId}_weather" />
                    <label for="clock${clockId}_weather">Display Weather Information</label>
                </div>
                <div id="clock${clockId}_weatherOptions" class="hidden">
                    <div class="help-text">
                        Show current weather conditions underneath the clock
                    </div>
                    <div class="form-row" style="margin-top:10px;">
                        <div class="form-group" style="flex:1;min-width:120px;">
                            <label for="clock${clockId}_tempUnit">Temperature Unit</label>
                            <select id="clock${clockId}_tempUnit">
                                <option value="C" selected>°C (Celsius)</option>
                                <option value="F">°F (Fahrenheit)</option>
                            </select>
                        </div>
                        <div class="form-group" style="flex:1;min-width:120px;">
                            <label for="clock${clockId}_windUnit">Wind Speed Unit</label>
                            <select id="clock${clockId}_windUnit">
                                <option value="kph" selected>KPH (km/h)</option>
                                <option value="mph">MPH (miles/h)</option>
                                <option value="ms">m/s (meters/sec)</option>
                            </select>
                        </div>
                    </div>
                    <div class="weather-note">
                        <strong>Weather Format:</strong> Conditions | Temperature | Wind | Rain %<br>
                        <strong>Units:</strong> Temperature (<span id="clock${clockId}_tempUnitLabel">°C</span>), Wind (<span id="clock${clockId}_windUnitLabel">KPH</span>)<br>
                        <strong>Data Source:</strong> Free Open-Meteo API, updates every 5 minutes
                    </div>
                </div>
            </div>
            <div class="form-group" id="clock${clockId}_coordinateOverrideGroup" style="display: none;">
                <label>Custom Weather Coordinates (Optional)</label>
                <div class="help-text">
                    Override the weather location with specific coordinates
                </div>
                <div class="form-group">
                    <label for="clock${clockId}_locationSearch">Location Search</label>
                    <input type="text" id="clock${clockId}_locationSearch" name="locationSearch" placeholder="e.g., London, UK">
                </div>
                <div class="coordinates-group">
                    <div class="coordinate-input">
                        <label for="clock${clockId}_weatherLat">Latitude</label>
                        <input
                            type="number"
                            id="clock${clockId}_weatherLat"
                            name="weatherLat"
                            step="0.0001"
                            min="-90"
                            max="90"
                            placeholder="e.g., -33.8679"
                        />
                    </div>
                    <div class="coordinate-input">
                        <label for="clock${clockId}_weatherLon">Longitude</label>
                        <input
                            type="number"
                            id="clock${clockId}_weatherLon"
                            name="weatherLon"
                            step="0.0001"
                            min="-180"
                            max="180"
                            placeholder="e.g., 151.2073"
                        />
                    </div>
                </div>
                <div class="coordinate-override">
                    <strong>Custom Coordinates:</strong> Use this to get weather for a specific location different from the timezone city.
                    <div class="example-coordinates">
                        Examples: Sydney (-33.8679, 151.2073) | New York (40.7128, -74.0060) | London (51.5074, -0.1278)
                    </div>
                </div>
                <div style="margin-top:16px;text-align:center">
                    <iframe id="clock${clockId}_osmMapEmbed" style="width:100%;height:250px;border:1px solid #ccc;border-radius:8px;" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=151.0573%2C-34.0679%2C151.3573%2C-33.6679&amp;layer=mapnik&amp;marker=-33.8679%2C151.2073" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <div style="font-size:0.9em;margin-top:4px;">
                        <a id="clock${clockId}_osmLargerMapLink" href="https://www.openstreetmap.org/#map=10/-33.8679/151.2073" target="_blank" rel="noopener">View Larger Map</a>
                    </div>
                    <div style="font-size:0.85em;color:#888;margin-top:2px;">Location preview (OpenStreetMap)</div>
                </div>
            </div>
        `;

        card.appendChild(header);
        card.appendChild(content);
        
        // Append card to container first so elements are in the DOM
        clocksContainer.appendChild(card);

        // Set up event listeners for this clock - query from document now that elements are in DOM
        setupClockEventListeners(clockId);

        // Set default timezone - wait for luxon to load if needed
        const setDefaultTimezone = () => {
            const timezoneInput = document.getElementById(`clock${clockId}_timezone`);
            if (typeof luxon !== 'undefined' && luxon.DateTime) {
                const detectedTimezone = luxon.DateTime.local().zone.name || 'Australia/Sydney';
                timezoneInput.value = detectedTimezone;
            } else {
                timezoneInput.value = 'Australia/Sydney';
            }
        };
        
        if (typeof luxon !== 'undefined' && luxon.DateTime) {
            setDefaultTimezone();
        } else {
            setTimeout(setDefaultTimezone, 100);
        }

        return card;
    }

    function setupClockEventListeners(clockId) {
        // Color inputs - query from document now that elements are in DOM
        const bg = document.getElementById(`clock${clockId}_bg`);
        const bgText = document.getElementById(`clock${clockId}_bgText`);
        const clockColor = document.getElementById(`clock${clockId}_clockColor`);
        const clockColorText = document.getElementById(`clock${clockId}_clockColorText`);
        const weatherColor = document.getElementById(`clock${clockId}_weatherColor`);
        const weatherColorText = document.getElementById(`clock${clockId}_weatherColorText`);
        const weatherCheckbox = document.getElementById(`clock${clockId}_weather`);
        const weatherOptions = document.getElementById(`clock${clockId}_weatherOptions`);

        // Add null checks to prevent errors
        if (!bg || !bgText || !clockColor || !clockColorText || !weatherColor || !weatherColorText || !weatherCheckbox || !weatherOptions) {
            console.error(`Failed to find elements for clock ${clockId}`);
            return;
        }

        bg.addEventListener('input', (e) => {
            bgText.value = e.target.value;
            bg.parentElement.parentElement.querySelector('.color-swatch-wrapper').classList.remove('crosshatch');
        });

        bgText.addEventListener('input', (e) => {
            const s = new Option().style;
            s.color = e.target.value;
            if (s.color !== '') {
                bg.value = e.target.value;
                bg.parentElement.parentElement.querySelector('.color-swatch-wrapper').classList.remove('crosshatch');
            }
        });

        clockColor.addEventListener('input', (e) => {
            clockColorText.value = e.target.value;
        });

        clockColorText.addEventListener('input', (e) => {
            const s = new Option().style;
            s.color = e.target.value;
            if (s.color !== '') clockColor.value = e.target.value;
        });

        weatherColor.addEventListener('input', (e) => {
            weatherColorText.value = e.target.value;
        });

        weatherColorText.addEventListener('input', (e) => {
            const s = new Option().style;
            s.color = e.target.value;
            if (s.color !== '') weatherColor.value = e.target.value;
        });

        weatherCheckbox.addEventListener('change', () => {
            weatherOptions.classList.toggle('hidden', !weatherCheckbox.checked);
            const coordinateGroup = document.getElementById(`clock${clockId}_coordinateOverrideGroup`);
            if (coordinateGroup) {
                coordinateGroup.style.display = weatherCheckbox.checked ? 'block' : 'none';
            }
        });

        // Location search functionality
        const locationSearch = document.getElementById(`clock${clockId}_locationSearch`);
        const weatherLat = document.getElementById(`clock${clockId}_weatherLat`);
        const weatherLon = document.getElementById(`clock${clockId}_weatherLon`);
        const osmMapEmbed = document.getElementById(`clock${clockId}_osmMapEmbed`);
        const osmLargerMapLink = document.getElementById(`clock${clockId}_osmLargerMapLink`);

        if (locationSearch) {
            const handleLocationSearch = async () => {
                const query = locationSearch.value;
                if (query.length < 3) return;

                try {
                    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
                    const resp = await fetch(url, { headers: { 'Accept-Language': 'en' }, method: 'GET', referrerPolicy: 'no-referrer-when-downgrade' });
                    if (!resp.ok) throw new Error('Nominatim lookup failed');
                    const data = await resp.json();
                    if (data && data.length > 0) {
                        const { lat, lon } = data[0];
                        const latNum = parseFloat(lat);
                        const lonNum = parseFloat(lon);
                        if (weatherLat) weatherLat.value = latNum.toFixed(4);
                        if (weatherLon) weatherLon.value = lonNum.toFixed(4);
                        updateOsmMapEmbed(clockId, latNum, lonNum);
                    }
                } catch (e) {
                    console.error("Location search error:", e);
                }
            };

            locationSearch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleLocationSearch();
                }
            });
        }

        const updateOsmMapEmbed = (clockId, lat, lon) => {
            const delta = 0.15;
            const bbox = [(lon - delta).toFixed(4), (lat - delta).toFixed(4), (lon + delta).toFixed(4), (lat + delta).toFixed(4)].join('%2C');
            const marker = `${lat},${lon}`;
            const mapEmbed = document.getElementById(`clock${clockId}_osmMapEmbed`);
            const mapLink = document.getElementById(`clock${clockId}_osmLargerMapLink`);
            if (mapEmbed) {
                mapEmbed.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
            }
            if (mapLink) {
                mapLink.href = `https://www.openstreetmap.org/#map=10/${lat}/${lon}`;
            }
        };

        // Transparent button
        const transparentBtn = document.querySelector(`[data-clock="${clockId}"][data-type="bg"]`);
        if (transparentBtn) {
            transparentBtn.addEventListener('click', () => {
                if (bgText && bg) {
                    bgText.value = 'transparent';
                    bg.value = '#000000';
                    const swatchWrapper = bg.parentElement?.parentElement?.querySelector('.color-swatch-wrapper');
                    if (swatchWrapper) {
                        swatchWrapper.classList.add('crosshatch');
                    }
                }
            });
        }
    }

    function initTimezoneSuggestions(clockId) {
        const timezoneInput = document.getElementById(`clock${clockId}_timezone`);
        const suggestionsDiv = document.getElementById(`clock${clockId}_timezoneSuggestions`);
        let currentSuggestionIndex = -1;

        timezoneInput.addEventListener('input', (e) => {
            const input = e.target.value.toLowerCase();
            if (input.length < 2) {
                suggestionsDiv.style.display = 'none';
                return;
            }
            const matches = IANA_TIMEZONES.filter((tz) => tz.toLowerCase().includes(input)).slice(0, 10);
            if (matches.length === 0) {
                suggestionsDiv.style.display = 'none';
                return;
            }
            suggestionsDiv.innerHTML = matches.map((tz) => `<div class="timezone-suggestion">${tz}</div>`).join('');
            suggestionsDiv.style.display = 'block';
            currentSuggestionIndex = -1;
        });

        timezoneInput.addEventListener('keydown', (e) => {
            const suggestions = suggestionsDiv.querySelectorAll('.timezone-suggestion');
            if (suggestions.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentSuggestionIndex = (currentSuggestionIndex + 1) % suggestions.length;
                updateSuggestionHighlight(suggestions, currentSuggestionIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentSuggestionIndex = (currentSuggestionIndex - 1 + suggestions.length) % suggestions.length;
                updateSuggestionHighlight(suggestions, currentSuggestionIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentSuggestionIndex > -1) {
                    selectTimezone(clockId, suggestions[currentSuggestionIndex].textContent);
                }
            } else if (e.key === 'Escape') {
                suggestionsDiv.style.display = 'none';
            }
        });

        suggestionsDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('timezone-suggestion')) {
                selectTimezone(clockId, e.target.textContent);
            }
        });

        function selectTimezone(clockId, timezone) {
            timezoneInput.value = timezone;
            suggestionsDiv.style.display = 'none';
            currentSuggestionIndex = -1;
            if (LOCAL_TIMEZONE_CODE_MAP && LOCAL_TIMEZONE_CODE_MAP[timezone]) {
                document.getElementById(`clock${clockId}_code`).value = LOCAL_TIMEZONE_CODE_MAP[timezone];
            }
        }

        function updateSuggestionHighlight(suggestions, index) {
            suggestions.forEach((suggestion, i) => {
                if (i === index) {
                    suggestion.classList.add('highlighted');
                } else {
                    suggestion.classList.remove('highlighted');
                }
            });
        }
    }

    function toggleClockCollapse(clockId) {
        const content = document.getElementById(`clock-content-${clockId}`);
        const icon = document.querySelector(`#clock-${clockId} .collapse-icon`);
        content.classList.toggle('collapsed');
        icon.classList.toggle('rotated');
    }

    function removeClock(clockId) {
        const clockCard = document.getElementById(`clock-${clockId}`);
        if (clockCard) {
            clockCard.remove();
        }
    }

    function generateURL() {
        const clocks = [];
        const clockCards = document.querySelectorAll('.clock-config-card');
        
        clockCards.forEach((card, index) => {
            const clockId = card.id.replace('clock-', '');
            const timezone = document.getElementById(`clock${clockId}_timezone`)?.value;
            if (!timezone) return;

            const clock = {
                timezone: timezone,
                code: document.getElementById(`clock${clockId}_code`)?.value || 'TZ',
                location: document.getElementById(`clock${clockId}_location`)?.value || '',
                bg: document.getElementById(`clock${clockId}_bgText`)?.value || 'transparent',
                clockColor: document.getElementById(`clock${clockId}_clockColorText`)?.value || '#FFFFFF',
                weatherColor: document.getElementById(`clock${clockId}_weatherColorText`)?.value || '#FFFFFF',
                showWeather: document.getElementById(`clock${clockId}_weather`)?.checked || false,
                tempUnit: document.getElementById(`clock${clockId}_tempUnit`)?.value || 'C',
                windUnit: document.getElementById(`clock${clockId}_windUnit`)?.value || 'kph',
                weatherLat: document.getElementById(`clock${clockId}_weatherLat`)?.value || null,
                weatherLon: document.getElementById(`clock${clockId}_weatherLon`)?.value || null
            };

            clocks.push(clock);
        });

        if (clocks.length === 0) {
            alert('Please add at least one clock');
            return '';
        }

        // Determine the base URL - if on subdomain, use subdomain, otherwise use multiview directory
        const hostname = window.location.hostname;
        let baseUrl;
        if (hostname.includes('multiview') || hostname.includes('multiclock')) {
            // On subdomain, use root
            const mainDomain = hostname.replace(/^(multiview|multiclock)\./, '');
            baseUrl = `${window.location.protocol}//${mainDomain}`;
            // If we're on a subdomain, the multiview index is at the root
            baseUrl += '/multiview/';
        } else {
            // Same domain, use multiview directory
            baseUrl = `${window.location.origin}/multiview/`;
        }
        
        let url = `${baseUrl}index.html?`;
        
        // Add layout options
        const columns = columnsSelect.value;
        if (columns !== 'auto') {
            url += `columns=${encodeURIComponent(columns)}&`;
        }

        const bgColor = multiBgText.value;
        if (bgColor && bgColor !== 'transparent') {
            url += `bg=${encodeURIComponent(bgColor)}&`;
        }

        // Add each clock
        clocks.forEach((clock, index) => {
            url += `clock${index}_tz=${encodeURIComponent(clock.timezone)}&`;
            url += `clock${index}_code=${encodeURIComponent(clock.code)}&`;
            if (clock.location) {
                url += `clock${index}_location=${encodeURIComponent(clock.location)}&`;
            }
            if (clock.bg !== 'transparent') {
                url += `clock${index}_bg=${encodeURIComponent(clock.bg)}&`;
            }
            if (clock.clockColor !== '#FFFFFF') {
                url += `clock${index}_clock_color=${encodeURIComponent(clock.clockColor)}&`;
            }
            if (clock.weatherColor !== '#FFFFFF') {
                url += `clock${index}_weather_color=${encodeURIComponent(clock.weatherColor)}&`;
            }
            if (clock.showWeather) {
                url += `clock${index}_weather=true&`;
                url += `clock${index}_temp_unit=${encodeURIComponent(clock.tempUnit)}&`;
                url += `clock${index}_wind_unit=${encodeURIComponent(clock.windUnit)}&`;
                if (clock.weatherLat && clock.weatherLon) {
                    url += `clock${index}_weather_lat=${encodeURIComponent(clock.weatherLat)}&`;
                    url += `clock${index}_weather_lon=${encodeURIComponent(clock.weatherLon)}&`;
                }
            }
        });

        // Remove trailing &
        url = url.replace(/&$/, '');

        return url;
    }

    // Add one clock by default
    addClock();
});
