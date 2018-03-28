function initialize(params) {
    $("#dynamic ul li").find("div span,div p").hide();
    $("#dynamic ul li:first").find("div span,div p").slideDown(800);
    $("#dynamic ul li").on("click", function() {
        $(this).find("div span,div p").slideToggle();
        $(this).find("time i").toggleClass("hide");
    });
}
module.exports = {
    init: initialize
}
