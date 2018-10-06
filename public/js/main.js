var topSpotsArray = [];
$(document).ready(function() {
// write your code here
    loadTable();
    initMap();
});
function loadTable(){
    $.getJSON('data.json', function(data){
        $.each(data, function(i, field){
            var tableData = '<tr class="tableRow"><td class="tableData">'+ field.name +'</td><td class="tableData">'
                            + field.description +'</td>';
            $('table').append(tableData);
        });
    });
}
function initMap() {
    var sanDiego = {lat: 32.7157, lng: -117.1611};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: sanDiego
    });
    $.getJSON('data.json', function(data){
        $.each(data, function(i, field){
            var contentString = '<div id="infoWindow">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+ field.name + '</h1>'+
            '<div id="bodyContent">'+
            '<p>' + field.description + '</p>' 
            '</div>'+
            '</div>';
            var coords = {lat: field.location[0], lng: field.location[1]};
            var marker= new google.maps.Marker({
                position: coords,
                title: field.name,
                map: map
            });
            var infoWindow = new google.maps.InfoWindow({content: contentString})
            marker.setMap(map);
            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            });
        });
    });
}