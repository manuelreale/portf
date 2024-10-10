export class ChatScenario1 {
    constructor() {
        this.chatData = this.initChatData();
    }

    initChatData() {
        let chatData = {
            "conversation": [

               

                // DEBUG ABOVE
                {
                    "role": "assistant",
                    "content": "We will now start the pre-flight check of the right wing. Tell me when you are ready to start.",
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
                            "text": "start",
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
                    "instructions" : {
                        "Flow": "Wing Inspection",
                        "AnimationType": "",
                        "Title": "Follow the checklist",
                        "Instructions": "Go through the checklist by checking each component",
                        "Controls":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            },
                            {   
                                "Type": "mic",
                                "Text": "Say <b>“check”</b> into the microphone"
                            },
                            {
                                "Type": "cam",
                                "Text": "<b>“Thumbs up”</b> in front of the camera"
                            }
                        ],
                        "Optional":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            }
                        ]
                    }
                },
                {
                    "role": "assistant",
                    "content": "Fuel cap safely secured?",
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
                    "instructions" : {
                        "Flow": "Wing Inspection",
                        "AnimationType": "",
                        "Title": "Follow the checklist",
                        "Instructions": "Go through the checklist by checking each component",
                        "Controls":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            },
                            {   
                                "Type": "mic",
                                "Text": "Say <b>“check”</b> into the microphone"
                            },
                            {
                                "Type": "cam",
                                "Text": "<b>“Thumbs up”</b> in front of the camera"
                            }
                        ],
                        "Optional":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            }
                        ]
                    }
                },
                {
                    "role": "assistant",
                    "content": "Fuel cap vent open and pointing forward?",
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
                    "instructions" : {
                        "Flow": "Wing Inspection",
                        "AnimationType": "",
                        "Title": "Follow the checklist",
                        "Instructions": "Go through the checklist by checking each component",
                        "Controls":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            },
                            {   
                                "Type": "mic",
                                "Text": "Say <b>“check”</b> into the microphone"
                            },
                            {
                                "Type": "cam",
                                "Text": "<b>“Thumbs up”</b> in front of the camera"
                            }
                        ],
                        "Optional":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            }
                        ]
                    }
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
                    "instructions" : {
                        "Flow": "Wing Inspection",
                        "AnimationType": "",
                        "Title": "Follow the checklist",
                        "Instructions": "Go through the checklist by checking each component",
                        "Controls":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            },
                            {   
                                "Type": "mic",
                                "Text": "Say <b>“check”</b> into the microphone"
                            },
                            {
                                "Type": "cam",
                                "Text": "<b>“Thumbs up”</b> in front of the camera"
                            }
                        ],
                        "Optional":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            }
                        ]
                    }
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
                    "instructions" : {
                        "Flow": "Wing Inspection",
                        "AnimationType": "",
                        "Title": "Follow the checklist",
                        "Instructions": "Go through the checklist by checking each component",
                        "Controls":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            },
                            {   
                                "Type": "mic",
                                "Text": "Say <b>“check”</b> into the microphone"
                            },
                            {
                                "Type": "cam",
                                "Text": "<b>“Thumbs up”</b> in front of the camera"
                            }
                        ],
                        "Optional":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            }
                        ]
                    }
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
                    "instructions" : {
                        "Flow": "Wing Inspection",
                        "AnimationType": "",
                        "Title": "Follow the checklist",
                        "Instructions": "Go through the checklist by checking each component",
                        "Controls":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            },
                            {   
                                "Type": "mic",
                                "Text": "Say <b>“check”</b> into the microphone"
                            },
                            {
                                "Type": "cam",
                                "Text": "<b>“Thumbs up”</b> in front of the camera"
                            }
                        ],
                        "Optional":[
                            {   
                                "Type": "joy",
                                "Text": "Hold joystick to the <b>left</b>"
                            }
                        ]
                    }
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