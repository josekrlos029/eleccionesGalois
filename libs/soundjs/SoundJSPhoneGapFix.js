window.enableSoundJSOnPhoneGap = function() {
 createjs.WebAudioPlugin.isSupported = function () {
    // check if this is some kind of mobile device, Web Audio works with local protocol under PhoneGap
    var isMobilePhoneGap = ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|ipod|android|blackberry)/g) ? true : false );
    if (location.protocol == "file:" && !isMobilePhoneGap) { return false; }  // Web Audio requires XHR, which is not available locally
    createjs.WebAudioPlugin.generateCapabilities();
    if (createjs.WebAudioPlugin.context == null) {
      return false;
    }
    return true;
  };
}

if ( createjs && createjs.WebAudioPlugin ) {
  window.enableSoundJSOnPhoneGap();
} else {
  window.addEventListener('load', function() {
    window.enableSoundJSOnPhoneGap();
  });
}