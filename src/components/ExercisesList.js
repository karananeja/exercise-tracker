import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import {
  AssignmentInd,
  CalendarMonth,
  Delete,
  Description,
  Edit,
  PendingActions,
  Timelapse,
} from '@mui/icons-material';
import '../App.css';

const Exercise = ({ exercise, deleteExercise }) => {
  const { _id, username, description, duration, date } = exercise;

  return (
    <tr>
      <td className='text-center'>{username}</td>
      <td className='text-center'>{description}</td>
      <td className='text-center'>{duration}</td>
      <td className='text-center'>{date.substring(0, 10)}</td>
      <td className='text-center'>
        <button className='link'>
          <Link className='link' to={'/edit/' + _id}>
            <Edit />
          </Link>
        </button>{' '}
        |{' '}
        <button className='link' onClick={() => deleteExercise(_id)}>
          <Delete />
        </button>
      </td>
    </tr>
  );
};

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  const getExercises = async () => {
    await axios
      .get('/exercises')
      .then((res) => setExercises(res.data))
      .catch((error) => console.log(error));
  };

  exercises.sort((b, a) => new Date(a.updatedAt) - new Date(b.updatedAt));

  useEffect(() => {
    getExercises();
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete('/exercises/' + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setExercises(exercises.filter((el) => el._id !== id));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className='table'>
        {exercises.length > 0 && (
          <thead className='thead-light'>
            <tr>
              <th className='text-center'>
                <AssignmentInd />
              </th>
              <th className='text-center'>
                <Description />
              </th>
              <th className='text-center'>
                <Timelapse />
              </th>
              <th className='text-center'>
                <CalendarMonth />
              </th>
              <th className='text-center'>
                <PendingActions />
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {exercises.map((currentExercise) => (
            <Exercise
              exercise={currentExercise}
              deleteExercise={deleteExercise}
              key={currentExercise._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
