//Придумай названия фкнкциям получше, ну и реализация за тобой)

//функция возвращает object с одним публичным методом
var goods = (function () {
    //приватный член - все продукты
    var goods;

    //приватный метод который инитит goods
    var getAllGoods = function (className) {
        goods = $(className);
    };

    //приватный метед который проходит по всем блокам и делает их четкими
    var initAllGoods = function (params) {
        console.log(goods);
        $.each(goods, function (i, elem) {
            slide(elem, params);
        });
    };

    var setWidth = function(container, width) {
        container.css('width', width);
        return container;
    }
    var totalSetWidth = function(ul, li, params) {
        setWidth(ul, params.ulWidth);
        setWidth(li, params.blockWidth-30);
    }
    //твой мего метод который принимает на вход ДОМ елемент(блок  продукта) и делает его четким
    //постарайяс вобще не использовать константы в коде. все константы задай в params при вызове init и сверху в блоке
    //var MY_CONST = 100500;
    var slide = function (good, params) {
        //тут реализовуешь всю свою логикку. Постарайся сделать методы slideToNext slideToPrev
        //и вызывать их при нажатии на стрелки.
        var good = $(good);
            layout = good.find('.good_layout'),
            leftArrow = layout.find('.left'),
            rightArrow = layout.find('.right'),
            descr = layout.find('.good_description'),
            blockWidth = parseInt(good.css('width'), 10),
            ul = good.find('.good ul'),
            li = ul.find('li'),
            ulLength = li.length,
            current = params.current;
            console.log(blockWidth);
        good.hover(function () {
            layout.fadeIn(params.transitionTime);
        }, function () {
            layout.fadeOut(params.transitionTime);
        });
        leftArrow.on('click', function () {
            totalSetWidth(ul, li, {ulWidth: params.width, blockWidth: blockWidth });
            if(current === 1) {
                return false;
            } else {
                current -= 1;
                ul.animate({'margin-left': '+=' + blockWidth}, params.transitionTime);
            }
        });
        rightArrow.on('click', function () {
            totalSetWidth(ul, li, {ulWidth: params.width, blockWidth: blockWidth }, params.transitionTime);
            if(current === ulLength) {
                return false;
            } else {
                current += 1;
                ul.animate({'margin-left': '-=' + blockWidth});
            }
        });
    };

    return {
        init: function (params) {
            getAllGoods(params.goodClass);
            initAllGoods(params);
        }
    };
})();


//так должен вызываться твой код
//пользователь слайдера должен просто передать уникальный класс блока c товаром и другие параметры
$(document).ready(function(){
goods.init({
    goodClass: '.good_wrapper',
    current: 1,
    width: '100000px',
    transitionTime: 1000,
});

})