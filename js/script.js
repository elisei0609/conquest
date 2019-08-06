$('document').ready(function(){
   loadGoods();
});

function loadGoods() {
   //загружаю товары на страницу
   $.getJSON('goods.json', function (data) {
       //console.log(data);
       var out = '';
       for (var key in data){
           out+= '<a href="#" class="catalog-items-item">';
           out+= '<div class="catalog-items-container">';
           out+= '<div class="catalog-items__name">';
           out+= '<h3 class="catalog-items__brand">' + data[key]['name'] + '</h3>';
           out+= '<p class="catalog-items__price">'+ data[key]['cost'] + '</p>';
           out+= '</div>';
           out+= '<div class="catalog-items-social">';
           out+= '<button class="catalog-social__svg like">';
           out+= '<svg width="21" height="18" viewBox="0 0 21 18">';
           out+= '<use xlink:href="#love-svg">';
           out+= '</use>';
           out+= '</svg>';
           out+= '</button>';
           out+= '<button class="catalog-social__svg elem">'
           out+= '<svg width="18" height="16" viewBox="0 0 18 16">';
           out+= '<use xlink:href="#box-svg">';
           out+= '</use>';
           out+= '</svg>';
           out+= '</button>';
           out+= '</div>';
           out+= '<img src="'+data[key].image+'"  alt="techne" class="catalog-items__img">';
           out+= '</div>';
           out+= '</div>';
           out+= '</a>';
           
       }
       $('#goods').html(out);
   })
}