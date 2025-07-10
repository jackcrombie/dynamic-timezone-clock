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
    const bgColor = urlParams.get('bg') || 'transparent';
    const timerColor = urlParams.get('timer_color') || '#FFFFFF';

    document.body.style.backgroundColor = bgColor;
    dom.timer.style.color = timerColor;
    dom.title.style.color = timerColor;
    dom.title.textContent = titleText;

    let targetTime;

    const parseDuration = (dur) => {
        let totalSeconds = 0;
        const hoursMatch = dur.match(/(\d+)h/);
        const minutesMatch = dur.match(/(\d+)m/);
        const secondsMatch = dur.match(/(\d+)s/);
        if (hoursMatch) totalSeconds += parseInt(hoursMatch[1]) * 3600;
        if (minutesMatch) totalSeconds += parseInt(minutesMatch[1]) * 60;
        if (secondsMatch) totalSeconds += parseInt(secondsMatch[1]);
        return totalSeconds > 0 ? luxon.Duration.fromObject({ seconds: totalSeconds }) : luxon.Duration.fromObject({ minutes: 5 });
    };

    const calculateTargetTime = () => {
        const now = luxon.DateTime.local();
        if (startDateStr && startTimeStr) {
            const startDateTime = luxon.DateTime.fromISO(`${startDateStr}T${startTimeStr}`, { zone: timezone });
            if (now < startDateTime) {
                return { preTimer: true, start: startDateTime };
            }
        }

        if (mode === 'duration') {
            return { preTimer: false, end: now.plus(parseDuration(duration)) };
        } else { // time of day
            let end = luxon.DateTime.fromISO(endTimeStr, { zone: timezone });
            if (now > end) {
                end = end.plus({ days: 1 });
            }
            return { preTimer: false, end: end };
        }
    };

    const updateTimer = () => {
        const now = luxon.DateTime.local();
        if (targetTime.preTimer) {
            const diff = targetTime.start.diff(now, ['days', 'hours', 'minutes', 'seconds']);
            if (now >= targetTime.start) {
                targetTime = calculateTargetTime(); // Recalculate to start the main timer
                return;
            }
            const titlePrefix = showTitleInPreTimer ? `${titleText} starting in` : 'Starting in';
            dom.title.textContent = titlePrefix;
            dom.timer.textContent = `${Math.floor(diff.as('hours')).toString().padStart(2, '0')}:${diff.minutes.toString().padStart(2, '0')}:${Math.floor(diff.seconds).toString().padStart(2, '0')}`;
        } else {
            const diff = targetTime.end.diff(now, ['hours', 'minutes', 'seconds', 'milliseconds']);
            if (diff.as('milliseconds') <= 0) {
                dom.timer.textContent = "00:00:00";
                dom.title.textContent = `${titleText} Complete`;
                return;
            }
            dom.title.textContent = titleText;
            dom.timer.textContent = `${Math.floor(diff.as('hours')).toString().padStart(2, '0')}:${diff.minutes.toString().padStart(2, '0')}:${Math.floor(diff.seconds % 60).toString().padStart(2, '0')}`;
        }
    };
    
    targetTime = calculateTargetTime();
    updateTimer();
    setInterval(updateTimer, 1000);
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

        if (dom.startDate.value && dom.startTime.value) {
            url += `&startDate=${dom.startDate.value}&startTime=${dom.startTime.value}`;
            url += `&timezone=${encodeURIComponent(dom.startTimezone.value)}`;
            if (dom.showTitleInPreTimer.checked) {
                url += `&showTitle=true`;
            }
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
