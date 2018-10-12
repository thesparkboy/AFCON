
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlc3Bhcmtib3kiLCJhIjoiY2ptd2dmZXE0MDBrcjNwcDdsZmhkdTFwZyJ9.Jf68yNSL52EppmZ4oCIecw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 2.4,
    center: [24.644002, 2.854225]
});


var allMarkers = [];
var allStadiums = [];
var count = 0;
var yr = 2017;

$(document).ready(function () {
    $('input[type="range"]').rangeslider({
        polyfill: false,
        rangeClass: 'rangeslider',
        disabledClass: 'rangeslider--disabled',
        horizontalClass: 'rangeslider--horizontal',
        verticalClass: 'rangeslider--vertical',
        fillClass: 'rangeslider__fill',
        handleClass: 'rangeslider__handle',
        onInit: function () {
            $('.options2').hide();
            $('#year').text('2017');
            $.get('/data/year=2017', function (data) {
                data.forEach(function (event) {
                    var el1 = document.createElement('div');
                    el1.className = 'marker';
                    el1.setAttribute("id", count++);

                    new mapboxgl.Marker(el1)
                        .setLngLat([event.lng, event.lat])
                        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<p>' + event.description + '<br></p>'
                            + '<img src= "' + event.link + ' " height="100" widht="58"> </img>'))
                        .addTo(map);

                    var el2 = document.createElement('div');
                    el2.className = 'marker2';
                    el2.setAttribute("id", count++);
                    new mapboxgl.Marker(el2)
                        .setLngLat([event.wnlng, event.wnlat])
                        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<p>' + '<b>Winner</b> - ' + event.winner + '<br></p>'
                            + '<img src= "' + event.wlink + ' " height="100" widht="58"> </img>'))
                        .addTo(map);
                });
            });
            $.get('/stats/year=' + yr, function (data) {
                var txt = "";
                data.forEach(function (stat) {
                    txt += stat.stats;
                    txt += "<br><br>";
                });
                $('#facts').html(txt);
            });
        },
        onSlide: function (position, value) {

        },
        onSlideEnd: function (position, value) {
            yr = value;
            $('#year').text(value);
            $.get('/data/year=' + value, function (data) {
                for (var i = 0; i < count; i++) {
                    $('#' + i).hide();
                }
                data.forEach(function (event) {
                    var el1 = document.createElement('div');
                    el1.className = 'marker';
                    el1.setAttribute("id", count++);
                    new mapboxgl.Marker(el1)
                        .setLngLat([event.lng, event.lat])
                        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<p>' + event.description + '<br></p>'
                            + '<img src= "' + event.link + ' " height="100" widht="58"> </img>'))
                        .addTo(map);

                    var el2 = document.createElement('div');
                    el2.className = 'marker2';
                    el2.setAttribute("id", count++);
                    new mapboxgl.Marker(el2)
                        .setLngLat([event.wnlng, event.wnlat])
                        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<p>' + '<b>Winner</b> - ' + event.winner + '<br></p>'
                            + '<img src= "' + event.wlink + ' " height="100" widht="58"> </img>'))
                        .addTo(map);
                });
            });
            $("[id=stadiums]").hide();
            if (map.getZoom() > 3.7) {
                $.get('/stadiums/year=' + yr, function (data) {
                    console.log(data);
                    data.forEach(function (event) {
                        var el1 = document.createElement('div');
                        el1.className = 'marker3';
                        el1.setAttribute("id", 'stadiums');
                        new mapboxgl.Marker(el1)
                            .setLngLat([event.lng, event.lat])
                            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<p>' + '<b>Stadium</b> - ' + event.description + '<br>' + '<b>Capacity</b> - ' + event.capacity + '</p>'
                                + '<img src= "' + event.link + ' " height="100" widht="58"> </img>'))
                            .addTo(map);
                    });
                });
            } else {
                $("[id=stadiums]").hide();
            }
            $.get('/stats/year=' + value, function (data) {
                var txt = "";
                data.forEach(function (stat) {
                    txt += stat.stats;
                    txt += "<br><br>";
                });
                $('#facts').html(txt);
            });
        }


    });
});
$(window).bind('mousewheel', function (event) {
    if (map.getZoom() > 3.7) {
        $('.options2').show();
        $('.options1').hide();
        $.get('/stadiums/year=' + yr, function (data) {
            data.forEach(function (event) {
                var el1 = document.createElement('div');
                el1.className = 'marker3';
                el1.setAttribute("id", 'stadiums');
                new mapboxgl.Marker(el1)
                .setLngLat([event.lng, event.lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<p>' + '<b>Stadium</b> - ' + event.description + '<br>' + '<b>Capacity</b> - ' + event.capacity + '</p>'
                    + '<img src= "' + event.link + ' " height="100" widht="58"> </img>'))
                .addTo(map);
            });
        });
    } else {
        $('.options1').show();
        $('.options2').hide();
        $("[id=stadiums]").hide();
    }
});