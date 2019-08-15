document.addEventListener('DOMContentLoaded', function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'goods.json');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        var superHeroes = request.response;
        addingGoods(superHeroes);
        addingBands(superHeroes);
    }
    checkboxes();
    getLowerCost();
    getHigherCost();
    likeClicked();

    (function () {
        var min = document.getElementById('slider-filter');
        min.addEventListener('mouseup', function (e) {
            console.log('min change');
            var max = document.getElementById('amountMax').value;
            var min = document.getElementById('amountMin').value;
            var request = new XMLHttpRequest();
            request.open('GET', 'goods.json');
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var superHeroes = request.response;
                sortingObj(superHeroes, +min, +max)
            }
        })

    })();

    (function () {
        var min = document.getElementById('amountMin');
        min.addEventListener('change', function (e) {
            console.log('min change');
            var max = document.getElementById('amountMax').value;
            var min = document.getElementById('amountMin').value;
            var request = new XMLHttpRequest();
            request.open('GET', 'goods.json');
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var superHeroes = request.response;
                sortingObj(superHeroes, +min, +max)
            }
        })

    })();

    (function () {
        var max = document.getElementById('amountMax');
        max.addEventListener('change', function (e) {
            console.log('min change');
            var min = document.getElementById('amountMin').value;
            var max = document.getElementById('amountMax').value;
            var request = new XMLHttpRequest();
            request.open('GET', 'goods.json');
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var superHeroes = request.response;
                sortingObj(superHeroes, +min, +max)
            }
        })

    })();
});

$(function () {
    $("#slider-range").slider({
        range: true,
        min: 7200,
        max: 72700,
        values: [75, 100000],
        slide: function (event, ui) {
            $("#amountMin").val(ui.values[0]);
            $("#amountMax").val(ui.values[1]);
        }
    });
    $("#amountMin").val($("#slider-range").slider("values", 0));
    $("#amountMax").val($("#slider-range").slider("values", 1));

    $("input#amountMin").change(function () {
        var value1 = $("input#amountMin").val();
        var value2 = $("input#amountMax").val();
        if (parseInt(value1) > parseInt(value2)) {
            value1 = value2;
            $("input#amountMin").val(value1);
        }
        $('#slider-range').slider("values", 0, value1);
    });
    $("input#amountMax").change(function () {
        var value1 = $("input#amountMin").val();
        var value2 = $("input#amountMax").val();
        if (parseInt(value1) > parseInt(value2)) {
            value2 = value2;
            $("input#amountMax").val(value2);
        }
        $('#slider-range').slider("values", 1, value2);
    });

    jQuery('#amountMin, #amountMax').keypress(function (event) {
        var key, keyChar;
        if (!event) var event = window.event;

        if (event.keyCode) key = event.keyCode;
        else if (event.which) key = event.which;

        if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
        keyChar = String.fromCharCode(key);

        if (!/\d/.test(keyChar)) return false;
    })
});

function formSubmit() {
    document.getElementById('form').addEventListener('submit', function (e) {
        e.preventDefault()
    })
};
formSubmit();

function checkboxes() {
    var list = document.getElementById('filterBrand');
    list.addEventListener('change', function () {
        var arr = document.querySelectorAll('.catalog-items-item');
        arr = Array.prototype.slice.call(arr);
        arr.map(function (e) {
            e.classList.remove('show');
            e.classList.add('hide');
        });
        if (techne.checked) {
            arr.map(function (elem) {
                if (elem.dataset.index == 'techne') {
                    elem.classList.remove('hide');
                    elem.classList.add('show');
                }
            })
        }
        if (rado.checked) {
            arr.map(function (elem) {
                if (elem.dataset.index == 'rado') {
                    elem.classList.remove('hide');
                    elem.classList.add('show');
                }
            })
        }
        if (blvgardi.checked) {
            arr.map(function (elem) {
                if (elem.dataset.index == 'blvgardi') {
                    elem.classList.remove('hide');
                    elem.classList.add('show');
                }
            })
        }
        if (techne.checked == false && rado.checked == false && blvgardi.checked == false) {
            arr.map(function (e) {
                e.classList.remove('hide');
                e.classList.add('show');
            });
        }
    })
}

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
    var arr = document.querySelectorAll('.catalog-items-item');
    arr = Array.prototype.slice.call(arr);
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
    var arr = document.querySelectorAll('.catalog-items-item');
    arr = Array.prototype.slice.call(arr);
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
    var arr = document.querySelectorAll('.catalog-items-item');
    arr = Array.prototype.slice.call(arr);
    arr.sort(function (a, b) {
        return +a.dataset.priority - +b.dataset.priority;
    })
    var output = '';
    for (var i = 0; i < arr.length; i++) {
        output += arr[i].outerHTML;
    }
    document.getElementById('goods').innerHTML = output;
}

(function () {
    document.getElementById('filter').addEventListener('click', function () {
        document.getElementById('filter-block').classList.toggle('show')
    })

})();

(function () {
    let filter = document.getElementById('filter-block');
    filter.onclick = function (e) {
        let target = e.target;

        if (target.classList.contains('catalog-filter__button'))
            toggleFilterBtn(target);
        toggleSlider();
        toggleBrand();
    }
})();

function toggleSlider() {
    var btn = document.getElementById('filterBtn');
    var slider = document.getElementById('filterCost');
    if (btn.classList.contains('catalog-filter__button_active')) {
        slider.classList.remove('hide');
    } else {
        slider.classList.add('hide');
    }
};

function toggleBrand() {
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

function getLowerCost() {
    var arr = document.querySelectorAll('.catalog-items-item');
    arr = Array.prototype.slice.call(arr);
    var prop;
    arr.map(function (a) {
        var lowerPrice = +a.dataset.cost;
        if (+a.dataset.cost < lowerPrice) {
            lowerPrice = +a.dataset.cost;
            prop = lowerPrice;
        }
    })
    return prop
}

function getHigherCost() {
    var arr = document.querySelectorAll('.catalog-items-item');
    arr = Array.prototype.slice.call(arr);
    var highPrice = -Infinity;
    arr.map(function (a) {
        if (+a.dataset.cost > highPrice) {
            return highPrice = +a.dataset.cost;
        }
    })
    console.log(highPrice);
    return highPrice;
};

function likeClicked() {
    let list = document.getElementById('goods');
    list.addEventListener('click', function (e) {
        e.preventDefault();
        let target = e.target;
        if (target.classList.contains('svg-heart'))
            toggleSvg(target)
    })
};

function boxClicked() {
    var list = document.getElementById('goods');
    var id;
    list.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target;
        if (target.classList.contains('basket-svg')) {
            id = target.closest('.catalog-items-item').dataset.priority;
            localStorage.setItem(id, id)
        }
    })
}
boxClicked();

    function addingGoods(data) {
        var goods = document.getElementById('goods');
        var out = '';
        for (var key in data['items']) {
            out += '<a href="#" class="catalog-items-item" data-index="' + data['items'][key]['data-index'] + '" data-cost="' +
                data['items'][key]['cost'].replace(/\s+/g, '') + '" data-priority="' + data['items'][key]['priority'] + '">';
            out += '<div class="catalog-items-container">';
            out += '<div class="catalog-items__name">';
            out += '<h3 class="catalog-items__brand">' + data['items'][key]['name'] + '</h3>';
            out += '<p class="catalog-items__price">' + data['items'][key]['cost'] + ' ₴' + '</p>';
            out += '</div>';
            out += '<div class="catalog-items-social">';
            out += '<button class="catalog-social__svg like">';
            out += '<svg class="svg-heart" width="21" height="18" viewBox="0 0 21 18">';
            out += '<use xlink:href="#love-svg">';
            out += '</use>';
            out += '</svg>';
            out += '</button>';
            out += '<button class="catalog-social__svg elem">'
            out += '<svg class="basket-svg" width="18" height="16" viewBox="0 0 18 16">';
            out += '<use class="basket-svg" xlink:href="#box-svg">';
            out += '</use>';
            out += '</svg>';
            out += '</button>';
            out += '</div>';
            out += '<img src="' + data['items'][key].image + '"  alt="techne" class="catalog-items__img">';
            out += '</div>';
            out += '</div>';
            out += '</a>';
        }
        goods.innerHTML = out;
    };

    function addingBands(data) {
        var bandsID = document.getElementById('bands');
        var bands = '';
        for (var key in data['bands']) {
            bands += '<a href="#" class="bands-catalog-item" data-index="' + data['bands'][key]['data-index'] + '" data-cost="' +
                data['bands'][key]['cost'].replace(/\s+/g, '') + '" data-priority="' + data['bands'][key]['priority'] + '">';
            bands += '<div class="bands-items-container">';
            bands += '<div class="bands-items__name">';
            bands += '<h3 class="bands-items__brand">' + data['bands'][key]['name'] + '</h3>';
            bands += '<p class="bands-items__price">' + data['bands'][key]['cost'] + ' ₴' + '</p>';
            bands += '</div>';
            bands += '<div class="bands-items-social">';
            bands += '<button class="bands-social__svg like">';
            bands += '<svg width="21" height="18" viewBox="0 0 21 18">';
            bands += '<use xlink:href="#love-svg">';
            bands += '</use>';
            bands += '</svg>';
            bands += '</button>';
            bands += '<button class="bands__svg elem">'
            bands += '<svg class="basket-svg" width="18" height="16" viewBox="0 0 18 16">';
            bands += '<use class="basket-svg" xlink:href="#box-svg">';
            bands += '</use>';
            bands += '</svg>';
            bands += '</button>';
            bands += '</div>';
            bands += '<img src="' + data['bands'][key].image + '"  alt="techne" class="bands-items__img">';
            bands += '</div>';
            bands += '</div>';
            bands += '</a>';
        }
        bandsID.innerHTML = bands;
    }

    function sortingObj(item, valueMin, valueMax) {
        var sortObj = Object.assign({}, item);
        var arr = [];
        var sortedObj;

        for (var key in sortObj['items']) {
            arr.push({
                items: sortObj['items'][key]
            });
        }

        sortedObj = arr.filter(function (a) {
            return +a.items.cost.replace(/\s+/g, '') >= valueMin && +a.items.cost.replace(/\s+/g, '') <= valueMax;
        })
        addingSortedGoods(sortedObj)
    }

    function addingSortedGoods(data) {
        var goods = document.getElementById('goods');
        var out = '';
        for (var i = 0; i < data.length; i++) {

            out += '<a href="#" class="catalog-items-item" data-index="' + data[i]['items']['data-index'] + '" data-cost="' +
                data[i]['items']['cost'].replace(/\s+/g, '') + '" data-priority="' + data[i]['items']['priority'] + '">';
            out += '<div class="catalog-items-container">';
            out += '<div class="catalog-items__name">';
            out += '<h3 class="catalog-items__brand">' + data[i]['items']['name'] + '</h3>';
            out += '<p class="catalog-items__price">' + data[i]['items']['cost'] + ' ₴' + '</p>';
            out += '</div>';
            out += '<div class="catalog-items-social">';
            out += '<button class="catalog-social__svg like">';
            out += '<svg class="svg-heart" width="21" height="18" viewBox="0 0 21 18">';
            out += '<use xlink:href="#love-svg">';
            out += '</use>';
            out += '</svg>';
            out += '</button>';
            out += '<button class="catalog-social__svg elem">'
            out += '<svg class="basket-svg" width="18" height="16" viewBox="0 0 18 16">';
            out += '<use class="basket-svg" xlink:href="#box-svg">';
            out += '</use>';
            out += '</svg>';
            out += '</button>';
            out += '</div>';
            out += '<img src="' + data[i]['items'].image + '"  alt="techne" class="catalog-items__img">';
            out += '</div>';
            out += '</div>';
            out += '</a>';
        }
        goods.innerHTML = out;
    };

    