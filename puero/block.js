$(document).ready(function () {
	var layouts = $('.good_wrapper .good_layout'),
		arrows = layouts.find('div[class$=_arrow]'),
		current = 1,
		blockWidth = parseInt(layouts.parent().css('width'), 10),
		ulLength = $('.good ul li').length,
		totalWidth = blockWidth * ulLength,
		transition = function (container, loc, direction) {
			var unit;
			container.css('width', '1000px');
			container.find('li').css('width', blockWidth-30);
			if ( direction && loc !== 0 ) {
				unit = ( direction === 'next' ) ? '-=' : '+=';
			}
			container.animate({
				'margin-left': unit ? (unit + loc) : loc
			});
		};
	layouts.hide();
	layouts.parent().on('click', function () {
		var descr = layouts.find('.good_description');
		layouts.fadeIn(400);
		descr.animate({ top: '70%' }, 400);
	});

	arrows.on('click', function (e) {
		var direction = $(this).data('dir'),
			loc = blockWidth;

		( direction === 'next' ) ? ++current : --current;
		if ( current === 0 ) {
			current = ulLength;
			loc = totalWidth - blockWidth;
			direction = 'next';
		} else if ( current - 1 === ulLength ) {
			current = 1;
			loc = 0;
		}
		transition($('.good ul'), loc, direction);
	});
});