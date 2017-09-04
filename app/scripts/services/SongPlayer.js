(function(){
    function SongPlayer(Fixtures){
        var SongPlayer = {};

        /*
        * @desc: holds info of current Album
        */
        var currentAlbum = Fixtures.getAlbum();

        /*
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /*
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song){
            if(currentBuzzObject){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            SongPlayer.currentSong = song;
        };

        //Assignment cp7 pt2
        /*
        * @function: playSong
        * @desc: plays the current song and sets the song.playing property to true
        * @param: {Object} song
        */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };

        /*
        * @function: getSongIndex
        * @desc: gets the current album song index
        * @param: {Object} song
        */
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };

        /*
        * @desc: active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /*
        * @desc: sets current song and plays song. calls playSong function
        */
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
            } else if(SongPlayer.currentSong === song){
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /*
        * @function
        * @desc: pauses current song, sets song.playing to false
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /*
        * @function
        * @desc: goes to prev song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex<0){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
