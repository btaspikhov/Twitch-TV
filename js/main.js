$(document).ready(function() {
    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin",
        "comster404"
    ];
    var channelURLpart = "https://api.twitch.tv/kraken/streams/";
    var userURLpart = "https://api.twitch.tv/kraken/users/";

    for (var i = 0; i < streamers.length; i++) {
        var channelURL = channelURLpart + streamers[i] + '?callback=?';

        $(".container").append("<div class = 'row' id = '" + streamers[i] + "'" + "><div class = 'col-2'><a href='https://www.twitch.tv/"+streamers[i]+"'>" + streamers[i] + "</a></div></div>");

        $.getJSON(channelURL, (function() {
            var channelName = streamers[i];
            var userURL = userURLpart + channelName + '?callback=?';
            return function(data) {
                if (data.hasOwnProperty("error")) {
                    $("#" + channelName).append("<div class = 'col-3'>Account closed</div>");
                    $(".row#" + channelName).css("background-color","rgb(210, 210, 210)" );
                } else if (data.stream == null) {
                    $("#" + channelName).append("<div class = 'col-3'>Offline</div>");
                    $(".row#" + channelName).css("background-color","rgb(246, 161, 161)" );
                    $(".row#" + channelName).addClass("offline");
                } else {
                    $("#" + channelName).append("<div class = 'col-3'>Online </div>");
                    $("#" + channelName).append("<div class = 'col-4'>" + data.stream.game + ": " + data.stream.channel.status + "</div>");
                    $(".row#" + channelName).addClass("online");
                }

                $.getJSON(userURL, function(data) {
                    if (data.logo === null) {
                        $("#" + channelName).prepend("<div class = 'col-1'><a href='https://www.twitch.tv/"+channelName+"'><img src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSkV9PQER0PC7nySTDclZhIER5ILNoYbUEiYFVdoROHJZ5eNPQLMw' alt = 'channelLogo'></a></div>");
                    } else {
                        $("#" + channelName).prepend("<div class = 'col-1'><a href='https://www.twitch.tv/"+channelName+"'><img src='" + data.logo + "' alt = 'channelLogo'></a></div>");
                    }

                });
                console.log(channelName);

            };
        })());
    }

    $("#linkAll").click(openTab);
    $("#linkOnline").click(openTab);
    $("#linkOffline").click(openTab);

});
