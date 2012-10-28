function notGate()
{
    this.addInput = function( input )
    {
        if ( this.getInputs().length )
        {
            throw 'You may only have one input assigned to a Not gate';
        }

        notGate.prototype.addInput.call(this, input);
    }

    this.setState = function( state )
    {
        notGate.prototype.setState.call(this, !state);
    }
}

notGate.prototype =  new io();