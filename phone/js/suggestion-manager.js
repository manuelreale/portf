

export class SuggestionManager {
    constructor() {
        this.buttonContainer = document.querySelector('.chat-actions-suggestions-buttons');
        this.suggestionData = this.setButtonData(); // Call the function to get the data

        this.debugButton = document.querySelector('#suggestionOpen');
        this.setDebugButton();
    }

    removeSuggestionButtons() {
        while (this.buttonContainer.firstChild) {
            this.buttonContainer.removeChild(this.buttonContainer.firstChild);
        }
    }

    addSuggestionButtons(suggestions) {
        console.log(suggestions);
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'chat-action-button';
            button.textContent = suggestion.text;
            button.disabled = true;

                // Add an onclick event listener
            button.onclick = () => {
                window.chatDOM.sendNewMessage(button.textContent, null)
            };

            this.buttonContainer.appendChild(button); // Use 'this.buttonContainer'
        });
    }

    setButtonData() {
        return [
            {
                "id": 1,
                "text": "Yes, it's leaking"
            },
            {
                "id": 2,
                "text": "No, it's dry"
            }
        ];
    }

    updateSuggestionButtons(data){
        this.removeSuggestionButtons(); // Clear any existing buttons

        if(data){
            this.addSuggestionButtons(data); // Add new buttons
        }

    }

    setDebugButton() {
        this.debugButton.onclick = () => {
            this.updateSuggestionButtons(this.suggestionData)
        };
    }
}