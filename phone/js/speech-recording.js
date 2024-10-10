// speech-recording.js
import { speakText } from './speech-synthesis.js';

export class SpeechRecording {
    constructor(chatDOM, chatGPT) {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.interim_transcript = '';
        this.final_transcript = '';
        this.activationPhrases = /(ava|eva|eve|iva)/ig;
        this.chatDOM = chatDOM;
        this.chatGPT = chatGPT;
        this.initRecognition();
    }

    initRecognition() {
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = async (event) => {
            if(!window.speechSynth.speaking && !window.chatInputManager.chatInputVoice.inputCompleted){
                this.processSpeech(event);
            }
        };

        this.recognition.onend = () => {
            if(!window.speechSynth.speaking && !window.chatInputManager.chatInputVoice.inputCompleted){
                this.recognition.start();
            }
        };

        this.recognition.onstart = () => {
            this.emptyTranscripts();
        }

        this.recognition.start();
    }

    async processSpeech(event){
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                // console.log(event.results[i], "FINAL");
                window.chatInputManager.handleVoiceInput(event.results[i], "final");
                // this.recognition.start();
            }
        }
        window.chatInputManager.handleVoiceInput(transcript, "interim");
        // console.log(transcript);
    }


    emptyTranscripts() {
        this.interim_transcript = '';
        this.final_transcript = '';
    }

    removeActivationPhraseAndBefore(transcript) {
        const match = transcript.match(this.activationPhrases);
        if (match) {
            const index = transcript.indexOf(match[0]);
            let result = transcript.slice(index + match[0].length).trim();
            result = result.replace(this.activationPhrases, '').trim();
            return result || null;
        }
        return transcript;
    }

    transcriptEndsWithActivationPhrase(transcript) {
        const trimmedTranscript = transcript.trim();
        const match = trimmedTranscript.match(this.activationPhrases);
        if (match) {
            const phrase = match[0];
            const index = trimmedTranscript.lastIndexOf(phrase);
            return index + phrase.length === trimmedTranscript.length;
        }
        return false;
    }
    
}
