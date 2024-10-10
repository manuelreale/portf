export class SidebarContent {
    constructor() {

        this.summaryPanel = document.querySelector('.summary-panel');
        this.contentElemProblem = document.querySelector('.summary-problem');
        this.contentElemCauses = document.querySelector('.summary-causes');
        this.contentElemAssumptions = document.querySelector('.summary-assumptions');
        this.debugButton = document.querySelector('#sidebarContent');

        this.dummyData = this.setDummyData();
        this.setDebugButton();

        this.dataProblem = null;
        this.dataCauses = null;
        this.dataAssumptions = null;

        // ADD FUNCTIONALITY THAT CHECKS WETHER DATA IS THE SAME

    }

    setDummyData() {
        let dummyChat = {
            "conversation": [
                {
                    "role": "assistant",
                    "content": "I'm sorry to hear that! Could you describe what exactly feels off? Is it something with the way it rides, a noise you're hearing, or maybe something with the gears or brakes?",
                    "problem": "",
                    "assumptions": [],
                    "causes": [],
                    "procedures": [],
                    "suggestions": []
                },
                {
                    "role": "assistant",
                    "content": "Thanks for that information! To narrow it down a bit, could you let me know if you've noticed any unusual sounds, like grinding or clicking? Also, do you feel the resistance only when you're riding on flat ground, or does it happen on hills as well?",
                    "problem": "Bike is harder to pedal than usual.",
                    "assumptions": [
                        {
                            "item": "Bike is harder to pedal than usual",
                            "status": "cross"
                        }
                    ],
                    "causes": [
                        "Chain or drivetrain issue"
                    ],
                    "procedures": [],
                    "suggestions": [
                        {
                            "text": "Yes, I hear grinding",
                            "type": "message"
                        },
                        {
                            "text": "No unusual sounds",
                            "type": "message"
                        }
                    ]
                },
                {
                    "role": "assistant",
                    "content": "It sounds like the problem might be related to the chain or the drivetrain. Could you check if the chain is properly lubricated and if it's sitting correctly on the gears?",
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
                        "Chain or drivetrain issue"
                    ],
                    "procedures": [
                        {
                            "id": 1,
                            "title": "Check Chain Lubrication and Alignment"
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
                    "content": "Great! Go ahead and give that a try, and let me know how it goes.",
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
                            "item": "Chain is dry",
                            "status": "cross"
                        },
                        {
                            "item": "Chain is lubricated and aligned",
                            "status": "check"
                        }
                    ],
                    "causes": [
                        "Chain or drivetrain issue"
                    ],
                    "procedures": [],
                    "suggestions": [
                        {
                            "text": "Issue resolved",
                            "type": "message"
                        },
                        {
                            "text": "Issue not resolved",
                            "type": "message"
                        }
                    ]
                },
                {
                    "role": "assistant",
                    "content": "Thanks for trying that out. If the chain was dry, lubricating it was definitely a good first step. Since that didn't completely solve the issue, let's consider a few other possibilities. It could be an issue with the bottom bracket. Would you like a procedure to check the bottom bracket?",
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
                            "text": "Yes, let's start",
                            "type": "action"
                        },
                        {
                            "text": "I think it's something else",
                            "type": "action"
                        }
                    ]
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
                        {
                            "id": 3,
                            "title": "Tighten Bottom Bracket"
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

    setDebugButton() {

        this.debugButton.onclick = () => {
            this.setNewSummaryPanel(this.dummyData);

        }
    }


    setNewSummaryPanel(data) {

        let problemIsEqual = JSON.stringify(data.problem) === JSON.stringify(this.dataProblem);
        let causesIsEqual = JSON.stringify(data.causes) === JSON.stringify(this.dataCauses);
        let assumptionsIsEqual = JSON.stringify(data.assumptions) === JSON.stringify(this.dataAssumptions);

        if( problemIsEqual && causesIsEqual && assumptionsIsEqual){
            // all findings are the same, do nothing
        }
        else{

            let currentSummaryWrapper = document.querySelector('.summary-wrapper');

            currentSummaryWrapper.classList.add('summary-block--fadeout'); // Add the fade-out class to start the transition

            // Wait for the transition to complete before removing the element
            currentSummaryWrapper.addEventListener('transitionend', () => {
                currentSummaryWrapper.remove(); // Remove the element from the DOM
                this.generateSummary(data); // Call the function with the correct `this` context
            });

            this.dataProblem = data.problem;
            this.dataCauses = data.causes;
            this.dataAssumptions = data.assumptions;
        }
    }

    generateSummary(data) {
        const summaryWrapper = this.createElement('div', 'summary-wrapper');

        // Generate and append the individual blocks
        summaryWrapper.appendChild(this.generateProblem(data.problem));
        summaryWrapper.appendChild(this.generateCauses(data.causes));
        summaryWrapper.appendChild(this.generateAssumptions(data.assumptions));

        // Assuming you want to append this to an existing element in the DOM
        this.summaryPanel.appendChild(summaryWrapper);
    }

    generateProblem(problemText) {
        const problemBlock = this.createElement('div', 'summary-block');
        this.appendChildren(problemBlock, [
            this.createElement('div', 'summary-title', 'Problem'),
            this.createElement('div', 'summary-problem', problemText)
        ]);
        return problemBlock;
    }

    generateCauses(causes) {
        const causesBlock = this.createElement('div', 'summary-block');
        const causesList = this.createElement('ol', 'summary-causes');
        causes.forEach(cause => causesList.appendChild(this.createElement('li', '', cause)));
        this.appendChildren(causesBlock, [
            this.createElement('div', 'summary-title', 'Possible Causes'),
            causesList
        ]);
        return causesBlock;
    }

    generateAssumptions(assumptions) {
        const assumptionsBlock = this.createElement('div', 'summary-block');
        const assumptionsList = this.createElement('ul', 'summary-assumptions');
        assumptions.forEach(assumption => {
            assumptionsList.appendChild(this.createElement('li', assumption.status, assumption.item));
        });
        this.appendChildren(assumptionsBlock, [
            this.createElement('div', 'summary-title', 'Assumptions'),
            assumptionsList
        ]);
        return assumptionsBlock;
    }

    // Helper functions
    createElement(tag, className, textContent = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }

}
