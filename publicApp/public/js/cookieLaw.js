function startCookieServices()
{
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/it_IT/sdk.js', function(){
        FB.init({
          appId: '327697034004764',
          version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
        });
    });
}

function acceptCookieLaw()
{
    $.cookie("cookieLawAccepted", "true");
}

function isCookieLawAccepted()
{
    return $.cookie("cookieLawAccepted") !== undefined;
}

function closeCookieLawBanner()
{
    $("#GaudoNet__cookieLawBanner").css( "display", "none");
}

$(document).ready(function(){

    if(!isCookieLawAccepted()) {
        $("#GaudoNet__cookieLawBanner").css( "display", "block");

        $(document).on("click.cookieLaw", "a, button, submit", function(event) {
            if(event.target.id === "GaudoNet__cookieLawPolicy")
                return;

            $(document).off("click.cookieLaw");
            $(window).off("scroll.cookieLaw");
            acceptCookieLaw();
            closeCookieLawBanner()
            startCookieServices();
        });

        $(window).on("scroll.cookieLaw", function() {
            $(document).off("click.cookieLaw");
            $(window).off("scroll.cookieLaw");
            acceptCookieLaw();
            closeCookieLawBanner()
            startCookieServices();
        });
    }
    else
        startCookieServices();
});
