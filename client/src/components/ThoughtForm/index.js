import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

const ThoughtForm = () => {
    const [thoughtText, setText]= useState('');
    const [characterCount, setCharacterCount] = useState(0);
    // declare our mutation function
    const [addThought, {error}] = useMutation(ADD_THOUGHT, {
        // below addThought represents the new thought that was just created
        update(cache, { data: { addThought } }) {
            try { 
            // read whats currently in the cache could potentially not exist yet, so wrap in a try...catch
            const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

            // preappend the newest thought to the front of the array
            cache.writeQuery({
                query: QUERY_THOUGHTS,
                data: { thoughts: [addThought, ...thoughts] }
            });
        } catch (e) {
            console.error(e);
        }

        // update me objects cache appending new thought to the end of the array the varname to be in {} should be the same as the type the query returns in the typeDefs
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
            query: QUERY_ME,
            data:{ me: { ...me, thoughts: [...me.thoughts, addThought]}}
        });
        }
    });

    // function for setting values as the user types
    const handleChange = event => {
        if (event.target.value.length <= 280) {
           setText(event.target.value);
           setCharacterCount(event.target.value.length);
        }
    };
    // submit handler
    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
            // add thought to data base
            await addThought({
                variables: { thoughtText }
            });
            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error': ''}`}>
                Character Count: {characterCount}/280 {error && <span className="m1-2">Something went wrong...</span>}    
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
                <textarea
                placeholder="Heres a new thought..."
                value={thoughtText}
                className="form-input col-12 col-md-9"
                onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ThoughtForm;