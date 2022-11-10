import React, { useState } from 'react';
import Button from './Button';
import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '../components/common/TextInput';
import { EditProfileSchema } from '../utils/schemas';

export interface EditProfileFormValues {
  firstName: string;
  lastName: string;
  city?: string;
  state?: string;
  bio?: string;
}

interface EditProfileFormProps {
  toggle: () => void;
}

function EditProfileForm({ toggle }: EditProfileFormProps) {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    bio: '',
  });
  // Array to hold selected user subjects when subject select component is added
  // const [subjects, setSubjects] = useState<string[]>([]);
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setProfileData((prevProfileData) => {
      return {
        ...prevProfileData,
        [name]: value,
      };
    });
  }
  return (
    <>
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
          }}
          validationSchema={EditProfileSchema}
          // TODO: Add proper handle submit functionality (post to API, toggle modal, etc)
          onSubmit={(
            values: EditProfileFormValues,
            { setSubmitting }: FormikHelpers<EditProfileFormValues>,
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              console.log('Profile Data', profileData);
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form className="card-body items-start gap-4">
            <h2 className="card-title self-center">Edit Profile</h2>
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
            <TextInput
              name="city"
              label="City"
              placeholder="City"
              onChange={handleChange}
            />
            {/* TODO: Use dropdown with hardcoded state values */}
            <TextInput
              name="state"
              label="State"
              placeholder="State (2-letter abbrieviation)"
              onChange={handleChange}
            />
            <textarea
              className="textarea w-full textarea-bordered"
              placeholder="Bio"
              name="bio"
              onChange={handleChange}
            ></textarea>
            {/* TODO: Add rate input and make rate conditional based on ROLE */}
            {/* TODO: Add Subject selector component */}
            <div className="card-actions md:self-center">
              {/* TODO: Add handle submit function */}
              <Button text="Submit" onClick={toggle} />
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default EditProfileForm;
