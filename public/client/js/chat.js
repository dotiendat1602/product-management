import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

var socket = io();

// CLIENT_SEND_MESSAGE
const formChat = document.querySelector(".chat .inner-form");
if(formChat) {
    formChat.addEventListener("submit", (event) => {
        event.preventDefault();

        const content = event.target.content.value;
        if(content) {
            socket.emit("CLIENT_SEND_MESSAGE", {
                content: content
            });
            event.target.content.value = "";
        }
    })
    // Có thể thêm đoạn SCROLL CHAT TO BOTTOM vào trong này để chỉ đẩy scroll
    // của người gửi xuống dưới
}
// END CLIENT_SEND_MESSAGE


// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    
    const div = document.createElement("div");
    let htmlFullName = "";

    if(data.userId == myId) {
        div.classList.add("inner-outgoing");
    } else {
        div.classList.add("inner-incoming");
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    }

    div.classList.add("inner-incoming");
    div.innerHTML = `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
    `;
    
    const body = document.querySelector(".chat .inner-body");
    body.appendChild(div);

    body.scrollTop = body.scrollHeight;
})
// END SERVER_RETURN_MESSAGE

// SCROLL CHAT TO BOTTOM
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// END SCROLL CHAT TO BOTTOM

// Show Icon Chat
const emojiPicker = document.querySelector("emoji-picker");
if(emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");

    emojiPicker.addEventListener("emoji-click", (event) => {
        const icon = event.detail.unicode;
        inputChat.value = inputChat.value + icon;
    })
}
// END Show Icon Chat

// Show Popup Icon
const buttonIcon = document.querySelector("[button-icon]");

if(buttonIcon) {
    const toolTip = document.querySelector(".tooltip");
    Popper.createPopper(buttonIcon, toolTip);

    buttonIcon.addEventListener("click", () => {
        toolTip.classList.toggle("shown");
    })
}
// End Show Popup Icon