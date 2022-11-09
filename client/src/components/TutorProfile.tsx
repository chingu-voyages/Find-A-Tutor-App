import React, { useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import EditProfileForm from './EditProfileForm';

export interface TutorProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  city?: string;
  state?: string;
  bio?: string;
  rate?: number;
  subjects?: string[];
  // Temporary string array until Student object created, should then be Student[]
  students?: string[];
}

function TutorProfile(tutor: TutorProfileProps) {
  const [openModal, setOpenModal] = useState(false);
  const handleToggle = () => setOpenModal(!openModal);
  // Temporary until authentication is implemented
  const isAuthenticated = true;

  return (
    <div className="card max-w-xl bg-base-100 shadow-xl">
      <div className="card-body items-center md:grid md:grid-cols-2 grid-rows-8 gap-2 my-8">
        <div className="grid grid-rows-8 justify-center gap-1">
          <figure className="row-span-4">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
          </figure>
          <h2 className="card-title justify-self-center my-2">{`${tutor.firstName} ${tutor.lastName}`}</h2>
          <div className="card-actions">
            {/* TODO: Add link to EditProfile */}
            <Button text="Edit Profile" onClick={handleToggle} />
          </div>
        </div>
        <div className="grid grid-rows-8 gap-2 text-center md:text-start">
          {/* TODO: Replace with Rating component that handles it's own state */}
          <div className="rating justify-center md:justify-start">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
          <h1 className="opacity-60">{`${tutor.city ? tutor.city : 'city'}, ${
            tutor.state ? tutor.state : 'state'
          }`}</h1>
          <p>{tutor.bio ? tutor.bio : 'Your Bio'}</p>
          <h1 className="font-bold">{`Hourly Rate: $${
            tutor.rate ? tutor.rate : '0'
          }`}</h1>
        </div>
        <div className="w-80 md:w-full col-span-2 my-4">
          <hr />
        </div>
        <div className="grid grid-rows-8">
          <h2 className="card-title">Subjects</h2>
        </div>
        <div className="grid grid-rows-8">
          <p>{tutor.subjects ? tutor.subjects.join(', ') : 'Your subjects'}</p>
        </div>
        <div className="w-80 md:w-full col-span-2 my-4">
          <hr />
        </div>
        <div className="grid grid-rows-8">
          <h2 className="card-title">Reviews</h2>
        </div>
        {/* TODO: Replace with Review component that handles it's own state */}
        <div className="grid grid-rows-8">
          <p>Review component goes here</p>
        </div>
        {isAuthenticated && (
          <>
            <div className="w-80 md:w-full col-span-2 my-4">
              <hr />
            </div>
            <div className="grid grid-rows-8">
              <h2 className="card-title">Students</h2>
            </div>
            <div className="grid grid-rows-8">
              <table className="table-auto text-end">
                {tutor.students ? (
                  <tbody>
                    {tutor.students?.map((student, i) => {
                      return (
                        <tr key={`${student}_${i}`}>
                          <th>{student}: </th>
                          <td>
                            {/* TODO: Link to student details page so tutor can add to report*/}
                            <a href="#">
                              <Button text="Report" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  'You do not have students yet'
                )}
              </table>
            </div>
          </>
        )}
      </div>
      <Modal open={openModal} handleClose={() => setOpenModal(false)}>
        <EditProfileForm toggle={handleToggle} />
      </Modal>
    </div>
  );
}

export default TutorProfile;
