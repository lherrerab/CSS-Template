//XMLHttpRequest to receive the Joke (used previously)
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

//Using a Promise with an object as Parameter
function sendRequest(conf) {
    return new Promise(function(resolve, reject) {
      var xmlRequest = new XMLHttpRequest();
      xmlRequest.open('GET', conf.url);

      xmlRequest.onload = function() {
        if(xmlRequest.status == 200) {
          resolve(xmlRequest.response);
        }
        else {
          reject(Error(xmlRequest.statusText));
        }
      };

      xmlRequest.onerror = function() {
        reject(Error("Network Error"));
      };

      xmlRequest.send();
    });
}

var responseElement = document.getElementById('spanResponse');
var btnClick = document.querySelector('.btnClick');

btnClick.addEventListener('click',receiveJoke);

function receiveJoke(){
  sendRequest({url:'http://api.icndb.com/jokes/random'}).then(function(response) {
    jSONResponse =JSON.parse(response);
    responseElement.innerHTML = jSONResponse.value.joke;
  },function(error) {
    responseElement.style = "color: red;";
    responseElement.innerHTML = error;
  });
}

function receiveQ(){
  sendRequest({url:"https://api.github.com/search/repositories?q='JavaScript'"}).then(function(response) {
    jSONResponse =JSON.parse(response);
    console.log(response);
  },function(error) {
    console.error();
  });
}

receiveJoke();
