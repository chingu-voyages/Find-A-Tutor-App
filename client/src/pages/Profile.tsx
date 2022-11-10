import TutorProfile, { TutorProfileProps } from '../components/TutorProfile';
import StudentProfile, {
  StudentProfileProps,
} from '../components/StudentProfile';
import { useEffect, useState } from 'react';
import { IProfile } from '../models/IProfile';
import { Role } from '../utils/Role';
import { getLoggedInUserProfile, getProfile } from '../services';
import { useParams } from 'react-router-dom';

// filler until auth is setup
const fakeTutor: TutorProfileProps = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@email.com',
  city: 'San Francisco',
  state: 'CA',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu laoreet mauris dignissim consectetur. Consectetur cum pretium arcu porttitor vestibulum posuere sit massa pulvinar lorem ipsum dolor',
  rate: 50,
  subjects: ['Computer Science', 'History', 'Algebra', 'Geometry'],
  students: ['Steven', 'Joe'],
};

const fakeStudent: StudentProfileProps = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@email.com',
  city: 'San Francisco',
  state: 'CA',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu laoreet mauris dignissim consectetur. Consectetur cum pretium arcu porttitor vestibulum posuere sit massa pulvinar lorem ipsum dolor',
  subjects: ['Computer Science', 'History', 'Algebra', 'Geometry'],
  tutors: ['Steven', 'Joe'],
};

const initProfile: IProfile = {
  id: -1,
  firstName: 'Jane',
  lastName: 'Doe',
  age: 50,
  bio: 'A great bio',
  profileUrl: 'https://placeimg.com/192/192/people',
  userId: -1,
  email: 'janedoe@gmail.com',
  role: Role.STUDENT,
};

function Profile() {
  const [profile, setProfile] = useState<IProfile>(initProfile);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      let profile;
      try {
        if (!params.id) {
          profile = await getLoggedInUserProfile();
        } else {
          profile = await getProfile(params.id);
        }

        profile.students = fakeTutor.students;
        profile.tutors = fakeStudent.tutors;

        setProfile(profile);
        setError(false);
      } catch (err) {
        console.log('Failed to load profile');
        setError(true);
      }
    };

    fetchProfile();
  }, [params.id]);

  // Temporary filler until backend is integrated
  const role = 'TUTOR';

  if (error || !profile.id || profile.id === -1) {
    return <p>Could not load profile!</p>;
  }

  return (
    <div className="card max-w-xl bg-base-100 shadow-xl my-5">
      {profile.role === Role.TUTOR && <TutorProfile {...profile} />}
      {profile.role === Role.STUDENT && <StudentProfile {...profile} />}
    </div>
  );
}

export default Profile;
