import { useState } from "react";
import Notify from "components/shared/Notify";
import { ToastContainer } from "react-toastify";
import Header from "components/Header";
const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Notify />
      <Header toggle={toggle} isOpen={isOpen} />
      <main onClick={() => isOpen && toggle()}>{children}</main>
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default Layout;
