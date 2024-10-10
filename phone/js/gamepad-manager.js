export class GamepadManager {
    constructor(inputManager) {
        this.inputManager = inputManager;
        this.attachedElem = null;
        this.currentOptionElem = null;
        this.currentScrollElem = null;

        // Long press tracking
        this.enterIsPressed = false;
        this.enterPressTimeout = null;
        this.longPressCompleted = false; // Tracks whether a long press was completed
        this.enterDownFired = false; // Tracks if enterDown was fired

        this.initKeyListener();
    }

    initKeyListener() {
        window.addEventListener('keydown', this.handleKeydown.bind(this));
        window.addEventListener('keyup', this.handleKeyup.bind(this)); 
    }

    updateCurrentOptionElem(elem) {
        this.currentOptionElem = elem;
        this.updateCurrentAttachedElement();
    }

    updateCurrentAttachedElement() {
        this.attachedElem = this.currentOptionElem;
    }

    handleKeydown(event) {
        event.preventDefault();  // Prevent default behavior for all keyups

        const direction = this.mapKeyToDirection(event.key.toLowerCase());
        if (direction === 'enter' && !this.enterDownFired) {
            this.inputManager.handleJoyStick("enterDown"); // Trigger enterDown immediately
            this.enterDownFired = true; // Mark enterDown as fired
            this.startEnterLongPressTimer(); // Start tracking for long press
        } else if (['up', 'down', 'left', 'right'].includes(direction)) {
            console.log(direction);
            this.inputManager.handleJoyStick(direction);
        }
    }

    handleKeyup(event) {
        event.preventDefault();  // Prevent default behavior for all keyups
        const direction = this.mapKeyToDirection(event.key.toLowerCase());

        if (direction === 'enter') {
            this.stopEnterPressTimer();
            // Reset enterDownFired so it can be triggered again on next press
            this.enterDownFired = false;

            // If long press wasn't completed, treat it as a regular press
            if (!this.longPressCompleted) {
                this.inputManager.handleJoyStick("enterUp"); // Regular press release (zoom in)
            }
        } else {
            this.inputManager.handleJoyStick('center');
        }
    }

    mapKeyToDirection(key) {
        const keyMap = {
            'arrowup': 'up',
            'arrowdown': 'down',
            'arrowleft': 'left',
            'arrowright': 'right',
            'enter': 'enter'
        };
        return keyMap[key] || '';
    }

    startEnterLongPressTimer() {
        if (!this.enterIsPressed) {
            this.enterIsPressed = true; // Set the flag that Enter is pressed

            // Clear any existing timeout to avoid conflicts from previous presses
            if (this.enterPressTimeout) {
                clearTimeout(this.enterPressTimeout);
            }

            this.enterPressTimeout = setTimeout(() => {
                if (this.enterIsPressed && !this.longPressCompleted) {  // Check if the long press has already been triggered
                    this.longPressCompleted = true;  // Set the flag to true to prevent future triggers
                    this.inputManager.handleJoyStick("enterLong"); // Trigger the long press action
                }
            }, 500);  // 500ms delay for long press
        }
    }

    stopEnterPressTimer() {
        // Clear the timeout when the enter key is released before the long press threshold
        if (this.enterPressTimeout) {
            clearTimeout(this.enterPressTimeout);
            this.enterPressTimeout = null;
        }
        this.enterIsPressed = false;
        this.longPressCompleted = false; // Reset the long press flag
    }
}
