(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.heroTitle = "Turn the music up!";
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        //add albumData property that holds copy of albumPicasso
        //use ng-repeat
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
