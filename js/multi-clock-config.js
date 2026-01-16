// Multi-clock configuration page logic

document.addEventListener('DOMContentLoaded', () => {
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
        clocksContainer.appendChild(clockCard);
        
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
                </div>
            </div>
        `;

        card.appendChild(header);
        card.appendChild(content);

        // Set up event listeners for this clock
        setupClockEventListeners(clockId);

        // Set default timezone
        const timezoneInput = document.getElementById(`clock${clockId}_timezone`);
        const detectedTimezone = luxon.DateTime.local().zone.name || 'Australia/Sydney';
        timezoneInput.value = detectedTimezone;

        return card;
    }

    function setupClockEventListeners(clockId) {
        // Color inputs
        const bg = document.getElementById(`clock${clockId}_bg`);
        const bgText = document.getElementById(`clock${clockId}_bgText`);
        const clockColor = document.getElementById(`clock${clockId}_clockColor`);
        const clockColorText = document.getElementById(`clock${clockId}_clockColorText`);
        const weatherColor = document.getElementById(`clock${clockId}_weatherColor`);
        const weatherColorText = document.getElementById(`clock${clockId}_weatherColorText`);
        const weatherCheckbox = document.getElementById(`clock${clockId}_weather`);
        const weatherOptions = document.getElementById(`clock${clockId}_weatherOptions`);

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
        });

        // Transparent button
        const transparentBtn = document.querySelector(`[data-clock="${clockId}"][data-type="bg"]`);
        if (transparentBtn) {
            transparentBtn.addEventListener('click', () => {
                bgText.value = 'transparent';
                bg.value = '#000000';
                bg.parentElement.parentElement.querySelector('.color-swatch-wrapper').classList.add('crosshatch');
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
            if (LOCAL_TIMEZONE_CODE_MAP[timezone]) {
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
                weatherLat: null, // Could add these later
                weatherLon: null
            };

            clocks.push(clock);
        });

        if (clocks.length === 0) {
            alert('Please add at least one clock');
            return '';
        }

        let url = `${window.location.origin}/multi-clock.html?`;
        
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
            }
        });

        // Remove trailing &
        url = url.replace(/&$/, '');

        return url;
    }

    // Add one clock by default
    addClock();
});
