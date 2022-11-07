import axios, { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { Account } from '../models/Account';
import { User } from '../models/User';

const baseURL = 'api/account/';
axios.defaults.baseURL = `http://localhost:8080`;
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const signUp = async (dto: Account) =>
  saveUser(await axios.post<Account>(baseURL + 'signup', { ...dto }, config));

const signIn = async (dto: Account) =>
  saveUser(await axios.post(baseURL + 'signin', { ...dto }, config));

const logout = () => localStorage.removeItem('user');

const saveUser = (res: AxiosResponse<any, any>): User => {
  if (!res.data) throw new Error('Invalid account credentials');

  const data: any = jwt_decode(res.data.access_token);
  data.accessToken = res.data.access_token;
  data.accountId = data.id;
  delete data.id;

  localStorage.setItem('user', JSON.stringify(data));

  const user = getUser();

  // console.log('auth.service user', user);

  return user;
};

const getUser = (): User => JSON.parse(localStorage.getItem('user') || '{}');

export default { signUp, signIn, logout, getUser };
