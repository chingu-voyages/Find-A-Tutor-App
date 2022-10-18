import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
// import Index, { loader as userLoader } from './pages';
import Index from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<Index />} loader={userLoader} />,
    <Route path="/" element={<Index />} />,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
