import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Index from './pages/index';
import Register from './pages/Register';
import RootLayout from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} element={<RootLayout />}>
      <Route index element={<Index />} />
      <Route path="account/register" element={<Register />} />
      <Route path="account/login" element={<Login />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
