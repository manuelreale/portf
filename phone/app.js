// app.js
import { MQTT } from './js/mqtt.js';
import { Keys } from './js/keys.js';
import { SpeechRecording } from './js/speech-recording.js';
import { ChatGPT } from './js/chatGPT.js';
import { ChatDOM } from './js/chatDOM.js';
import { SpeechSynth } from './js/speech-synthesis.js';
import { ChatInputManager } from './js/chat-input-manager.js';
import { GamepadManager } from './js/gamepad-manager.js';
import { ScenarioManager } from './js/scenario-manager.js';
// import { PopupManager } from './js/popup-manager.js';
import { Debug } from './js/debug.js';
import { WebcamHandler } from './js/webcam-handler.js';
// import { WebRTCHandler } from './js/webrtc-handler.js';
import { HandGestures } from './js/hand-gestures.js';
//import { Basics } from './js/basics.js';

document.addEventListener("DOMContentLoaded", () => {
    //const basics = new Basics();
    const mqtt = new MQTT();
    const keys = new Keys();
    const chatGPT = new ChatGPT(keys);
    const speechSynth = new SpeechSynth(keys);
    // const webcamHandler = new WebcamHandler("cameraElement");
    const scenarioManager = new ScenarioManager();
    const chatInputManager = new ChatInputManager();
    const gamePadManager = new GamepadManager(chatInputManager);
    const chatDOM = new ChatDOM(chatGPT, speechSynth, chatInputManager, gamePadManager, scenarioManager);
    const debug = new Debug(gamePadManager, scenarioManager);
    
    // Attach objects to window for global access
    //window.basics = basics;
    window.chatGPT = chatGPT;
    window.mqtt = mqtt;
    window.chatInputManager = chatInputManager;
    window.chatDOM = chatDOM;
    window.speechSynth = speechSynth;
    // window.webcamHandler = webcamHandler;
    // window.popupManager = popupManager;

    window.mqtt.startConnect();
    console.log("Checking connection with Pi")
    
    setTimeout(function(){
        window.mqtt.checkConnection();
    }, 4000);

    // Function to initialize components upon first user interaction
    const initializeComponents = async () => {
        // const webRTCHandler = new WebRTCHandler('ws://192.168.200.178:8080', 'cameraElement'); // Replace with the Raspberry Pi's IP address
        const speechRecording = new SpeechRecording(chatDOM, chatGPT);
        window.speechRecording = speechRecording;
        await speechSynth.initVoice();
        // window.chatDOM.sendNewMessage();
        window.speechSynth.speakText("starting demo", {
            "type": "chat",
            "variant": ""
        }, () => {
            window.chatInputManager.dashboard.showDashboard();
        });
        document.removeEventListener("click", initializeComponents);
        document.removeEventListener("keypress", initializeComponents);


        // open dashboard after delay???
    };

    // Listen for the first user interaction to initialize components
    document.addEventListener("click", initializeComponents);
    document.addEventListener("keypress", initializeComponents);
});