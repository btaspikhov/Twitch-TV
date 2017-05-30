function openTab() {

    $(".row").css("display", "none");

    $(".tablinks").removeClass("active");
    $(this).addClass("active");
    
    if ($(this).attr( "id") == "linkOnline") {

        $(".online").css("display", "flex");
    } else if ($(this).attr( "id") == "linkOffline") {
        $(".offline").css("display", "flex");
    } else {

        $(".row").css("display", "flex");
    }
}
