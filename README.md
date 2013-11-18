# Spotify Apps API Tutorial

**This tutorial app uses an old version of the Spotify Apps API. You can find an updated tutorial app [checking out the 1.0 branch](https://github.com/spotify/apps-tutorial/tree/1.0), and an [upgrade guide](https://developer.spotify.com/technologies/apps/upgrade-guide/1.0.0) to move to the most recent API. Master branch will contain version 1.0 in the nearly future.**

This is a Spotify App that explains shows useful code snippets that can help you make a 
[Spotify Apps](https://developer.spotify.com/technologies/apps/). It uses version 0.x of 
the Spotify Apps API.

If you want to have a look at the tutorial that uses version 1.x of the Spotify Apps API, 
[check the 1.0 branch](https://github.com/spotify/apps-tutorial/tree/1.0).

![Spotify Apps Tutorial home screen](https://github.com/spotify/apps-tutorial/raw/0.X/img/screenshot.png)

## Installation

 1. Sign up for a [developer account on Spotify](https://developer.spotify.com/technologies/apps/#developer-account) by logging in and agreeing to the [terms of use](https://developer.spotify.com/technologies/apps/terms-of-use/).
 2. Create the Spotify folder if it doesn't exist already: `~/Spotify` (Mac OS X and Linux) or `My Documents\Spotify` (Windows).
 3. Open the Spotify folder.
 4. Run `git clone git://github.com/spotify/apps-tutorial.git api-tutorial`.
 5. Download the [latest version of Spotify](http://spotify.com/download).
 6. Open Spotify and type "spotify:app:api-tutorial" in the search bar (restart Spotify completely in case it doesn't find the App at first).

## More information

 * [API Reference](https://developer.spotify.com/technologies/apps/docs/)
 * [Integration Guidelines](http://developer.spotify.com/download/spotify-apps-api/guidelines/)
 * [Spotify-tagged questions on StackOverflow](http://stackoverflow.com/questions/tagged/spotify)
 * [@SpotifyPlatform](https://twitter.com/#!/SpotifyPlatform) on Twitter

Your feedback is welcome! Feel free to create issues and send pull requests.

## Topics covered

#### Getting started

 * Creating your manifest file
 * Handling arguments and creating navigational tabs
 * Dragging and dropping content into an app
 * Show "Share" popup

#### UI

 * Using standard components for buttons
 * Showing a list of tracks

#### Playing music

 * Play a single song
 * Play a list of songs
 * Get the currently playing track
 * Create a play/pause button with an HTML element
 * Skip to the next or previous track
 * Star and unstar a track
 * Get a user's top tracks

#### Searching

 * Returning all tracks with a given search query
 * Search albums for an artist

#### Playlists

 * Add a song to a playlist
 * Get songs from a playlist URL
 * Subscribe to a playlist
 * Showing a playlist mosaic image

#### Interacting with Facebook

 * Authenticate a user with Facebook
 * Get a user's listening history from Facebook

#### Experimental & Unsupported

 * Talking to Twitter
 * Create an EchoNest radio station
 * Display a Polymaps object
