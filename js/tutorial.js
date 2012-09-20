/* Code by Andrew Mager
*
*  Spotify green: #74c043
*
**/

window.onload = function() {

    sp = getSpotifyApi(1);
    var models = sp.require('sp://import/scripts/api/models');
    var views = sp.require('sp://import/scripts/api/views');
    var player = models.player;
    
    // Handle share popup
    var share_element = document.getElementById('share-popup');
    var share_content = 'spotify:track:76a6mUM5r7VPexAj37TLjo';
    share_element.addEventListener('click', displayPopup);
    function displayPopup() {
        models.application.showSharePopup(share_element, share_content);
    }

    // Handle tabs
    tabs();
    models.application.observe(models.EVENT.ARGUMENTSCHANGED, tabs);

    function tabs() {
        var args = models.application.arguments;
        var current = document.getElementById(args[0]);
        var sections = document.getElementsByClassName('section');
        for (i=0;i<sections.length;i++){
            sections[i].style.display = 'none';
        }
        current.style.display = 'block';
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

    /* Pass the player HTML code to the #single-track-player <div /> */
    var single_track_player_HTML = document.getElementById('single-track-player');
    console.log(single_track_player_HTML);
    single_track_player_HTML.appendChild(single_track_player.node);
    
}
