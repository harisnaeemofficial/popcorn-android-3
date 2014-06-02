//var os = require('os');

(function (App) {
    'use strict';

    // use of darwin string instead of mac (mac os x returns darwin as platform)
    var ButtonOrder = {
        'win32': ['min', 'max', 'close'],
        'darwin': ['close', 'min', 'max'],
        'linux': ['min', 'max', 'close']
    };

    // workaround/patch until node-webkit and windows 8 maximise/unmaximize works correctly
    // vars initialised by first maximise call
    var win8x, win8y, win8h, win8w;

        var TitleBar = Backbone.Marionette.ItemView.extend({
        template: '#header-tpl',

        events: {
            'click .btn-os.os-max': 'maximize',
            'click .btn-os.os-min': 'minimize',
            'click .btn-os.os-close': 'closeWindow',
            'click .btn-os.fullscreen': 'toggleFullscreen'
        },

        initialize: function() {
            this.nativeWindow = window;
        },

        templateHelpers: {
            getButtons: function(){
                return ButtonOrder[App.Config.platform];
            }
        },

        maximize: function() {
            if(this.nativeWindow.fullscreenEnabled){
                this.nativeWindow.exitFullscreen();
            } else{
                if (window.screen.availHeight <= this.nativeWindow.height) {
                    this.nativeWindow.unmaximize();
                } else {
                    this.nativeWindow.maximize();
                }
            }
        },

        minimize: function() {
            this.nativeWindow.minimize();
        },

        closeWindow: function() {
            this.nativeWindow.close();
        },

        toggleFullscreen: function() {
            win.requestFullscreen();
            this.$el.find('.btn-os.fullscreen').toggleClass('active');
        }
    });

    App.View.TitleBar = TitleBar;
})(window.App);
