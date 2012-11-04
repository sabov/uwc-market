(function() {
    jQuery(function() {
        jQuery('.nav .dropdown-menu').click(function(e) {
            e.stopPropagation();
        });
    });
})();


jQuery(function () {
    var _asignValidator = function () {
        var loginForm = $('form.login'),
            registerForm = $('form.register'),
            params = {
                rules: {
                    username: {
                        required: true,
                        minlength: 3
                    },
                    password: {
                        required: true,
                        minlength: 5
                    }
                },
                messages: {

                }
            };
        loginForm.validate(params);
        registerForm.validate(params);
    };
    _asignValidator();
});