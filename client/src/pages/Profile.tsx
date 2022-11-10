import TutorProfile, { TutorProfileProps } from '../components/TutorProfile';
import StudentProfile, {
  StudentProfileProps,
} from '../components/StudentProfile';

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

function Profile() {
  // Temporary filler until backend is integrated
  const role = 'STUDENT';

  return (
    <div className="card max-w-xl bg-base-100 shadow-xl my-5">
      {role === 'TUTOR' && <TutorProfile {...fakeTutor} />}
      {role === 'STUDENT' && <StudentProfile {...fakeStudent} />}
    </div>
  );
}

export default Profile;
