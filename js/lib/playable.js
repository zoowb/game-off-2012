/**
 * Represents a playable sprite. This is manipulated by the player object which
 * determines which playable should be modified
 *
 * @author David North
 */
function playable()
{
    //Load the variables required by gamejs.sprite.Sprite
    playable.superConstructor.apply(this, [0, 0]);
    this.image = gamejs.image.load('img/player.png');

    this.rect = new gamejs.Rect([0, 0]);

    /**
     * @var int The amount of health the playable has
     */
    var _health    = 100;

    /**
     * @var float The velocity left to right that the playable is experiencing
     */
    var _velocityX = 0.0;

    /**
     * @var float The velocity bottom to top that this playable is experiencing
     */
    var _velocityY = 0.0;


    var _moveType = '';

    this.setMovement = function( type ){
        if ( type != _moveType )
        {
            var oldSize = this.image.getSize();

            switch(type)
            {
                case 'walk':
                    this.image.crop( new gamejs.Rect([0,0], [46,55] ));
                    break;
                case 'jump':
                    this.image.crop( new gamejs.Rect([0,55], [46,69] ));
                    break;
                case 'fall':
                    this.image.crop( new gamejs.Rect([46,55], [46,69] ));
                    break;
            }

            var _size        = this.image.getSize();
            this.rect.width  = _size[0];
            this.rect.height = _size[1];

            this.rect.x += oldSize[0] - _size[0];
            this.rect.y += oldSize[1] - _size[1];

            _moveType = type;
        }
    }

    this.getMovement = function()
    {
        return _moveType;
    }

    this.setPosition = function(x, y)
    {
        this.setX(x);
        this.setY(y);

        return this;
    }

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

        this.rect.x = x;
        return this;
    }

    /**
     * Gets the current X position
     *
     * @return float
     */
    this.getX = function()
    {
        return this.rect.x;
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

        this.rect.y = y;
        return this;
    }

    /**
     * Gets the current Y position
     *
     * @return float
     */
    this.getY = function()
    {
        return this.rect.y;
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

    this.update = function( msDuration )
    {
        if ( _moveType == '' )
        {
            this.setMovement('walk');
        }

        if ( this.getVelocity().y > 0 )
        {
            this.setMovement('fall');
        }

        var distanceX = (this.getVelocity().x * (msDuration/1000));
        var distanceY = (this.getVelocity().y * (msDuration/1000));

        this.rect.moveIp( distanceX, distanceY );
    }
}

//Extend the playable object so that the parent is the sprite
gamejs.utils.objects.extend(playable, gamejs.sprite.Sprite);
