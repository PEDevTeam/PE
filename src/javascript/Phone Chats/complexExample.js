if (typeof window.phoneChatFunctions === "undefined"){
    window.phoneChatFunctions = {}    
}
if (typeof window.phoneChatSetups === "undefined"){
    window.phoneChatSetups = {}    
}

Object.assign(window.phoneChatFunctions, {
    complexChoice1: function(index){
        phone.toggleSnapTextEllipsis();
        setTimeout(function(){
            switch (index) {
                case 0:
                    var convoName = "complexExamplePt2A";
                    var convo = window.phoneChats[convoName];
                    phone.addSnapTextConvo(convo);
                    phone.toggleSnapTextEllipsis();
                    break;
                case 1:
                    var convoName = "complexExamplePt2B";
                    var convo = window.phoneChats[convoName];
                    phone.addSnapTextConvo(convo);
                    phone.toggleSnapTextEllipsis();
                    break;
                case 2:
                    var convoName = "complexExamplePt2C";
                    var convo = window.phoneChats[convoName];
                    phone.addSnapTextConvo(convo);
                    phone.toggleSnapTextEllipsis();
                    break;
            }
        }, 750)
    },
    complexChoice2: function(index){
        phone.toggleSnapTextEllipsis();
        setTimeout(function(){
            switch (index) {
                case 0:
                    var convoName = "complexFucked";
                    var convo = window.phoneChats[convoName];
                    phone.addSnapTextConvo(convo);
                    phone.toggleSnapTextEllipsis();
                    break;
                case 1:
                    var convoName = "complexGood";
                    var convo = window.phoneChats[convoName];
                    phone.addSnapTextConvo(convo);
                    phone.toggleSnapTextEllipsis();
                    break;
            }
        }, 750)
    },
    complexChoice3: function(index){
        phone.toggleSnapTextEllipsis();
        setTimeout(function(){
            switch (index) {
                case 0:
                    var convoName = "complexGood";
                    var convo = window.phoneChats[convoName];
                    phone.addSnapTextConvo(convo);
                    phone.toggleSnapTextEllipsis();
                    break;
                case 1:
                    var convoName = "complexFucked";
                    var convo = window.phoneChats[convoName];
                    phone.addSnapTextConvo(convo);
                    phone.toggleSnapTextEllipsis();
                    break;
                case 2:
                    var convoName = "complexGood";
                    var convo = window.phoneChats[convoName];
                    phone.addSnapTextConvo(convo);
                    phone.toggleSnapTextEllipsis();
                    break;
            }
        }, 750)
    },
    complexChoice4: function(index){
        phone.toggleSnapTextEllipsis();
        setTimeout(function(){
            switch (index) {
                case 0:
                    var convoName = "complexGood";
                    var convo = window.phoneChats[convoName];
                    phone.addSnapTextConvo(convo);
                    phone.toggleSnapTextEllipsis();
                    break;
            }
        }, 750)
    }
});

Object.assign(window.phoneChatSetups, {
    complexExample : [
        {contact: "Bully", content: "Good day sir. I demand you answer this question!", imagePath: undefined, choiceFunc: undefined},
        {content: [
            {text: "Nein! I refuse!"},
            {text: "Well, if I must."},
            {text: "Of course, my master"}
        ], choiceFunc: "complexChoice1"}
    ],
    complexExamplePt2A : [
        {contact: "Bully", content: "Do no be using that tone with me! You'll get a right spankering!", imagePath: undefined, choiceFunc: undefined},
        {content: [
            {text: "Screw you hippy!"},
            {text: "Sorry master, please so not punish me..."}
        ], choiceFunc: "complexChoice2"}
    ],
    complexExamplePt2B : [
        {contact: "Bully", content: "Cheer up little fella, you'll be in a better place soon!", imagePath: undefined, choiceFunc: undefined},
        {content: [
            {text: "Okay..."},
            {text: "Sniff, sniff"},
            {text: "😢"}
        ], choiceFunc: "complexChoice3"}
    ],
    complexExamplePt2C : [
        {contact: "Bully", content: "Very good, my slave", imagePath: undefined, choiceFunc: undefined},
        {content: [
            {text: "Thankyou master"}
        ], choiceFunc: "complexChoice4"}
    ],
    complexFucked : [
        {contact: "Bully", content: "You're fucked!", imagePath: undefined, choiceFunc: undefined},
        {contact: "Player", content: "Crap"},
    ],
    complexGood : [
        {contact: "Bully", content: "You're going to be fucked!", imagePath: undefined, choiceFunc: undefined},
        {contact: "Player", content: "Yay!"},
    ]
});