export class CameraPopup {
    constructor() {
        this.cameraPopupContainer = document.querySelector('.camera-window');
    }

    openCameraPopup(){
        this.cameraPopupContainer.style.visibility = "visible";
        this.cameraPopupContainer.classList.remove('camera-window--hidden');
    }
    closeCameraPopup(){
        this.cameraPopupContainer.classList.add('camera-window--hidden');
        setTimeout(() => {
            this.cameraPopupContainer.style.visibility = "hidden";
        }, 500);
    }
    startCameraPopup(){
        this.openCameraPopup();
    }
    cameraTakenOff(){
        window.speechSynth.speakText("Please bring me closer to the carburator", "camera", () => {
            console.log("Speech Synthesis Completed Speaking");
        });
    }
    carburatorReached(){
        this.closeCameraPopup();
        window.chatDOM.sendNewMessage(); 
    }
}