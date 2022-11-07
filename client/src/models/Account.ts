import * as Yup from 'yup';

export const AccountSchema = Yup.object({
  email: Yup.string()
    .email('Valid email is required')
    .required('Valid email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  isTutor: Yup.boolean().default(true),
});

export type Account = Yup.InferType<typeof AccountSchema>;
