// speech-recording.js
import { speakText } from './speech-synthesis.js';

export class SpeechRecording {
    constructor(chatDOM, chatGPT) {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.activated = false;
        this.listening = false;
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
            if(!window.speechSynth.speaking){
                this.processSpeech(event);
            }
        };

        this.recognition.onend = () => {
            if(!window.speechSynth.speaking){
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
        }
        console.log(transcript);

        if (!this.activated) {
            if (this.activationPhrases.test(transcript)) {
                this.setRecognitionActivated();
                this.chatDOM.openVoiceTray();
            }
        } else if (this.activated) {
            const processedTranscript = this.removeActivationPhraseAndBefore(transcript);
            if (processedTranscript) {

                // SET INNER TEXT ELEMENT > TRANSCRIPT
                // document.getElementById('inputVoice').innerText = processedTranscript + ' ';
            }

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    console.log(event.results[i], "FINAL");
                    if (!this.transcriptEndsWithActivationPhrase(transcript)) {
                        console.log("FINAL", processedTranscript);
                        this.recognition.stop();
                        this.listening = false;
                        this.activated = false;
                        // await this.sendVoiceMessage(processedTranscript);

                        // window.chatDOM.handleNewMessage(processedTranscript, "voice");
                    }
                    break; 
                }
            }
        }
    }

    setRecognitionActivated(){
        this.activated = true;
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


        // async sendVoiceMessage(transcript) { 
        //     this.chatDOM.setTrayThinking();
           
        //         const response = await this.chatGPT.sendMessageToChatGPT(transcript);
        //         if (response) {
        //             console.log("ChatGPT response:", response);
        //             speakText(response.text);
        //             this.ChatDOM.setTrayClosed();
        //         }
        // }
        
    
}
