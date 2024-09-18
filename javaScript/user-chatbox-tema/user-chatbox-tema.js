const _listaMesaje = document.querySelector("#lista-mesaje");
const _textarea = document.querySelector("#newMessage");
const _submit = document.querySelector("#post");



// necesar modal
const modal = document.getElementById("authorModal");
const closeModalButton = document.getElementById("closeModal");
const submitAuthorButton = document.getElementById("submitAuthor");
let authorName = 'necunoscut';
// deschide modal la click
_submit.addEventListener('click', () => {
    modal.style.display = "block";
});
// inchide cu x
closeModalButton.addEventListener('click', () => {
    modal.style.display = "none";
});
// functie pt buton modal
submitAuthorButton.addEventListener('click', () => {
    authorName = document.getElementById("authorName").value || 'necunoscut';
    const textMesaj = _textarea.value;

    if (textMesaj.trim()) {
        fetchPostMessage(textMesaj, authorName);
        _textarea.value = '';
    }

    modal.style.display = "none";  // aici se inchide modal
});




function printMessages(array) {
    _listaMesaje.innerHTML = '';
    array.forEach(printMessage);
}

function printMessage(messageObject) {
    const _messageElement = document.createElement('div');
    const _authorElement = document.createElement('h5');
    const _messageTextElement = document.createElement('p');

    _messageElement.appendChild(_authorElement);
    _messageElement.appendChild(_messageTextElement);

    _authorElement.innerText = messageObject.author;
    _authorElement.innerHTML += `<span> @ ${messageObject.time}</span>`;

    _messageTextElement.innerText = messageObject.message;

    _listaMesaje.appendChild(_messageElement);
}

function fetchMessagesFromServer() {
    const promise = fetch('https://paulghiran.com/messages/');
    promise.then(r => r.json()).then(function (arrayDeMesaje) {
        printMessages(arrayDeMesaje)
    })
}

setInterval(fetchMessagesFromServer, 1000);

function fetchPostMessage(mesaj, autor = 'necunoscut') {
    const promise = fetch('https://paulghiran.com/messages/', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            author: autor,
            message: mesaj
        })
    });

    promise.then(response => response.json()).then(console.log);
}