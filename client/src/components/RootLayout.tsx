import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const RootLayout = () => {
  return (
    <div className="flex flex-col h-full justify-between">
      <Navbar />
      <main className="w-screen h-full short:h-auto py-10 flex flex-col justify-center items-center bg-secondary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;