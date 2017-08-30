(function() {
    function AlbumCtrl() {
        this.heroTitle = "Turn the music up!";
        this.albumData = albumPicasso;
        //add albumData property that holds copy of albumPicasso
        //use ng-repeat
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
