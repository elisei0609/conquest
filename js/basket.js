document.addEventListener('DOMContentLoaded', function () {
   var request = new XMLHttpRequest();
   request.open('GET', 'goods.json');
   request.responseType = 'json';
   request.send();
   request.onload = function () {
       var superHeroes = request.response;

   }
})

