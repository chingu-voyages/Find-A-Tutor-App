import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <>
      <p>Navbar</p>
      <div className="w-screen h-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
      <p>Footer</p>
    </>
  );
}

export default Index;
