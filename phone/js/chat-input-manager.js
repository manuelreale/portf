import { ChatInputButtons } from './chat-input-buttons.js';
import { ChatInputSlider } from './chat-input-slider.js';
import { ChatInputVoice } from './chat-input-voice.js';
import { PopupManager } from './popup-manager.js';
import { Dashboard } from './dashboard.js';
import { ProcedureManager } from './procedure-manager.js';
import { CameraPopup } from './camera-popup.js';
import { ChatInputWheel } from './chat-input-wheel.js';

export class ChatInputManager {
    constructor() {
        this.chatInputButtons = new ChatInputButtons();
        this.chatInputSlider = new ChatInputSlider();
        this.chatInputWheel = new ChatInputWheel();
        this.chatInputVoice = new ChatInputVoice();
        this.popupManager = new PopupManager();
        this.procedureManager = new ProcedureManager();
        this.dashboard = new Dashboard();
        this.cameraPopup = new CameraPopup();
        this.currentOptionElem = null;
        this.currentOptionType = null;

        this.currentWindowType = "dashboard";
        // this.setDebugButton();
        this.bindPopupManagerToWindow();
    }

    bindPopupManagerToWindow(){
        window.popupManager = this.popupManager;
    }

    setCurrentWindowType(target, targetVariant){
        this.currentWindowType = target;
        if(target == "popup"){
            this.popupManager.updatePopup(targetVariant);
        }
        else if(target == "camera"){
            this.cameraPopup.startCameraPopup();
        }
    }

    handleJoyStick(direction, value){
        // console.log(direction, value);

        if(this.currentWindowType == "popup"){
            this.popupManager.navigatePopup(direction,value);
        }

        else if(this.currentWindowType == "procedure"){
            this.procedureManager.navigatePopup(direction,value);
        }
        else if(this.currentWindowType == "dashboard"){
            this.dashboard.handleJoystick(direction);
        }
        else{

            if(this.currentOptionType == "buttons"){
                this.chatInputButtons.navigateButtons(direction, value);
            }
            if(this.currentOptionType == "slider"){
                this.chatInputSlider.navigateSlider(direction, value);
            }
            if(this.currentOptionType == "wheel"){
                this.chatInputWheel.navigateWheel(direction, value);
            }

        }
    }

    handleVoiceInput(data, type){
        this.chatInputVoice.speechManager(data, type);
    }

    enableInputs(){
        if(this.currentOptionType == "buttons"){
            this.chatInputButtons.enableInput();
        }
        else if(this.currentOptionType == "slider"){
            this.chatInputSlider.enableInput();
        }
        else if(this.currentOptionType == "wheel"){
            this.chatInputWheel.enableInput();
        }
    }

    removeCurrentInputs(){
        this.chatInputButtons.removeButtons();
        this.chatInputSlider.removeSlider();
        this.chatInputWheel.removeWheel();
    }

    updateInputWheel(chatData, target){
        this.removeCurrentInputs();
        this.chatInputWheel.updateWheel(chatData, target);
        this.currentOptionType = "wheel";
    }

    updateInputButtons(chatData, target){
        this.removeCurrentInputs();
        this.chatInputButtons.updateButtons(chatData, target);
        this.currentOptionType = "buttons";
    }

    updateInputSlider(chatData){
        this.removeCurrentInputs();
        this.chatInputSlider.updateSlider(chatData);
        this.currentOptionType = "slider";
    }


}