/**
 * Simulates a NOT gate in JavaScript. As an io object this can be used to
 * chain together logic operators and objects
 *
 * @author David North
 */
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

    /**
     * Overrides the setState method of the parent so that the state that this
     * object is set to is the opposite to that provided
     *
     * @param boolean state The state to apply
     *
     * @return notGate
     */
    this.setState = function( state )
    {
        notGate.prototype.setState.call(this, !state);
    }
}

//Set the parent of the notGate to io
notGate.prototype =  new io();
