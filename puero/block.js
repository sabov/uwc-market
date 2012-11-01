$(document).ready(function () {
	var layouts = $('.good_wrapper .good_layout'),
		arrows = layouts.find('div[class$=_arrow]');
	layouts.hide();
	layouts.parent().hover(function () {
		var descr = layouts.find('.good_description'),
			block = $(this),
			blockWidth = parseInt(block.css('width'), 10),
			ul = block.find('ul'),
			li = ul.find('li'),
			ulLength = li.length,
			current = 1;
		layouts.fadeIn(400);
		descr.animate({ top: '70%' }, 400);
		arrows.click(function () {
			var $this = $(this),
				dir = $this.data('dir');
			if ((dir === 'next')&&(current !== ulLength)) {
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