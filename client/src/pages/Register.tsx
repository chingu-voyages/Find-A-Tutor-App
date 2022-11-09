import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../components/common/TextInput';
import { RegisterType, RegisterSchema } from '../utils/schemas';
import Button from '../components/Button';
import Select, { Option } from '../components/common/Select';
import { Role } from '../utils/Role';
import { UseAppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { register } from '../features/user.thunk';
export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function Register() {
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(Role.STUDENT);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value as Role);
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
            const newRegistration: RegisterType = {
              ...values,
              role: selectedRole,
            };

            dispatch(register(newRegistration));
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              console.log('Selected Role: ', selectedRole);
              setSubmitting(false);
            }, 300);

            navigate('/');
          }}
        >
          <Form className="card-body items-start gap-4">
            <h2 className="card-title self-center">Create an Account</h2>
            <div className="flex-row">
              <label className="self-center mr-3">Sign Up as:</label>
              <Select handleChange={handleRoleChange}>
                <Option value={Role.STUDENT} label="Student" />
                <Option value={Role.TUTOR} label="Tutor" />
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
