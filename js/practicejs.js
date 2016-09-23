function receiveMessage(url){
  var xmlRequest = new XMLHttpRequest();
  var spanResponse = document.getElementById('spanResponse');
  var xmlResponse;
  xmlRequest.open('GET', url, true);
  xmlRequest.onreadystatechange = function (aEvt) {
  if (xmlRequest.readyState == 4 && xmlRequest.status == 200){
      xmlResponse =JSON.parse(xmlRequest.responseText);
      spanResponse.innerHTML = xmlResponse.value.joke;
      console.log(xmlResponse);
    }
  };
  xmlRequest.send(null);
}

function writeMessage(){
  var xmlResponse = receiveMessage('http://api.icndb.com/jokes/random');
}
