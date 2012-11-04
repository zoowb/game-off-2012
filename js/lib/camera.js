
function camera( world )
{
    var _world    = world;
    var _velocity = { 'x':0, 'y':0 };
    var _viewport = new gamejs.Rect([0, 0], [0, 0]);

    this.setWidth = function( width )
    {
        _viewport.width = width;
        return this;
    }

    this.setHeight = function( height )
    {
        _viewport.height = height;
        return this;
    }

    this.setPosition = function( x, y )
    {
        var oldX = _viewport.x;
        var oldY = _viewport.y;
        
        _viewport.x = x;
        _viewport.y = y;

        var newPosition = _getSanatisedPosition(x, y);
        _viewport.x = newPosition.x;
        _viewport.y = newPosition.y;
    
        _updateObjects((_viewport.x - oldX), (_viewport.y - oldY));

        return this;
    }

    this.focusOn = function( rect, animate )
    {
        if (typeof animate === "undefined")
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

        if ( !animate )
        {
            this.setPosition( newCameraX, newCameraY );
        }
        else
        {
            var newPosition = _getSanatisedPosition( newCameraX, newCameraY );
        }

        return this;
    }

    this.update = function( msDuration )
    {

    }

    var _getSanatisedPosition = function( x, y )
    {
        var position = { 'x': x, 'y': y };
        var level    = _world.getBoundingRect();

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

        if ( _viewport.collideLine(rightEdge[0], rightEdge[1]) )
        {
            position['x'] = (level.right - _viewport.width);
        }
        else if ( _viewport.collideLine(leftEdge[0], leftEdge[1]) )
        {
            position['x'] = level.left;
        }

        if ( _viewport.collideLine( topEdge[0], topEdge[1]) )
        {
            position['y'] = level.top;
        }
        else if ( _viewport.collideLine(bottomEdge[0], bottomEdge[1]) )
        {
            position['y'] = (level.bottom - _viewport.height);
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