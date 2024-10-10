export class ChatScenario2 {
    constructor() {
        this.chatData = this.initChatData();
    }

    initChatData() {
        let chatData = {
            "conversation": [
            
                // DEBUG ABOVE
                // {
                //     "role": "assistant",
                //     "content": "temparature?",
                //     "target": {
                //         "type": "chat",
                //         "variant": ""
                //     },
                //     "microphone": {
                //         "activateMic": true,
                //         "proceedKeywords": ["30", "degrees"],
                //         "listeningStyle": "interim",
                //         "uIMode": "preview",
                //         "uICallback": "green",
                //     },
                //    "optionSlider": [
                //     ],
                //     "optionButtons": [
                //     ],
                //     "optionWheel": {
                //         "items": ["10°", "11°", "12°", "13°", "14°", "15°", "16°", "17°", "18°", "19°", "20°", "21°", "22°", "23°", "24°", "25°", "26°", "27°", "28°", "29°", "30°", "31°", "32°", "33°", "34°", "35°", "36°", "37°", "38°", "39°", "40°"],
                //         "default": 1,
                //         "proceed": 10
                //     },
                // },
                {
                    "role": "assistant",
                    "content": "Shall we take a look together at the needle?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["yes", "yeah"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
                    "handGesture": "thumbsUp",
                   "optionSlider": [
                        {
                            "text": "yes",
                            "proceed": 1
                        },
                        {
                            "text": "no",
                            "proceed": 0
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "Take the camera off your helmet",
                    "target": {
                        "type": "camera",
                        "variant": "",
                        "clearChat": true
                    },
                    "microphone": {
                    },
                   "optionSlider": [
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "You can put the camera back. It looks like there's wear on the jet needle. Do you know which jet needle you need for replacement?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["no", "nope"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "red",
                    },
                    "handGesture": "thumbsUp",
                   "optionSlider": [
                        {
                            "text": "yes",
                            "proceed": 0
                        },
                        {
                            "text": "no",
                            "proceed": 1
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "Inspection cover secured?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
                    "handGesture": "thumbsUp",
                   "optionSlider": [
                        {
                            "text": "check",
                            "proceed": 1
                        },
                        {
                            "text": "finding",
                            "proceed": 0
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "Leading edge in good condition?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
                    "handGesture": "thumbsUp",
                   "optionSlider": [
                        {
                            "text": "check",
                            "proceed": 1
                        },
                        {
                            "text": "finding",
                            "proceed": 0
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "Pitot tube secure?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
                    "handGesture": "thumbsUp",
                   "optionSlider": [
                        {
                            "text": "check",
                            "proceed": 1
                        },
                        {
                            "text": "finding",
                            "proceed": 0
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "C2 antenna condition?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["located", "antenna", "where", "C2", "see", "through", "find"],
                        "listeningStyle": "final",
                        "uIMode": "preview",
                        "uICallback": "",
                    },
                    "optionSlider": [
                        {
                            "text": "check",
                            "proceed": 0
                        },
                        {
                            "text": "finding",
                            "proceed": 0
                        }
                    ],
                    "optionButtons": [],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "The C2 antenna is on the bottom far end of the wing.",
                    "target": {
                        "type": "popup",
                        "variant": "antenna",
                        "clearChat": true,
                    },
                    "microphone": "",
                    "optionSlider": [],
                    "optionButtons": [],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "C2 antenna condition?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
                    "handGesture": "thumbsUp",
                   "optionSlider": [
                        {
                            "text": "check",
                            "proceed": 1
                        },
                        {
                            "text": "finding",
                            "proceed": 0
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "Move to the right hand trailing edge of the wing to continue inspection. Tell me when you are ready to continue inspection.",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["start", "ready"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
                    "handGesture": "thumbsUp",
                   "optionSlider": [
                        {
                            "text": "ready",
                            "proceed": 1
                        },
                        {
                            "text": "cancel",
                            "proceed": 0
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "Aileron mass balance secured?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
                    "handGesture": "thumbsUp",
                   "optionSlider": [
                        {
                            "text": "check",
                            "proceed": 1
                        },
                        {
                            "text": "finding",
                            "proceed": 0
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "Aileron hinges secured and free?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
                    "handGesture": "thumbsUp",
                   "optionSlider": [
                        {
                            "text": "check",
                            "proceed": 1
                        },
                        {
                            "text": "finding",
                            "proceed": 0
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "Excess aileron movement?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["finding", "find", "binding"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "red",
                    },
                    "handGesture": "thumbsDown",
                   "optionSlider": [
                        {
                            "text": "check",
                            "proceed": 0
                        },
                        {
                            "text": "finding",
                            "proceed": 1
                        }
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                },
                {
                    "role": "assistant",
                    "content": "What seems to be the problem with the aileron movement?",
                    "target": {
                        "type": "chat",
                        "variant": ""
                    },
                    "microphone": "",
                    "optionSlider": [
                    ],
                    "optionButtons": [
                        {
                            "text": "no movement",
                            "proceed": 0
                        },
                        {
                            "text": "movement restricted",
                            "proceed": 1
                        },
                        {
                            "text": "i'm not sure",
                            "proceed": 0
                        }
                    ],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "Restricted movement in the ailerons is a mission critical issue. The aircraft will need to stay grounded until it's repaired. I've generated a finding report for the repair crew. Please double-check the video and comment, and submit the report.",
                    "target": {
                        "type": "popup",
                        "variant": "finding",
                        "clearChat": true
                    },
                    "microphone": "",
                    "optionSlider": [],
                    "optionButtons": [
                        {
                            "text": "submit report",
                            "proceed": 1
                        },
                        {
                            "text": "retake video",
                            "proceed": 0
                        },
                        {
                            "text": "edit comment",
                            "proceed": 0
                        }
                       
                    ],
                    "optionWheel": [],
                    "procedure": []
                },
               
                   
                {
                    "role": "assistant",
                    "content": "I have submitted the report to maintenance crew. Pre-flight check is completed.",
                    "target": {
                        "type": "chat",
                        "variant": "",
                        "scenarioEnd": true
                    },
                    "microphone": {
                    },
                   "optionSlider": [
                    ],
                    "optionButtons": [
                    ],
                    "optionWheel": [],
                }
            ]
        }
        return chatData;
    }
}