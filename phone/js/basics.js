import { Camera, CameraResultType } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Motion } from '@capacitor/motion';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { Media } from '@capacitor-community/media';
import { Filesystem } from '@capacitor/filesystem';

export class Basics {
  constructor() {
    this.initializeListeners();
  }

  initializeListeners() {
    Motion.addListener('accel', this.handleMotion);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    console.log(image);
    document.getElementById('capturedImage').src = image.webPath;
  }

  triggerHaptics() {
    Haptics.impact({ style: ImpactStyle.Heavy });
  }

  async setBrightness(value) {
    try {
      await ScreenBrightness.setBrightness({ brightness: value });
      console.log(`Brightness set to ${value}`);
    } catch (error) {
      console.error('Error setting brightness:', error);
    }
  }

  handleMotion = (event) => {
    const flooredX = Math.floor(event.acceleration.x);
    const flooredY = Math.floor(event.acceleration.y);
    const flooredZ = Math.floor(event.acceleration.z);
    document.getElementById('motionValues').innerText = `X: ${flooredX}, Y: ${flooredY}, Z: ${flooredZ}`;
  }

  async lockOrientation() {
    const currentOrientation = await ScreenOrientation.orientation();
    if (currentOrientation === "portrait") {
      await ScreenOrientation.lock({ orientation: 'landscape' });
    } else {
      await ScreenOrientation.lock({ orientation: 'portrait' });
    }
  }

  async startMicrophone() {
    // ... (keep the existing startMicrophone code)
  }

  stopMicrophone() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stopRecording();
    }
  }
}