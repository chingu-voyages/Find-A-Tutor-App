import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const RootLayout = () => {
  return (
    <div className="flex flex-col h-full justify-between">
      <Navbar />
      <main className="h-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
