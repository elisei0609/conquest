$('document').ready(function () {
    loadGoods();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '';
        var goods = document.getElementById('goods');
        for (var key in data) {
            out += '<a href="#" class="catalog-items-item" data-index="' + data[key]['data-index'] + '" data-cost="' +
                data[key]['cost'].replace(/\s+/g, '') + '" data-priority="' + data[key]['priority'] + '">';
            out += '<div class="catalog-items-container">';
            out += '<div class="catalog-items__name">';
            out += '<h3 class="catalog-items__brand">' + data[key]['name'] + '</h3>';
            out += '<p class="catalog-items__price">' + data[key]['cost'] + ' ₽' + '</p>';
            out += '</div>';
            out += '<div class="catalog-items-social">';
            out += '<button class="catalog-social__svg like">';
            out += '<svg width="21" height="18" viewBox="0 0 21 18">';
            out += '<use xlink:href="#love-svg">';
            out += '</use>';
            out += '</svg>';
            out += '</button>';
            out += '<button class="catalog-social__svg elem">'
            out += '<svg width="18" height="16" viewBox="0 0 18 16">';
            out += '<use xlink:href="#box-svg">';
            out += '</use>';
            out += '</svg>';
            out += '</button>';
            out += '</div>';
            out += '<img src="' + data[key].image + '"  alt="techne" class="catalog-items__img">';
            out += '</div>';
            out += '</div>';
            out += '</a>';
        }
        goods.innerHTML = out;
    })
};


$('#techne').on('click', () => {
    $('[data-index = "techne"]').toggleClass('hide');
});

$('#rado').on('click', () => {
    $('[data-index = "rado"]').toggleClass('hide');
});

$('#blvgardi').on('click', () => {
    $('[data-index = "blvgardi"]').toggleClass('hide');
});

(function () {
    document.getElementById('catalog-select').addEventListener("change", function () {
        if (this.value == 'popular') {
            popularSort()
        }
        if (this.value == 'max') {
            expensiveSort()
        }
        if (this.value == 'min') {
            cheapSort()
        }
    })
})();
(function () {
    document.getElementById('catalog-select_min').addEventListener("change", function () {
        if (this.value == 'popular') {
            popularSort()
        }
        if (this.value == 'max') {
            expensiveSort()
        }
        if (this.value == 'min') {
            cheapSort()
        }
    })
})();


function expensiveSort() {
    var arr = makeArr();
    arr.sort(function (a, b) {
        return +b.dataset.cost - +a.dataset.cost;
    })
    var output = '';
    for (var i = 0; i < arr.length; i++) {
        output += arr[i].outerHTML;
    }
    document.getElementById('goods').innerHTML = output;
}

function cheapSort() {
    var arr = makeArr();
    arr.sort(function (a, b) {
        return +a.dataset.cost - +b.dataset.cost;
    })
    var output = '';
    for (var i = 0; i < arr.length; i++) {
        output += arr[i].outerHTML;
    }
    document.getElementById('goods').innerHTML = output;
}

function popularSort() {
    var arr = makeArr();
    arr.sort(function (a, b) {
        return +a.dataset.priority - +b.dataset.priority;
    })
    var output = '';
    for (var i = 0; i < arr.length; i++) {
        output += arr[i].outerHTML;
    }
    document.getElementById('goods').innerHTML = output;
}

function makeArr() {
    let goods = document.querySelectorAll('.catalog-items-item');
    let arr = [];
    for (var i = 0; i < goods.length; i++) {
        arr.push(goods[i]);
    }
    return (arr)
}

// (function () {
//     var b = document.getElementsByClassName('like')
//     console.log(b)
//     for (var i = 0; i < b.length; i++) {
//         b[i].addEventListener('click', function () {
//             b[i].classList.toggle('redFill')
//         })
//     }
  
// })();

(function () {
    document.getElementById('filter').addEventListener('click', function () {
        document.getElementById('filter-block').classList.toggle('show')
    })

})()
function hide() {

}