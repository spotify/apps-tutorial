/* Code by Andrew Mager */
window.onload = function() {
    sp = getSpotifyApi(1);
    var models = sp.require('sp://import/scripts/api/models');
    var views = sp.require('sp://import/scripts/api/views');
    
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

}
