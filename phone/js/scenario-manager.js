export class ScenarioManager {
    constructor() {
        this.initKeyListener();
    }

    initKeyListener() {
        window.addEventListener('keyup', this.handleKeyup.bind(this));
    }

    handleKeyup(event) {
        switch (event.key) {
            case '1':
                this.startScenario("scenario1");
                break;
            case '2':
                this.startScenario("scenario2");
                break;
            case '3':
                this.startScenario("scenario3");
                break;
            case '0':
                window.chatDOM.returnToDashboard();
                break;
            case 'c':
                window.chatInputManager.cameraPopup.cameraTakenOff();
                break;
            case 'd':
                window.chatInputManager.cameraPopup.carburatorReached();
            break;
            default:
                break;
        }
    }

    async startScenario(scenario) {
        await window.chatDOM.chatData.setCurrentScenarioData(scenario);
        if (window.chatDOM.chatData.currentScenarioData) {

            window.chatDOM.clearChat();
            window.chatInputManager.dashboard.hideDashboard();
            setTimeout(() => {
                window.chatDOM.sendNewMessage();
            }, 500);
        }
    }

}
