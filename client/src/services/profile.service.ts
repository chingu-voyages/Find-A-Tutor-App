import axios from 'axios';
import { IProfile } from '../models/IProfile';
import { axiosConfig } from '../utils/configs';
import * as authService from './auth.service';

axios.defaults.baseURL = axiosConfig.baseUrl;

const createProfile = (data: any): IProfile => {
  const subjects = data.subjects.split(', ');

  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    bio: data.bio,
    subjects: subjects,
    educationalLevel: data.edLevel,
    rate: data.rate,
    phone: data.phone,
    city: data.city,
    state: data.state,
    profileUrl: data.profileUrl,
    userId: data.userId,
    email: data.user.email,
    role: data.user.role,
    createdAt: data.user.createdAt,
    updatedAt: data.user.updatedAt,
  };
};

const getLoggedInUserProfile = async () => {
  const user = authService.getUser();

  if (!user) {
    throw new Error('User is not logged in!');
  }

  try {
    const dataRaw = await axios.get<any, any>('profiles/' + user.id);

    const data = dataRaw.data.data;

    return createProfile(data);
  } catch (err) {
    throw new Error('Unable to retrieve profile!');
  }
};

const getProfile = async (id: string) => {
  if (!id) {
    throw new Error('Unable to retrieve Profile!');
  }
  try {
    const dataRaw = await axios.get<any, any>('profiles/' + id);

    const data = dataRaw.data.data;

    return createProfile(data);
  } catch (err) {
    throw new Error('Unable to retrieve profile!');
  }
};

export { getLoggedInUserProfile, getProfile };
