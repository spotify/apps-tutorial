/* Code by Andrew Mager
*
*  Spotify green: #74c043
*
**/

window.onload = function() {

    require('$api/models', function(models) {

        // When application has loaded, run pages function
        models.application.load('arguments').done(pages);

        // When arguments change, run pages function
        models.application.addEventListener('arguments', pages);

        function pages() {
            var args = models.application.arguments;
            var current = document.getElementById(args[0]);
            var sections = document.getElementsByClassName('section');
            for (i=0;i<sections.length;i++){
                sections[i].style.display = 'none';
            }
            current.style.display = 'block';
        }

        // Get the currently-playing track
        models.player.load('track').done(updateCurrentTrack);

        // Update the DOM when the song changes
        models.player.addEventListener('change', updateCurrentTrack);

        function updateCurrentTrack(){
            var currentHTML = document.getElementById('current-track');
            if (models.player.track == null) {
                currentHTML.innerHTML = 'No track currently playing';
            } else {
                var artists = models.player.track.artists;
                console.log(artists);
                var artists_array = [];
                for(i=0;i<artists.length;i++) {
                    artists_array.push(artists[i].name);
                }
                currentHTML.innerHTML = 'Now playing: ' + artists_array.join(', ');
                currentHTML.innerHTML += ' - ' + models.player.track.name;
            }
        }

    }); // require

    /*
    
    // Handle share popup
    var share_element = document.getElementById('share-popup');
    var share_content = 'spotify:track:76a6mUM5r7VPexAj37TLjo';
    share_element.addEventListener('click', displayPopup);
    function displayPopup() {
        models.application.showSharePopup(share_element, share_content);
    }

    // Handle drops
    var drop_box = document.querySelector('#drop_box');

    drop_box.addEventListener('dragstart', function(e){
        e.dataTransfer.setData('text/html', this.innerHTML);
        e.dataTransfer.effectAllowed = 'copy';
    }, false);

    drop_box.addEventListener('dragenter', function(e){
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.classList.add('over');
    }, false);

    drop_box.addEventListener('dragover', function(e){
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        return false;
    }, false);

    drop_box.addEventListener('drop', function(e){
        if (e.preventDefault) e.preventDefault();
        var drop = models.Playlist.fromURI(e.dataTransfer.getData('text'));
        console.log(drop);
        this.classList.remove('over');
        var success_message = document.createElement('p');
        success_message.innerHTML = 'Playlist successfully dropped: ' + drop.uri;
        this.appendChild(success_message);
    }, false);

    // Handle models.player
    var single_track = models.Track.fromURI('spotify:track:0blzOIMnSXUKDsVSHpZtWL');
    var single_track_playlist = new models.Playlist();
    single_track_playlist.add(single_track);

    var single_track_player = new views.Player();
    single_track_player.track = null; // Don't play the track right away
    single_track_player.context = single_track_playlist;

    // Pass the player HTML code to the #single-track-player <div /> 
    var single_track_player_HTML = document.getElementById('single-track-player');
    single_track_player_HTML.appendChild(single_track_player.node);

    // Handle multiple tracks player
    var library_tracks = models.library.tracks;

    var multiple_tracks_playlist = new models.Playlist();
    for(var i=0;i<20;i++) {
        var library_track = models.Track.fromURI(library_tracks[i].data.uri);
        multiple_tracks_playlist.add(library_track);
    }

    var multiple_tracks_player = new views.List(multiple_tracks_playlist);
    multiple_tracks_player.track = null; // Don't play the track right away
    multiple_tracks_player.context = multiple_tracks_playlist;
   
    // Pass the player HTML code to #multiple-tracks-player 
    var multiple_tracks_player_HTML = document.getElementById('multiple-tracks-player');
    multiple_tracks_player_HTML.appendChild(multiple_tracks_player.node);

    */

}


