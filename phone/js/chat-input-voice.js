export class ChatInputVoice {
    constructor() {
        this.micTextBox = document.querySelector('.chat-action-microphone__text');
        this.micPreviewContaner = document.querySelector('.chat-action-microphone');
        this.actionButtonContainer = document.querySelector('.chat-action-buttons');
        this.activationKeywords = null;
        this.proceedKeywords = null;
        this.listeningType = null;
        this.uiMode = null;
        this.inputCompleted = false;
        this.inputPaused = false;
        this.voiceKeywordActivated = null;
        this.lastPreviewTranscript = null;
    }

    setInputVoiceMode(proceedKeywords, activationKeywords, listeningType, uiMode, uiCallback) {
        this.proceedKeywords = proceedKeywords;
        this.activationKeywords = activationKeywords;
        this.listeningType = listeningType;
        this.uiMode = uiMode;
        this.uiCallback = uiCallback;

        if (this.uiMode == "activation") {
            this.hideMicrophoneUI();
        }
    }

    resetVoicePreview() {
        this.micTextBox.innerHTML = "";
        this.uiCallback = null;
        this.micPreviewContaner.classList.remove('chat-action-microphone--green');
        this.micPreviewContaner.classList.remove('chat-action-microphone--red');
        this.actionButtonContainer.classList.remove('chat-action-buttons--dimmed');
    }

    hideMicrophoneUI() {
        console.log("HIDE UI");
        this.micPreviewContaner.classList.add('chat-action-microphone--hidden');
    }
    showMicrophoneUI() {
        this.micPreviewContaner.classList.remove('chat-action-microphone--hidden');
    }


    acceptVoiceInput() {
        this.inputCompleted = false;
    }

    resetVoiceMode() {
        this.proceedKeywords = null;
        this.listeningType = null;
        this.uiMode = null;
    }

    speechManager(data, resultType) {

        if (!this.inputCompleted) {
            if (this.uiMode == "activation") {

                if (this.activationKeywords) {
                    if (this.containsKeywords(data, this.activationKeywords)) {
                        this.uiMode = "preview";
                        this.showMicrophoneUI();
                        window.speechRecording.recognition.abort();
                    }
                }
                else {
                    console.error("no activation keywords specified in chat json");
                }


            }

            // display interim results in preview div
            else if (this.uiMode == "preview") {
                this.previewInterimResults(data, resultType, this.listeningType);

                // console.log(this.listeningType);
                // activate when keywords are mentioned
                if (this.proceedKeywords) {
                    // activate on keywords on interim results
                    if (this.listeningType == "interim") {
                        if (this.containsKeywords(data, this.proceedKeywords)) {
                            this.completeSpeechInput();
                        }
                    }

                    // activate on keywords on final results
                    else if (this.listeningType == "final" && resultType == "final") {
                        if (this.containsKeywords(data[0].transcript, this.proceedKeywords)) {
                            this.completeSpeechInput();
                        }
                    }
                }


            }

        }

        if (resultType = "interim") {
            console.log("interim", data);
        }
        if (resultType = "final") {
            console.log("final", data);
        }
    }

    previewInterimResults(data, resultType) {

        // console.log(data, resultType);

        if (resultType == "final") {
            data = data[0].transcript;
            this.lastPreviewTranscript = data;
        }
        else {
            if (data == this.lastPreviewTranscript) {
                return;
            }
        }

        if (this.listeningType == "interim") {
            // Split the string into an array of words and grab the last one
            const words = data.trim().split(" ");
            data = words[words.length - 1]; // Get the last word
        }
        // First, scrub activation keywords from the transcript
        data = this.scrubActivationKeywords(data);

        this.micTextBox.innerHTML = data;
        // makes the action-buttons or slider dimmed in case there is content;
        if (data.length > 0) {
            this.actionButtonContainer.classList.add('chat-action-buttons--dimmed');
        }
        else {
            this.actionButtonContainer.classList.remove('chat-action-buttons--dimmed');
        }

        // remove dim from action-buttons if result is final and no keywords found.
        if (resultType == "final") {
            if (this.containsKeywords(data[0].transcript, this.proceedKeywords) == false) {
                this.actionButtonContainer.classList.remove('chat-action-buttons--dimmed');
                this.micTextBox.innerHTML = "";
            }
        }
    }

    scrubActivationKeywords(data) {
        if (this.activationKeywords) {
            const transcriptText = String(data).toLowerCase();

            for (let keyword of this.activationKeywords) {
                const keywordIndex = transcriptText.indexOf(keyword.toLowerCase());

                if (keywordIndex !== -1) {
                    // Remove the activation keyword and everything before it
                    return data.substring(keywordIndex + keyword.length).trim();
                }
            }
        }
        return data;  // Return original data if no keywords are found
    }

    containsKeywords(transcript, keywordsArray) {
        // Ensure transcript is a string before processing
        const transcriptText = String(transcript).toLowerCase();
        // Check if any keyword exists in the transcript
        return keywordsArray.some(keyword => transcriptText.includes(keyword.toLowerCase()));
    }

    completeSpeechInput() {

        this.executeUiCallback();


        window.speechRecording.recognition.abort();
        this.inputCompleted = true;
        this.resetVoiceMode();

        setTimeout(() => {
            window.chatDOM.sendNewMessage();
        }, 1500);

        setTimeout(() => {
            this.resetVoicePreview();
        }, 2000);
    }

    executeUiCallback() {

        if (this.uiCallback) {
            if (this.uiCallback == "green") {
                this.micPreviewContaner.classList.add('chat-action-microphone--green');
            }
            else if (this.uiCallback == "red") {
                this.micPreviewContaner.classList.add('chat-action-microphone--red');
            }
        }

    }
}