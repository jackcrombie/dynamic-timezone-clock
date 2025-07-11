document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('timer-config')) {
        initTimerConfigPage();
    } else if (path.includes('timer.html')) {
        initTimerPage();
    }
});

function initTimerPage() {
    const dom = {
        title: document.getElementById("title"),
        timer: document.getElementById("timer"),
    };

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'duration';
    const titleText = urlParams.get('title') || 'Countdown';
    const duration = urlParams.get('dur') || '5m';
    const endTimeStr = urlParams.get('time') || '23:59';
    const startDateStr = urlParams.get('startDate');
    const startTimeStr = urlParams.get('startTime');
    const timezone = urlParams.get('timezone') || 'UTC';
    const showTitleInPreTimer = urlParams.get('showTitle') === 'true';
    const hideSeconds = urlParams.has('hide_seconds') ? urlParams.get('hide_seconds') === 'true' : false;
    const hideHours = urlParams.has('hide_hours') ? urlParams.get('hide_hours') === 'true' : false;
    const bgColor = urlParams.get('bg') || 'transparent';
    const timerColor = urlParams.get('timer_color') || '#FFFFFF';

    document.body.style.backgroundColor = bgColor;
    dom.timer.style.color = timerColor;
    dom.title.style.color = timerColor;
    dom.title.textContent = titleText;

    let targetTime;
    let initialDurationInHours = 0;

    const parseDuration = (dur) => {
        let totalSeconds = 0;
        const daysMatch = dur.match(/(\d+)d/);
        const hoursMatch = dur.match(/(\d+)h/);
        const minutesMatch = dur.match(/(\d+)m/);
        const secondsMatch = dur.match(/(\d+)s/);
        if (daysMatch) totalSeconds += parseInt(daysMatch[1]) * 86400;
        if (hoursMatch) totalSeconds += parseInt(hoursMatch[1]) * 3600;
        if (minutesMatch) totalSeconds += parseInt(minutesMatch[1]) * 60;
        if (secondsMatch) totalSeconds += parseInt(secondsMatch[1]);
        return totalSeconds > 0 ? luxon.Duration.fromObject({ seconds: totalSeconds }) : luxon.Duration.fromObject({ minutes: 5 });
    };

    const calculateTargetTime = () => {
        const now = luxon.DateTime.local();
        if (mode === 'duration') {
            const durationObj = parseDuration(duration);
            initialDurationInHours = durationObj.as('hours');
            if (startDateStr && startTimeStr) {
                const startDateTime = luxon.DateTime.fromISO(`${startDateStr}T${startTimeStr}`, { zone: timezone });
                const endDateTime = startDateTime.plus(durationObj);
                if (now < startDateTime) {
                    return { preTimer: true, start: startDateTime, end: endDateTime };
                } else {
                    return { preTimer: false, end: endDateTime };
                }
            } else {
                return { preTimer: false, end: now.plus(durationObj) };
            }
        } else { // time of day
            let end = luxon.DateTime.fromISO(endTimeStr, { zone: timezone });
            if (now > end) {
                end = end.plus({ days: 1 });
            }
            initialDurationInHours = end.diff(now, 'hours').hours;
            return { preTimer: false, end: end };
        }
    };

    const formatTime = (diff, durationInHours) => {
        let parts = [];
        // Only show DD if duration > 36 hours
        if (durationInHours > 36) {
            if (!hideHours) {
                parts.push(diff.days.toString().padStart(2, '0'));
                parts.push(diff.hours.toString().padStart(2, '0'));
            } else {
                // If hours hidden, just show days
                parts.push(diff.days.toString().padStart(2, '0'));
            }
        } else {
            // Under 36 hours, never show DD
            if (!hideHours) {
                parts.push(Math.floor(diff.as('hours')).toString().padStart(2, '0'));
            }
        }
        parts.push(diff.minutes.toString().padStart(2, '0'));
        if (!hideSeconds) {
            parts.push(Math.floor(diff.seconds).toString().padStart(2, '0'));
        }
        return parts.join(':');
    };

    const updateTimer = () => {
        const now = luxon.DateTime.local();
        if (targetTime.preTimer) {
            // Use the same DD:HH:MM:SS logic for pre-timer
            const diff = targetTime.start.diff(now, ['days', 'hours', 'minutes', 'seconds']);
            const durationToStart = targetTime.start.diff(now, 'hours').hours;
            if (now >= targetTime.start) {
                targetTime = calculateTargetTime(); // Recalculate to start the main timer
                return;
            }
            const titlePrefix = showTitleInPreTimer ? `${titleText} starting in` : 'Starting in';
            dom.title.textContent = titlePrefix;
            dom.timer.textContent = formatTime(diff, durationToStart);
        } else {
            const diff = targetTime.end.diff(now, ['days', 'hours', 'minutes', 'seconds', 'milliseconds']);
            if (diff.as('milliseconds') <= 0) {
                let completedStr = "";
                if (hideHours && hideSeconds) completedStr = "00";
                else if (hideHours) completedStr = hideSeconds ? "00" : "00:00";
                else if (hideSeconds) completedStr = "00:00";
                else completedStr = "00:00:00";
                dom.timer.textContent = completedStr;
                dom.title.textContent = `${titleText} Complete`;
                return;
            }
            dom.title.textContent = titleText;
            dom.timer.textContent = formatTime(diff, initialDurationInHours);
        }
    };
    
    targetTime = calculateTargetTime();
    updateTimer();
    // Synchronize timer tick with local clock
    const syncToNextSecond = () => {
        const now = Date.now();
        const msToNextSecond = 1000 - (now % 1000);
        setTimeout(() => {
            updateTimer();
            setInterval(updateTimer, 1000);
        }, msToNextSecond);
    };
    syncToNextSecond();
}


function initTimerConfigPage() {
    const dom = {
        timerMode: document.getElementById("timerMode"),
        durationConfig: document.getElementById("durationConfig"),
        timeOfDayConfig: document.getElementById("timeOfDayConfig"),
        duration: document.getElementById("duration"),
        endTime: document.getElementById("endTime"),
        startDate: document.getElementById("startDate"),
        startTime: document.getElementById("startTime"),
        startTimezone: document.getElementById("startTimezone"),
        showTitleInPreTimer: document.getElementById("showTitleInPreTimer"),
        hideSeconds: document.getElementById("hideSeconds"),
        hideHours: document.getElementById("hideHours"),
        title: document.getElementById("title"),
        background: document.getElementById("background"),
        colorText: document.getElementById("colorText"),
        backgroundSwatch: document.querySelector("#background").parentElement,
        timerColor: document.getElementById("timerColor"),
        timerColorText: document.getElementById("timerColorText"),
        timerColorSwatch: document.querySelector("#timerColor").parentElement,
        generatedURL: document.getElementById("generatedURL"),
        output: document.getElementById("output"),
        previewFrame: document.getElementById("preview"),
        previewFrameWrapper: document.getElementById("previewFrameWrapper"),
        crosshatchBg: document.getElementById("crosshatchBg"),
    };

    const isValidColor = (str) => {
        const s = new Option().style;
        s.color = str;
        return s.color !== '';
    };

    const populateTimezones = () => {
        try {
            const detectedZone = luxon.DateTime.local().zone.name || 'Australia/Sydney';
            const timezones = [
                detectedZone, 'UTC', 'America/New_York', 'America/Chicago', 'America/Denver',
                'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'
            ].filter((tz, index, self) => self.indexOf(tz) === index);
            
            dom.startTimezone.innerHTML = timezones.map(tz => 
                `<option value="${tz}" ${tz === detectedZone ? 'selected' : ''}>${tz}</option>`
            ).join('');
        } catch (e) {
            console.error("Could not detect timezone.", e);
            dom.startTimezone.innerHTML = `<option value="Australia/Sydney">Australia/Sydney</option>`;
        }
    };

    const generateURL = () => {
        const mode = dom.timerMode.value;
        const title = dom.title.value || "Countdown";
        const bgColor = dom.colorText.value || "transparent";
        const timerColor = dom.timerColorText.value || "#FFFFFF";
        let url = `${window.location.origin}/timer.html?mode=${mode}&title=${encodeURIComponent(title)}`;

        if (mode === 'duration') {
            url += `&dur=${encodeURIComponent(dom.duration.value || "5m")}`;
        } else {
            url += `&time=${dom.endTime.value || "23:59"}`;
        }

        let startDate = dom.startDate.value;
        const startTime = dom.startTime.value;
        const hideSeconds = dom.hideSeconds.checked;
        const hideHours = dom.hideHours && dom.hideHours.checked;

        // If a time is provided but a date is not, default to today's date.
        if (startTime && !startDate) {
            startDate = luxon.DateTime.local().toISODate();
        }

        if (startDate && startTime) {
            url += `&startDate=${startDate}&startTime=${startTime}`;
            url += `&timezone=${encodeURIComponent(dom.startTimezone.value)}`;
            if (dom.showTitleInPreTimer.checked) {
                url += `&showTitle=true`;
            }
        }

        if (hideSeconds) {
            url += `&hide_seconds=true`;
        }
        if (hideHours) {
            url += `&hide_hours=true`;
        }

        if (bgColor !== "transparent") url += `&bg=${encodeURIComponent(bgColor)}`;
        if (timerColor !== "#FFFFFF") url += `&timer_color=${encodeURIComponent(timerColor)}`;

        dom.generatedURL.textContent = url;
        dom.output.classList.remove("hidden");
        return url;
    };

    const toggleTimerMode = () => {
        if (dom.timerMode.value === 'duration') {
            dom.durationConfig.style.display = 'block';
            dom.timeOfDayConfig.style.display = 'none';
        } else {
            dom.durationConfig.style.display = 'none';
            dom.timeOfDayConfig.style.display = 'block';
        }
    };

    // --- Event Listeners ---
    dom.timerMode.addEventListener('change', toggleTimerMode);

    document.querySelector(".instructions-header")?.addEventListener("click", () => {
        document.getElementById("instructionsContent").classList.toggle("show");
        document.querySelector(".instructions-toggle").classList.toggle("rotated");
    });
    
    document.querySelector(".transparent-btn").addEventListener("click", () => {
        dom.colorText.value = "transparent";
        dom.background.value = "#000000";
        dom.backgroundSwatch.classList.add("crosshatch");
    });

    dom.background.addEventListener('input', (e) => {
        dom.colorText.value = e.target.value;
        dom.backgroundSwatch.classList.remove("crosshatch");
    });
    dom.colorText.addEventListener('input', (e) => { 
        if (isValidColor(e.target.value)) {
            dom.background.value = e.target.value;
            dom.backgroundSwatch.classList.remove("crosshatch");
        }
    });

    dom.timerColor.addEventListener('input', (e) => dom.timerColorText.value = e.target.value);
    dom.timerColorText.addEventListener('input', (e) => { 
        if (isValidColor(e.target.value)) dom.timerColor.value = e.target.value; 
    });

    document.querySelector(".btn-generate").addEventListener("click", generateURL);
    
    document.querySelector(".btn-preview").addEventListener("click", () => {
        const url = generateURL();
        dom.previewFrameWrapper.classList.remove("hidden");
        const isTransparent = dom.colorText.value.trim().toLowerCase() === "transparent";
        dom.crosshatchBg.style.display = isTransparent ? "block" : "none";
        dom.previewFrame.src = url;
    });

    document.querySelector(".btn-open").addEventListener("click", () => window.open(generateURL(), '_blank'));

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

    // --- Initial Page Setup ---
    populateTimezones();
    toggleTimerMode();
}
