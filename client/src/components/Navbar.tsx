import {
  MagnifyingGlassIcon,
  PencilIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import Button from './Button';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 items-center justify-between">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-2xl font-bold">
          App Title/Logo
        </a>
      </div>
      <div className="navbar-end">
        <div className="dropdown lg:hidden w-full flex justify-end">
          <button className="btn btn-square btn-ghost lg:hidden">
            <Bars3Icon />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-compact items-center gap-2 dropdown-content mt-12 p-4 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="#">
                <MagnifyingGlassIcon className="w-4" />
                Find a Tutor
              </a>
            </li>
            <li>
              <a href="#">
                <PencilIcon className="w-4" />
                Start Tutoring
              </a>
            </li>
            <div className="w-5/6">
              <Button text="Log In" custom={[]} />
            </div>
            <div className="w-5/6">
              <Button text="Sign Up" custom={[]} />
            </div>
          </ul>
        </div>
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-6 mr-10 text-xl underline underline-offset-[6px] font-semibold">
            <li className="hover:text-secondary">
              <a href="#">Find a Tutor</a>
            </li>
            <li className="hover:text-secondary">
              <a href="#">Start Tutoring</a>
            </li>
          </ul>
          <Button text="Log In" custom={['mr-4']} />
          <Button text="Sign Up" custom={[]} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
