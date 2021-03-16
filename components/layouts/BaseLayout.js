import { useState } from "react";
import Header from "components/Header";
import { ToastContainer } from "react-toastify";
import Notify from "components/shared/Notify";

const BaseLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { className, children } = props;
  return (
    <>
      <div className="layout-container">
        <Header toggle={toggle} isOpen={isOpen} />
        <Notify />
        <main
          onClick={() => isOpen && toggle()}
          className={`cover ${className}`}
        >
          <div className="wrapper">{children}</div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default BaseLayout;
