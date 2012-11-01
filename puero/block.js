$(document).ready(function () {
	var layouts = $('.good_wrapper .good_layout');
	layouts.hide();
	layouts.parent().on('click', function () {
		var descr = layouts.find('.good_description');
		console.log(descr);
		//descr.hide();
		layouts.fadeIn(400);
		descr.animate({
			top: '70%'
		}, 400);
	});
});