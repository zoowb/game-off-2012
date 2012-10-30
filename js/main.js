gamejs = require('gamejs');
gamejs.preload(['img/player.png']);

gamejs.ready(function() {

    var display = gamejs.display.setMode([800, 600]);

    $('head').append('<script type="text/javascript" src="js/lib/io.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/andGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/orGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/notGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/playable.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/player.js"></script>');

    var p = new player();

    var mainSurface = gamejs.display.getSurface();

    // msDuration = time since last tick() call
    var tick = function(msDuration) {
        mainSurface.fill("#FFFFFF");
        // update and draw the ships
        p.update(msDuration);
        p.draw(mainSurface);
    };

    gamejs.time.fpsCallback(tick, this, 60);
});
