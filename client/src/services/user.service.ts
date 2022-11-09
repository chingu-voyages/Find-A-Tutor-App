import axios, { AxiosResponse } from 'axios';
import { axiosConfig } from '../utils/configs';
import * as authService from './auth.service';

axios.defaults.baseURL = axiosConfig.baseUrl;

const getAllTutors = () => axios.get<any, any>('users/tutors');
const getAllStudents = () => axios.get<any, any>('users/students');

const getUserData = async () => {
  const user = authService.getUser();

  if (!user) {
    throw new Error('Unable to retrieve user!');
  }

  const token = user.token;

  try {
    const userData = await axios.get<any, any>(
      'users/' + user.id,
      axiosConfig.tokenOptions(token),
    );

    return userData;
  } catch (err) {
    throw new Error('Unable to retrieve user!');
  }
};

export { getAllTutors, getAllStudents, getUserData };
