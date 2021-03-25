import { useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
const BaseLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { className, children, header_bg = "with-bg" } = props;
  return (
    <>
      <Header header_bg={header_bg} toggle={toggle} isOpen={isOpen} />
      <div className="layout-container">
        <main
          onClick={() => isOpen && toggle()}
          className={`cover ${className}`}
        >
          <div className="wrapper">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default BaseLayout;
