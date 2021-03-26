import Notify from "components/Shared/Notify";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <>
      <Notify />
      <main>{children}</main>
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
