$('document').ready(function () {
    loadGoods();
});


function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json',
        function (data) {
            var out = '';
            var bands = '';
            var goods = document.getElementById('goods');
            var bandsID = document.getElementById('bands');
            
            for (var key in data['items']) {
                out += '<a href="#" class="catalog-items-item" data-index="' + data['items'][key]['data-index'] + '" data-cost="' +
                    data['items'][key]['cost'].replace(/\s+/g, '') + '" data-priority="' + data['items'][key]['priority'] + '">';
                out += '<div class="catalog-items-container">';
                out += '<div class="catalog-items__name">';
                out += '<h3 class="catalog-items__brand">' + data['items'][key]['name'] + '</h3>';
                out += '<p class="catalog-items__price">' + data['items'][key]['cost'] + ' ₽' + '</p>';
                out += '</div>';
                out += '<div class="catalog-items-social">';
                out += '<button class="catalog-social__svg like">';
                out += '<svg class="svg-heart" width="21" height="18" viewBox="0 0 21 18">';
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
                out += '<img src="' + data['items'][key].image + '"  alt="techne" class="catalog-items__img">';
                out += '</div>';
                out += '</div>';
                out += '</a>';
            }
            
            for (var key in data['bands']) {
                bands += '<a href="#" class="bands-catalog-item" data-index="' + data['bands'][key]['data-index'] + '" data-cost="' +
                    data['bands'][key]['cost'].replace(/\s+/g, '') + '" data-priority="' + data['bands'][key]['priority'] + '">';
                bands += '<div class="bands-items-container">';
                bands += '<div class="bands-items__name">';
                bands += '<h3 class="bands-items__brand">' + data['bands'][key]['name'] + '</h3>';
                bands += '<p class="bands-items__price">' + data['bands'][key]['cost'] + ' ₽' + '</p>';
                bands += '</div>';
                bands += '<div class="bands-items-social">';
                bands += '<button class="bands-social__svg like">';
                bands += '<svg width="21" height="18" viewBox="0 0 21 18">';
                bands += '<use xlink:href="#love-svg">';
                bands += '</use>';
                bands += '</svg>';
                bands += '</button>';
                bands += '<button class="bands__svg elem">'
                bands += '<svg width="18" height="16" viewBox="0 0 18 16">';
                bands += '<use xlink:href="#box-svg">';
                bands += '</use>';
                bands += '</svg>';
                bands += '</button>';
                bands += '</div>';
                bands += '<img src="' + data['bands'][key].image + '"  alt="techne" class="bands-items__img">';
                bands += '</div>';
                bands += '</div>';
                bands += '</a>';
            }
            goods.innerHTML = out;
            bandsID.innerHTML = bands;


        },

    ).always(function () {
        let list = document.getElementById('goods');
        console.log(list);

        list.addEventListener('click', function (e) {
            e.preventDefault();
            let target = e.target;
            if (target.classList.contains('svg-heart'))
                toggleSvg(target)
        })
    });


};

// $('#techne').on('click', () => {
//     $('[data-index = "techne"]').toggleClass('hide');
// });

// $('#rado').on('click', () => {
//     $('[data-index = "rado"]').toggleClass('hide');
// });

// $('#blvgardi').on('click', () => {
//     $('[data-index = "blvgardi"]').toggleClass('hide');
// });



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
};

(function () {
    document.getElementById('filter').addEventListener('click', function () {
        document.getElementById('filter-block').classList.toggle('show')
    })

})();

(function () {
    let filter = document.getElementById('filter-block');
    filter.onclick = function (e) {
        let target = e.target;
        console.log(target);
        if (target.classList.contains('catalog-filter__button'))
            toggleFilterBtn(target);
            toggleSlider();
            toggleBrand();
    }
})();

function toggleSlider () {
    var btn = document.getElementById('filterBtn');
    var slider = document.getElementById('filterCost');
    if (btn.classList.contains('catalog-filter__button_active')) {
        slider.classList.remove('hide');
    } else {
        slider.classList.add('hide');
    }
};
function toggleBrand () {
    var btn = document.getElementById('brandBtn');
    var slider = document.getElementById('filterBrand');
    if (btn.classList.contains('catalog-filter__button_active')) {
        slider.classList.remove('hide');
    } else {
        slider.classList.add('hide');
    }
};

function toggleSvg(svg) {
    svg.classList.toggle('redFill');
};

function toggleFilterBtn(button) {
    button.classList.toggle('catalog-filter__button_active')
}