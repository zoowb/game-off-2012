/**
 * Represents the game world, containing the game logic and sprites that
 * require rendering
 *
 * @author David North
 */
function world()
{
    //The maximum X velocity a player can trvel (heading right)
    const MAX_X_VELOCITY = 200;

    //The maximum Y velocity a player can trvel (heading down)
    const MAX_Y_VELOCITY = 200;

    //The minimum X velocity a player can trvel (heading left)
    const MIN_X_VELOCITY = -200;

    //The minimum Y velocity a player can trvel (heading up)
    const MIN_Y_VELOCITY = -200;

    /**
     * @var boolean Whether the world has fully loaded
     */
    var _hasLoaded = false;

    /**
     * @var camera The camera to use
     */
    var _camera = new camera( this );

    /**
     * @var gamejs.sprite.Sprite Represents the bounding box (and background)
     * of a level
     */
    var _level = new gamejs.sprite.Sprite();

    /**
     * @var player Represents the player
     */
    var _p  = new player();

    /**
     * @var gamejs.sprite.Group Represents all objects a player can
     * interact with
     */
    var _objects  = new gamejs.sprite.Group();

    /**
     * Main initiation method. Must be called before using the object
     *
     * @param object mainSurface the surface that everything will be drawn to
     *
     * @return world
     */
    this.init = function( mainSurface )
    {
        _level.rect = new gamejs.Rect([0, 0], [0, 0]);
        _level.image = gamejs.image.load('img/blank.png');

        _camera.setWidth( mainSurface.getSize()[0] );
        _camera.setHeight( mainSurface.getSize()[1] );

        $.ajax({
            "url": "js/lib/levels/level_1.js",
            "dataType": "json",
            "success": function(data){
                _loadLevel(data);
                _camera.focusOn(_p.getCurrentPlayable().rect, true);
                _hasLoaded = true;
            },
            "error": function(jqXHR, textStatus, errorThrown){
                throw errorThrown;
            }
        });

        return this;
    }

    this.getBoundingRect = function()
    {
        return _level.rect;
    }

    this.getObjects = function()
    {
        return [ _p.getPlayables(), _objects ]
    }

    /**
     * Handles user input and modifies the world objects accordingly
     *
     * @return world
     */
    this.handleInput = function()
    {
        if ( _hasLoaded )
        {
            //Loop through each game event (key presses mouse movements etc)
            gamejs.event.get().forEach(function(event)
            {
                //If a key has been pressed then check it to see if an
                //action needs taking place
                if ( event.type === gamejs.event.KEY_DOWN )
                {
                    switch( event.key )
                    {
                        //The space key denotes a jump. The player is not allowed
                        //to jump if they are already falling or jumping
                        case gamejs.event.K_SPACE:
                            if (  _p.getVelocity().y === 0 )
                            {
                                _p.setVelocity( _p.getVelocity().x, MIN_Y_VELOCITY );
                            }
                            break;

                        //The A key, or left arrow starts to move the player left
                        case gamejs.event.K_a:
                        case gamejs.event.K_LEFT:
                            _p.setVelocity( MIN_X_VELOCITY, _p.getVelocity().y );
                            break;

                        //The D key, or right arrow starts to move the player right
                        case gamejs.event.K_d:
                        case gamejs.event.K_RIGHT:
                            _p.setVelocity( MAX_X_VELOCITY, _p.getVelocity().y );
                            break;

                        //The C key clones a playable, so that the player can use
                        //that instead
                        case gamejs.event.K_c:
                            _p.clone();
                            break;

                        //The Tab key switches between the playables that the
                        //player can control
                        case gamejs.event.K_TAB:
                            _p.moveToNext();
                            _camera.focusOn(_p.getCurrentPlayable().rect, true, true);
                    }
                }

                //At the moment, lifting the direction controlls stops the player
                //dead. If we have time this should be changed to allow blocks
                //to have drag
                if ( event.type === gamejs.event.KEY_UP)
                {
                    switch( event.key )
                    {
                        case gamejs.event.K_a:
                        case gamejs.event.K_d:
                        case gamejs.event.K_LEFT:
                        case gamejs.event.K_RIGHT:
                            _p.setVelocity( 0, _p.getVelocity().y );
                            break;
                    }
                }
            });
        }

        return this;
    }

    /**
     * Updates all objects within the world
     *
     * @param int msDuration The amount of time since the last update
     *
     * @return world
     */
    this.update = function( msDuration )
    {
        if ( _hasLoaded )
        {
            //Apply the gravitational pull of the world
            _applyGravity();

            //Apply updates to the player and any objects in the world
            _p.update( msDuration );

            _objects.update( msDuration );

            //Apply the collision detection, including any minor amends to object
            //x and y positions
            _applyCollisions();

            //Update the level background with any animations or amends
            _level.update( msDuration );

            //Modify the camera position
            _camera.update ( msDuration );
        }

        return this;
    }

    /**
     * Draws all objects within the world
     *
     * @return this
     */
    this.draw = function ( mainSurface )
    {
        if ( _hasLoaded )
        {
            //Draw the level, collidables and non collidables, as these need to be
            //behind the player
            _level.draw ( mainSurface );
            _objects.draw( mainSurface );

            //Draw the player at the forefront of the level
            _p.draw( mainSurface );
        }

        return this;
    }

    /**
     * Loads the level data from an array, filling the worls with collidables
     * and ensuring it's playable
     */
    var _loadLevel = function( data, input )
    {
        var _hasPlayer = false;
        for ( var i = 0; i < data.length; i ++)
        {
            var xAmount = 1;
            var yAmount = 1;

            if ( typeof(data[i]['repeat-x']) != 'undefined')
            {
                xAmount = data[i]['repeat-x'];
            }

            if ( typeof(data[i]['repeat-y']) != 'undefined')
            {
                yAmount = data[i]['repeat-y'];
            }

            for ( var x = 0; x < xAmount; x++ )
            {
                for ( var y = 0; y < yAmount; y++ )
                {
                    var obj = null;

                    switch ( data[i]['type'] )
                    {
                        case 'wall':
                            obj = new block();
                            _objects.add( obj );
                            break;
                        case 'lever':
                            obj = new lever();
                            _objects.add( obj );
                            break;
                        case 'door':
                            obj = new door();
                            _objects.add( obj );
                            break;
                        case 'player':
                            obj = _p.getCurrentPlayable();
                    }

                    if ( null != obj )
                    {
                        if ( obj instanceof io )
                        {
                            if ( typeof(data[i]['outputs']) !== 'undefined' )
                            {
                                _loadLevel(data[i]['outputs'], obj)
                            }

                            if ( typeof(input) !== 'undefined' )
                            {
                                //obj.addInput(input);
                            }
                        }
                        var width  = obj.image.getSize()[0];
                        var height = obj.image.getSize()[1];

                        var xPos = (data[i]['x'] + (width * x));
                        var yPos = (data[i]['y'] + (height * y));

                        obj.setPosition( xPos, yPos );
                    }
                }
            }
        }
    }

    /**
     * Applies the gravitational pull of the world on all playables
     */
    var _applyGravity = function()
    {
        //Loop through each player and increase the Y velocity downward.
        //If the player is jumping, this has the affect of slowing the
        //player down. Otherwise the player is falling.
        _p.getPlayables().forEach(function(obj){
            obj.setVelocity( obj.getVelocity().x, (obj.getVelocity().y + 10) )

            //the velocity cannot exceed the maximums, so ensuer that the player
            //is not falling too fast
            _sanatiseVelocity(obj);
        });
    }

    /**
     * Ensures that the player is not travelling too fast ion any direction
     */
    var _sanatiseVelocity = function(obj)
    {
        //Get the current Velocity
        var velocity = obj.getVelocity();

        //Make sure that the X velocity is not too slow or fast
        velocity.x = Math.max( MIN_X_VELOCITY, velocity.x );
        velocity.x = Math.min( MAX_X_VELOCITY, velocity.x );

        //Make sure that the Y velocity is not too slow or fast
        velocity.y = Math.max( MIN_Y_VELOCITY, velocity.y );
        velocity.y = Math.min( MAX_Y_VELOCITY, velocity.y );

        //Update the players velocity
        obj.setVelocity( velocity.x, velocity.y );
    }

    /**
     * Applies collision detection to all playables
     */
    var _applyCollisions = function()
    {
        //Check collision of playables against collidables
        var colliders = 
            gamejs.sprite.groupCollide(_p.getPlayables(), _objects);

        //Loop through all objects that have collided to check which edge they
        //collided with
        for( var i = 0; i < colliders.length; i++ )
        {
            //Set up the colliding obvjects
            var playable = colliders[i].a;
            var block    = colliders[i].b;

            //Define the top edge (left to right, along the top of the
            //colliding block)
            var topEdge = [
                [block.rect.left, block.rect.top],
                [block.rect.right, block.rect.top]
            ];

            //Define the top edge (left to right, along the bottom of the
            //colliding block)
            var bottomEdge = [
                [block.rect.left, block.rect.bottom],
                [block.rect.right, block.rect.bottom]
            ];

            //Define the left edge (top to bottom, along the left of the
            //colliding block)
            var leftEdge = [
                [block.rect.left, block.rect.top],
                [block.rect.left, block.rect.bottom]
            ];

            //Define the right edge (top to bottom, along the right of the
            //colliding block)
            var rightEdge = [
                [block.rect.right, block.rect.top],
                [block.rect.right, block.rect.bottom]
            ];

            //Check the top and bottom colliision points. If a collision is
            //detected then set the velocity on the Y axis to zero and move
            //the playable so that it is no longer colliding
            if ( playable.rect.collideLine(topEdge[0], topEdge[1]) )
            {
                playable.setVelocity( playable.getVelocity().x, 0 );
                playable.rect.bottom = (block.rect.top - 0.1);
            }
            else if ( playable.rect.collideLine(bottomEdge[0], bottomEdge[1]) )
            {
                playable.setVelocity( playable.getVelocity().x, 0 );
                playable.rect.top = (block.rect.bottom + 0.1);
            }

            //Check the left and right colliision points. If a collision is
            //detected then set the velocity on the X axis to zero and move
            //the playable so that it is no longer colliding
            if ( playable.rect.collideLine(leftEdge[0], leftEdge[1]) )
            {
                playable.setVelocity( 0, playable.getVelocity().y );
                playable.rect.right = (block.rect.left - 0.1);

            }
            else if ( playable.rect.collideLine(rightEdge[0], rightEdge[1]) )
            {
                playable.setVelocity( 0, playable.getVelocity().y );
                playable.rect.left = (block.rect.right + 0.1);
            }
        }
    }
}