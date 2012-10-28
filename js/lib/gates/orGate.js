function orGate()
{
    this.setState = function( state )
    {
        state = false;

        for( var i = 0; i < this.getInputs().length; i++ )
        {
            if ( this.getInputs()[i].getState() )
            {
                state = true;
                break;
            }
        }

        orGate.prototype.setState.call(this, state);
    }
}

orGate.prototype =  new io();