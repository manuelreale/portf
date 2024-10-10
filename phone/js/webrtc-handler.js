export class WebRTCHandler {
  constructor(signalingServerUrl, remoteVideoElementId) {
    this.socket = new WebSocket(signalingServerUrl);
    this.peerConnection = new RTCPeerConnection();
    this.remoteVideoElement = document.getElementById(remoteVideoElementId);
    this.iceCandidatesQueue = [];

    if (!this.remoteVideoElement) {
      throw new Error(`Element with id "${remoteVideoElementId}" not found`);
    }

    this.setupSocketListeners();
    this.setupPeerConnection();
  }

  setupSocketListeners() {
    this.socket.onopen = () => {
      console.log('Connected to signaling server');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onmessage = async (message) => {
      console.log('Received message from signaling server:', message.data);
      const data = JSON.parse(message.data);

      try {
        if (data.type === 'offer') {
          console.log('Received offer, setting remote description');
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
          console.log('Remote description set successfully');
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);
          console.log('Local description set, sending answer to signaling server');
          this.socket.send(JSON.stringify({ type: 'answer', answer: answer }));
          console.log('Sent answer to signaling server');

          // Add queued ICE candidates
          this.iceCandidatesQueue.forEach(async (candidate) => {
            try {
              console.log('Adding queued ICE candidate');
              await this.peerConnection.addIceCandidate(candidate);
              console.log('Queued ICE candidate added successfully');
            } catch (e) {
              console.error('Error adding queued ICE candidate:', e);
            }
          });
          this.iceCandidatesQueue = [];
        } else if (data.type === 'answer') {
          console.log('Received answer, setting remote description');
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        } else if (data.type === 'ice-candidate') {
          console.log('Received ICE candidate:', data.candidate);
          const candidate = new RTCIceCandidate(data.candidate);
          if (this.peerConnection.remoteDescription) {
            console.log('Remote description is set, adding ICE candidate');
            await this.peerConnection.addIceCandidate(candidate);
            console.log('ICE candidate added successfully');
          } else {
            console.warn('Remote description not set yet, queuing ICE candidate');
            this.iceCandidatesQueue.push(candidate);
          }
        }
      } catch (e) {
        console.error('Error handling signaling message:', e);
      }
    };

    this.socket.onclose = () => {
      console.log('Disconnected from signaling server');
    };
  }

  setupPeerConnection() {
    // Send ICE candidates to the signaling server
    this.peerConnection.onicecandidate = event => {
      if (event.candidate) {
        console.log('Sending ICE candidate to signaling server:', event.candidate);
        this.socket.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }));
      }
    };

    // Display the remote video stream
    this.peerConnection.ontrack = event => {
      console.log('Received remote track, adding to video element');
      if (this.remoteVideoElement) {
        this.remoteVideoElement.srcObject = event.streams[0];
      }
    };
  }
}

// Example usage
