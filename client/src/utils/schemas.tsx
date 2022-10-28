import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Valid email is required')
    .required('Valid email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Valid email is required')
    .required('Valid email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});
