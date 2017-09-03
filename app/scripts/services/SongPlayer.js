(function(){
    function SongPlayer(){
        var SongPlayer = {};

        var currentSong = null;
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
                currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            currentSong = song;
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
        * @desc: sets current song and plays song. calls playSong function
        */
        SongPlayer.play = function(song){
            if(currentSong !== song){
                setSong(song);
                playSong(song);
            } else if(currentSong === song){
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /*
        * @desc: pauses current song, sets song.playing to false
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
