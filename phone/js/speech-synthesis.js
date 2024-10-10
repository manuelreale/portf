export class SpeechSynth {
    constructor(keys) {
        this.keys = keys;
        this.SpeechSDK = null;
        this.synthesizer = null;
        this.player = null;
        this.wordBoundaryList = [];
        this.wordIndex = 0;
        this.speaking = false;
        this.sentenceCount = 1;
        this.currentSentenceIndex = 0;
        this.targetContainer = null;
    }

    // Create and manage the highlight div for displaying synthesized text
    createHighlightDiv() {
        const existingHighlightDiv = document.querySelector('.ai-text-div');
        if (existingHighlightDiv) {
            existingHighlightDiv.classList.add('ai-text-div--fadeout');
            setTimeout(() => {
                existingHighlightDiv.remove();
            }, 500);
        }

        const newHighlightDiv = document.createElement('div');
        newHighlightDiv.classList.add('ai-text-div');
        this.targetContainer.appendChild(newHighlightDiv);

        return newHighlightDiv;
    }

    // Initialize speech synthesizer with configuration
    initializeSynthesizer() {
        const speechConfig = this.SpeechSDK.SpeechConfig.fromSubscription(this.keys.getSubscriptionKey(), this.keys.getRegion());
        speechConfig.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural";
        speechConfig.speechSynthesisOutputFormat = this.SpeechSDK.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;

        this.player = new this.SpeechSDK.SpeakerAudioDestination();
        const audioConfig = this.SpeechSDK.AudioConfig.fromSpeakerOutput(this.player);
        this.synthesizer = new this.SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
    }

    // Function to add SSML <break> tags
    addSsmlBreaks(text) {
        return text.replace(/([.?!])/g, '$1<break time="1000ms"/>');
    }

    // Handle word boundary events during synthesis
    handleWordBoundary(e, highlightDiv) {
        const isSinglePunctuation = e.text.length === 1 && /[.,;!?]/.test(e.text);
    
        if (!this.currentSentenceDiv) {
            this.currentSentenceDiv = document.createElement('div');
            this.currentSentenceDiv.className = `ai-sentence ai-sentence-${this.sentenceCount}`;
    
            // If this is the first sentence, immediately mark it as active
            if (this.sentenceCount === 1) {
                this.currentSentenceDiv.classList.add('ai-sentence--active');
            }
    
            highlightDiv.appendChild(this.currentSentenceDiv);
            console.log(this.currentSentenceDiv);
        }
    
        if (isSinglePunctuation || e.text === ":") {
            const lastSpan = this.currentSentenceDiv.lastChild;
            if (lastSpan) {
                lastSpan.textContent = lastSpan.textContent.trim() + e.text + ' ';
            }
        } else {
            const span = document.createElement('span');
            span.textContent = e.text + ' ';
            span.id = `word_${this.wordBoundaryList.length}`;
            span.className = 'wordspan';
            this.currentSentenceDiv.appendChild(span);
        }
    
        const lastText = this.currentSentenceDiv.textContent.trim();
        const lastChar = lastText.slice(-1);
    
        if (lastChar === '.' || lastChar === '?' || lastChar === '!') {
            this.sentenceCount++;
            console.log("Ending sentence:", this.sentenceCount - 1);  // Add debug log
            this.currentSentenceDiv = null;  // Reset to force new sentence div
        }
    
        this.wordBoundaryList.push({
            audioOffset: e.audioOffset,
            textOffset: this.wordBoundaryList.length,
            textContent: e.text,
            sentenceIndex: this.sentenceCount - 1 // Keep track of which sentence this word belongs to
        });
    }
    

    // Apply sentence classes (active/finished)
    updateSentenceClasses(currentSentenceIndex) {
        const sentences = document.querySelectorAll('.ai-sentence');
        const lastSentenceIndex = sentences.length - 1; // Get the last sentence index
    
        sentences.forEach((sentence, index) => {
            // Delay for marking sentences as finished (but not the last sentence)
            if (index < currentSentenceIndex && index !== lastSentenceIndex) {
                
                    sentence.classList.add('ai-sentence--finished');
                    setTimeout(() => {
                    sentence.classList.remove('ai-sentence--active');
                }, 500); // Delay of 500ms
            } else if (index === currentSentenceIndex) {
                // Mark the current sentence as active immediately
                setTimeout(() => {
                sentence.classList.add('ai-sentence--active');
                sentence.classList.remove('ai-sentence--finished');
                }, 500); // Delay of 500ms
            }
            
            // Ensure the last sentence stays active once it becomes active
            if (index === lastSentenceIndex && currentSentenceIndex >= lastSentenceIndex) {
                setTimeout(() => {
                sentence.classList.add('ai-sentence--active');
                sentence.classList.remove('ai-sentence--finished');
                 }, 500); // Delay of 500ms
            }
        });
    }
    
    

    // Track word boundaries and apply classes to sentences
    trackWordBoundaries() {
        setInterval(() => {
            if (this.player !== undefined) {
                const currentTime = this.player.currentTime * 1000;
    
                while (this.wordIndex < this.wordBoundaryList.length && currentTime >= this.wordBoundaryList[this.wordIndex].audioOffset / 10000) {
                    const boundary = this.wordBoundaryList[this.wordIndex];
                    const span = document.getElementById(`word_${boundary.textOffset}`);
                    if (span) {
                        span.classList.add('highlight');
                    }
    
                    // Only update sentence classes if we're moving to a new sentence
                    if (this.currentSentenceIndex !== boundary.sentenceIndex) {
                        this.currentSentenceIndex = boundary.sentenceIndex;
                        this.updateSentenceClasses(this.currentSentenceIndex);  // Update the classes for sentence highlighting
                    }
    
                    this.wordIndex++;
                }
            }
        }, 50);
    }

    setSpeechTargetContainer(target, variant){
        if(target == "popup"){
            if(variant == "antenna"){
                this.targetContainer = document.getElementById('popup-antenna')
            }
            else if (variant == "finding"){
                this.targetContainer = document.getElementById('chat');
            }
        }
        else if(target == "chat"){
            this.targetContainer = document.getElementById('chat');
        }
        else if(target == "camera"){
            this.targetContainer = document.getElementById('cameraText');
        }
    }
    // Configure and start speech synthesis
    async speakText(text, target, callback) {

        this.setSpeechTargetContainer(target.type, target.variant);

        if (!this.SpeechSDK) {
            console.error("SpeechSDK is not initialized.");
            return;
        }
    
        // Reset word and sentence counters before starting new text synthesis
        this.wordBoundaryList = [];
        this.wordIndex = 0;
        this.sentenceCount = 1; // Reset sentence count
        this.currentSentenceIndex = 0; // Reset current sentence index
    
        // Continue with your existing logic...
        
        const highlightDiv = this.createHighlightDiv();
    
        await new Promise(resolve => setTimeout(resolve, 500));
    
        this.initializeSynthesizer();
    
        this.player.onAudioEnd = () => {
            this.speaking = false;
            console.log("playback finished");
            this.wordBoundaryList = [];
            this.currentSentenceDiv = null;  // Reset to force new sentence div
            window.popupManager.setPopupFinishedSpeaking();

            if(target.type == "popup"){
                if(target.variant == "finding"){
                    window.popupManager.setPopupVisible();
                }
            }

            if (callback) callback();
        };
    
        this.synthesizer.synthesisStarted = () => {
            console.log("synthesis started");
            this.speaking = true;
            window.speechRecording.recognition.abort();
            
            // Ensure the first sentence is marked as active when playback starts
            this.currentSentenceIndex = 0;
            this.updateSentenceClasses(this.currentSentenceIndex);  // Activate the first sentence
        };
    
        this.synthesizer.synthesisCompleted = () => {
            console.log("synthesis completed");
            
            if(target.type == "popup"){
                if(target.variant == "antenna"){
                    window.popupManager.setPopupVisible();
                }
            }

        };
    
        this.synthesizer.SynthesisCanceled = (s, e) => {
            const cancellationDetails = this.SpeechSDK.CancellationDetails.fromResult(e.result);
            let str = "Reason: " + this.SpeechSDK.CancellationReason[cancellationDetails.reason];
            if (cancellationDetails.reason === this.SpeechSDK.CancellationReason.Error) {
                str += ": " + e.result.errorDetails;
            }
            console.log(str);
            // document.getElementById("sendButton").disabled = false;
            this.wordBoundaryList = [];
            document.dispatchEvent(new Event('synthesisEnded'));
        };
    
        this.synthesizer.wordBoundary = (s, e) => this.handleWordBoundary(e, highlightDiv);
    
        this.trackWordBoundaries();
    
        // document.getElementById("sendButton").disabled = true;
    
        // Add SSML breaks to the text
        const ssmlWithBreaks = this.addSsmlBreaks(text);

        let ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
            <voice name="en-US-AvaMultilingualNeural">
                <prosody rate="1.0">`;
        
        // Add a 1-second delay if the target is "popup"
        if (target === "popup") {
            ssml += `<break time="1000ms"/>`;
        }
        
        ssml += `${ssmlWithBreaks}</prosody>
            </voice>
        </speak>`;
    
        this.synthesizer.speakSsmlAsync(ssml, () => {
            console.log("speakTextAsync completed successfully.");
            this.synthesizer.close();
            this.synthesizer = undefined;
        }, (err) => {
            console.error("Error during speakTextAsync:", err);
            this.synthesizer.close();
            this.synthesizer = undefined;
        });
    }
    

    async initVoice() {
        if (window.SpeechSDK) {
            console.log("SpeechSDK is available.");
            // document.getElementById('content').style.display = 'block';
            this.SpeechSDK = window.SpeechSDK;
            // document.getElementById("sendButton").disabled = false;
            window.speechSynthesisManager = { speakText: (text) => this.speakText(text) };
        } else {
            console.error("SpeechSDK is not available.");
        }
    }
}

// Export the speakText function from the instance of Voice
export const speakText = (text, callback) => {
    if (window.speechSynthesisManager) {
        window.speechSynthesisManager.speakText(text, callback);
    } else {
        console.error("speechSynthesisManager is not initialized.");
    }
};
