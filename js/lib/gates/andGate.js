function andGate()
{
    this.setState = function( state )
    {
        state = true;

        for( var i = 0; i < this.getInputs().length; i++ )
        {
            if ( !(this.getInputs()[i].getState()) )
            {
                state = false;
                break;
            }
        }

        andGate.prototype.setState.call(this, state);
    }
}

andGate.prototype =  new io();
