
const $msgForm = $("#msg-form")
const $msgInput= $("#msg-input")
const $chatBox = $("#chatbox")
const $clearChat = $(".clear")


$msgForm.on("submit", e => {
    e.preventDefault()
    appendMsg($msgInput.val())
    $msgInput.val("")
})

$clearChat.on("click", () => {
    $chatBox.html("");
})

function appendMsg(msg) {
    const $msgElement = $("<div>", {id:"mymsg"})
    const currentdate = new Date();
    const datetime = ("0"+currentdate.getDate()).slice(-2) + "/"
    + ("0"+(currentdate.getMonth()+1)).slice(-2)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + ("0"+currentdate.getHours()).slice(-2) + ":"  
    + ("0"+currentdate.getMinutes()).slice(-2)

    $chatBox.append($msgElement.html(`You: ${msg} <span id="dt">sent ${datetime}</span>`))
    // scroll to the bottom of div - https://stackoverflow.com/questions/10503606/scroll-to-bottom-of-div-on-page-load-jquery
    $chatBox.animate({
        scrollTop: $chatBox[0].scrollHeight - $chatBox[0].clientHeight
    },0)

    const $botMsg = $("<div>", {id:"botmsg"})
    let botRes = botResponse(msg)

    // set delay to the bot message
    setTimeout(() => {
        $chatBox.append($botMsg.html(`Bot: ${botRes} <span id="dt">sent ${datetime}</span>`))
        $chatBox.animate({
            scrollTop: $chatBox[0].scrollHeight - $chatBox[0].clientHeight
        },0)
    },1000)
}

// code modified from https://dev.to/sylviapap/make-a-simple-chatbot-with-javascript-1gc
function botResponse(msg) {
    // structure the msg string
    let str = msg.toLowerCase().replace(/[^\w\s\d]/gi, "");
    str =  str
        .replace(/ a /g, " ")
        .replace(/whats/g, "what is")
        .replace(/please/g, "")
        .replace(/ please/g, "")
        .replace(/ too/g, "")
    //create sample user message
    let usermsg = [
        ["how are you", "how is life", "hows things", "how do you do", "how have you been", "how are you doing"],
        ["hi", "hey", "hello", "good morning", "good afternoon", "good day"],
        ["what is your name", "who are you"],
        ["where do you live","where are you"],
        ["im fine thanks", "im good here thanks","pretty good thanks","good thanks","fine", "fine too thanks", "im good thanks","im good thank you"],
        ["im sad","i feel bad","bad day","not good"]
    ]
    // create sample bot responses
    let response = [
        ["I'm fine, thank you! How about you?","Good, how about you?", "Pretty good, thank you. How about you?", "Very good, hope you are well too", "I'm fine, thanks. How about you?"],
        ["Hi","Hey","Hello","Good day"],
        ["I am a bot"],
        ["I live in your browser."],
        ["Good to hear that"],
        ["Go for a holiday. You will feel better","Go for a walk. You will feel better"]
    ]

    let unmatch = [
        ["I'm sorry I don't understand. Please try again."]
    ]

    let res;

    for (let i=0; i<= usermsg.length-1; i++) {
        for (let j=0; j<= usermsg[i].length-1; j++) {
            if(usermsg[i][j]==str) {
                res= response[i][Math.floor(Math.random()*response[i].length)]
            } 
        }
    }
    if(res != undefined || res != null) {
        return res;
    } else {
        return unmatch;
    }
}

