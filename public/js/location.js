(function() {

// Flip map / slideshow

    function mapSlideshowFlip ( ev ) {

        var url = ev.target.href,
            id = url.substr( url.indexOf('#') + 1 );

        if ( id === 'locationimages' ) {
            document.getElementById( 'locationimages' ).setAttribute('style', 'display: block;');
            document.getElementById( 'locationmap' ).setAttribute('style', 'display: none;');
        }

        if ( id === 'locationmap' ) {
            document.getElementById( 'locationimages' ).setAttribute('style', 'display: none;');
            document.getElementById( 'locationmap' ).setAttribute('style', 'display: block;');
        }

        ev.preventDefault();

    }

    var venueListEl = document.querySelectorAll('#locationTogler')[ 0 ];
    venueListEl.addEventListener('click', mapSlideshowFlip );
    

    var images = document.getElementById("locationimages");
    var img = document.getElementById("locationimg");
    var imgMin = parseInt(img.getAttribute("data-min"), 10);
    var imgMax = parseInt(img.getAttribute("data-max"), 10);

    function nextImg(direction) {
        var n = parseInt(img.getAttribute("data-n"), 10);
        var goTo = Math.max(imgMin, Math.min(imgMax, n + direction));
        if (n !== goTo) {
            img.src = "../gfx/venue_0"+goTo+".jpg";
            img.setAttribute("data-n", goTo);
        }
    }

    images.addEventListener("click", function (e) {
        var target = e.target,
            direction;
        e.preventDefault();
        
        if (~target.className.indexOf("arrow")) {
            direction = (~target.className.indexOf("next") ? 1 : -1);
            nextImg(direction);
        }

    }, false);

    

    // Do map

    var map,
        locations = {
            venue : { title : 'Conference Venue', lat : 59.922807, lng : 10.751388 }
        };

    function hideMapLink() {
        var maplink = document.getElementsByClassName("maplink");
        if (maplink && maplink.length) maplink[0].style.display = "none";
    }

    function showMap() {
        var options = {
            zoom: 15,
            center: new google.maps.LatLng( locations.venue.lat, locations.venue.lng ),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        map = new google.maps.Map(document.getElementById('map'), options );

        var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            title: locations.venue.title
        });

        google.maps.event.addDomListener( window, 'resize', function() {
            map.setCenter( map.getCenter() );
        });

        hideMapLink();
    }

    // showMap needs to be global for async map loading
    window["showMap"] = showMap;

    function loadMap() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=showMap";
        document.body.appendChild(script);
    }
    loadMap();
})();