export class MQTT {

constructor() {
    this.clientID = "clientID - "+parseInt(Math.random() * 100);
    this.host = "192.168.1.61";
    this.port = "9001";
    this.userId  = "";  
    this.passwordId = "";   
    this.publishTopic = "Connected Worker/fromDevice";
    this.subscribeTopic = "Connected Worker/fromPi";

    this.client;
    this.waitingResponse=false;
};

    startConnect(){

        console.log("Connecting to " + this.host + " on port " + this.port);
        console.log("Using the client Id " + this.clientID);

        this.client = new Paho.MQTT.Client(this.host,Number(this.port),this.clientID);

        this.client.onConnectionLost = this.onConnectionLost;
        this.client.onMessageArrived = this.onMessageArrived;

        this.client.connect({
            onSuccess: () => this.onConnect(),
            useSSL: true
    //        userName: userId,
    //       passwordId: passwordId
        });
    }

    onConnect(){
        console.log('MQTT Connected! subscribed to topic: "' + this.subscribeTopic+'"');
        this.client.subscribe(this.subscribeTopic);
    }

    checkConnection(){
        if(this.client.isConnected()){
            this.waitingResponse = true;
            this.publishMessage("Phone: Checking Connection");
            setTimeout(this.checkResponse, 2000);
        }else{
            console.log("Not connected");
        }
    }

    checkResponse(){
        if(this.waitingResponse==true){
            console.log("No Response received")
        }else{
            console.log("Connected to Pi!")
        }
    }



    onConnectionLost(responseObject){
        console.log("ERROR: Connection is lost.");
        if(responseObject !=0){
            console.log("ERROR: "+ responseObject.errorMessage);
        }
    }

    onMessageArrived(message){

        if (message.payloadString.includes(this.clientID)) {
            // Ignore messages sent by this client
            //return;
        }

        // receiveJSON(1, 0);
        //receiveMQTT(message.payloadString);
        

        if(message.payloadString=="Pi: Message Received"){
            this.waitingResponse=false;
        }

        //console.log("OnMessageArrived: "+message.payloadString);
        //console.log('Received message : "'+message.payloadString + '" with topic: "'+message.destinationName+'" from user:"'+message.send+'"');
        //console.log(message);
    }

    startDisconnect(){
        this.client.disconnect();
        console.log("Disconnected.");
    }

    publishMessage(msg){
        if(this.client.isConnected()){
    
            let Message = new Paho.MQTT.Message(msg);
            Message.destinationName = this.publishTopic;
    
            this.client.send(Message);
            console.log('Sent message: "'+ msg +'" to topic "'+this.publishTopic+'"');
        }

    }
}
