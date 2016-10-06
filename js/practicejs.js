var responseElement = document.querySelector('.spanResponse');
var btnClick = document.querySelector('.btnClick');
var btnSearch = document.querySelector('.btnSearch');
var ulResults = document.querySelector('.ulResults');
var txtSearch = document.querySelector('.txtSearch');
var form = document.querySelector('.form');

btnClick.addEventListener('click',receiveJoke);
btnSearch.addEventListener('click',receiveQ);

form.addEventListener('submit',function(event){
  event.preventDefault();
  receiveQ();
});

//XMLHttpRequest to receive the Joke (used previously)
/*function receiveMessage(url){
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
}*/

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

function receiveJoke() {
  sendRequest({url:'http://api.icndb.com/jokes/random'}).then(function(response) {
    var jSONResponse =JSON.parse(response);
    responseElement.innerHTML = jSONResponse.value.joke;
  },function(error) {
    responseElement.style = "color: red;";
    responseElement.innerHTML = error;
  });
}

function receiveQ() {
  var url = "https://api.github.com/search/repositories?q='q=" + txtSearch.value + "'";
  sendRequest({url:url}).then(function(response) {
    var jSONResponse =JSON.parse(response);
    publishResults(jSONResponse);
  },function(error) {
    console.error();
  });
}

function publishResults(response) {
  var length = response.items.length;
  var items = [];
  for(i = 0; i < length; i++) {
    items.push(response.items[i].full_name);
  }
  var names = '<ul><li>' + items.join('</li><li>') + '</li></ul>';
  ulResults.innerHTML = names;
}

receiveJoke();

//EXERCISE 12
var matrix = [
  [['TITLE'],['GENRE'],['IMDB'],['YEAR']],
  [['The Shawshank Redemption'],['Crime/Drama'],['9,2'],['1994']],
  [['The Godfather'],['Crime/Drama'],['9,2'],['1972']],
  [['The Godfather II'],['Crime/Drama'],['9,0'],['1974']],
  [['The Dark Knight'],['Action'],['9,0'],['2008']],
  [['Schindlers List'],['Drama'],['8,9'],['1993']],
  [['Inception'],['Sci-Fi'],['8,8'],['2010']]
];

var divTable = document.querySelector('.divTable');
var table = document.createElement("table");
var tr;
var td;
var text;

for(i = 0; i < matrix.length; i++) {
  tr = document.createElement("tr");
  for(j = 0; j < matrix[i].length; j++) {
    td = document.createElement("td");
    text = document.createTextNode(matrix[i][j]);
    td.appendChild(text);
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
divTable.appendChild(table);
