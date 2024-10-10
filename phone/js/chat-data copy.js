export class ChatData {
    constructor() {

        this.dummyChatData = this.setDummyChatData();
        this.chatCounter = 0;
        this.currentChatData = null;

    }

    getCurrentChatData() {
        return this.currentChatData;
    }

    setNextChatData() {

        let chatData = this.dummyChatData.conversation[this.chatCounter];
        this.currentChatData = chatData;
        this.chatCounter++;
        return chatData;

    }

    setDummyChatData() {
        let dummyChat = {
            "conversation": [
                {
                    "role": "assistant",
                    "content": "Initialising Speech Synthesis",
                    "target": "chat",
                    "microphone": "",
                    // "microphone": {
                    //     "activateMic": true,
                    //     "proceedKeywords": ["start", "ready"],
                    //     "listeningStyle": "interim",
                    //     "uIMode": "preview",
                    //     "uICallback": "green",
                    // },
                    "optionSlider": [
                        // {
                        //     "text": "OK",
                        //     "proceed": 1
                        // },
                        // {
                        //     "text": "cancel",
                        //     "proceed": 0
                        // }
                    ],
                    "optionButtons": [
                        {
                            "text": "start experience",
                            "proceed": 1
                        },
                        {
                            "text": "cancel",
                            "proceed": 0
                        },
                        {
                            "text": "dunno what to do",
                            "proceed": 0
                        },
                        {
                            "text": "beep boop",
                            "proceed": 0
                        },
                        {
                            "text": "hello world",
                            "proceed": 0
                        }
                    ],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "We will now start the pre-flight check of the right wing. Tell me when you are ready to start.",
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["start", "ready"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
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
                        // {
                        //     "text": "choose me",
                        //     "proceed": 1
                        // },
                        // {
                        //     "text": "don't choose me",
                        //     "proceed": 0
                        // },
                        // {
                        //     "text": "i'm a button",
                        //     "proceed": 0
                        // },
                        // {
                        //     "text": "not sure about",
                        //     "proceed": 0
                        // },
                        // {
                        //     "text": "hello world",
                        //     "proceed": 0
                        // }
                    ],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "Fuel cap safely secured?",
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
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
                        // {
                        //     "text": "number 1",
                        //     "proceed": 0
                        // },
                        // {
                        //     "text": "number 2",
                        //     "proceed": 1
                        // },
                        // {
                        //     "text": "number 3",
                        //     "proceed": 0
                        // }
                    ],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "Fuel cap vent open and pointing forward?",
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
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
                    "optionButtons": [],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "Inspection cover secured?",
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
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
                    "optionButtons": [],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "Leading edge in good condition?",
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["check", "jack"],
                        "listeningStyle": "interim",
                        "uIMode": "preview",
                        "uICallback": "green",
                    },
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
                    "optionButtons": [],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "Pitot tube secure?",
                    "target": "chat",
                    "microphone": {
                        "activateMic": true,
                        "proceedKeywords": ["located", "tube", "where", "pitot", "pito", "pitotube", "find"],
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
                    "content": "The pitot tube is on the bottom of the wing.",
                    "target": "popup",
                    "microphone": "",
                    "optionSlider": [],
                    "optionButtons": [],
                    "optionWheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "Thanks for trying that out. If the chain was dry, lubricating it was definitely a good first step. Since that didn't completely solve the issue, let's consider a few other possibilities. It could be an issue with the bottom bracket. Would you like a procedure to check the bottom bracket?",
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
                    "option-buttons": [],
                    "option-wheel": [],
                    "procedure": []
                },
                {
                    "role": "assistant",
                    "content": "To check the bottom bracket, you would typically lift the bike, check for any play in the crank arms, and listen for any unusual sounds. If you need detailed steps, let me know.",
                    "problem": "Bike is harder to pedal than usual, with a grinding noise.",
                    "assumptions": [
                        {
                            "item": "Slight grinding noise, especially uphill",
                            "status": "cross"
                        },
                        {
                            "item": "Pedals feel stiff on flat surfaces",
                            "status": "cross"
                        },
                        {
                            "item": "Bike is harder to pedal than usual",
                            "status": "cross"
                        },
                        {
                            "item": "Chain is lubricated and aligned",
                            "status": "check"
                        }
                    ],
                    "causes": [
                        "Bottom bracket issue",
                        "Chain or drivetrain issue"
                    ],
                    "procedures": [
                        {
                            "id": 2,
                            "title": "Check Bottom Bracket"
                        }
                    ],
                    "suggestions": [
                        {
                            "text": "Problem found",
                            "type": "action"
                        },
                        {
                            "text": "No problem found",
                            "type": "action"
                        }
                    ]
                },
                {
                    "role": "assistant",
                    "content": "It does sound like your bottom bracket might be the issue here. The grinding and the play in the crank arms are classic signs that it could be worn out or loose. You’ll likely need to either tighten it or, if it’s too worn, replace it. Would you like instructions on how to tighten it or to check if it needs replacement?",
                    "problem": "Bike is harder to pedal than usual, with a grinding noise and loose crank arms.",
                    "assumptions": [
                        {
                            "item": "Slight grinding noise, especially uphill",
                            "status": "cross"
                        },
                        {
                            "item": "Pedals feel stiff on flat surfaces",
                            "status": "cross"
                        },
                        {
                            "item": "Bike is harder to pedal than usual",
                            "status": "cross"
                        },
                        {
                            "item": "Sideways movement in crank arms",
                            "status": "cross"
                        },
                        {
                            "item": "Faint grinding sound from bottom bracket",
                            "status": "cross"
                        },
                        {
                            "item": "Chain is lubricated and aligned",
                            "status": "check"
                        }
                    ],
                    "causes": [
                        "Bottom bracket issue"
                    ],
                    "procedures": [

                    ],
                    "suggestions": [
                        {
                            "text": "Yes i would like instructions",
                            "type": "action"
                        },
                        {
                            "text": "No, i think it's something else",
                            "type": "action"
                        }
                    ]
                },
                {
                    "role": "assistant",
                    "content": "To tighten the bottom bracket, you would remove the crank arms, use a bottom bracket tool to tighten it, and then reassemble everything. If this doesn’t fix the issue, replacement might be necessary.",
                    "problem": "Bike is harder to pedal than usual, with a grinding noise and loose crank arms.",
                    "assumptions": [
                        {
                            "item": "Slight grinding noise, especially uphill",
                            "status": "cross"
                        },
                        {
                            "item": "Pedals feel stiff on flat surfaces",
                            "status": "cross"
                        },
                        {
                            "item": "Bike is harder to pedal than usual",
                            "status": "cross"
                        },
                        {
                            "item": "Sideways movement in crank arms",
                            "status": "cross"
                        },
                        {
                            "item": "Faint grinding sound from bottom bracket",
                            "status": "cross"
                        },
                        {
                            "item": "Chain is lubricated and aligned",
                            "status": "check"
                        }
                    ],
                    "causes": [
                        "Bottom bracket issue"
                    ],
                    "procedures": [
                        {
                            "id": 3,
                            "title": "Tighten Bottom Bracket"
                        }
                    ],
                    "suggestions": [
                        {
                            "text": "The problem seems to be fixed",
                            "type": "action"
                        },
                        {
                            "text": "I'm still experiencing problems",
                            "type": "action"
                        }
                    ]
                },
                {
                    "role": "assistant",
                    "content": "It sounds like replacing it is the best option. Bottom bracket replacement can be tricky, so you might want to take it to a bike shop unless you're comfortable doing it yourself. Would you like to proceed with that?",
                    "problem": "Bike is harder to pedal than usual, with a grinding noise and loose crank arms.",
                    "assumptions": [
                        {
                            "item": "Slight grinding noise, especially uphill",
                            "status": "cross"
                        },
                        {
                            "item": "Pedals feel stiff on flat surfaces",
                            "status": "cross"
                        },
                        {
                            "item": "Bike is harder to pedal than usual",
                            "status": "cross"
                        },
                        {
                            "item": "Sideways movement in crank arms",
                            "status": "cross"
                        },
                        {
                            "item": "Faint grinding sound from bottom bracket",
                            "status": "cross"
                        },
                        {
                            "item": "Chain is lubricated and aligned",
                            "status": "check"
                        }
                    ],
                    "causes": [
                        "Bottom bracket issue"
                    ],
                    "procedures": [],
                    "suggestions": [
                        {
                            "text": "Take to bike shop",
                            "type": "action"
                        },
                        {
                            "text": "Try replacing it myself",
                            "type": "action"
                        }
                    ]
                },
                {
                    "role": "assistant",
                    "content": "That sounds like a good plan! The shop should be able to replace the bottom bracket quickly and get your bike running smoothly again. I'm glad we were able to narrow down the issue. Is there anything else I can help you with today?",
                    "problem": "Bike is harder to pedal than usual, with a grinding noise and loose crank arms.",
                    "assumptions": [
                        {
                            "item": "Slight grinding noise, especially uphill",
                            "status": "cross"
                        },
                        {
                            "item": "Pedals feel stiff on flat surfaces",
                            "status": "cross"
                        },
                        {
                            "item": "Bike is harder to pedal than usual",
                            "status": "cross"
                        },
                        {
                            "item": "Sideways movement in crank arms",
                            "status": "cross"
                        },
                        {
                            "item": "Faint grinding sound from bottom bracket",
                            "status": "cross"
                        },
                        {
                            "item": "Chain is lubricated and aligned",
                            "status": "check"
                        }
                    ],
                    "causes": [
                        "Bottom bracket issue"
                    ],
                    "procedures": [],
                    "suggestions": [
                        {
                            "text": "No further help needed",
                            "type": "message"
                        },
                        {
                            "text": "I have another issue",
                            "type": "message"
                        }
                    ]
                },
                {
                    "role": "assistant",
                    "content": "You're welcome! I hope your bike is back in top shape soon. Have a great day and happy riding!",
                    "problem": "Bike is harder to pedal than usual, with a grinding noise and loose crank arms.",
                    "assumptions": [
                        {
                            "item": "Slight grinding noise, especially uphill",
                            "status": "cross"
                        },
                        {
                            "item": "Pedals feel stiff on flat surfaces",
                            "status": "cross"
                        },
                        {
                            "item": "Bike is harder to pedal than usual",
                            "status": "cross"
                        },
                        {
                            "item": "Sideways movement in crank arms",
                            "status": "cross"
                        },
                        {
                            "item": "Faint grinding sound from bottom bracket",
                            "status": "cross"
                        },
                        {
                            "item": "Chain is lubricated and aligned",
                            "status": "check"
                        }
                    ],
                    "causes": [
                        "Bottom bracket issue"
                    ],
                    "procedures": [],
                    "suggestions": [
                        {
                            "text": "Thank you",
                            "type": "message"
                        },
                        {
                            "text": "I need further help",
                            "type": "message"
                        }
                    ]
                }
            ]
        }
        return dummyChat;
    }
}