import React, { useState } from 'react';
import axios from '../axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
    };

    axios
      .post('/users/add', user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setUsername('');
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='p-2'>Username: </label>
          <input
            type='text'
            required
            className='form-control mt-3 mb-3'
            value={username}
            onChange={(e) => onChangeUsername(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create User'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
