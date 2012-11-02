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
        goods.forEach(function (elem, index) {
            slider(elem, params);
        });
    };

    //твой мего метод который принимает на вход ДОМ елемент(блок  продукта) и делает его четким
    //постарайяс вобще не использовать константы в коде. все константы задай в params при вызове init и сверху в блоке
    //var MY_CONST = 100500;
    var slide = function (good, params) {
        //тут реализовуешь всю свою логикку. Постарайся сделать методы slideToNext slideToPrev
        //и вызывать их при нажатии на стрелки.
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
goods.init({
    goodClass: 'good',
    width: 12312,
    heights: 213123,
    blabla: 'bla',
    transitionTime: '',
    andOther: 'andOther'
});




$(document).ready(function () {
	var layouts = $('.good_wrapper .good_layout'),
        //сделай сразу rightArrow and leftArrow
		arrows = layouts.find('div[class$=_arrow]');
    //Пусть layouts будет сразу скрыт! в css display none
	layouts.hide();

    //убрать ховер! добавь в css стиль :hover и там делай все что нужно
	layouts.parent().hover(function () {
		var descr = layouts.find('.good_description'),
			block = $(this),
        //к инту приводи так: +block.css('width') ! так красивее
			blockWidth = parseInt(block.css('width'), 10),
        //назови со смыслом переменные
			ul = block.find('ul'),
			li = ul.find('li'),
			ulLength = li.length,
            // констант не должно быть
			current = 1;
		layouts.fadeIn(400);
		descr.animate({ top: '70%' }, 400);
		arrows.click(function () {
			var $this = $(this),
				dir = $this.data('dir');
			if ((dir === 'next')&&(current !== ulLength)) {
                //неплохо бы в отделыный метод
				ul.css('width', '10000px');
				li.css('width', blockWidth-30);
				current += 1;
				ul.animate({
					'margin-left': '-=' + blockWidth
				});
			} else if (((dir === 'next')&&(current === ulLength))||((dir === 'prev')&&(current === 1))) {
				console.log('return false');
				return false;
			} else {
                //неплохо бы в отделыный метод
				ul.css('width', '10000px');
				li.css('width', blockWidth-30);
				current -= 1;
				ul.animate({
					'margin-left': '+=' + blockWidth
				});
			}
		});
	}, function () {
		layouts.hide();
	});
});
