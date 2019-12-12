"use strict";
var myName = "";
var myConnectionId = "";
var isLogin = false;

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("join").disabled = true;

connection.on("RecieveMessage", function (name, message) {
    let messagewrapper = document.getElementById("MessagesList");
    let li = document.createElement("li");
    li.append(name + " : " + message);
    messagewrapper.appendChild(li);
});

connection.on("RecievePvMessage", function (senderConnectionId, name, message) {
    let messagewrapper = document.getElementById("ml-" + senderConnectionId);
    
    let li = document.createElement("li");
    li.append(name + " : " + message);
    messagewrapper.appendChild(li);
});

connection.on("refreshusers", function (users) {
    if (isLogin) {
        createUserList("UserList", users);
        createchatroom("MainChatWrapper");
    }
});


connection.on("createOrOpenPv", function (userName, connectionId) {
    createOrShowPV(userName, connectionId);
});

connection.on("setConnectionDd", function (connectionId) {
    myConnectionId = connectionId;
});

connection.start().then(function () {
    document.getElementById("join").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("join").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    myName = user;
    isLogin = true;
    connection.invoke("JoinChat", user).catch(function (err) {
        isLogin = false;
        return console.error(err.toString());
    });
    event.preventDefault();

    document.getElementById("start-chat").remove();
});

function chatWithAnother(username, connectionId) {
    createOrShowPV(username, connectionId);
    connection.invoke("StartPrivateChat", myName, username, connectionId)
        .catch(function (err) {
            return console.error(err.toString());
        });
}


function createOrShowPV(username, connectionId) {
    var tab = document.getElementById("tab-" + connectionId);
    if (tab) {
        //selectPv(tab, connectionId);
        alert("چت خصوصی شما با " + username + " ایجاد شده است");
    } else {
        createPV(username, connectionId);
    }
}


function createPV(username, connectionId) {
    var tabs = document.getElementById("chatroomTabs");
    var tabsContent = document.getElementById("chatroomTabsContent");

    //Create Tab
    var li = document.createElement("li");
    li.className = "nav-item";
    var a = document.createElement("a");
    a.className = "nav-link";
    a.id = "tab-" + connectionId;
    a.setAttribute("data-toggle", "tab");
    a.setAttribute("role", "tab");
    a.setAttribute("aria-controls", "profile");
    a.setAttribute("aria-selected", "false");
    a.href = "#" + connectionId;
    a.innerHTML = username;
    li.appendChild(a);
    tabs.appendChild(li);

    //Create TabContent
    //<div class="tab-pane text-right fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">اینم یه متن تستی هستنش ک من خیلی دوست دارم الکی ازش استفاده کنم</div>
    //<div   >اینم یه متن تستی هستنش ک من خیلی دوست دارم الکی ازش استفاده کنم اینم یه متن تستی هستنش ک من خیلی دوست دارم الکی ازش استفاده کنم</div>
    var div = document.createElement("div");
    div.className = "tab-pane text-right fade";
    div.id = connectionId;
    div.setAttribute("role", "tabpanel");
    div.innerHTML = "اینجا پی وی شما و " + username + " است";
    tabsContent.appendChild(div);
    createpvchatroom(div.id, connectionId);

}

function selectPv(tab, connectionId) {
    var tabs = document.getElementById("chatroomTabs");
    for (let i = 0; i < tabs.childElementCount; i++) {
        let a = tabs.children[i].children.item(0);
        a.className = "nav-link";
        a.setAttribute("aria-selected", "false");
    }
    tab.className = "nav-link active";
    tab.setAttribute("aria-selected", "true");

    var tabsContent = document.getElementById("chatroomTabsContent");
    for (let i = 0; i < tabsContent.childElementCount; i++) {
        let div = tabs.children[i];
        div.className -= " show active";
    }
    let div = document.getElementById(connectionId);
    div.className += " show active";
}



function sendToAllBy() {
    let message = document.getElementById("input-global-room").value;
    document.getElementById("input-global-room").value="";
    connection.invoke("SendToAll", myName, message)
        .catch(function (err) {
            document.getElementById("input-global-room").value = message;
            return console.error(err.toString());
        });
}
//onclick="sendToPv('JKOxf2c7U8eB5SCZEVfTzQ','محسن','input-pv-JKOxf2c7U8eB5SCZEVfTzQ')"
function sendToPv(connectionId, senderName, inputid) {
    let message = document.getElementById(inputid).value;
    document.getElementById(inputid).value = "";



    connection.invoke("SendToPv", connectionId, senderName, message)
        .catch(function (err) {
            document.getElementById(senderName).value = message;
            return console.error(err.toString());
        });
}


