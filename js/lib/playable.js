/**
 * Represents a playable sprite. This is manipulated by the player object which
 * determines which playable should be modified
 *
 * @author David North
 */
function playable()
{
    //Load the variables required by gamejs.sprite.Sprite
    playable.superConstructor.apply(this, []);
    this.image = gamejs.image.load('img/player.png');
    this.rect = new gamejs.Rect([]);

    //Load the variables that will be used to add additional functionality to
    //this sprite

    /**
     * @var int The amount of health the playable has
     */
    var _health    = 100;

    /**
     * @var float The X position of this playable
     */
    var _x         = 0.0;

    /**
     * @var float The Y position of this playable
     */
    var _y         = 0.0;

    /**
     * @var float The velocity left to right that the playable is experiencing
     */
    var _velocityX = 0.0;

    /**
     * @var float The velocity bottom to top that this playable is experiencing
     */
    var _velocityY = 0.0;

    /**
     * Sets the X value of the playable (useful when initiating a new playable,
     * teleporting, etc)
     *
     * @param float x
     *
     * @return playable
     */
    this.setX = function( x )
    {
        if ( typeof(x) != 'number')
        {
            throw 'Value for X must be a number';
        }

        _x = x;
        return this;
    }

    /**
     * Gets the current X position
     *
     * @return float
     */
    this.getX = function()
    {
        return _x;
    }

    /**
     * Sets the Y value of the playable (useful when initiating a new playable,
     * teleporting, etc)
     *
     * @param float y
     *
     * @return playable
     */
    this.setY = function( y )
    {
        if ( typeof(y) != 'number')
        {
            throw 'Value for Y must be a number';
        }

        _y = y;
        return this;
    }

    /**
     * Gets the current Y position
     *
     * @return float
     */
    this.getY = function()
    {
        return _y;
    }

    /**
     * Sets the velocity of the playable so that the speed in one way or
     * another can be set
     *
     * @param float x The velocity left to right
     * @param float y The velocity bottom to top
     *
     * @return playable
     */
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

    /**
     * Gets the X and Y velocity for this playable object by returning an object
     * with an x and y parameter
     *
     * @return object
     */
    this.getVelocity = function()
    {
        return { 'x':_velocityX, 'y':_velocityY };
    }
}

//Extend the playable object so that the parent is the sprite
gamejs.utils.objects.extend(playable, gamejs.sprite.Sprite);
