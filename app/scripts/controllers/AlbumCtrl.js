(function() {
    function AlbumCtrl(Fixtures) {
        this.heroTitle = "Turn the music up!";
        this.albumData = Fixtures.getAlbum();
        //add albumData property that holds copy of albumPicasso
        //use ng-repeat
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
