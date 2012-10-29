
function playable()
{
    var _health    = 100;
    var _x         = 0.0;
    var _y         = 0.0;
    var _velocityX = 0.0;
    var _velocityY = 0.0;

    this.setX = function( x )
    {
        if ( typeof(x) != 'number')
        {
            throw 'Value for X must be a number';
        }

        _x = x;
        return this;
    }

    this.getX = function()
    {
        return _x;
    }

    this.setY = function( y )
    {
        if ( typeof(y) != 'number')
        {
            throw 'Value for Y must be a number';
        }

        _y = y;
        return this;
    }

    this.getY = function()
    {
        return _y;
    }

    this.setVelocity = function( x, y )
    {
        if ( typeof(x) != 'number')
        {
            throw 'Value for X must be a number';
        }

        if ( typeof(y) != 'number')
        {
            throw 'Value for Y must be a number';
        }

        _velocityX = x;
        _velocityY = y;
        return this;
    }

    this.getVelocity = function()
    {
        return { 'x':_velocityX, 'y':_velocityY };
    }
}