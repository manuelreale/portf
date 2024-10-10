// chatDOM.js
// import { speakText } from './speech-synthesis.js';
import { ChatData } from './chat-data.js';
import { ScenarioManager } from './scenario-manager.js';
// import { ChatInputManager } from './chat-input-manager.js';
// import { GamepadManager } from './gamepad-manager.js';


export class ChatDOM {
    constructor(chatGPT, speechSynth, chatInputManager, gamePadManager, scenarioManager) {
        this.chatGPT = chatGPT;
        this.speechSynth = speechSynth;

        this.inputContainer = document.querySelector('.input-container');
        this.inputTextContainer = document.querySelector('.input-container-content--text');
        this.inputVoiceContainer = document.querySelector('.input-container-content--voice');

        this.inputTextArea = document.getElementById("inputText");
        this.inputVoiceArea = document.getElementById("inputVoice");

        this.chatContentBox = document.querySelector('.chat-content');

        this.micIcon = document.querySelector('.microphone-recording-icon-container');

        this.chatActions = document.querySelector('.chat-actions');
        this.chatBalloon = document.querySelector('.chat-action-message');

        this.scenarioManager = scenarioManager;
        this.chatData = new ChatData();
        // this.sidebarContent = new SidebarContent();
        // this.chatOptionManager = new ChatOptionManager();
        this.chatInputManager = chatInputManager;
        this.gamePadManager = gamePadManager;
        // this.chatInputManager = new ChatInputManager();
        // this.gamePadManager = new GamepadManager(this.chatInputManager);

        // this.procedureManager = new ProcedureManager();

        this.hideMessageBar();
        // this.setKeyboardInputListeners();

        this.blockInputs = true;
    }

    startOpeningMessage() {
        this.showTopLoadingBar();
        this.speechSynth.speakText("Speech Synthesis Initialised", () => {
            console.log("Speech Synthesis Completed Speaking");
            this.finishedSpeaking();
            setTimeout(() => {
                this.inputContainer = document.querySelector('.chat-actions').classList.remove('chat-actions--startposition');
                document.querySelector('.chat-action-messagebar__input').focus();
            }, 1000);

        });
    }

    disableInputs() {
        this.blockInputs = true;
        // this.inputTextArea.disabled = true;

        let suggestionContainer = document.querySelector('.chat-actions-suggestions-buttons');

        if (suggestionContainer) {  // Check if the container exists
            var buttons = suggestionContainer.getElementsByTagName('button');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
                console.log(`Button ${i} disabled: ${buttons[i].disabled}`); // Log the status
            }
        } else {
            console.warn('Suggestion container not found');
        }
    }

    enableInputs() {
        this.blockInputs = false;
        // this.inputTextArea.disabled = false;

        // let suggestionContainer = document.querySelector('.chat-actions-suggestions-buttons');
        // var buttons = suggestionContainer.getElementsByTagName('button');
        // for (var i = 0; i < buttons.length; i++) {
        //     buttons[i].disabled = false;
        // }

    }

    activateVoiceAndOpenTray() {
        this.openVoiceTray();
        window.speechRecording.setRecognitionActivated();
    }

    async handleNewMessage(message, inputType) {
        try {
            const chatGPTresponse = await this.chatGPT.requestMessage(message);
            if (chatGPTresponse) {
                this.showTopLoadingBar();

                this.speechSynth.speakText(chatGPTresponse.text, () => {
                    console.log("Speech Synthesis Completed Speaking");
                    this.finishedSpeaking(null, inputType);
                });
            }
        } catch (error) {
            console.error("Error in handleNewMessage:", error);
        }
    }

    async sendNewMessage(message) {

        this.disableInputs();
        this.hideMessageBar();
        this.setMessageBalloonContent(message);
        this.showTopLoadingBar();
        // window.webcamHandler.handGestures.setDetectingGesture(null);
        this.startNewChatStep(this.chatData);

    }

    clearChat(){

        this.chatContentBox.innerHTML = "";

    }

    startNewChatStep(chatData) {

        setTimeout(() => {
            // UNCOMMENT THIS TO USE DUMMY DATA
            let chatData = this.chatData.setNextChatData();

            if(chatData.instructions){
                console.log(JSON.stringify(chatData.instructions))
                window.mqtt.publishMessage(JSON.stringify(chatData.instructions));
            }

            // set window type ( chat, popup, procedure )
            this.chatInputManager.setCurrentWindowType(chatData.target.type, chatData.target.variant);
            // speak and visualise text
            this.speechSynth.speakText(chatData.content, chatData.target, () => {
                console.log("Speech Synthesis Completed Speaking");
                this.finishedSpeaking(chatData.microphone.activateMic);
            });

            // DO SOMETHING HERE WITH DUMMY DATA e.g.:
            // if(chatData.prodecures[0]...)

            setTimeout(() => {

                // set microphone keywords for proceeding to nex
                if (chatData.microphone && chatData.microphone.proceedKeywords) {
                    this.chatInputManager.chatInputVoice.setInputVoiceMode(chatData.microphone.proceedKeywords, chatData.microphone.activationKeyWords, chatData.microphone.listeningStyle, chatData.microphone.uIMode, chatData.microphone.uICallback);
                    this.chatInputManager.chatInputVoice.acceptVoiceInput();
                }
                else {
                    this.chatInputManager.chatInputVoice.setInputVoiceMode(null, null, null);
                }

                if(chatData.target.type == "chat"){
                // update suggestion buttons
                    if (chatData.optionButtons && chatData.optionButtons[0]) {
                        this.chatInputManager.updateInputButtons(this.chatData.currentChatData, document.querySelector('.chat-action-buttons'));
                    }
                    else if (chatData.optionSlider && chatData.optionSlider[0]) {
                        this.chatInputManager.updateInputSlider(this.chatData.currentChatData);
                    }
                    else if (chatData.optionWheel && chatData.optionWheel.items) {
                        this.chatInputManager.updateInputWheel(this.chatData.currentChatData);
                    }
                }
                else if(chatData.target.type == "popup"){
                    if (chatData.optionButtons && chatData.optionButtons[0]) {
                        this.chatInputManager.updateInputButtons(this.chatData.currentChatData, document.querySelector('.popup-action-buttons'));
                    }
                }

            }, 2000);
        }, 0);

    }

    finishedSpeaking(activateMic) {

        window.mqtt.publishMessage("finish");
        this.enableInputs();
        this.hideTopLoadingBar();
        // this.inputTextArea.value = "";
        // document.getElementById("sendButton").disabled = false;
        // console.log(this.chatData.currentChatData.target.clearChat);


        if(this.chatData.currentChatData.instruction){
            // window.mqtt.publishMessage("finish");
        }


        if(this.chatData.currentChatData.handGesture){
            // window.webcamHandler.handGestures.setDetectingGesture(this.chatData.currentChatData.handGesture);
        }

        // hide messagebar and hide chat when popup opens
        if(this.chatData.currentChatData.target.type == "popup" && this.chatData.currentChatData.target.clearChat){
            setTimeout(() => {
                this.hideMessageBar();
                this.clearChat();
            }, 1000);
        }
        else if(this.chatData.currentChatData.target.type == "camera" && this.chatData.currentChatData.target.clearChat){
            setTimeout(() => {
                this.hideMessageBar();
                this.clearChat();
            }, 1000);
        }
        else if(this.chatData.currentChatData.target.scenarioEnd){
            setTimeout(() => {
                this.returnToDashboard();
            }, 1000);
        }
        else{
            this.showMessageBar();
        }

        


        if (activateMic) {
            window.speechRecording.recognition.start();
            // window.speechRecording.setRecognitionActivated();
        }
        this.chatInputManager.enableInputs();
    }

    hideMessageBar() {
        this.chatActions.classList.add('chat-actions--send');
    }
    showMessageBar() {
        this.chatActions.classList.remove('chat-actions--send');
    }
    setMessageBalloonContent(message) {
        // this.chatBalloon.innerHTML = message;
    }

    setTrayThinking() {
        // this.inputContainer.classList.add('input-container--thinking');
    }

    returnToDashboard(){
        this.chatData.setCurrentScenarioData("dashboard");
        this.chatContentBox.classList.add('ai-text-div--fadeout');
        setTimeout(() => {
            this.chatInputManager.dashboard.showDashboard(); 
            this.hideMessageBar();
        }, 100);
        setTimeout(() => {
            this.clearChat();
            window.chatInputManager.currentWindowType = "dashboard";
            this.chatContentBox.classList.remove('ai-text-div--fadeout');

        }, 1000);
    }

    setTrayClosed() {
        // this.inputContainer.classList.remove('input-container--thinking');
        // this.inputContainer.classList.add('input-container--hidden');

        setTimeout(() => {
            this.inputTextArea.value = "";
            // this.inputVoiceArea.innerHTML = "";
        }, 1000);
    }

    showTopLoadingBar() {
        const topLoadingBar = document.querySelector('.top-loading-bar');
        topLoadingBar.classList.add('top-loading-bar--speaking');
    }

    hideTopLoadingBar() {
        const topLoadingBar = document.querySelector('.top-loading-bar');
        topLoadingBar.classList.remove('top-loading-bar--speaking');
    }

    showBottomLoadingBar() {
        const topLoadingBar = document.querySelector('.bottom-loading-bar');
        topLoadingBar.classList.add('bottom-loading-bar--speaking');
    }

    hideBottomLoadingBar() {
        const topLoadingBar = document.querySelector('.bottom-loading-bar');
        topLoadingBar.classList.remove('bottom-loading-bar--speaking');
    }

    // setKeyboardInputListeners() {
    //     const sendButton = document.getElementById("sendButton");

    //     this.inputTextArea.addEventListener("keypress", (event) => {
    //         if (event.key === "Enter") {
    //             event.preventDefault();
    //             const message = this.inputTextArea.value.trim();
    //             if (message) { // Check if the input field is not empty
    //                 this.sendNewMessage(message, "keyboard");
    //                 // this.showTopLoadingBar();
    //             }
    //         }
    //     });
    // }

    setTextAreaHeight() {
        const inputTextArea = document.getElementById("inputText");
        inputTextArea.style.height = 'auto';
        inputTextArea.style.height = (inputText.scrollHeight) + 'px';
    }
}
