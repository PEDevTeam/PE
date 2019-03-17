if (typeof window.phoneChatFunctions === "undefined"){
    window.phoneChatFunctions = {}    
}
if (typeof window.phoneChatSetups === "undefined"){
    window.phoneChatSetups = {}    
}

Object.assign(window.phoneChatFunctions, {
    testChoiceEvent: function(index){
        switch (index) {
            case 0:
                console.log('continue based on choice 1');
                break;
            case 1:
                console.log('continue based on choice 2');
                break;
            case 2:
                console.log('continue based on choice 3');
                break;
        }
    }
});

Object.assign(window.phoneChatSetups, {
    example : [
        {contact: "Bully", content: "hello, this is a test", imagePath: undefined, choiceFunc: undefined},
        {contact: "Player", content: "hello, this is another test."},
        {contact: "Bully", content: "hello, this is a test very very very very very very long text very very very very long test.", imagePath: undefined, choiceFunc: undefined},
        {content: [
                {text: "Choice A."},
                {text: "Choice B."},
                {text: "Choice C."}
            ], choiceFunc: "testChoiceEvent"}
    ]
});
