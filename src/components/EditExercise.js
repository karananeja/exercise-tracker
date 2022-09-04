import React, { useEffect, useState } from 'react';
import axios from './axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const { id } = useParams();

  const editExercise = async () => {
    await axios
      .get('/exercises/' + id)
      .then((res) => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    editExercise();
  }, []);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    await axios
      .post('/exercises/update/' + id, exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = '/';
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
            value='Edit Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
