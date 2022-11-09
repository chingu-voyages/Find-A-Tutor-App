import axios, { AxiosResponse } from 'axios';
import { ILogin } from '../models/ILogin';
import { IRegister } from '../models/IRegister';
import { axiosConfig } from '../utils/configs';
import { IUser } from '../models/IUser';

axios.defaults.baseURL = axiosConfig.baseUrl;

const signUp = async (dto: IRegister) =>
  saveUser(
    await axios.post<IRegister>(
      'auth/signup',
      { ...dto },
      axiosConfig.jsonOptions,
    ),
  );

const signIn = async (dto: ILogin) =>
  saveUser(
    await axios.post('auth/signin', { ...dto }, axiosConfig.jsonOptions),
  );

const logout = () => localStorage.removeItem('user');

const saveUser = (res: AxiosResponse<any, any>): IUser => {
  if (!res.data) throw new Error('Invalid account credentials');

  const data: IUser = {
    id: res.data.data.user.id,
    role: res.data.data.user.role,
    token: res.data.data.token,
  };

  localStorage.setItem('user', JSON.stringify(data));

  const user = getUser();

  return user;
};

const getUser = (): IUser => JSON.parse(localStorage.getItem('user') || '{}');

export { signUp, signIn, logout, getUser };
