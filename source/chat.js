        var sendButton;

        inject();

        function inject() {
            var existingDiv = document.querySelector('.chatcode');
            if (existingDiv) {
                return;
            }

            var div = document.createElement('div');
            div.classList.add('chatcode');
            div.innerHTML = `
                <input type="text" name="text" placeholder="Text">
                <input type="text" name="name" placeholder="Name">
                <button onclick="sendData()">Send</button>
            `;

            var chatlist = document.querySelector('.chatsend');
            chatlist.appendChild(div);

            sendButton = document.querySelector('.chatcode button');
        }

        function Getchat() {
            var gasUrl = 'https://script.google.com/macros/s/AKfycbwfPglE22DreTD3X6s69WdOV3mh3C71a9DSyZLuR3YAz74ADc3b8EyCCJDfc1OogeUt/exec';
            var url = gasUrl + '?id=' + idValue; 
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    displayChat(data);
                } else if (xhr.readyState === 4 && xhr.status !== 200) {
                    console.error('Error:', xhr.status);
                }
            };
            xhr.send();
        }

        function displayChat(data) {
            var chatDiv = document.querySelector('.chatlist');
            
            chatDiv.innerHTML = '';
            data.forEach(chat => {
                var chatItem = document.createElement('div');
                chatItem.classList.add('chat-item');

                var chatText = document.createElement('p');
                var date = new Date(chat['時間']);
                var formattedDate = date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
                chatText.textContent = formattedDate + ' - ' + chat['名前'] + ': ' + chat['テキスト'];

                chatItem.appendChild(chatText);
                chatDiv.appendChild(chatItem);
            });
        }

        function sendData() {
            sendButton.disabled = true;

            var textValue = document.querySelector('.chatcode input[name="text"]').value;
            var nameValue = document.querySelector('.chatcode input[name="name"]').value;

            var url = 'https://script.google.com/macros/s/AKfycbz8aVrqSX4L6aAE8NP2Q96sSRAISbo16e4e6jNo4wYyzVLbm2t4HpEdV8h7mRhnJW7IEA/exec' + '?id=' + encodeURIComponent(idValue) + '&text=' + encodeURIComponent(textValue) + '&name=' + encodeURIComponent(nameValue);
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.text(); // テキスト形式のデータを取得
  })
  .then(data => {
    // データを表示するための処理
    console.log(data); // 取得したデータをコンソールに表示

    var successMsg = document.createElement('p');
    successMsg.textContent = data; // データをそのまま表示
    document.querySelector('.chatcode').appendChild(successMsg);
    setTimeout(() => {
      successMsg.remove();
    }, 2000);
    
    Getchat(); // チャットを更新
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    sendButton.disabled = false;
  });


        }

        setInterval(function() {
            Getchat();
        }, 10000);

        Getchat();
