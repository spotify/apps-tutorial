/* Code by Andrew Mager
*
*  Spotify green: #74c043
*
**/

require([
        '$api/models',
        '$api/location#Location',
        '$api/search#Search',
        '$api/toplists#Toplist',
        '$views/buttons',
        '$views/list#List',
        '$views/image#Image'
        ], function(models, Location, Search, Toplist, buttons, List, Image) {

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


    // Show buttons
    var button = buttons.Button.withLabel('Hello World');
    var buttons_example = document.getElementById('buttons-example');
    buttons_example.appendChild(button.node);

    var playlist = models.Playlist.fromURI('spotify:user:billboard.com:playlist:6UeSakyzhiEt4NB3UAd6NQ');
    var subscribe_button = buttons.SubscribeButton.forPlaylist(playlist);
    buttons_example.appendChild(subscribe_button.node);

    var album = models.Album.fromURI('spotify:album:7w19PFbxAjwZ7UVNp9z0uT');
    var share_button = buttons.ShareButton.forAlbum(album);
    buttons_example.appendChild(share_button.node);

    var radio_button = buttons.StartRadioButton.forAlbum(album);
    buttons_example.appendChild(radio_button.node);

    /* Why doesn't this look like the other buttons?
    var custom_button = buttons.CustomButton.withClass('custom-button', 'Custom Button');
    buttons_example.appendChild(custom_button.node);
    */


    // Get the currently-playing track
    models.player.load('track').done(updateCurrentTrack);
    // Update the DOM when the song changes
    models.player.addEventListener('change:track', updateCurrentTrack);


    function updateCurrentTrack(){
        var currentHTML = document.getElementById('current-track');
        if (models.player.track == null) {
            currentHTML.innerHTML = 'No track currently playing';
        } else {
            var artists = models.player.track.artists;
            var artists_array = [];
            for(i=0;i<artists.length;i++) {
                artists_array.push(artists[i].name);
            }
            currentHTML.innerHTML = 'Now playing: ' + artists_array.join(', ');
            currentHTML.innerHTML += ' - ' + models.player.track.name;
        }
    }


    // Play a single track
    var single_track = models.Track.fromURI('spotify:track:0blzOIMnSXUKDsVSHpZtWL');
    var image = Image.forTrack(single_track, {player:true});
    // Pass the player HTML code to the #single-track-player div 
    var single_track_player_HTML = document.getElementById('single-track-player');
    single_track_player_HTML.appendChild(image.node);


    // Play multiple tracks
    var multiple_tracks = models.Playlist.fromURI('spotify:user:billboard.com:playlist:6UeSakyzhiEt4NB3UAd6NQ');
    var list = List.forPlaylist(multiple_tracks);
    var multiple_tracks_player = document.getElementById('multiple-tracks-player');
    multiple_tracks_player.appendChild(list.node);
    list.init();


    // Skip the track
    var previous_button = buttons.Button.withLabel('Previous');
    var next_button = buttons.Button.withLabel('Next');
    var player_buttons = document.getElementById('player-buttons');
    player_buttons.appendChild(previous_button.node);
    player_buttons.appendChild(next_button.node);

    previous_button.addEventListener('click', skipPrevious);
    next_button.addEventListener('click', skipNext);

    function skipPrevious(){
        models.player.skipToPrevTrack();
    }

    function skipNext(){
        models.player.skipToNextTrack();
    }


    // Get metadata from artist, album, track, playlist
    var artist_metadata_HTML = document.getElementById('artist-metadata');

    artist_metadata_properties = ['biography', 'genres', 'name', 'popularity', 'portraits', 'related', 'singles', 'uri', 'years']

    models.Artist.fromURI('spotify:artist:7hJcb9fa4alzcOq3EaNPoG') // Snoop Dogg
        .load(artist_metadata_properties)
        .done(function(a){
            artist_metadata_HTML.innerHTML = '<h4>Artist metadata</h4>'
            artist_metadata_HTML.innerHTML += '<p>Name: ' + a.name.decodeForHtml() + '</p>';
            artist_metadata_HTML.innerHTML += '<p>Bio: ' + a.biography.substring(0, 400) + '...</p>';
            artist_metadata_HTML.innerHTML += '<p>Genres: ' + a.genres.join(', ') + '</p>';
            artist_metadata_HTML.innerHTML += '<p>Popularity: ' + a.popularity + '</p>';
            for(var i=0;i<3;i++) { // Just show 3 portraits
                var image = document.createElement('img');
                image.setAttribute('src', a.portraits[i]);
                artist_metadata_HTML.appendChild(image);
            }
            a.related.snapshot().done(function(r){
                var related_artists = r.toArray();
                var related_artist_names = [];
                for(i=0;i<related_artists.length;i++){
                    related_artist_names.push(related_artists[i].name);
                }
                related_artist_names = related_artist_names.join(', ');
                artist_metadata_HTML.innerHTML += '<p>Related artists: ' + related_artist_names + '</p>';
            })
            // BUG
            a.singles.snapshot().done(function(s){
                // console.log(s);
            });

        });

    var album_metadata_HTML = document.getElementById('album-metadata');
    album_metadata_properties = ['artists', 'availability', 'copyrights', 'discs', 'label', 'name', 'playable', 'popularity', 'tracks', 'type', 'uri']

    models.Album.fromURI('spotify:album:6Yfaff9em7z9TmO9QQscpw')
        .load(album_metadata_properties)
        .done(function(a){
            album_metadata_HTML.innerHTML += '<h4>Album metadata</h4>';
            album_metadata_HTML.innerHTML += '<p>Name: ' + a.name.decodeForHtml() + '</p>';
            album_metadata_HTML.innerHTML += '<p>Date: ' + a.date + '</p>';
            album_metadata_HTML.innerHTML += '<p>Availability: ' + a.availability + ' (playable = '+ a.playable +')</p>';
            album_metadata_HTML.innerHTML += '<p>Copyrights: ' + a.copyrights.join(', ') + '</p>';
            var image = document.createElement('img');
            image.setAttribute('src', a.image);
            album_metadata_HTML.appendChild(image);
            a.tracks.snapshot().done(function(t){
                var tracks = t.toArray();
                var track_names = '';
                for(i=0;i<tracks.length;i++){
                    track_names += '<li>' + tracks[i].name + '</li>';
                }
                album_metadata_HTML.innerHTML += '<ol>' + track_names.toString() + '</ol>';
            });

    });

    var track_metadata_HTML = document.getElementById('track-metadata');
    track_metadata_properties = ['album', 'artists', 'availability', 'duration', 'explicit', 'name', 'number', 'playable', 'popularity', 'starred', 'uri']

    models.Track.fromURI('spotify:track:4675yUu8AUbE72T94BkLCD')
        .load(track_metadata_properties)
        .done(function(t){
            track_metadata_HTML.innerHTML += '<h4>Track metadata</h4>';
            track_metadata_HTML.innerHTML += '<p>Name: ' + t.name + '</p>';
            track_metadata_HTML.innerHTML += '<p>Album: ' + t.album + '</p>';
            track_metadata_HTML.innerHTML += '<p>Artists: ' + t.artists.join(', '); + '</p>';
            track_metadata_HTML.innerHTML += '<p>Availability: ' + t.availability + '</p>';
            track_metadata_HTML.innerHTML += '<p>Duration: ' + t.duration + ' (in milliseconds)</p>';
            track_metadata_HTML.innerHTML += '<p>Explicit: ' + t.explicit + '</p>';
            track_metadata_HTML.innerHTML += '<p>Popularity: ' + t.popularity + '</p>';
            track_metadata_HTML.innerHTML += '<p>Starred: ' + t.starred + '</p>';
            console.log(t);
    });
    

    var playlist_metadata_HTML = document.getElementById('playlist-metadata');
    playlist_metadata_properties = ['collaborative', 'description', 'name', 'owner', 'published', 'subscribed', 'subscribers', 'tracks']

    models.Playlist.fromURI('spotify:user:billboard.com:playlist:6UeSakyzhiEt4NB3UAd6NQ')
        .load(playlist_metadata_properties)
        .done(function(p){
            playlist_metadata_HTML.innerHTML += '<h4>playlist metadata</h4>';
            playlist_metadata_HTML.innerHTML += '<p>Name: ' + p.name.decodeForHtml() + '</p>';
            playlist_metadata_HTML.innerHTML += '<p>Collaborative: ' + p.collaborative + '</p>';
            playlist_metadata_HTML.innerHTML += '<p>Description: ' + p.description.decodeForHtml() + '</p>';
            playlist_metadata_HTML.innerHTML += '<p>Owner: ' + p.owner + '</p>';
            playlist_metadata_HTML.innerHTML += '<p>Published: ' + p.published + '</p>';
            playlist_metadata_HTML.innerHTML += '<p>Subscribed: ' + p.subscribed + '</p>';
            p.subscribers.snapshot().done(function(s){
                playlist_metadata_HTML.innerHTML += '<p>Subscribers: ' + s.length + '</p>';
            })
            p.tracks.snapshot().done(function(t){
                var tracks = t.toArray();
                var track_names = '';
                for(i=0;i<tracks.length;i++){
                    track_names += '<li>' + tracks[i].name + '</li>';
                }
                playlist_metadata_HTML.innerHTML += '<ol>' + track_names.toString() + '</ol>';
            });
    });


    // Search
    var my_search = Search.search('Kendrick Lamar');

    var search_artists = document.getElementById('search-artists');
    my_search.artists.snapshot().done(function(a){
        search_artists.innerHTML = '<h4>Artists (' + a.length + ')</h4>';
        var artist_results = [];
        a.loadAll('name').each(function(name) {
            artist_results.push(name.name);
        });
        search_artists.innerHTML += '<p>' + artist_results.join(', ') + '</p>';
    });

    var search_albums = document.getElementById('search-albums');
    my_search.albums.snapshot().done(function(a){
        search_albums.innerHTML = '<h4>Albums (' + a.length + ')</h4>';
    });

    var search_tracks = document.getElementById('search-tracks');
    my_search.tracks.snapshot().done(function(t){
        search_tracks.innerHTML = '<h4>Tracks (' + t.length + ')</h4>';
        t.loadAll('name').each(function(name){
            // console.log(name.name);
        });
    });

    var search_playlists = document.getElementById('search-playlists');
    my_search.playlists.snapshot().done(function(p){
        search_albums.innerHTML = '<h4>Playlists (' + p.length + ')</h4>';
        var playlist_results = [];
        p.loadAll('name').each(function(name) {
            playlist_results.push(name.name);
        });
        search_playlists.innerHTML += '<p>' + playlist_results.join(', ') + '</p>';
    });




    // Get info about a user
    var user = models.User.fromURI('spotify:user:magerleagues');
    user.load('username', 'name').done(function(user) {
      document.getElementById('user_info').innerHTML = user.image;
    });

    // Show share popup
    var shareHTML = document.getElementById('share-popup');
    var shareURI = 'spotify:track:249E7AgSyA4vhtXNEjQYb5';
    var rect = shareHTML.getBoundingClientRect();
    shareHTML.addEventListener('click', showSharePopup);

    function showSharePopup(){
      models.client.showShareUI(shareURI, 'Check out my jam',
        {x:((rect.width/2) + rect.left), y:rect.top});
    }

    
    // Drag content into an HTML element from Spotify
    var dropBox = document.querySelector('#drop-box');
    dropBox.addEventListener('dragstart', function(e){
        e.dataTransfer.setData('text/html', this.innerHTML);
        e.dataTransfer.effectAllowed = 'copy';
    }, false);

    dropBox.addEventListener('dragenter', function(e){
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.classList.add('over');
    }, false);

    dropBox.addEventListener('dragover', function(e){
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        return false;
    }, false);

    dropBox.addEventListener('drop', function(e){
        if (e.preventDefault) e.preventDefault();
        var drop = models.Playlist.fromURI(e.dataTransfer.getData('text'));
        console.log(drop);
        this.classList.remove('over');
        var success_message = document.createElement('p');
        success_message.innerHTML = 'Playlist successfully dropped: ' + drop.uri;
        this.appendChild(success_message);
    }, false);
    
    // Drag content into the sidebar
    models.application.addEventListener('dropped', function(){
        console.log(models.application.dropped);
    });


    // Get the user's location
    var loc = Location.query();
    loc.load(['latitude', 'longitude']).done(function(loc) {
      // Create a Google Maps object
      var myOptions = {
          zoom: 13,
          center: new google.maps.LatLng(loc.latitude, loc.longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map_object = new google.maps.Map(document.getElementById('map'), myOptions);
    });



    // Get user's top tracks
    var toplist = Toplist.forCurrentUser();
    var toplist_HTML = document.getElementById('toplist');
    toplist.tracks.snapshot().done(function(tracks) {
        for (var i = 0; i < tracks.length; i++) {
            var t = tracks.get(i);
            var link = document.createElement('li');
            var a = document.createElement('a');
            a.href = t.uri;
            link.appendChild(a);
            a.innerHTML = t.name;
            toplist_HTML.appendChild(link);
        }
    });




}); // require
