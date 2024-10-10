export class Debug {
    constructor(gamePadManager, scenarioManager) {
        this.debugEnabled = false;
        this.longPressDuration = 3000; // 3 seconds to enable debug mode
        this.inactivityDuration = 30000; // 30 seconds of inactivity to disable debug mode
        this.longPressTimer = null;
        this.inactivityTimer = null;
        this.gamePadManager = gamePadManager;
        this.scenarioManager = scenarioManager;

        // Bind events for enabling debug mode and button actions
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('touchstart', this.onTouchStart.bind(this));
        document.addEventListener('touchend', this.onTouchEnd.bind(this));

        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.enableDebug();
        });

        this.bindButtonActions();
    }

    onTouchStart(event) {
        this.resetInactivityTimer(); // Reset inactivity timer on any touch
        this.longPressTimer = setTimeout(() => {
            this.enableDebug(); // Only enable debug mode, no toggle
        }, this.longPressDuration);
    }

    onTouchEnd(event) {
        clearTimeout(this.longPressTimer); // Cancel the long press if touch is released early
    }

    enableDebug() {
        if (!this.debugEnabled) {
            this.debugEnabled = true;
            const debugSection = document.querySelector('.debug-section');

            if (!debugSection) {
                console.error("Debug section not found!");
                return;
            }

            debugSection.classList.remove('debug-section--hidden');
            console.log("Debug mode enabled");

            // Start the inactivity timer once debug mode is enabled
            this.resetInactivityTimer();
        }
    }

    disableDebug() {
        if (this.debugEnabled) {
            this.debugEnabled = false;
            const debugSection = document.querySelector('.debug-section');

            if (!debugSection) {
                console.error("Debug section not found!");
                return;
            }

            debugSection.classList.add('debug-section--hidden');
            console.log("Debug mode disabled");
        }
    }

    resetInactivityTimer() {
        // Clear any existing inactivity timer
        if (this.inactivityTimer) {
            clearTimeout(this.inactivityTimer);
        }

        // Set a new inactivity timer to disable debug mode after 30 seconds of no interaction
        this.inactivityTimer = setTimeout(() => {
            this.disableDebug();
        }, this.inactivityDuration);
    }

    bindButtonActions() {
        const buttons = document.querySelectorAll('.debug-section button');
        buttons.forEach(button => {
            button.addEventListener('mousedown', this.onButtonDown.bind(this, button));
            button.addEventListener('touchstart', this.onButtonDown.bind(this, button));

            button.addEventListener('mouseup', this.onButtonUp.bind(this, button));
            button.addEventListener('touchend', this.onButtonUp.bind(this, button));
        });
    }

    onButtonDown(button, event) {
        event.preventDefault();
        const action = button.classList[0];
        this.simulateKeyPress(action, 'down');
    }

    onButtonUp(button, event) {
        event.preventDefault();
        const action = button.classList[0];
        this.simulateKeyPress(action, 'up');
    }

    simulateKeyPress(action, type) {
        const gamepadKeyMap = {
            'debug-left': 'ArrowLeft',
            'debug-right': 'ArrowRight',
            'debug-up': 'ArrowUp',
            'debug-down': 'ArrowDown',
            'debug-ok': 'Enter'
        };

        const scenarioKeyMap = {
            'debug-1': '1',
            'debug-2': '2',
            'debug-3': '3',
            'debug-dash': '0' // Assuming "H" maps to 0 for dashboard
        };

        let key;
        if (action in gamepadKeyMap) {
            key = gamepadKeyMap[action];
        } else if (action in scenarioKeyMap) {
            key = scenarioKeyMap[action];
        } else {
            console.warn("No key mapping found for action:", action);
            return;
        }

        const eventType = type === 'down' ? 'keydown' : 'keyup';
        const event = new KeyboardEvent(eventType, { key });
        window.dispatchEvent(event); // Dispatch event globally to be caught by ScenarioManager or GamepadManager
        console.log(`Simulated ${eventType} for ${key}`);
    }
}
