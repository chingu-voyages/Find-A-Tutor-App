import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { selectUser } from './features/user.slice';
import Index from './pages/index';
import Register from './pages/Register';
import RootLayout from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
  const user = useTypedSelector(selectUser);

  const homePage = () => {
    return user ? (
      <Route index element={<Home />} />
    ) : (
      <Route index element={<Index />} />
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorPage />} element={<RootLayout />}>
        {homePage()}
        <Route path="account" element={<Profile />} />
        <Route path="account/:id" element={<Profile />} />
        <Route path="account/register" element={<Register />} />
        <Route path="account/login" element={<Login />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
