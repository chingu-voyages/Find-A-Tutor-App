import axios, { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { axiosConfig } from '../utils/configs';
import { Login, RegisterType } from '../utils/schemas';
import { User } from '../utils/User';

axios.defaults.baseURL = axiosConfig.baseUrl;

const signUp = async (dto: RegisterType) =>
  saveUser(
    await axios.post<RegisterType>(
      'auth/signup',
      { ...dto },
      axiosConfig.jsonOptions,
    ),
  );

const signIn = async (dto: Login) =>
  saveUser(
    await axios.post('auth/signin', { ...dto }, axiosConfig.jsonOptions),
  );

const logout = () => localStorage.removeItem('user');

const saveUser = (res: AxiosResponse<any, any>): User => {
  if (!res.data) throw new Error('Invalid account credentials');

  const data: any = jwt_decode(res.data.token);

  localStorage.setItem('user', JSON.stringify(data));

  const user = getUser();

  // console.log('auth.service user', user);

  return user;
};

const getUser = (): User => JSON.parse(localStorage.getItem('user') || '{}');

export { signUp, signIn, logout, getUser };
