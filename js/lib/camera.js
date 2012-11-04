/**
 * Represents the a camera, which is capable of panning around the world
 *
 * @author David North
 */
function camera( world )
{
    //The maximum speed that the camera can move at
    const MAX_VELOCITY = 200;

    /**
     * @var world The world that is being looked at
     */
    var _world = world;

    /**
     * @var boolean|gamejs.Rect Whether or not the camera is currently
     * tracking an object. This variable contains the object being tracked if so.
     */
    var _track = false;

    /**
     * @var boolean Whether or not the camera is animating to position
     */
    var _animating = false;

    /**
     * @var gamejs.Rect The size and position of the viewport
     * (what the player can see)
     */
    var _viewport  = new gamejs.Rect([0, 0], [0, 0]);

    /**
     * Sets the width of the viewport
     *
     * @param float width
     *
     * @return camera
     */
    this.setWidth = function( width )
    {
        if ( typeof(width) != 'number' )
        {
            throw 'Width must be a number';
        }

        _viewport.width = width;
        return this;
    }

    /**
     * Sets the height of the viewport
     *
     * @param float height
     *
     * @return camera
     */
    this.setHeight = function( height )
    {
        if ( typeof(height) != 'number' )
        {
            throw 'Height must be a number';
        }

        _viewport.height = height;
        return this;
    }

    /**
     * Sets the new position of the camera. Sanatises the position so that it
     * never looks outside of the world
     *
     * @param float x
     * @param float y
     *
     * @return camera
     */
    this.setPosition = function( x, y )
    {
        if ( typeof(x) != 'number' )
        {
            throw 'X position must be a number';
        }

        if ( typeof(y) != 'number' )
        {
            throw 'Y position must be a number';
        }

        //Get the last position that the camera was at before being moved
        var oldX = _viewport.x;
        var oldY = _viewport.y;

        //Sanitise the position and set the camera
        var newPosition = _getSanatisedPosition(x, y);
        _viewport.x = newPosition.x;
        _viewport.y = newPosition.y;

        //Update the objects in the world (i.e. shift them, the number of pixels
        //the camera has 'moved', giving the impression of movement)
        _updateObjects((_viewport.x - oldX), (_viewport.y - oldY));

        return this;
    }

    this.focusOn = function( rect, track, animate )
    {
        if (typeof(track) === "undefined")
        {
            track = false;
        }
        else if ( typeof(track) !== 'boolean' )
        {
            throw 'Optional track flag must be a boolean';
        }

        if (typeof(animate) === "undefined")
        {
            animate = false;
        }
        else if ( typeof(animate) !== 'boolean' )
        {
            throw 'Optional animate flag must be a boolean';
        }

        //The new Camera position should have the middle of the camera pointing
        //at the middle of the object
        var newCameraX = rect.center[0] - (_viewport.width / 2);
        var newCameraY = rect.center[1] - (_viewport.height / 2);

        if ( track )
        {
            _track = rect;
        }
        else
        {
            _track = false;
        }

        if ( !animate )
        {
            this.setPosition( newCameraX, newCameraY );
        }
        else
        {
            _animating = true;
        }

        return this;
    }

    this.update = function( msDuration )
    {
        if ( _track )
        {
            var destinationX = _track.center[0] - (_viewport.width / 2);
            var destinationY = _track.center[1] - (_viewport.height / 2);

            destinationX += _viewport.x
            destinationY += _viewport.y

            if ( _animating )
            {
                var pos = _getNextAnimatedPosition(destinationX, destinationY, msDuration);

                destinationX = pos.x;
                destinationY = pos.y;
            }

            this.setPosition( destinationX, destinationY );
        }
    }

    var _getSanatisedPosition = function( x, y )
    {
        var position = { 'x': x, 'y': y };
        var level    = _world.getBoundingRect();

        var collideTest = new gamejs.Rect([x, y], [_viewport.width, _viewport.height]);

        var rightEdge = [
            [level.right, level.top],
            [level.right, level.bottom]
        ];

        var leftEdge = [
            [level.left, level.top],
            [level.left, level.bottom]
        ];

        var topEdge = [
            [level.left, level.top],
            [level.right, level.top]
        ];

        var bottomEdge = [
            [level.left, level.bottom],
            [level.right, level.bottom]
        ];

        if ( collideTest.collideLine(rightEdge[0], rightEdge[1]) )
        {
            position['x'] = level.right - collideTest.width;
        }
        else if ( collideTest.collideLine(leftEdge[0], leftEdge[1]) )
        {
            position['x'] = level.left;
        }

        if ( collideTest.collideLine( topEdge[0], topEdge[1]) )
        {
            position['y'] = level.top;
        }
        else if ( collideTest.collideLine(bottomEdge[0], bottomEdge[1]) )
        {
            position['y'] = (level.bottom - collideTest.height);
        }

        return position;
    }

    var _getNextAnimatedPosition = function( destinationX, destinationY, msDuration )
    {
        var sanePosition = _getSanatisedPosition(destinationX, destinationY);

        var position  = { 'x': sanePosition.x, 'y': sanePosition.y };

        var targetX   = position.x;
        var targetY   = position.y;
        var deltaX    = _viewport.x - targetX;
        var deltaY    = _viewport.y - targetY;
        var velocityX = velocityY = MAX_VELOCITY;

        if ( Math.abs(deltaX) > Math.abs(deltaY) )
        {
            if ( 0 != deltaY )
            {
                velocityY *= (deltaX / deltaY);
            }
        }
        else if ( Math.abs(deltaX) < Math.abs(deltaY) )
        {
            if ( 0 != deltaX )
            {
                velocityX *= (deltaX / deltaY);
            }
        }

        if ( 0 === deltaY )
        {
            velocityY = 0;
        }

        if ( 0 === deltaX )
        {
            velocityX = 0;
        }

        if ( deltaX < 0 )
        {
            position.x = _viewport.x + ( velocityX * (msDuration / 1000) );
        }
        else
        {
            position.x = _viewport.x - ( velocityX * (msDuration / 1000) );
        }

        if ( deltaY < 0 )
        {
            position.y = _viewport.y + ( velocityY * (msDuration / 1000) );
        }
        else if ( deltaY < 0 )
        {
            position.y = _viewport.y - ( velocityY * (msDuration / 1000) );
        }

        if ( (position.x >= targetX + 10) || (position.x <= targetX - 10) )
        {
            if ( (position.y >= targetY + 10) || (position.y <= targetY - 10) )
            {
                position = { 'x': targetX, 'y': targetY };
                _animating = false;
            }
        }

        return position;
    }

    var _updateObjects = function( distanceX, distanceY )
    {
        var objects = _world.getObjects();
        for ( var i = 0; i < objects.length; i++)
        {
            objects[i].forEach(function(obj){
                obj.rect.x -= distanceX;
                obj.rect.y -= distanceY;
            });
        }
    }
}