export class ChatInputWheel {
    constructor() {
        this.wheelContainer = document.querySelector('.chat-action-buttons');
        this.wheelItemAmount = 0;
        this.wheelItemIndex = 0;
        this.wheelGroupWidth = 0;
        this.wheelVisibleWidth = null;
        this.currentElem = null;
    }

    navigateWheel(direction, value){
        // console.log(this.wheelItemIndex);
        // console.log(direction, "BUTTON");
        if(direction == "left"){

            if(this.wheelItemIndex == 1){
                // show dot again
                this.wheelContainer.children[0].classList.add('chat-action-button-dot--active');
                this.wheelContainer.querySelector('.chat-action-button-group').children[this.wheelItemIndex-1].classList.remove('chat-action-button--active');
                this.wheelItemIndex--;
                // this.moveButtonGroup();
            }

            else if(this.wheelItemIndex > 1){
                // move left
                this.wheelContainer.querySelector('.chat-action-button-group').children[this.wheelItemIndex-1].classList.remove('chat-action-button--active');
                this.wheelItemIndex--;
                this.wheelContainer.querySelector('.chat-action-button-group').children[this.wheelItemIndex-1].classList.add('chat-action-button--active');
                this.moveButtonGroup();
            }
        }
        else if(direction == "right"){


            if(this.wheelItemIndex == 0){
                // show dot again
                this.wheelContainer.children[0].classList.remove('chat-action-button-dot--active');
                this.wheelContainer.querySelector('.chat-action-button-group').children[this.wheelItemIndex].classList.add('chat-action-button--active');
                this.wheelItemIndex++;
                // this.moveButtonGroup();

            }

            else if(this.wheelItemIndex < this.wheelItemAmount && this.wheelItemIndex > 0){
                // move right
                this.wheelContainer.querySelector('.chat-action-button-group').children[this.wheelItemIndex-1].classList.remove('chat-action-button--active');
                this.wheelItemIndex++;
                this.wheelContainer.querySelector('.chat-action-button-group').children[this.wheelItemIndex-1].classList.add('chat-action-button--active');
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
        
        if(this.wheelVisibleWidth < this.wheelGroupWidth){

            const stepSize = (this.wheelGroupWidth - this.wheelVisibleWidth)/(this.wheelItemAmount-1);
            this.wheelContainer.querySelector('.chat-action-button-group').style.marginLeft = (stepSize * (this.wheelItemIndex-1) * -1)+"px";

        }

    }

    addItems(optionWheel) {
        console.log(optionWheel);
        // create moveable dot
        // create button group wrapper

         // create button group wrapper
         const wheelElem = document.createElement('div');
         wheelElem.className = 'chat-action-wheel';
         this.wheelContainer.appendChild(wheelElem);

        optionWheel.items.forEach(item => {
            this.wheelItemAmount ++;
            console.log(this.wheelItemAmount);
            const itemElem = document.createElement('button');
            itemElem.className = 'chat-action-wheel-item';
            itemElem.textContent = item;

            if(this.wheelItemAmount == optionWheel.default){
                itemElem.className = 'chat-action-wheel-item chat-action-wheel-item--active';
            }
            else if (this.wheelItemAmount == optionWheel.proceed){
                itemElem.id = "proceed";
                    // Add an onclick event listener
                    itemElem.onclick = () => {
                        window.chatDOM.sendNewMessage();
                    };
            }

            wheelElem.appendChild(itemElem); // Use 'this.wheelContainer'
        });

        // this.getwheelGroupWidth();
        // this.getwheelVisibleWidth()
    }


    removeWheel() {
        if(this.wheelContainer){
            this.wheelItemAmount = 0;
            this.wheelItemIndex = 0;
            while (this.wheelContainer.firstChild) {
                this.wheelContainer.removeChild(this.wheelContainer.firstChild);
            }
        }
    }

    updateWheel(chatData) {
         // Clear any existing buttons
        this.removeWheel();

        if (chatData) {
            if (chatData.optionWheel.items) { 
                // reset counters, add buttons and set wheelContaineras active element
                this.wheelItemAmount = 0;
                this.wheelItemIndex = 0;
                this.addItems(chatData.optionWheel);
                this.currentElem = target;
            }
            else{
                this.currentElem = null;
            }
        }
    }

    getwheelGroupWidth(){
        let buttonGroup = this.wheelContainer.querySelector('.chat-action-button-group');
        this.wheelGroupWidth = buttonGroup.clientWidth;
        console.log(this.wheelGroupWidth);
    }

    getwheelVisibleWidth(){
        let element = this.wheelContainer;
        if(element){
            const styles = getComputedStyle(element);
            const widthWithPadding = element.clientWidth;
            const paddingLeft = parseFloat(styles.paddingLeft);
            const paddingRight = parseFloat(styles.paddingRight);
            const widthMinusPadding = widthWithPadding - paddingLeft - paddingRight;
            this.wheelVisibleWidth = widthMinusPadding;
            return widthMinusPadding;
        }
    }
}
