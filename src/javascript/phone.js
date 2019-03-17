window.phoneElements={
    modal: "#phoneModal",
    modalBg : "#modalBg",
    homeBtn : "#phoneHomeBtn",
    contactsContent :"#contactsContent",
    inboxContent : "#inboxContent",
    emailContent : "#emailContent",
    snaptextContent : "#snaptextContent",
    snaptextConvo : "#snaptextConvo",
    snaptextEllipsis : "#snaptextEllipsis",
    callPrompt : "#callPrompt",
    callName: "#callName",
    callType: "#callType",
    callEnded:"#callEnded",
    callConfirmButton : "#callConfirmBtn",
    callCancelButton : "#callCancelBtn",
    callConfirmLabel: "#callConfirmLbl",
    callCancelLabel: "#callCancelLbl",
    clock : "#phoneClock",
    plannerDay : "#plannerDay",
    plannerWeekOne : "#plannerWeekOne",
    plannerWeekTwo : "#plannerWeekTwo",
    plannerDayDetails : "#plannerDayDetails",
    exitButtons : ".exit-button",
    subExitButtons : ".sub-exit-button"
};

window.phoneScreens={
    home : "#phoneHomeScreen",
    contacts : "#phoneContactsScreen",
    call : "#phoneCallScreen",
    email : "#phoneEmailScreen",
    planner : "#phonePlannerScreen",
    snaptext :  "#phoneSnapTextScreen"
};

window.phoneApps={
    contacts : "#contactsBtn",
    planner : "#plannerBtn",
    email : "#emailBtn",
    snaptext : "#snapBtn",
    camera : "#cameraBtn",
    phone : "#phoneBtn"
};

window.phoneHomeBgs={
    blue : "#blueHomeBg"
};

window.phoneSounds={
    ringtone : "",
    calling : "",
    chime : "",
    tap : "",
    end : ""
};

window.phoneContacts={
    Player : {name : "Me", image : "Images/phone/contacts/profiles/default-male.svg"},
    Teacher : {name : "Ms Buxton", image : "Images/phone/contacts/profiles/default-female.svg"},
    Bully : {name : "Butch", image : "Images/phone/contacts/profiles/default-male.svg"},
    Anon : {name : "Anonymous", image : "Images/phone/email/email_anonimous.jpg"}
};

window.phoneChats = {};

window.phone={
    _currentScreen : "",
    _clockAmPmMode : true,
    _activeContacts : [],
    _answered : false,
    _unlocked : true,
    _emailId : 0,
    _phoneSetup : false,

    setupPhone : function(){
        phone._currentScreen = phoneScreens.home;
        phone.hideSnapTextEllipsis();

        //click event bindings
        $(phoneElements.homeBtn).on("click", function(){
            phone.navigateTo(phoneScreens.home);
        });
        $(phoneElements.modalBg).on("click", function(){
            phone.closePhoneModal();
        });
        $(phoneApps.contacts).on("click", function(){
            phone.navigateTo(phoneScreens.contacts);
        });
        $(phoneElements.clock).on("click", function(){
            phone._clockAmPmMode = !phone._clockAmPmMode;
            phone.setPhoneClock();
        });
        $(phoneElements.exitButtons).on("click", function(){
            phone.navigateTo(phoneScreens.home);
        });
        $(phoneElements.contactsContent).on("click", '.contact-row', function(){
            phone.callContact($(this).data("name"));
        });
        $(phoneApps.email).on("click", function(){
            phone.navigateTo(phoneScreens.email);
        });
        $(phoneElements.inboxContent).on("click", '.email-row', function(){
            $(phoneElements.inboxContent).hide();
            let newEmail = ($(this).data("email-new"))
            if(newEmail){
                $(this).data("email-new", false);
                phone.subtractNotification(phoneApps.email);
            }
            phone.openEmail($(this).data("email-id"));

        });
        $(phoneApps.planner).on("click", function(){
            phone.clearTasks();
            phone.setTasks();
            phone.navigateTo(phoneScreens.planner);
        });
        $(phoneApps.snaptext).on("click", function(){
            phone.navigateTo(phoneScreens.snaptext);
        });
        phone.loadSnapConvos();
        phone._phoneSetup = true;
    },
    openPhoneModal : function(){
        if(phone._unlocked) {
            $(phoneElements.modal).addClass("visible");
            phone.setPhoneClock();
            phone.setPlannerDay();
            phone.setTasks();
        }
    },
    closePhoneModal : function(){
        if(phone._unlocked){
            $(phoneElements.modal).removeClass("visible");
            setTimeout(function(){
                phone.navigateTo(phoneScreens.home);
            }, 500);
        }
    },
    delayClosePhoneModal : function(){
        setTimeout(function(){
            phone.closePhoneModal();
        }, 500);
    },
    navigateTo : function(destScreen) {
        if(phone._unlocked) {
            $(phone._currentScreen).toggle();
            $(destScreen).toggle();
            phone._currentScreen = destScreen;
        }
    },
    setPhoneClock : function() {
        let currentHrs = "16"; //State.active.variables.time.hour;
        let currentMin = "26"; //State.active.variables.time.minute;
        let suffix = "";
        if(phone._clockAmPmMode){
            currentHrs = currentHrs > 12 ? currentHrs - 12 : currentHrs;
            suffix = currentHrs > 12 ? " PM" : " AM";
        }
        $(phoneElements.clock).text(currentHrs + ":" + currentMin + suffix);
    },
    setPlannerDay : function(){
        let currentDay = "Wednesday"; //window.timeCode.weekDayText;
        $(phoneElements.plannerDay).text(currentDay.substring(0,3));
    },
    addNotification : function(targetApp){
        let notifications = $(targetApp).data('badge') + 1;
        $(targetApp).attr('data-badge', notifications);
        $(targetApp).data('badge', notifications);
    },
    subtractNotification : function(targetApp){
        let notifications = $(targetApp).data("badge") ===  0 ? 0 :  $(targetApp).data("badge") - 1;
        $(targetApp).attr('data-badge', notifications);
        $(targetApp).data('badge', notifications);
    },
    removeAllNotifications : function (targetApp){
        let notifications = 0;
        $(targetApp).attr('data-badge', notifications);
        $(targetApp).data('badge', notifications);
    },
    addContact : function(contactObj){
        phone._activeContacts.push(contactObj);
        let newContact = $('<div class="contact-row" data-name="' + contactObj.name + '">').html('<img class="contact-img" src="' + contactObj.image + '" /><label>' + contactObj.name + '</label>');
        $(phoneElements.contactsContent).append(newContact);
    },
    callContact : function(name){
        $(phoneElements.callConfirmButton).parent("div").show();
        $(phoneElements.callCancelButton).parent("div").show();
        $(phoneElements.callPrompt).html("Do you want to call this contact?");
        $(phoneElements.callName).html(name);
        $(phoneElements.callConfirmLabel).html("Call");
        $(phoneElements.callCancelLabel).html("Cancel");
        $(phoneElements.callConfirmButton).off( "click" ).on("click", function(){
            phone.outgoingCall();
        });
        $(phoneElements.callCancelButton).off( "click" ).on("click", function() {
            phone.cancelCall();
        });
        phone.navigateTo(phoneScreens.call);
    },
    incomingCall : function(contactObj){
        $(phoneElements.callConfirmButton).parent("div").show();
        $(phoneElements.callCancelButton).parent("div").show();
        $(phoneElements.callPrompt).html("Call From");
        $(phoneElements.callName).html(contactObj.name);
        $(phoneElements.callConfirmLabel).html("Answer");
        $(phoneElements.callCancelLabel).html("Decline");
        $(phoneElements.callConfirmButton).off( "click" ).on("click", function(){
            phone.acceptCall();
        });
        $(phoneElements.callCancelButton).off( "click" ).on("click", function() {
            phone.declineCall();
        });
        phone.navigateTo(phoneScreens.call);
        phone.openPhoneModal();
        phone._unlocked = false;
    },
    acceptCall : function(){
        phone._answered = true;
        phone._unlocked = true;
        $(phoneElements.callCancelButton).parent("div").hide();
        $(phoneElements.callConfirmLabel).html("Answered");
        phone.delayClosePhoneModal();
    },
    declineCall : function(){
        phone._answered = false;
        phone._unlocked = true;
        $(phoneElements.callConfirmButton).parent("div").hide();
        $(phoneElements.callCancelLabel).html("Declined");
        phone.delayClosePhoneModal();
    },
    outgoingCall : function(){
        //TODO : handle outgoing call as twee page, return using endCall.
        alert("outgoing unhandled");
    },
    cancelCall : function() {
        phone._answered = false;
        phone._unlocked = true;
        $(phoneElements.callConfirmButton).parent("div").hide();
        $(phoneElements.callCancelLabel).html("Canceled");
        phone.navigateTo(phoneScreens.contacts);
    },
    endCall : function(){
        phone._answered = false;
        phone._unlocked = true;
        $(phoneElements.callConfirmButton).parent("div").hide();
        $(phoneElements.callCancelLabel).html("Call Ended");
        phone.delayClosePhoneModal();
    },
    toggleSnapTextEllipsis : function(){
        $(phoneElements.snaptextEllipsis).toggle();
    },
    hideSnapTextEllipsis : function(){
        $(phoneElements.snaptextEllipsis).hide();
    },
    showSnapTextEllipsis : function(){
        $(phoneElements.snaptextEllipsis).show();
    },
    addSnapText : function(contactObj, content, imagePath = undefined){
        let messageType = (contactObj === phoneContacts.Player ? "me" : "other");
        let messageContainer = $('<div class="snaptext-message">');
        $(messageContainer).html('<label class="snaptext-' + messageType + '">' + contactObj.name.toUpperCase() + ':</label><p class="snaptext-' + messageType + '-message">' + content + '</p>' + (imagePath === undefined ? '' : '<img src="' + imagePath + '">'));
        $(phoneElements.snaptextConvo).append(messageContainer);
        $(phoneElements.snaptextContent).stop().animate({
            scrollTop: $(phoneElements.snaptextContent)[0].scrollHeight
        }, 800);
    },
    addSnapTextChoice : function(optionArr, optionFunc){
        $(optionArr).each(function(index,obj){
            let choiceContainer = $('<div class="snaptext-choice" data-index="' + index + '" >');
            $(choiceContainer).html('<label>'+ obj.text +'</label>')
            $(phoneElements.snaptextConvo).append(choiceContainer);
        });
        $('.snaptext-choice').on('click', function() {
            let index = $(this).data('index');
            let text = $(this).children('label').text();
            phone.addSnapText( phoneContacts.Player, text);
            optionFunc(index);
            $('.snaptext-choice').remove();
        });
    },
    addSnapTextConvo : function(ConvoArr){
        let delay = 0;
        phone._unlocked = false;
        phone.addSnapText(ConvoArr[0].contact, ConvoArr[0].content, ConvoArr[0].imagePath);
        phone.toggleSnapTextEllipsis();
        ConvoArr.shift();
        let count = ConvoArr.length - 1;
        $(ConvoArr).each(function(index, obj){
            delay += (obj.content.length * 25);
            setTimeout(function(){
                if(obj.choiceFunc != undefined) {
                    phone.addSnapTextChoice(obj.content, obj.choiceFunc);
                    phone.toggleSnapTextEllipsis();
                    phone._unlocked = true;
                } else {
                    phone.addSnapText(obj.contact, obj.content, obj.imagePath);
                    if (index === count) {
                        phone.toggleSnapTextEllipsis();
                        phone._unlocked = true;
                    }
                }
            }, delay);
        });
    },
    clearSnapText : function(){
        $(phoneElements.snaptextConvo).html("");
    },
    openEmail : function(emailId){
        $("#email-id-" + emailId).show();
        $(phoneElements.emailContent).show();
    },
    addEmail : function(emailObj, contactObj = phoneContacts.Anon){
        phone._emailId += 1;
        console.log(phone._emailId);
        let inboxEmailRow = $('<div class="email-row" data-email-id="' + phone._emailId + '" data-email-new="true">').html('<img class="email-img" src="' + contactObj.image + '"><div class="email-summary"><label>' + contactObj.name +'</label><p>' + emailObj.text.given + '</p></div>');
        let emailContentRow = $('<div id="email-id-' + phone._emailId + '" style="display: none;">').html( '<div class="email-row"><img class="email-img" src="' + contactObj.image + '"><div class="email-summary"><label>' + contactObj.name +'</label><p>' + emailObj.text.given + '</p></div><img class="sub-exit-button" src="svg/phone/exitButton.svg" data-parent-id="#emailContent" data-child-id="#email-id-' + phone._emailId +'" data-target-id="#inboxContent" ></div><div class="email-body"><p>' + emailObj.text.perform + '</p></div>');

        $(phoneElements.inboxContent).append(inboxEmailRow);
        $(phoneElements.emailContent).append(emailContentRow);
        $(phoneElements.subExitButtons).on("click", function(){
            $($(this).data("child-id")).hide();
            $($(this).data("parent-id")).hide();
            $($(this).data("target-id")).show();
        });
        phone.addNotification(phoneApps.email);
    },
    setTasks : function(){
        let currentDay = 3; //window.timeCode.weekDay;
        let weekDayCode = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //window.weekdaysCode
        $(weekDayCode).each(function(dayIndex, str){
            let uncompletedBadge = '';
            let completedBadge = '';
            let failedBadge = '';
            let dayDetailDiv = $('<div id="' + str.substring(0, 3) + '" class="day-detail">').html('<h1>' + str + '</h1><ul></ul>');
            $(window.activeTasks).each(function(index, obj){
               if(((obj.startDay + obj.maxDays) < 6 ? (obj.startDay + obj.maxDays) : false) == dayIndex) {
                   let li = '';
                   switch (obj.status) {
                       case 1:
                           li = '<li class="uncompleted">' + obj.text.checkMe.given + '<div>&#x2610;</div></li>';
                           uncompletedBadge = '<span class="badge uncompleted-bg "></span>';
                           break;
                       case 2:
                           li = '<li class="completed">' + obj.text.checkMe.given + '<div>&#x1F5F9;</div></li>';
                           completedBadge = '<span class="badge completed-bg "></span>';
                           break;
                       case 3:
                           li = '<li class="failed">' + obj.text.checkMe.given + '<div>&#x1F5F7;</div></li>';
                           failedBadge = '<span class="badge failed-bg "></span>';
                           break;
                   }
                   console.log(dayDetailDiv);
                   $(dayDetailDiv).find("ul").append(li);
               }
               if(dayIndex >= currentDay)
                    $(phoneElements.plannerDayDetails).append(dayDetailDiv);
            });
            let day = $('<a class="no-style" href="#'+ str.substring(0,3) +'">').html('<div class="day pointer ' + (dayIndex < currentDay ? 'disabled-day' : (dayIndex == currentDay ? 'selected-day' : '')) + '"><label>' + str.substring(0,3) + '</label><div class="badge-row">' +
                (uncompletedBadge + completedBadge + failedBadge) + '</div></div>');
            $(phoneElements.plannerWeekOne).append(day);
        });
        $(weekDayCode).each(function(dayIndex, str){
            let uncompletedBadge = '';
            let completedBadge = '';
            let failedBadge = '';
            let dayDetailDiv = $('<div id="' + str.substring(0, 3) + '" class="day-detail">').html('<h1>' + str + '</h1><ul></ul>');
            $(window.activeTasks).each(function(index, obj){
                if((obj.startDay + obj.maxDays) == 7) {
                    let li = '';
                    switch (obj.status) {
                        case 1:
                            li = '<li class="uncompleted">' + obj.text.checkMe.given + '<div>&#x2610;</div></li>';
                            uncompletedBadge = '<span class="badge uncompleted-bg "></span>';
                            break;
                        case 2:
                            li = '<li class="completed">' + obj.text.checkMe.given + '<div>&#x1F5F9;</div></li>';
                            completedBadge = '<span class="badge completed-bg "></span>';
                            break;
                        case 3:
                            li = '<li class="failed">' + obj.text.checkMe.given + '<div>&#x1F5F7;</div></li>';
                            failedBadge = '<span class="badge failed-bg "></span>';
                            break;
                    }
                    console.log(dayDetailDiv);
                    $(dayDetailDiv).find("ul").append(li);
                }
                if(dayIndex == 0)
                    $(phoneElements.plannerDayDetails).append(dayDetailDiv);
            });
            let day = $('<a class="no-style" href="#'+ str.substring(0,3) +'">').html('<div class="day pointer ' + (dayIndex == 0 ? (currentDay == 0 ? 'disabled-day' : ''): 'disabled-day') + '"><label>' + str.substring(0,3) + '</label><div class="badge-row"></div></div>');
            $(phoneElements.plannerWeekTwo).append(day);
        });
    },
    clearTasks : function() {
        $(phoneElements.plannerWeekOne).html("");
        $(phoneElements.plannerWeekTwo).html("");
        $(phoneElements.plannerDayDetails).html("");
    },
    loadSnapConvos : function() {
        for(var i = 0; i < Object.keys(window.phoneChatSetups).length; i++){
            var phoneChatSetup = Object.values(window.phoneChatSetups)[i];
            var localPhoneChats = [];
            phoneChatSetup.forEach(function(item){
                var localPhoneChat = {};
                localPhoneChat.contact = phoneContacts[item.contact];
                localPhoneChat.content = item.content;
                localPhoneChat.imagePath = item.imagePath;
                localPhoneChat.choiceFunc = phoneChatFunctions[item.choiceFunc];
                localPhoneChats.push(localPhoneChat);
            });
            window.phoneChats[Object.keys(window.phoneChatSetups)[i]] = localPhoneChats;
        }
    }
};

//MACROS

macros.ShowChat = {
    handler: function(place, macroName, params, parser) {
        if(params.length == 0){
            return this.error("ShowChat needs at least one argument");
        }
        window.phone.setupPhone();
        window.phone.clearSnapText();
        var convoName = params[0];
        console.log(convoName);
        var convo = window.phoneChats[convoName];
        console.log(convo);
        phone.openPhoneModal();
        phone.navigateTo(phoneScreens.snaptext);
        phone.addSnapTextConvo(convo);
    }
}

macros.IncomingPhoneCall = {
    handler: function(place, macroName, params, parser){
        if(params.length == 0){
            return this.error("ShowChat needs at least one argument");
        }
        window.phone.setupPhone();
        var caller = phoneContacts[params[0]];
        var answerPassage = params[1];
        var declinePassage = params[2];
        var canDecline = params[3];

        phone.incomingCall(caller);
        
        if(canDecline){
            $(phoneElements.callCancelButton).off( "click" ).on("click", function() {
                phone.declineCall();
                Engine.play(declinePassage);
            });
        }
        else {
            $(phoneElements.callCancelButton).off( "click" );
            $(phoneElements.callCancelButton).parent().addClass("tooltip");
            $(phoneElements.callCancelButton).parent().append('<span id="test_dcln_phone_btn" class="tooltiptext">Best not decline this call</span>');
            //<div class="tooltip">@@.halftransparent;<<print _description>>@@ <span id="test_surv" class="tooltiptext"><<print _reason>></span></div>\
        }

        $(phoneElements.callConfirmButton).off( "click" ).on("click", function(){
            phone.acceptCall();
            Engine.play(answerPassage);
        });
    }
}

//FOR TESTING
// State.active.variables.tasksTeacher
window.activeTasks = [ {	// perv 2
        id: "trialChastity",
        name:"Task Trial chastity",
        hasPassage: true,
        text: {
            given: "I am not unreasonable. The items you will need are not cheap, so I will help you out. One of my friends has informed me there is an adult toy company undertaking some form of market research. You can inquire about it at the local adult store. I will put in a call to my friend for you later, just in case.",
            perform: "",
            finish: "$teacher smiles, looking smug, and you blush furiously knowing the reason.\n\n@@.teacher;\"I heard from my friend about your results. It was fascinating to hear just how much my advice helped you.@@",
            fail: "Hmm. You chose not to participate in the market research? It's your loss alone if you refuse my help. Take a mark.",
            reminder: "I hope you're going to be very thorough at my tasks.",
            checkMe: {
                given: "to check a market research at local adult store.",
                finish: "You did it.",
                fail: "",
                reminder: "You haven't done it yet."
            }
        },
        Conditions: function() {
            return true;
        },
        image: "",
        startPriority: 2,  // see priority system above
        canStart: false,  // only if true can this task be picked
        canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
        perversion: {
            teacher:	{ min: 2, max: 2 },
            therapist:	{ min: 0, max: 10 },
            guardian:	{ min: 0, max: 10 }
        },
        chance: 10,
        status: 1,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
        progress: 0,  // for progressing scenes
        startDay: 1,  // day task was started
        maxDays: 4,  // number of days allowed before task will fail
        cooldown: 1,  // number of days before task available again
        rewardMoney: 40,
        rewardDebt: 0,
        failPenalty: 0,
        events: {
            start: function() {},
            finish: function() { return true; },
            success: function() {},
            fail: function() { return false; }
        }
    },{	// perv 3-4, cross 0-1
        id: "selfieNightwear",
        name:"Task Nightwear selfie",
        hasPassage: true,
        text: {
            given: "I have a special task for you today. Take a selfie while wearing sexy nightwear that shows your chastity cage.",
            perform: "",
            finish: "$teacher sends a copy of your sexy-nightwear selfie to her phone.\n\n@@.teacher;\"I think I'll keep this one.@@",
            fail: "Is it so hard to take a simple selfie? Such a disappointment. Take a mark for your lack of effort.",
            reminder: "Don't forget to take the selfie I was talking about.",
            checkMe: {
                given: "take a selfie while wearing a sexy nightie.",
                finish: "You did it.",
                fail: "",
                reminder: "You haven't done it yet."
            }
        },
        Conditions: function() {
            return true;
        },
        image: "",
        startPriority: 1,  // see priority system above
        canStart: true,  // only if true can this task be picked
        canStartDays: [1,2,3,4,5],  // weekday array when task can be picked
        perversion: {
            teacher:	{ min: 3, max: 10 },
            therapist:	{ min: 0, max: 10 },
            guardian:	{ min: 1, max: 10 }
        },
        chance: 20,
        status: 2,  // 0=Not Assigned, 1=Assigned, 2=Succeed, 3=Fail.
        progress: 0,  // for progressing scenes
        startDay: 1,  // day task was started
        maxDays: 4,  // number of days allowed before task will fail
        cooldown: 7,  // number of days before task available again
        rewardMoney: 0,
        rewardDebt: 50,
        failPenalty: 1,
        events: {
            start: function() {},
            finish: function() { return true; },
            success: function() {},
            fail: function() { return false; }
        }
    }]

// State.active.variables.tasksEmail
window.tasksEmail= {
    PinkRollers: {
        id: "PinkRollers",
        name: "PinkRollers",
        sender: "",
        hasPassage: true,
        PassageName: "Email links",
        PassageRepeat: true,
        AllowInbox: true,
        text: {
            given: "Special request",
            perform: "Hello. I have a special request. If you would send me a video of yourself playing with a dildo wearing pink rollerskates, I'll give you $50.\n\nThanks",
        },
        Conditions: function () {
            return true;
        },
        image: "",
        startPriority: 10,  // see priority system above
        canStart: true,  // only if true can this task be picked
        canStartDays: [1, 2, 3, 4, 5, 6, 7],  // weekday array when task can be picked
        perversion: {
            teacher: {min: 0, max: 10},
            therapist: {min: 0, max: 10},
            guardian: {min: 4, max: 4}
        },
        chance: 5,
        status: 0,  // 0=Not Assigned, 1=Assigned, 2=Read, 3=Done.
        progress: 0,  // for progressing scenes
        startDay: 0,  // day task was started
        maxDays: 5,  // number of days allowed before task will fail
        cooldown: 5,  // number of days before task available again
        rewardMoney: 50,
        rewardDebt: 0,
        failPenalty: 1,
        events: {
            start: function () {
            },
            finish: function () {
                return true;
            },
            success: function () {
            },
            fail: function () {
                return false;
            }
        }
    },
    WebcamDildoAss: {
        id: "WebcamDildoAss",
        name:"WebcamDildoAss",
        sender: "",
        hasPassage: true,
        PassageName: "Email links",
        PassageRepeat: true,
        AllowInbox: true,
        text: {
            given: "Request for a video of dildo play",
            perform: "Hello. Show me what a good sissy you are. Film yourself fucking a dildo on camera. Reward will be $10. Oh, and do it while being locked in chastity.\n\nThanks",
        },
        Conditions: function() {
            return true;
        },
        image: "",
        startPriority: 0,  // see priority system above
        canStart: true,  // only if true can this task be picked
        canStartDays: [1,2,3,4,5,6,7],  // weekday array when task can be picked
        perversion: {
            teacher:	{ min: 0, max: 10 },
            therapist:	{ min: 0, max: 10 },
            guardian:	{ min: 0, max: 10 }
        },
        chance: 10,
        status: 0,  // 0=Not Assigned, 1=Assigned, 2=Read, 3=Done.
        progress: 0,  // for progressing scenes
        startDay: 0,  // day task was started
        maxDays: 5,  // number of days allowed before task will fail
        cooldown: 3,  // number of days before task available again
        rewardMoney: 10,
        rewardDebt: 0,
        failPenalty: 1,
        events: {
            start: function() {},
            finish: function() { return true; },
            success: function() {},
            fail: function() { return false; }
        }
    }
};