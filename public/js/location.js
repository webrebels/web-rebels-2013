(function() {

    var youCanTouchThis = 'createTouch' in document;

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

    var venueListEl = document.querySelectorAll('#locationTogler  ul')[ 0 ];
    venueListEl.addEventListener('click', mapSlideshowFlip );



    // Do venue slideshow

    function slideshowFlip ( direction ) {

        var elFocus     = document.querySelectorAll('.slide.focus')[ 0 ],
            elNext      = elFocus.nextElementSibling,
            elPrevious  = elFocus.previousElementSibling;

        if ( direction === 'left' ) {
            if ( elPrevious.getAttribute('class') === 'slide pre' ) {
                elFocus.setAttribute('class', 'slide next');
                elPrevious.setAttribute('class', 'slide focus');
            }
        }

        if ( direction === 'right' ) {
            if ( elNext.getAttribute('class') === 'slide next' ) {
                elFocus.setAttribute('class', 'slide pre');
                elNext.setAttribute('class', 'slide focus');
            }
        }

    }

    var arrowRight  = document.querySelectorAll('.arrowRight')[ 0 ],
        arrowLeft   = document.querySelectorAll('.arrowLeft')[ 0 ];

    arrowRight.addEventListener('click', function () {
        slideshowFlip( 'right' );
    });

    arrowLeft.addEventListener('click', function () {
        slideshowFlip( 'left' );
    });



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

    if (!youCanTouchThis) {
        loadMap();
    }
})();