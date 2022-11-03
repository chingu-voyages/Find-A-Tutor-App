import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../components/common/TextInput';
import { RegisterSchema } from '../utils/schemas';
import Button from '../components/Button';
import Select, { Option } from '../components/common/Select';
export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function Register() {
  const [selectedRole, setSelectedRole] = useState('STUDENT');

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  return (
    <>
      <div className="card w-full md:w-96 rounded-none md:rounded bg-secondary md:bg-base-100 md:shadow-xl">
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
              console.log('Selected Role: ', selectedRole);
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form className="card-body items-start gap-4">
            <h2 className="card-title self-center">Create an Account</h2>
            <div className="flex-row">
              <label className="self-center mr-3">Sign Up as:</label>
              <Select handleChange={handleRoleChange}>
                <Option value="STUDENT" label="Student" />
                <Option value="TUTOR" label="Tutor" />
              </Select>
            </div>
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
            <div className="card-actions md:self-center">
              <Button text="Submit" />
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Register;
