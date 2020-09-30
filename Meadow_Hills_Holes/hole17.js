let marker1, marker2, marker3;
let poly, geodesicPoly;

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: { lat: 39.651728, lng: -104.822152 },
        mapTypeId: "satellite",
        mapTypeControl: false,
        streetViewControl: false,
        heading: 180
    });

    marker1 = new google.maps.Marker({
        position: { lat: 39.651843, lng: -104.820858 },
        map: map,
        draggable: true
    })
    marker2 = new google.maps.Marker({
        position: { lat: 39.651728, lng: -104.821945 },
        map: map,
        draggable: true
    })
    marker3 = new google.maps.Marker({
        position: { lat: 39.651596, lng: -104.823336 },
        map: map,
        draggable: true
    })

    map.getCenter();

    google.maps.event.addListener(marker1, "position_changed", update);
    google.maps.event.addListener(marker2, "position_changed", update);
    google.maps.event.addListener(marker3, "position_changed", update);

    geodesicPoly = new google.maps.Polyline({
        strokeColor: "#CC0099",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        geodesic: true,
        map: map,
    });

    update();
}

function update() {
    const path = [
        marker1.getPosition(),
        marker2.getPosition(),
        marker3.getPosition()
    ];

    geodesicPoly.setPath(path);

    var mk1 = marker1.getPosition()
    var mk2 = marker2.getPosition()
    var mk3 = marker3.getPosition()

    function teeToGreenDistance(mk1, mk3) {
        var R = 6.975e+6; // Radius of the Earth in miles
        var rlat1 = mk1.lat() * (Math.PI / 180); // Convert degrees to radians
        var rlat2 = mk3.lat() * (Math.PI / 180); // Convert degrees to radians
        var difflat = rlat2 - rlat1; // Radian difference (latitudes)
        var difflon = (mk3.lng() - mk1.lng()) * (Math.PI / 180); // Radian difference (longitudes)

        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
        return d;
        // Calculate and display the distance between markers
    }
    function teeToMidPointDistance(mk1, mk2) {
        var R = 6.975e+6; // Radius of the Earth in miles
        var rlat1 = mk1.lat() * (Math.PI / 180); // Convert degrees to radians
        var rlat2 = mk2.lat() * (Math.PI / 180); // Convert degrees to radians
        var difflat = rlat2 - rlat1; // Radian difference (latitudes)
        var difflon = (mk2.lng() - mk1.lng()) * (Math.PI / 180); // Radian difference (longitudes)

        var e = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
        return e;

    }
    function greenToMidPointDistance(mk2, mk3) {
        var R = 6.975e+6; // Radius of the Earth in miles
        var rlat1 = mk2.lat() * (Math.PI / 180); // Convert degrees to radians
        var rlat2 = mk3.lat() * (Math.PI / 180); // Convert degrees to radians
        var difflat = rlat2 - rlat1; // Radian difference (latitudes)
        var difflon = (mk3.lng() - mk2.lng()) * (Math.PI / 180); // Radian difference (longitudes)

        var f = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
        return f;

    }

    document.getElementById('hole').innerHTML = "Hole 17:"

    var teeToGreendistance = teeToGreenDistance(mk1, mk3);
    document.getElementById('tee-to-green').innerHTML = "Distance from tee to green: " + teeToGreendistance.toFixed(2) + " yrds.";

    var teeToMidPoint = teeToMidPointDistance(mk1, mk2);
    document.getElementById('mid-point').innerHTML = "Distance from tee to midpoint: " + teeToMidPoint.toFixed(2) + " yrds.";

    var greenTomidPoint = greenToMidPointDistance(mk2, mk3);
    document.getElementById('green-to-mid-point').innerHTML = "Distance midpoint to green: " + greenTomidPoint.toFixed(2) + " yrds.";

}
