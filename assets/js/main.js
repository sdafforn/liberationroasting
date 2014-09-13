var locations, map, mapCenter;

$(document).ready(function() {
    $.ajaxSetup({ cache: false });

    loadLocations();
    navHandlers();
    loadVarieties();
});

function navHandlers(){
    $("a.menu-entry").click(function() {

        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        $(".content").removeClass("selected");

        var content_show = $(this).attr("title");
        $("#"+content_show).addClass("selected");

        $("p.tagline").addClass("move-over");

        if(content_show === 'findus')
        {
            drawMap();
        }
    });
}

function loadVarieties(){
    // load current varieties
    var $ul = $('#available_varieties');
    var jqxhr = $.getJSON( "assets/content/beans.json", function() {
    })
      .done(function(data) {
        $.each(data, function (i, bean) {
            var $li = $('<li>');
            var $h4;
            if(!bean.blend) {
                $li.append('<h3>' + bean.country + ' ' + bean.farm + '</h3>');
                $h4 = $('<h4>' + bean.region + '</h4>');
                $('<a href="' + bean.mapurl + '" target="_blank"><i class="fa fa-map-marker icon" aria=hidden="true"></i><span class="aural">Google map</span></a>').appendTo($h4);
            }
            else {
                $li.append('<h3>' + bean.blend + '</h3>');
                $h4 = $('<h4>' + bean.blendtype + '</h4>').css('padding-left', '0%');
            }
            $h4.appendTo($li);
            $('<p>' + bean.description + '</p>').appendTo($li);
            $('<p class="price"><span class="dollar">$' + bean.price + '</span> - 16oz</p>').appendTo($li);
            $li.appendTo($ul);
        });
      })
      .fail(function() {
        $('<li>Well this is embarrassing. We seem to have had a problem loading our current varieties. Our apologies.</li>').appendTo($ul);
      })
}

function loadLocations()
{
    var jqxhr = $.getJSON( "assets/content/locations.json", function() {
    })
      .done(function(data) {
        locations = data;
      })
      .fail(function() {
        locations = [];
      })
}

function drawMap()
{
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: new google.maps.LatLng(39.8510608,-86.1458488),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    mapCenter = map.getCenter();

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].lat, locations[i].long),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          var $a = $('<a class="location" href="' + locations[i].url + '" target="_blank">' + locations[i].name + '</a>');
          infowindow.setContent($a[0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(mapCenter);
    });

}
