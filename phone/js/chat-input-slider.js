export class ChatInputSlider {
    constructor() {
        this.buttonContainer = document.querySelector('.chat-action-buttons');
        this.greenLabel = null;
        this.redLabel = null;
        this.currentElem = null;
        this.timer = 0;
        this.timerRunning = false;
        this.sliderCompleted = false;
        this.timerDuration = 1000;
        this.sliderCompletionWidth = 150;
        this.inputEnabled = false;
        this.sliderOptions = null;
    }

    enableInput(){
        this.inputEnabled = true;
    }
    disableInput(){
        this.inputEnabled = false;
    }

    navigateSlider(direction, value) {
        console.log(this.currentElem);
        if (direction == "left" && this.inputEnabled) {

            this.setSliderGreen();

            if (!this.timerRunning && !this.sliderCompleted) {
                this.timerRunning = true;
                this.timer = setTimeout(() => {
                    if(this.sliderOptions[0].proceed == 1){
                        this.setSliderCompletedGreen();
                        this.timerRunning = false;
                        this.sliderCompleted = true;
                    }
                }, this.timerDuration);
            }

        }
        else if (direction == "right" && this.inputEnabled) {

            this.setSliderRed();

            if (!this.timerRunning && !this.sliderCompleted) {
                this.timerRunning = true;
                this.timer = setTimeout(() => {
                    if(this.sliderOptions[1].proceed == 1){
                        this.setSliderCompletedRed();
                        this.timerRunning = false;
                        this.sliderCompleted = true;
                    }
                }, this.timerDuration);
            }
        }
        else if (direction == "center" & this.inputEnabled) {
            this.setSliderNeutral();
            clearTimeout(this.timer);
            this.timerRunning = false;
        }
    }

    setSliderCompletedGreen() {
        this.redLabel.style.opacity = 0;
        let greenLabelWidth = this.greenLabel.offsetWidth;
        this.greenLabel.style.marginLeft = (this.sliderCompletionWidth-60)/2 - (greenLabelWidth/2) + "px";
        this.currentElem.children[0].style.width = this.sliderCompletionWidth+"px";
        this.currentElem.children[0].classList.add('chat-action-slider--completed');

        setTimeout(() => {
            this.disableInput();
            window.chatDOM.sendNewMessage(); 
        }, 1000);
    }

    setSliderCompletedRed() {
        this.greenLabel.style.opacity = 0;
        this.greenLabel.style.marginLeft = this.greenLabel.clientWidth*-1+"px";
        let redLabelWidth = this.redLabel.clientWidth;
        this.redLabel.style.marginRight = (this.sliderCompletionWidth - 60 - redLabelWidth) / 2 +  "px";
        this.currentElem.children[0].style.width = this.sliderCompletionWidth+"px";
        this.currentElem.children[0].classList.add('chat-action-slider--completed');

        setTimeout(() => {
            this.disableInput();
            window.chatDOM.sendNewMessage();
        }, 1000);
    }

    setSliderGreen() {
        this.currentElem.children[0].classList.add('chat-action-slider--green');
    }
    setSliderRed() {
        this.currentElem.children[0].classList.add('chat-action-slider--red');
    }

    setSliderNeutral() {
        if(!this.sliderCompleted){
            this.currentElem.children[0].classList.remove('chat-action-slider--green');
            this.currentElem.children[0].classList.remove('chat-action-slider--red');
        }
    }

    addSlider(sliderOptions) {
        this.sliderOptions = sliderOptions;
        this.timer = 0;
        this.timerRunning = false;
        this.sliderCompleted = false;

        // create slider element
        const inputSlider = document.createElement('div');
        inputSlider.className = 'chat-action-slider';
        this.buttonContainer.appendChild(inputSlider);

        // add green label on the left
        const greenLabel = document.createElement('div');
        greenLabel.className = 'slider-label slider-label--green';
        greenLabel.textContent = sliderOptions[0].text;
        inputSlider.appendChild(greenLabel);
        this.greenLabel = greenLabel;

        // add dot wrapper div in the middle
        const dotWrapElem = document.createElement('div');
        dotWrapElem.className = 'chat-action-slider-dot-wrapper';
        inputSlider.appendChild(dotWrapElem);

        // add dot in the middle
        const dotElem = document.createElement('div');
        dotElem.className = 'chat-action-slider-dot';
        dotWrapElem.appendChild(dotElem);

        // add red label on the right
        const redLabel = document.createElement('div');
        redLabel.className = 'slider-label slider-label--red';
        redLabel.textContent = sliderOptions[1].text;
        inputSlider.appendChild(redLabel);
        this.redLabel = redLabel;

        setTimeout(() => {
            inputSlider.style.width = inputSlider.clientWidth+"px";
            // dotWrapElem.style.width = "auto";
        }, 500);

        this.currentElem = inputSlider;

    }

    removeSlider() {
        this.buttonContainer.innerHTML = "";
    }

    updateSlider(chatData) {
        this.removeSlider(); // Clear any existing buttons

        if (chatData) {
            if (chatData.optionSlider[0]) {
                // reset counters, add buttons and set buttonContainer as active element
                // this.buttonAmount = 0;
                // this.buttonIndex = 0;
                this.addSlider(chatData.optionSlider);
                this.currentElem = this.buttonContainer;
            }
            else {
                this.currentElem = null;
            }
        }
    }
}