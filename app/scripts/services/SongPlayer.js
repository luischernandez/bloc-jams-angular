(function(){
    function SongPlayer($rootScope, Fixtures){
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
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
                stopSong(song);
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
        * @function: stopSong
        * @desc: stops song and sets current song to null
        */
        var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }

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
        * @desc: current playback time (in seconds) of currently playing song
        * @type: {number}
        */
        SongPlayer.currentTime = null;

        /*
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time){
            if (currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
        };

        /*
        * @desc: current volume
        * @type: {number}
        */
        SongPlayer.volume = 80;

        /*
        * @function: setVolume
        * @desc: set volume from 0-100
        * @type: {number}
        */
        SongPlayer.setVolume = function(volume){
            if(currentBuzzObject){
                currentBuzzObject.setVolume(volume);
            }
        };

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
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /*
        * @function
        * @desc: goes to next song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length-1){
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /*
        * @function
        * @desc: mutes song
        */
        SongPlayer.muteSong = function(){
            if(currentBuzzObject.isMuted() === false) {
                currentBuzzObject.mute();
                SongPlayer.mute = true; //this will allow the view to show mute icon
            } else {
                currentBuzzObject.unmute();
                SongPlayer.mute = false;
            }
        }



        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
