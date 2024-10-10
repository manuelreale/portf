import { ChatScenario1 } from "./chat-scenario-1.js";
import { ChatScenario2  } from "./chat-scenario-2.js";

export class ChatData {
    constructor() {

        this.chatScenario1 = new ChatScenario1();
        this.chatScenario2 = new ChatScenario2();
        this.currentScenarioData = null;
        this.chatCounter = 0;
        this.currentChatData = null;

    }

    setCurrentScenarioData(scenario){

        if(scenario == "scenario1"){
            this.currentScenarioData = this.chatScenario1;
            console.log(this.currentScenarioData);
            console.log('scenario 1 loaded');
        }
        else if(scenario == "scenario2"){
            this.currentScenarioData = this.chatScenario2;
            console.log(this.currentScenarioData);
            console.log('scenario 2 loaded');
        }
        else if(scenario == "scenario3"){

        }
        else if(scenario == "dashboard"){
            this.currentScenarioData = null;
            this.currentChatData = null;
            this.chatCounter = 0;
        }
        return;

    }

    getCurrentChatData() {
        return this.currentChatData;
    }

    setNextChatData() {

        let chatData = this.currentScenarioData.chatData.conversation[this.chatCounter];
        this.currentChatData = chatData;
        this.chatCounter++;
        return chatData;

    }

}