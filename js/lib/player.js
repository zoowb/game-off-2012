
function player()
{
    var _playables    = [new playable()];
    var _currentIndex = 0;
    var _jumping      = false;

    this.moveX = function( x )
    {

    }

    this.moveY = function( y )
    {

    }

    this.jump = function()
    {

    }

    this.tabToNext = function()
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

    this.getCurrentPlayable = function()
    {
        return _playables[_currentIndex];
    }

    this.clone = function()
    {
        _playables.push( jQuery.extend({}, _playables[_currentIndex]) );
        return this;
    }

    this.getPlayables = function()
    {
        return _playables;
    }
}