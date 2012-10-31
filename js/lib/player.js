/**
 * Represents a player. Players have control over multiple playables, but only
 * one playable at a time.
 *
 * @author David North
 */
function player()
{
    /**
     * @var array An array of playables at the players disposal
     */
    var _playables = new gamejs.sprite.Group();
    _playables.add( new playable() );

    /**
     * @var int The current index of the playable currently under the
     * players control
     */
    var _currentIndex = 0;

    this.setVelocity = function( x, y )
    {
        var playable = this.getCurrentPlayable();
        playable.setVelocity( x, y );

        return this;
    }

    this.getVelocity = function()
    {
        return this.getCurrentPlayable().getVelocity();
    }

    this.jump = function()
    {

    }

    this.update = function( msDuration )
    {
        _playables.update( msDuration );
        return this;
    }

    /**
     * Draws all of the playable objects to the surface
     *
     * @param object mainSurface
     *
     * @return player
     */
    this.draw = function( mainSurface )
    {
        _playables.draw( mainSurface );
        return this;
    }

    /**
     * Moves to the next available playable for control. If the last playable
     * is selected then the first element is sed instead
     *
     * @return player
     */
    this.moveToNext = function()
    {
        if ( (_currentIndex + 1) == _playables.length )
        {
            _currentIndex = 0;
        }
        else
        {
            _currentIndex++
        }

        return this;
    }

    /**
     * Gets all of the playables available to the player
     *
     * @return array
     */
    this.getPlayables = function()
    {
        return _playables;
    }

    /**
     * Gets the current playable object that the player is in control of
     *
     * @return playable
     */
    this.getCurrentPlayable = function()
    {
        return _playables.sprites()[_currentIndex];
    }

    /**
     * Clones the current playable and adds it to the playables at the players
     * disposal
     *
     * @return player
     */
    this.clone = function()
    {
        var clone = new playable();
        clone.setX( this.getCurrentPlayable().getX() - 100 )

        _playables.add( clone );

        return this;
    }
}
