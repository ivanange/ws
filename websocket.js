URL = 'ws://34.194.252.60:4444';
//URL = 'wss://echo.websocket.org/';
outputDiv = document.getElementById('output');
form = document.forms[0];
connection = new WebSocket(URL);

connection.addEventListener('open', () => {
    output('CONNECTED', true);
}, false);

function output(message, server) {
    var para = document.createElement('p');
    var clear = document.createElement('p');
    para.innerHTML = message;
    attrib = server ? 'server' : 'client';
    para.setAttribute('class', attrib);
    para.classList.add('message');
    clear.setAttribute('id', 'clear');
    outputDiv.appendChild(para);
    if (!server) outputDiv.appendChild(clear);
}

form.submit.addEventListener('click', message, false);
form.addEventListener('submit', message, false);

function message(event) {
    event.preventDefault();
    const text = form.message.value;
    form.message.value = "";
    output(text, false);
    connection.send(text);
}

connection.addEventListener('close',
    () => {
        output('DISCONNECTED', true);
    }, false);

connection.addEventListener('error',
    (event) => {
        output(`<span style='color: red;'>ERROR:${event.data}</span>`, true);
    }, false);

connection.addEventListener('message',
    (event) => {
        output(event.data, true);
    }, false);

if (window.Notification) {
    Notification.requestPermission().then((permission) => {
        if (permission == 'granted') {
            Notification.permission = permission;
            console.log(Notification.permission);
            notification = new Notification('Echo messaging using websocket', {
                body: 'try sending some mesaages and watch how its sent back to you',
                icon: 'Flickr-1.4s-200px.gif'
            });
        }
    });
}
