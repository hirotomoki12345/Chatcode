const idValue = chatid; // your ids
fetch('https://raw.githubusercontent.com/hirotomoki12345/Chatcode/main/source/chat.js')
    .then(response => response.text())
    .then(text => {
        eval(text);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
