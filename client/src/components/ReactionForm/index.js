import { useState } from "react";
import { ADD_REACTION } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const ReactionForm = ({ thoughtId }) => {
    // state for reaction text
    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    // my add reaction mutation variables
      const [addReaction, {error}] = useMutation(ADD_REACTION);

    // this funtion captures and sets the state values with every keystroke
    const handleChange = event => {
       if(event.target.value.length <= 280) {
           setBody(event.target.value);
           setCharacterCount(event.target.value.length);
       }
    };

    // submit form function
    const handleFormSubmit = async event => {
        
        event.preventDefault();
        try { 
            // call our mutation to add reaction and give it some variables
           await addReaction({
                variables: {thoughtId, reactionBody}
            });
        setBody('');
        setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div>
           <p className={`m-0 ${characterCount === 280 || error ? 'text-error': ''}`}>
                Character Count: {characterCount}/280  {error && <span className="m1-2">Something isn't right!...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}  >
                <textarea
                 placeholder="Leave your Reaction to this thought..."
                 value={reactionBody}
                 className="form-input col-12 col-md-3" 
                 onChange={handleChange}
                 ></textarea>

                 <button className="btn col-12 col-md-3" type="submit">
                     Submit 
                 </button>
                
            </form>
        </div>
    );
};

export default ReactionForm;