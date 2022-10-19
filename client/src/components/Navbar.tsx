import Button from './Button';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 justify-between">
      <div>
        <a className="btn btn-ghost normal-case text-2xl font-bold">
          App Title/Logo
        </a>
      </div>
      <div>
        <ul className="flex gap-6 mr-6 text-xl underline font-semibold">
          <li>Find a Tutor</li>
          <li>Start Tutoring</li>
        </ul>
        <Button text="Log In" custom={['mr-6']} />
        <Button text="Sign Up" custom={[]} />
      </div>
    </div>
  );
};

export default Navbar;
