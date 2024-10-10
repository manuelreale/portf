// keys.js
export class Keys {
    constructor() {
        // Azure
        this.subscriptionKey = '3b43d58a8f0044d19f342849b422e8db';
        this.region = 'westeurope';
        // Azure OpenAI
        this.azureOpenAIKey = 'f1c12206615b407dabc0ca5c82252c8c';
        this.azureOpenAIEndpoint = 'https://dutchdesignweekgpt.openai.azure.com';
        this.azureOpenAIDeploymentName = 'gpt-4';
    }

    getSubscriptionKey() {
        return this.subscriptionKey;
    }

    getRegion() {
        return this.region
    }
    // Azure OpenAI
    getAzureOpenAIKey() {
        return this.azureOpenAIKey;
    }

    getAzureOpenAIEndpoint() {
        return this.azureOpenAIEndpoint;
    }

    getAzureOpenAIDeploymentName() {
        return this.azureOpenAIDeploymentName;
    }
}
