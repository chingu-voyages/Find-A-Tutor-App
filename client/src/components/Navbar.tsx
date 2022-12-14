import {
  MagnifyingGlassIcon,
  PencilIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState, UseAppDispatch } from '../app/store';
import { selectUser } from '../features/user.slice';
import { logout } from '../features/user.thunk';
import Button from './Button';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Navbar = () => {
  const user = useTypedSelector(selectUser);
  const dispatch = UseAppDispatch();

  console.log('user', user);

  const onLogout = () => {
    dispatch(logout());
  };

  if (!user || JSON.stringify(user) === '{}') {
    return (
      <div className="navbar bg-base-100 items-center justify-between">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="btn btn-ghost normal-case text-2xl font-bold"
          >
            App Title/Logo
          </NavLink>
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
                <NavLink to="findtutors">
                  <MagnifyingGlassIcon className="w-4" />
                  Find a Tutor
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  <PencilIcon className="w-4" />
                  Start Tutoring
                </NavLink>
              </li>
              <div className="w-5/6">
                <NavLink to="account/login">
                  <Button text="Log In" />
                </NavLink>
              </div>
              <div className="w-5/6">
                <NavLink to="account/register">
                  <Button text="Sign Up" />
                </NavLink>
              </div>
            </ul>
          </div>
          <div className="hidden lg:flex">
            <ul className="flex items-center gap-6 mr-10 text-xl underline underline-offset-[6px] font-semibold">
              <li className="hover:text-secondary">
                <a href="/findtutors">Find a Tutor</a>
              </li>
              <li className="hover:text-secondary">
                <a href="#">Start Tutoring</a>
              </li>
            </ul>
            <NavLink to="account/login">
              <Button text="Log In" custom={['mr-4']} />
            </NavLink>
            <NavLink to="account/register">
              <Button text="Sign Up" />
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar bg-base-100 items-center justify-between">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="btn btn-ghost normal-case text-2xl font-bold"
          >
            App Title/Logo
          </NavLink>
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
                <NavLink to="/findtutors">
                  <MagnifyingGlassIcon className="w-4" />
                  Find a Tutor
                </NavLink>
              </li>
              <div className="w-5/6">
                <NavLink to="#">
                  <Button text="Sign Out" onClick={onLogout} />
                </NavLink>
              </div>
            </ul>
          </div>
          <div className="hidden lg:flex">
            <ul className="flex items-center gap-6 mr-10 text-xl underline underline-offset-[6px] font-semibold">
              <li className="hover:text-secondary">
                <a href="/findtutors">Find a Tutor</a>
              </li>
            </ul>
            <NavLink to="account/register">
              <Button text="Sign Out" onClick={onLogout} />
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
