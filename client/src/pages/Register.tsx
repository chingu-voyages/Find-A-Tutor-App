import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../components/common/TextInput';
import { RegisterSchema } from '../utils/schemas';
export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function Register() {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={(
            values: RegisterFormValues,
            { setSubmitting }: FormikHelpers<RegisterFormValues>,
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form className="card-body items-start gap-4">
            <h2 className="card-title self-center">Create an Account</h2>
            <TextInput
              name="firstName"
              label="First Name"
              placeholder="First Name"
            />
            <TextInput
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
            />
            <TextInput name="email" label="Email" placeholder="email" />
            <TextInput
              name="password"
              label="Password"
              placeholder="password"
              type="password"
            />
            <div className="card-actions self-center">
              <button className="btn btn-primary text-neutral">Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Register;
