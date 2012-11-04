require.config({
    paths: {
        /*    Libraries    */
        jquery     : '/js/lib/jquery-1.8.2',
        validator : '/js/lib/jquery.validate.min',
        cookie : '/js/lib/jquery.cookie',
        bootstrap  : '/js/lib/bootstrap',
        less       : '/js/lib/less-1.3.1.min',
        dropdown   : '/js/lib/dropdown',

        /*    Application    */
        config : '/js/app/config',
        i18n   : '/js/app/i18n',
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
                'validator',
                'i18n',
                'cookie',
                'block'
            ]
        },
        block : {
            deps : ['jquery']
        },
        validator : {
            deps : ['jquery']
        },
        i18n : {
            deps : ['jquery', 'cookie']
        },
        cookie : {
            deps : ['jquery']
        }
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});
require(['app']);
