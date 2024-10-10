export class ChatGPT {
    constructor(keys) {
        this.keys = keys;
        this.conversationHistory = [];
        this.directiveSent = false; // To track if the directive has been sent
    }

    // Function to set the directive
    setDirective() {
        const directive = "Please respond in JSON format with fields 'text' and 'type', where 'type' is 'question' if your response ends with a question, is a question or has a questionmark in it. If not, the type should be 'answer'";
        this.conversationHistory.push({ role: 'system', content: directive });
        this.directiveSent = true;
    }

    // Function to send a message to ChatGPT
    async sendMessageToChatGPT(userText) {
        // Add the directive if it hasn't been sent yet
        if (!this.directiveSent) {
            this.setDirective();
        }
        this.conversationHistory.push({ role: 'user', content: userText })
        console.log(this.conversationHistory)

        return await this.attemptFetchWithRetries();
    }

    // Function to attempt fetch with retries
    async attemptFetchWithRetries() {
        let retries = 5;
        let delay = 1000;

        while (retries > 0) {
            try {
                const response = await this.sendRequest();
                if (response.ok) {
                    const data = await response.json();
                    return this.parseResponse(data);
                } else if (response.status === 429) {
                    console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                    retries--;
                } else {
                    throw new Error(`Request failed with status ${response.status}`);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error: " + error.message);
                return null;
            }
        }
        throw new Error("Max retries reached. Please try again later.");
    }

    // Function to send the API request
    async sendRequest() {
        return await fetch(`${this.keys.getAzureOpenAIEndpoint()}/openai/deployments/${this.keys.getAzureOpenAIDeploymentName()}/chat/completions?api-version=2023-03-15-preview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': this.keys.getAzureOpenAIKey()
            },
            body: JSON.stringify({
                messages: this.conversationHistory,
                max_tokens: 150,
                temperature: 0.7
            })
        });
    }   

    // Function to parse the response
    parseResponse(data) {
        if (data.choices && data.choices.length > 0) {
            let assistantMessage = data.choices[0].message.content.trim();
            console.log(assistantMessage)
            // Parse the JSON response
            try {
                const parsedResponse = JSON.parse(assistantMessage);
                if (parsedResponse.text && parsedResponse.type) {
                    this.conversationHistory.push({ role: 'assistant', content: assistantMessage });
                    return parsedResponse;
                } else {
                    throw new Error("Response does not contain the required 'text' or 'type' fields.");
                }
            } catch (error) {
                throw new Error("Failed to parse JSON response: " + error.message);
            }
        } else {
            throw new Error("Unexpected API response structure");
        }
    }
    

    async requestMessage(message) {
        if (message === "") {
            console.log("GPT: No text was entered");
            return;
        }
        try {
            const response = await this.sendMessageToChatGPT(message);
            if (response) {
                console.log("GPT", response);
                return response;
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        }
    }
}
