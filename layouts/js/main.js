require.config({
    paths: {
        /*    Libraries    */
        jquery     : '/js/lib/jquery-1.8.2',
        underscore : '/js/lib/underscore',
        bootstrap  : '/js/lib/bootstrap',
        less       : '/js/lib/less-1.3.1.min',
        dropdown   : '/js/lib/dropdown',

        /*    Application    */
        config : '/js/app/config',
        app    : '/js/app/app',
        block  : '/js/app/block'
    },

    shim: {
        bootstrap :  {
            deps : ['jquery']
        },
        app : {
            deps : [
                'bootstrap',
                'underscore',
                'dropdown',
                'config',
                'block'
            ]
        },
        block : {
            deps : ['bootstrap']
        },
        dropdown : {
            deps : ['jquery']
        },
        config : {
            deps : ['less']
        }
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});
require(['app']);
