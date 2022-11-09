import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../components/common/TextInput';
import Button from '../components/Button';
import { LoginSchema } from '../utils/schemas';
import { UseAppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { ILogin } from '../models/ILogin';
import { login } from '../features/user.thunk';
export interface LoginFormValues {
  email: string;
  password: string;
}

function Login() {
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="card md:w-96 bg-base-100 shadow-xl mx-3">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(
            values: LoginFormValues,
            { setSubmitting }: FormikHelpers<LoginFormValues>,
          ) => {
            const newLogin: ILogin = {
              email: values.email,
              password: values.password,
            };

            dispatch(login(newLogin));

            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);

            navigate('/');
          }}
        >
          <Form className="card-body items-start gap-4">
            <h2 className="card-title self-center">Sign In to Your Account</h2>
            <TextInput name="email" label="Email" placeholder="email" />
            <TextInput
              name="password"
              label="Password"
              placeholder="password"
              type="password"
            />
            <div className="card-actions md:self-center">
              <Button text="Submit" />
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Login;
