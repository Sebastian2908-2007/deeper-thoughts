import { useMutation } from "@apollo/client";
import { ADD_USER } from '../utils/mutations';
import { useState } from "react";
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  // prepare a mutation for adding a user
  const [addUser, {error}] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setFormState({
      ...formState,
      [name]: value,
    });
    
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    // use try catch for error handling instead of promises
    try {
      
      // execute addUSer mutation and pass in the variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      // use Auth object method login to store our token in localstorage
      Auth.login(data.addUser.token);

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            {error && <div>Sign Up Failed!</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
