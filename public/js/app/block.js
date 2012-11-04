(function () {
    var initBlocksGallary = function(items) {
        var items = $(items);
        items.each(function (key, el) {
            el = $(el);
            var cr = el.find('.carousel').carousel({
              interval: 60000
            });
            el.find('.block-left-arrow').bind('click', function() {
                cr.carousel('prev');
            });
            el.find('.block-right-arrow').bind('click', function() {
                cr.carousel('next');
            });
        });
    };
    $(function() {
        var blocks = $('.block');
        if(blocks) initBlocksGallary(blocks);
    });
})();
