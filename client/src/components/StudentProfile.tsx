import React from 'react';
import Button from '../components/Button';

export interface StudentProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  city?: string;
  state?: string;
  bio?: string;
  educationLevel?: string;
  subjects?: string[];
  // Temporary string array until Student object created
  tutors?: string[];
}

function StudentProfile(student: StudentProfileProps) {
  // Temporary until authentication is implemented
  const isAuthenticated = true;

  return (
    <div className="card max-w-xl bg-base-100 shadow-xl">
      <div className="card-body items-center md:grid md:grid-cols-4 grid-rows-8 gap-2 my-8">
        <div className="grid grid-rows-8 col-span-2 justify-center gap-1">
          <figure className="row-span-4">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
          </figure>
          <h2 className="card-title justify-self-center my-2">{`${student.firstName} ${student.lastName}`}</h2>
          {isAuthenticated && (
            <div className="card-actions">
              {/* TODO: Add link to EditProfile */}
              <Button text="Edit Profile" />
            </div>
          )}
        </div>
        <div className="grid grid-rows-8 gap-2 col-span-2 text-center md:text-start">
          <h1 className="opacity-60">{`${
            student.city ? student.city : 'city'
          }, ${student.state ? student.state : 'state'}`}</h1>
          <p>{student.bio ? student.bio : 'Your Bio'}</p>
        </div>
        <div className="w-80 md:w-full col-span-4 my-4">
          <hr />
        </div>
        <div className="grid grid-rows-8 col-span-2">
          <h2 className="card-title">Subjects</h2>
        </div>
        <div className="grid grid-rows-8 col-span-2">
          <p>
            {student.subjects ? student.subjects.join(', ') : 'Your subjects'}
          </p>
        </div>
        {isAuthenticated && (
          <>
            <div className="w-80 md:w-full col-span-4 my-4">
              <hr />
            </div>
            <div className="grid grid-rows-8 col-span-1">
              <h2 className="card-title">Tutors</h2>
            </div>
            <div className="grid grid-rows-8 col-span-3">
              <table className="table-auto text-end">
                {student.tutors ? (
                  <tbody>
                    {student.tutors?.map((student, i) => {
                      return (
                        <tr key={`${student}_${i}`}>
                          <th>{student}: </th>
                          <td>
                            {/* TODO: Add tutor email to link */}
                            <a href="#">
                              <Button text="Contact" />
                            </a>
                          </td>
                          <td>
                            {/* TODO: Link to report details page so student can read report*/}
                            <a href="#">
                              <Button text="Reports" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  'You do not have Tutors yet'
                )}
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
