import * as Yup from 'yup';
import { Role } from './Role';

export const RegisterSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Valid email is required')
    .required('Valid email is required'),
  password: Yup.string()
    .required('Password is required')
    // src: https://stackoverflow.com/a/55604455/12369650
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  role: Yup.mixed<Role>().oneOf(Object.values(Role)), // src: https://github.com/jquense/yup/issues/1013#issuecomment-679113073
});

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email('Valid email is required')
    .required('Valid email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type RegisterType = Yup.InferType<typeof RegisterSchema>;
export type Login = Yup.InferType<typeof LoginSchema>;
