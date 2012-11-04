var i18n = (function () {
    var RU_ID = 1,
        UA_ID = 2;
    var Langs = {
        1: {//ru
            'hello' : 'prevet'
        },
        2: {//ua
            'hello' : 'privit'
        }
    };
    console.log($.cookie("language_id"));
    var language_id = $.cookie("language_id") || UA_ID;
    return Langs[language_id];
})();
