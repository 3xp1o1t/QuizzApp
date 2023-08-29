import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../ui/Footer';
import Navbar from '../ui/Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <ToastContainer />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="w-full md:w-[720px] container px-2 pt-2 md:px-0 md:pt-5">
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Layout;
