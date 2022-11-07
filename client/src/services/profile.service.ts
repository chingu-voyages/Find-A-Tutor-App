import axios, { AxiosResponse } from 'axios';
import authService from './auth.service';

const baseURL = 'api/profiles/';
axios.defaults.baseURL = `http://localhost:8080`;
const config = (token: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
};

const getAllTutors = () => axios.get<any, any>(baseURL + 'tutors');

const getCurrentUserProfile = async () => {
  const token = authService.getUser().accessToken;
  const profile = await axios.get<any, any>(baseURL, config('Bearer ' + token));
  return profile;
};

export { getAllTutors };
