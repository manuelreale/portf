import { HandGestures } from "./hand-gestures.js";

export class WebcamHandler {
    constructor(cameraElementId, handGestures) {
      this.cameraElement = document.getElementById(cameraElementId);
      this.handGestures = new HandGestures();


      if (!this.cameraElement) {
        throw new Error(`Element with id "${cameraElementId}" not found`);
      }
    }

    async startWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.cameraElement.srcObject = stream;
      } catch (error) {
        throw new Error('Error accessing webcam');
      }
    }
  }

  window.addEventListener('load', () => {
    try {
      const webcamHandler = new WebcamHandler('cameraElement');
      webcamHandler.startWebcam();
    } catch (error) {
      console.error(error);
    }
  });