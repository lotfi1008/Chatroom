
function createchatroom(wrapperId) {

    let wrapper = document.getElementById(wrapperId);
    if (wrapper.childElementCount > 0) {
        return;
    }
    // card 
    let card = document.createElement("div");
    card.className = "card mt-3";

    let card_body = document.createElement("div");
    card_body.className = "card-body";

    let card_title = document.createElement("h5");
    card_title.className = "card-title";
    card_title.append("لیست پیام ها");
    card_body.appendChild(card_title);

    
    let chat_messages = document.createElement("ul");
    chat_messages.className = "chat-messages";
    chat_messages.id = "MessagesList";
    card_body.appendChild(chat_messages);
    card.appendChild(card_body);
    wrapper.appendChild(card);

    let div = document.createElement("div");
    div.className = "d-flex mt-3";

    let input = document.createElement("input");
    input.type = "text";
    input.id = "input-global-room";
    input.className = "form-control";
    div.appendChild(input);

    let a = document.createElement("a");
    a.className = "btn btn-primary text-white mr-1";
    a.append("ارسال");
    a.setAttribute("onclick", "sendToAllBy()");
    div.appendChild(a);
    wrapper.appendChild(div);
}

function createpvchatroom(wrapperId,connectionId) {

    let wrapper = document.getElementById(wrapperId);
    if (wrapper.childElementCount > 0) {
        return;
    }
    // card 
    let card = document.createElement("div");
    card.className = "card mt-3";

    let card_body = document.createElement("div");
    card_body.className = "card-body";

    let card_title = document.createElement("h5");
    card_title.className = "card-title";
    card_title.append("لیست پیام ها");
    card_body.appendChild(card_title);


    let chat_messages = document.createElement("ul");
    chat_messages.className = "chat-messages";
    chat_messages.id = "ml-" + connectionId;
    card_body.appendChild(chat_messages);
    card.appendChild(card_body);
    wrapper.appendChild(card);

    let div = document.createElement("div");
    div.className = "d-flex mt-3";

    let input = document.createElement("input");
    input.type = "text";
    input.id = "input-pv-" + connectionId;
    input.className = "form-control";
    div.appendChild(input);

    let a = document.createElement("a");
    a.className = "btn btn-primary text-white mr-1";
    a.append("ارسال");
    a.setAttribute("onclick", "sendToPv('" + connectionId + "','" + myName + "','" + input.id + "')");
    div.appendChild(a);
    wrapper.appendChild(div);
}


function createUserList(wrapperId,users) {
    document.getElementById(wrapperId).innerHTML = "";
    users.forEach(function (item, index, array) {
        var li = document.createElement("li");
        if (item.connectionId === myConnectionId) {
            li.className += "btn btn-danger m-1 user-danger";
        } else {
            li.className += "btn btn-info m-1 user-btn";
            li.onclick = function () {
                chatWithAnother(item.userName, item.connectionId);
            };
        }
        li.id = item.connectionId;
        li.textContent = item.userName;
        document.getElementById(wrapperId).appendChild(li);
    });
}