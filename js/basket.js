document.addEventListener('DOMContentLoaded', function () {
   var request = new XMLHttpRequest();
   request.open('GET', 'goods.json');
   request.responseType = 'json';
   request.send();
   request.onload = function () {
      var superHeroes = request.response;
      sortingObj(superHeroes);
   }
})

function sortingObj(data) {
   var myObj = Object.assign({}, data);
   var arr = [];
   var sortedObj;
   var storage = {};
   var storageArr = [];
   var sendingArr = [];
   for (var key in localStorage) {
      storage[key] = localStorage[key]
   }

   for (var key in myObj['items']) {
      arr.push({
         items: myObj['items'][key]
      });
   }

   for (var key in storage) {
      if (typeof (storage[key]) == 'string') {
         storageArr.push(localStorage[key]);
      }
   }

   for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
         if (storageArr[j] == arr[i]['items']['priority']) {
            sendingArr.push(arr[i]['items'])
         }
      }
   }

   addingSortedGoods(sendingArr);
}

function addingSortedGoods(data) {
   var goods = document.getElementById('goods');
   var out = '';
   console.log(data)
   for (var i = 0; i < data.length; i++) {
      out += '<div class="checkout-cart__item" data-index="' + data[i]['data-index'] + '" data-cost="' +
         data[i]['cost'].replace(/\s+/g, '') + '" data-priority="' + data[i]['priority'] + '">';
      out += '<img src=" ' + data[i].image + ' " alt="watches" class="checkout-cart__img">';
      out += '<a class="checkout-cart__brand">' + data[i]['name'] + '</a>';
      out += '<div class="checkout-cart__buttons">';
      out += '<i id="buttonLeft" class="fas fa fa-minus disabled" disabled></i>';
      out += '<input type="text" class="checkout-cart__input" value="1">';
      out += '<i id="buttonRight" class="fas fa fa-plus"></i>';
      out += '</div>';
      out += '<p class="checkout-cart__price">' + data[i]['cost'] + ' ₴' + '</p>';
      out += '<button class="checkout-cart__delete">Удалить</button>';
      out += '</div>';
      out += '</div>';
      out += '</div>';

   }
   goods.innerHTML = out;
};