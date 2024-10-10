export class ZoomableImageManager {
    constructor() {
        this.activated = false;
        this.targetElem = null;

        // Variables for zoom and pan
        this.zoomLevel = 1;
        this.initialZoomLevel = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetZoom = 1;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.duration = 0.5; // Duration for GSAP tween in seconds
        this.longPressActive = false;
        this.activationActive = true;
        this.antennaPopulated = false;
        this.findingPopulated = false;
        // To track whether it's an image or video
        this.isVideo = false;
    }

    populatePopupImages(popupVariant){
        if(popupVariant == "antenna" && !this.antennaPopulated ){
            let img1Elem = document.getElementById("antenna-img1");
            let img1Source = '../assets/images/dummy-image.png';
            this.createImage(img1Elem, img1Source);
            this.antennaPopulated = true;
        }
        if(popupVariant == "finding" && !this.findingPopulated){
            let vid1Elem = document.getElementById("finding-vid1");
            let vid1Source = '../assets/videos/ailerons.mp4';
            this.createVideo(vid1Elem, vid1Source);
            this.findingPopulated = true;
        }
        else if(popupVariant == "finding" && this.findingPopulated){
            this.activateVideo(document.getElementById("finding-vid1"));
        }
    }

    // Function to create the image and canvas without activating it
    createImage(targetElem, imageUrl) {
        this.isVideo = false; // Not a video
        this.targetElem = targetElem;

        // Initialize canvas and image
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.targetElem.appendChild(this.canvas);

        // Load the image
        this.img = new Image();
        this.img.crossOrigin = "anonymous"; // Handle CORS if required
        this.img.src = imageUrl;

        // Handle image load and error events
        this.img.onload = () => {
            this.initializeCanvas();
        };
        this.img.onerror = () => {
            console.error("Failed to load the image. Check the path or CORS settings.");
        };
    }

    // Function to create the video and canvas without activating it
    createVideo(targetElem, videoUrl) {
        this.isVideo = true; // It is a video
        this.targetElem = targetElem;
    
        // Initialize canvas and video
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.targetElem.appendChild(this.canvas);
    
        // Load the video
        this.video = document.createElement('video');
        this.video.src = videoUrl;
        this.video.crossOrigin = "anonymous"; // Handle CORS if required
        this.video.autoplay = true;
        this.video.loop = true;
        this.video.muted = true; // Optional: mute the video if necessary
    
        // Set video dimensions
        this.video.width = this.canvas.width;
        this.video.height = this.canvas.height;
    
        // Handle video load and error events
        this.video.onloadeddata = () => {
            this.initializeCanvas();
            this.video.play(); // Ensure the video starts playing
            this.animateVideo(); // Start continuously drawing video frames
        };
        this.video.onerror = () => {
            console.error("Failed to load the video. Check the path or CORS settings.");
        };
    }
    

    // Activates the image or video by enabling joystick handling
    activateImage(targetElem) {
        if (!this.activated) {
            this.activated = true;
            this.activationActive = true;
        }
        this.targetElem = targetElem;
        this.canvas = this.targetElem.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        if(targetElem.classList.contains('video')){
            this.isVideo = true;
            this.video.play(); // Ensure the video starts playing
            this.animateVideo(); // Start continuously drawing video frames
        }
        else{
            this.isVideo = false;
        }

        console.log("ISVIDEO",this.isVideo);

        this.zoomLevel = 1;
        this.targetZoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;

        this.initializeCanvas();
    }

    activateVideo(targetElem){
        this.targetElem = targetElem;
        this.canvas = this.targetElem.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isVideo = true;
        this.video.play(); // Ensure the video starts playing
        this.animateVideo(); // Start continuously drawing video frames
        this.zoomLevel = 1;
        this.targetZoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.initializeCanvas();
    }

    // Deactivates the image or video by disabling joystick handling
    deactivateImage() {
        this.activated = false;
    }

    initializeCanvas() {
        // Calculate initial zoom to fill the canvas
        const element = this.isVideo ? this.video : this.img;
        const scaleX = this.canvas.width / element.width;
        const scaleY = this.canvas.height / element.height;
        this.initialZoomLevel = this.zoomLevel = Math.max(scaleX, scaleY);

        // Center the image or video
        this.offsetX = (this.canvas.width - element.width * this.zoomLevel) / 2;
        this.offsetY = (this.canvas.height - element.height * this.zoomLevel) / 2;

        // Set the target values for animation
        this.targetZoom = this.zoomLevel;
        this.targetOffsetX = this.offsetX;
        this.targetOffsetY = this.offsetY;

        // Draw the initial frame
        this.draw();
    }

    draw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        if (this.isVideo && this.video.readyState >= 2) {
            // Draw the current frame of the video to fill the canvas
            this.ctx.drawImage(
                this.video,
                0, 0, this.video.videoWidth, this.video.videoHeight, // Source video dimensions
                this.offsetX, this.offsetY, this.canvas.width * this.zoomLevel, this.canvas.height * this.zoomLevel // Scaled to fit canvas
            );
        } else if (this.img.complete) {
            // Draw the image
            this.ctx.drawImage(
                this.img,
                this.offsetX,
                this.offsetY,
                this.img.width * this.zoomLevel,
                this.img.height * this.zoomLevel
            );
        }
    }

    // Use GSAP to animate panning
    pan(dx, dy) {
        this.targetOffsetX += dx;
        this.targetOffsetY += dy;

        this.constrainOffsets();

        // Use GSAP to animate the panning
        gsap.to(this, {
            duration: this.duration,
            offsetX: this.targetOffsetX,
            offsetY: this.targetOffsetY,
            onUpdate: () => this.draw(), // Redraw on every update
            ease: "power2"
        });
    }

    // Use GSAP to animate zooming
    zoom(factor) {
        const oldZoomLevel = this.targetZoom;
        this.targetZoom *= factor;

        // Set minimum zoom to initial zoom level (not necessarily 1)
        const minZoomLevel = this.initialZoomLevel;
        const maxZoomLevel = 10;  // Arbitrary maximum zoom level
        this.targetZoom = Math.max(this.targetZoom, minZoomLevel);
        this.targetZoom = Math.min(this.targetZoom, maxZoomLevel);

        // Adjust offsets to keep the center point in view
        const canvasCenterX = this.canvas.width / 2;
        const canvasCenterY = this.canvas.height / 2;

        // Calculate the image or video coordinates under the canvas center
        const element = this.isVideo ? this.video : this.img;
        const imageCenterX = (canvasCenterX - this.targetOffsetX) / oldZoomLevel;
        const imageCenterY = (canvasCenterY - this.targetOffsetY) / oldZoomLevel;

        // Update offsets to maintain the center point
        this.targetOffsetX = canvasCenterX - imageCenterX * this.targetZoom;
        this.targetOffsetY = canvasCenterY - imageCenterY * this.targetZoom;

        this.constrainOffsets();
        console.log(this);
        // Use GSAP to animate the zoom
        gsap.to(this, {
            duration: this.duration,
            zoomLevel: this.targetZoom,
            offsetX: this.targetOffsetX,
            offsetY: this.targetOffsetY,
            onUpdate: () => this.draw(), // Redraw on every update
            ease: "power1.out"
        });
    }

    constrainOffsets() {
        const element = this.isVideo ? this.video : this.img;
        const imageWidth = element.width * this.targetZoom;
        const imageHeight = element.height * this.targetZoom;

        const minOffsetX = this.canvas.width - imageWidth;
        const minOffsetY = this.canvas.height - imageHeight;

        // Horizontal constraints
        if (imageWidth <= this.canvas.width) {
            // Center the element horizontally
            this.targetOffsetX = (this.canvas.width - imageWidth) / 2;
        } else {
            this.targetOffsetX = Math.min(0, Math.max(this.targetOffsetX, minOffsetX));
        }

        // Vertical constraints
        if (imageHeight <= this.canvas.height) {
            // Center the element vertically
            this.targetOffsetY = (this.canvas.height - imageHeight) / 2;
        } else {
            this.targetOffsetY = Math.min(0, Math.max(this.targetOffsetY, minOffsetY));
        }
    }

    // Handle joystick input passed from GamepadManager
    handleJoyStick(direction) {
        if (this.activated) {
           this.moveImage(direction);
        }
    }
    
    async handleEnter(direction, targetElem){
        if(!this.activated){
            console.log("this is not activated");
            switch (direction) {
                case "enterDown":
                    this.activateImage(targetElem); // Activate image or video on first press
                    return "activateImage";
                    break;
            }
        }
        else if (this.activated) {
            console.log("this is activated");
            switch (direction) {
                case "enterUp":
                    if(!this.longPressActive && !this.activationActive){
                        console.log(this.longPressActive, this.activationActive);
                        this.zoom(1.3); // Zoom in
                    }
                    else{
                        this.longPressActive = false;
                        this.activationActive = false;
                    }
                    break;
                case "enterLong":
                    let longpressCallback = this.handleLongPress(); // Handle long press
                    return longpressCallback;
                    break;
            }
        }
    }

    moveImage(direction) {
        switch (direction) {
            case "up":
                this.pan(0, 20); // Move up
                break;
            case "down":
                this.pan(0, -20); // Move down
                break;
            case "left":
                this.pan(20, 0); // Move left
                break;
            case "right":
                this.pan(-20, 0); // Move right
                break;
        }
    }

    handleLongPress() {
        this.longPressActive = true;
        // Check if the image or video is fully zoomed out (targetZoom <= initialZoomLevel)
        if (this.targetZoom <= this.initialZoomLevel) {
            this.exitImage(); // Trigger exit when fully zoomed out
            return "exitImage"
        } else {
            this.zoom(1 / 1.5); // Zoom out
        }
    }

    // New function to reset state and deactivate the image or video
    exitImage() {
        console.log("Exiting image...");
        
        // if(this.isVideo){
        //     this.video.pause();
        // }
        // Reset all state variables
        this.activated = false;
        this.targetElem = null;

        console.log("Image exited and state reset.");
    }
    // Continuously draw video frames
    animateVideo() {
        if (this.isVideo && this.video.readyState >= 2) {
            this.draw(); // Draw the current video frame on the canvas
        }
        requestAnimationFrame(this.animateVideo.bind(this)); // Loop the animation
    }
}
