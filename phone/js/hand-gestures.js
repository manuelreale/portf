import { GestureRecognizer, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

export class HandGestures {
  constructor() {
    this.gestureRecognizer = null;
    this.runningMode = "VIDEO";
    this.webcamRunning = false;
    this.probabilityThreshold = 0.6;
    this.videoElement = document.getElementById("cameraElement");
    this.detectingGesture = null;
    this.initialize();
  }


  setDetectingGesture(gesture){
    this.detectingGesture = gesture;
    if(gesture != null){
      setTimeout(() => {
        console.log("gesture active");
        this.startRecognition();
      }, 1000);
     
    }
    else{
      console.log("gesture null")
      this.stopRecognition();
    }
  }

  async initialize() {
    if (!this.hasGetUserMedia()) {
      console.warn("getUserMedia() is not supported by your browser");
      return;
    }

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
        delegate: "GPU"
      },
      runningMode: this.runningMode
    });
  }

  hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  startRecognition() {
    if (!this.gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (!this.webcamRunning) {
      this.webcamRunning = true;
      this.predictWebcam();
    }
  }

  stopRecognition() {
    this.webcamRunning = false;
  }

  async predictWebcam() {
    if (this.runningMode === "IMAGE") {
      this.runningMode = "VIDEO";
      await this.gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }

    let lastVideoTime = -1;
    const predict = async () => {
      if (this.videoElement.currentTime !== lastVideoTime) {
        lastVideoTime = this.videoElement.currentTime;
        const nowInMs = Date.now();
        const results = this.gestureRecognizer.recognizeForVideo(this.videoElement, nowInMs);

        if (results.gestures.length > 0) {
          results.gestures.forEach((gestureSet, index) => {
            const gesture = gestureSet[0];
            if (gesture.categoryName === "Thumb_Up" && gesture.score >= this.probabilityThreshold) {
              console.log(`Hand ${index + 1}: Thumbs Up`);
              if(this.detectingGesture ==  "thumbsUp"){
                window.chatDOM.sendNewMessage();
                this.stopRecognition();
              }
            } else if (gesture.categoryName === "Thumb_Down" && gesture.score >= this.probabilityThreshold) {
              if(this.detectingGesture == "thumbsDown"){
                window.chatDOM.sendNewMessage();
                this.stopRecognition();
              }
              console.log(`Hand ${index + 1}: Thumbs Down`);
            }
          });
        }
      }

      if (this.webcamRunning) {
        window.requestAnimationFrame(predict);
      }
    };

    predict();
  }
}

// Usage Example:
// const handGestures = new HandGestures(0.8);
// handGestures.startRecognition();
// handGestures.stopRecognition();