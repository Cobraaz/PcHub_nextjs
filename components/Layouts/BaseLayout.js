import { useState } from "react";
import Header from "components/Header";
import Footer from "components/Shared/Footer";
const BaseLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartDropdownHidden, setCartDropdownHidden] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const { className, children, header_bg = "with-bg" } = props;
  return (
    <>
      <Header
        header_bg={header_bg}
        toggle={toggle}
        isOpen={isOpen}
        cartDropdownHidden={cartDropdownHidden}
        setCartDropdownHidden={setCartDropdownHidden}
      />
      <div className="layout-container">
        <main
          onClick={() => {
            isOpen && toggle();
            !cartDropdownHidden && setCartDropdownHidden(!cartDropdownHidden);
          }}
          className={`cover ${className}`}
        >
          <div className="wrapper">{children}</div>
        </main>
      </div>
      <Footer isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default BaseLayout;
