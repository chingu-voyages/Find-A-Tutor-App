import axios from 'axios';
import { axiosConfig } from '../utils/configs';
import * as authService from './auth.service';

axios.defaults.baseURL = axiosConfig.baseUrl;

const getLoggedInUserProfile = async () => {
  const user = authService.getUser();

  if (!user) {
    throw new Error('User is not logged in!');
  }

  try {
    const userData = await axios.get<any, any>('profiles/' + user.id);

    return userData;
  } catch (err) {
    throw new Error('Unable to retrieve user!');
  }
};

export { getLoggedInUserProfile };
