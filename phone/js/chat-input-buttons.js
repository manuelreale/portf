export class ChatInputButtons {
    constructor() {
        this.buttonContainer = null;
        this.buttonAmount = 0;
        this.buttonIndex = 0;
        this.buttonGroupWidth = 0;
        this.buttonVisibleWidth = null;
        this.currentElem = null;
        this.inputEnabled = false;
    }

    enableInput(){
        this.inputEnabled = true;
    }
    disableInput(){
        this.inputEnabled = false;
    }

    navigateButtons(direction, value){
        // console.log(this.buttonIndex);
        // console.log(direction, "BUTTON");
        if(direction == "left"){

            if(this.buttonIndex == 1){
                // show dot again
                this.buttonContainer.children[0].classList.add('chat-action-button-dot--active');
                this.buttonContainer.querySelector('.chat-action-button-group').children[this.buttonIndex-1].classList.remove('chat-action-button--active');
                this.buttonIndex--;
                // this.moveButtonGroup();
            }

            else if(this.buttonIndex > 1){
                // move left
                this.buttonContainer.querySelector('.chat-action-button-group').children[this.buttonIndex-1].classList.remove('chat-action-button--active');
                this.buttonIndex--;
                this.buttonContainer.querySelector('.chat-action-button-group').children[this.buttonIndex-1].classList.add('chat-action-button--active');
                this.moveButtonGroup();
            }
        }
        else if(direction == "right"){


            if(this.buttonIndex == 0){
                // show dot again
                this.buttonContainer.children[0].classList.remove('chat-action-button-dot--active');
                this.buttonContainer.querySelector('.chat-action-button-group').children[this.buttonIndex].classList.add('chat-action-button--active');
                this.buttonIndex++;
                // this.moveButtonGroup();

            }

            else if(this.buttonIndex < this.buttonAmount && this.buttonIndex > 0){
                // move right
                this.buttonContainer.querySelector('.chat-action-button-group').children[this.buttonIndex-1].classList.remove('chat-action-button--active');
                this.buttonIndex++;
                this.buttonContainer.querySelector('.chat-action-button-group').children[this.buttonIndex-1].classList.add('chat-action-button--active');
                this.moveButtonGroup();
            }
        }
        else if(direction == "enterDown"){
            // checks if selected item has id 'proceed' and will launch next step
            let activeButton = document.querySelector('.chat-action-button--active');
            if(activeButton){
                if(activeButton.id == 'proceed'){
                    window.chatDOM.sendNewMessage();
                }
            }
        }
    }

    moveButtonGroup(){
        
        if(this.buttonVisibleWidth < this.buttonGroupWidth){

            const stepSize = (this.buttonGroupWidth - this.buttonVisibleWidth)/(this.buttonAmount-1);
            this.buttonContainer.querySelector('.chat-action-button-group').style.marginLeft = (stepSize * (this.buttonIndex-1) * -1)+"px";

        }

    }

    addButtons(buttons, target) {
        console.log(buttons);
        this.buttonContainer = target;
        console.log(target);
        // create moveable dot
        const dotElem = document.createElement('div');
        dotElem.className = 'chat-action-button-dot chat-action-button-dot--active';
        this.buttonContainer.appendChild(dotElem); // Use 'this.buttonContainer'

        // create button group wrapper
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'chat-action-button-group';
        this.buttonContainer.appendChild(buttonGroup); // Use 'this.buttonContainer'

        buttons.forEach(button => {
            this.buttonAmount ++;
            console.log(this.buttonAmount);
            const buttonElem = document.createElement('button');
            buttonElem.className = 'chat-action-button';
            buttonElem.textContent = button.text;

            if (button.proceed == 1) {
                buttonElem.id = "proceed";
                // Add an onclick event listener
                buttonElem.onclick = () => {
                    window.chatDOM.sendNewMessage();
                };
            }
            buttonGroup.appendChild(buttonElem); // Use 'this.buttonContainer'
        });

        this.getButtonGroupWidth();
        this.getButtonVisibleWidth()
    }


    removeButtons() {
        if(this.buttonContainer){
            this.buttonAmount = 0;
            this.buttonIndex = 0;
            while (this.buttonContainer.firstChild) {
                this.buttonContainer.removeChild(this.buttonContainer.firstChild);
            }
        }
    }

    updateButtons(chatData, target) {
         // Clear any existing buttons
        this.removeButtons();

        if (chatData) {
            if (chatData.optionButtons[0]) { 
                // reset counters, add buttons and set buttonContainer as active element
                this.buttonAmount = 0;
                this.buttonIndex = 0;
                this.addButtons(chatData.optionButtons, target);
                this.currentElem = target;
            }
            else{
                this.currentElem = null;
            }
        }
    }

    getButtonGroupWidth(){
        let buttonGroup = this.buttonContainer.querySelector('.chat-action-button-group');
        this.buttonGroupWidth = buttonGroup.clientWidth;
        console.log(this.buttonGroupWidth);
    }

    getButtonVisibleWidth(){
        let element = this.buttonContainer;
        if(element){
            const styles = getComputedStyle(element);
            const widthWithPadding = element.clientWidth;
            const paddingLeft = parseFloat(styles.paddingLeft);
            const paddingRight = parseFloat(styles.paddingRight);
            const widthMinusPadding = widthWithPadding - paddingLeft - paddingRight;
            this.buttonVisibleWidth = widthMinusPadding;
            return widthMinusPadding;
        }
    }
}
