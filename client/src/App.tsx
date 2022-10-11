import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<main className="App">Hello World</main>} />
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
