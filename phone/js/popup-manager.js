import { ZoomableImageManager } from './zoomable-image-manager.js';


export class PopupManager {
    constructor() {
        this.popupContainer = document.querySelector('.popup-window');
        this.popupContainerContent = document.querySelector('.popup-window-content');
        this.popupWrapper = null;
        this.popupScrollbarWrapper = document.querySelector('.popup-window-scrollbar-wrapper');
        this.popupScrollbar = document.querySelector('.popup-window-scrollbar');
        this.popupScrollbarHandle = document.querySelector('.popup-window-scrollbar__handle');
        this.chatActions = document.querySelector('.chat-actions');
        this.currentSrolledChild = 0;
        this.zoomableImageManager = new ZoomableImageManager();
        this.popupChildren = null;
        this.activeElement = null;
    }
    setPopupVisible() {
        this.popupContainer.classList.remove('popup-window--hidden');
        this.chatActions.classList.add('chat-actions--send');
    }
    setPopupHidden() {
        this.popupContainer.classList.add('popup-window--hidden');
        setTimeout(() => {
            this.popupWrapper.classList.add('popup-ai-wrapper--hidden');
            this.popupWrapper = null;
            this.currentSrolledChild = 0;
            this.popupChildren = null;
            this.activeElement = null;
        }, 500);
    }
    setPopupFinishedSpeaking() {
        this.popupContainer.classList.remove('popup-window--speaking');
    }

    updatePopup(popupVariant) {
        if(popupVariant == "antenna"){
            this.popupWrapper = document.querySelector('.popup-ai-wrapper--antenna');
            this.popupWrapper.classList.remove('popup-ai-wrapper--hidden');
            this.zoomableImageManager.populatePopupImages(popupVariant);
            // this.zoomableImageManager.createImage(this.popupWrapper.querySelector('.popup-ai-image-wrapper'), '../assets/images/dummy-image.png');
            this.popupChildren = this.popupWrapper.children;
        }
        if(popupVariant == "finding"){
            this.popupWrapper = document.querySelector('.popup-ai-wrapper--finding');
            this.popupWrapper.classList.remove('popup-ai-wrapper--hidden');
            this.zoomableImageManager.populatePopupImages(popupVariant);

            // this.zoomableImageManager.createVideo(this.popupWrapper.querySelector('.popup-ai-image-wrapper'), '../assets/videos/ailerons.mp4');
            this.popupChildren = this.popupWrapper.children;
        }
        this.setScrollBarHeight();

    }
    setScrollBarHeight() {
        let contentHeight = this.popupWrapper.clientHeight;
        let popupHeight = this.popupContainerContent.clientHeight;

        // Ensure contentHeight is greater than popupHeight to calculate the scrollbar handle correctly
        if (contentHeight > popupHeight) {
            // Calculate the scrollbar height as a percentage of the visible content relative to total content
            let scrollBarHeightPercentage = (popupHeight / contentHeight) * 100;
            // Apply this percentage as the height of the scrollbar handle
            this.popupScrollbarHandle.style.height = `${scrollBarHeightPercentage * 0.75}%`;
        } else {
            // If no scrolling is needed (all content fits), the scrollbar should be full height or hidden
            this.popupScrollbarHandle.style.height = '100%'; // or hide the scrollbar if you prefer
        }

    }

    navigatePopup(direction) {
        // console.log(direction, "POPUP");

        // send navigation to image if activated;
        if (this.zoomableImageManager.activated) {
            this.zoomableImageManager.handleJoyStick(direction);
        }
        else{
            if (direction == "down" || direction == "up") {
                this.moveUpDown(direction);
            }
            if(direction == "left" || direction == "right"){
                if(this.activeElement.classList.contains('popup-ai-actions-buttons')){
                    window.chatInputManager.chatInputButtons.navigateButtons(direction);
                }
            }
        }

        if (direction == "enterUp" || direction == "enterDown" || direction == "enterLong") {
            this.processEnter(direction);
        }
    }

    processEnter(direction) {
        let activeElement = this.activeElement;
        if(!activeElement){
            return;
        }
        // in case the active element contains an image
        if (activeElement.classList.contains('popup-ai-image')) {


            let enterCallback = this.zoomableImageManager.handleEnter(direction, activeElement.querySelector('.popup-ai-image-wrapper'));
            
            enterCallback.then(result => {
                if (result === "activateImage") {
                    this.hideScrollBar();
                    activeElement.classList.add('popup-item--zoom');
                    this.popupContainer.classList.add('popup-window--zoomed');
                }
                else if (result === "exitImage") {
                    this.showScrollBar();
                    activeElement.classList.remove('popup-item--zoom');
                    this.popupContainer.classList.remove('popup-window--zoomed');

                }

            });
            
        }
        else if (activeElement.classList.contains('popup-ai-actions')) {

            let activeButton = activeElement.querySelector('.chat-action-button--active');
            if(activeButton){
                if(activeButton.id == 'proceed'){
                    this.setPopupHidden();
                    window.chatDOM.sendNewMessage();
                }
            }

        }
        else if (activeElement.classList.contains('popup-ai-actions-buttons')){
            let activeButton = activeElement.querySelector('.chat-action-button--active');
            if(activeButton){
                if(activeButton.id == 'proceed'){
                    this.setPopupHidden();
                    window.chatDOM.sendNewMessage();
                }
            }
        }
        // in case the active element contains a button
    }

    hideScrollBar() {
        this.popupScrollbarWrapper.classList.add('popup-window-scrollbar-wrapper--hidden');
        Array.from(this.popupChildren).forEach((child, index) => {
            if (!child.classList.contains('popup-ai-image')) {
                child.style.width = child.clientWidth + "px";
            }
        });

    }
    showScrollBar() {
        this.popupScrollbarWrapper.classList.remove('popup-window-scrollbar-wrapper--hidden');
    }

    moveUpDown(direction) {
        // Get all the direct children inside the wrapper
        const children = this.popupChildren;

        // console.log(children);

        // Find the next child to scroll to based on the direction
        if (direction === "down") {
            if (this.currentSrolledChild < children.length - 1) {
                this.currentSrolledChild++;
            }
        } else if (direction === "up") {
            if (this.currentSrolledChild > 0) {
                this.currentSrolledChild--;
            }
        }

        // Add 'popup-item--active' class to the current child and remove it from others
        Array.from(children).forEach((child, index) => {
            if (index === this.currentSrolledChild) {
                this.activateItem(child);
            } else {
                this.deactivateItem(child);
            }
        });

        // Scroll to the current child using GSAP
        gsap.to(this.popupContainerContent, {
            duration: 0.25, // Duration in seconds
            scrollTo: {
                y: children[this.currentSrolledChild],  // Scroll to the element directly
                offsetY: 0    // Optional offset from the top
            },
            ease: "power2.Out",  // Optional easing for smooth effect,
            onUpdate: () => {
                this.updateScrollBarPosition(); // Call the scrollbar handle update during the scroll
            }
        });
    }

    activateItem(item){
        this.activeElement = item;
        item.classList.add('popup-item--active');
        
        if(item.classList.contains('popup-ai-actions')) {
            setTimeout(() => {
                item.querySelector('.chat-action-button').classList.add('chat-action-button--active');                
            }, 250);
        }
      
    }
    deactivateItem(item){
    
        if(item.classList.contains('popup-item--active')) {


            if(item.classList.contains('popup-ai-actions')) {
                item.querySelector('.chat-action-button').classList.remove('chat-action-button--active');                
            }      

        }
        item.classList.remove('popup-item--active');
    }

    updateScrollBarPosition() {
        let maxScroll = this.popupContainerContent.scrollHeight - this.popupContainerContent.clientHeight;
        let scrollTop = this.popupContainerContent.scrollTop;
        let scrollPercentage = (scrollTop / maxScroll) * 100;
        let scrollHandleMaxScroll = this.popupScrollbar.clientHeight - this.popupScrollbarHandle.clientHeight;
        let scrollHandleMargin = (scrollPercentage / 100) * scrollHandleMaxScroll;
        this.popupScrollbarHandle.style.marginTop = scrollHandleMargin + "px";
    }

}