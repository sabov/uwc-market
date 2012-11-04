var i18n = (function () {
    var RU_ID = 1,
        UA_ID = 2;
    var Langs = {
        1: {//ru
            'required' : 'Обязательное поле'
        },
        2: {//ua
            'required' : 'Обов\'язкове поле'
        }
    };
    var language_id = $.cookie("language_id") || UA_ID;
    return Langs[language_id];
})();
