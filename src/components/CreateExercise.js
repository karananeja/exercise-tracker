import axios from '../axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    axios
      .post('/exercises/add', exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setUsername('');
    setDescription('');
    setDuration(0);
    setDate(new Date());
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='p-2'>Username: </label>
          <input
            type='text'
            required
            className='form-control mt-3 mb-3'
            value={username}
            onChange={(e) => onChangeUsername(e)}
          ></input>
        </div>
        <div className='form-group'>
          <label className='p-2'>Description: </label>
          <input
            type='text'
            required
            className='form-control mt-3 mb-3'
            value={description}
            onChange={(e) => onChangeDescription(e)}
          />
        </div>
        <div className='form-group'>
          <label className='p-2'>Duration (in minutes): </label>
          <input
            type='text'
            required
            className='form-control mt-3 mb-3'
            value={duration}
            onChange={(e) => onChangeDuration(e)}
          />
        </div>
        <div className='form-group'>
          <label className='p-2'>Date: </label>
          <div>
            <DatePicker
              className='form-control mt-3 mb-3'
              selected={date}
              onChange={(date) => onChangeDate(date)}
            />
          </div>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
