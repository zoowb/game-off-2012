gamejs = require('gamejs');
gamejs.preload([
    'img/player.png','img/block.png', 'img/blank.png'
    ,'img/switch.png','img/door.png'
]);

gamejs.ready(function() {

    var display = gamejs.display.setMode([800, 600]);

    gamejs.Surface.prototype.crop = function ( rect )
    {
        if ( typeof(this._originalImg) == 'undefined' )
        {
            var size = this.getSize();
            this._originalImg = new gamejs.Surface([size[0], size[1]]);
            
            var originalSize = new gamejs.Rect(0, 0, size[0], size[1]);
            this._originalImg.blit(this, originalSize, originalSize);
        }

        this.clear();

        var newPos = new gamejs.Rect([0,0], [rect.width, rect.height]);
        this.blit( this._originalImg, newPos, rect);
    }

    $('head').append('<script type="text/javascript" src="js/lib/camera.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/world.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/io.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/lever.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/door.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/andGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/orGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/notGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/playable.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/block.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/player.js"></script>');

    var mainSurface = gamejs.display.getSurface();
    var lvl         = new world();

    //Initialise the world
    lvl.init( mainSurface );

    // msDuration = time since last tick() call
    var tick = function(msDuration)
    {
        mainSurface.fill("#FFFFFF");

        //Handle user input
        lvl.handleInput();

        //Update the worlds objects
        lvl.update( msDuration );

        //Draw the new objects
        lvl.draw( mainSurface );
    };

    gamejs.time.fpsCallback(tick, this, 60);
});
