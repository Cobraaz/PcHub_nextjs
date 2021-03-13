import { useState } from "react";
import Header from "components/Header";
import { ToastContainer } from "react-toastify";

const BaseLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { className, children } = props;
  return (
    <div className="layout-container">
      <Header toggle={toggle} isOpen={isOpen} />

      <main onClick={() => isOpen && toggle()} className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default BaseLayout;
