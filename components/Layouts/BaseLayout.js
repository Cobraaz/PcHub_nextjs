import { useState } from "react";
import Header from "components/Header";
import Footer from "components/Shared/Footer";
import { useTheme } from "providers/ThemeProvider";
const BaseLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartDropdownHidden, setCartDropdownHidden] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [checkedTheme, setCheckedTheme] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { className, children, header_bg = "with-bg" } = props;
  return (
    <div className={`layout-container ${theme.type}`}>
      <Header
        header_bg={header_bg}
        toggle={toggle}
        isOpen={isOpen}
        cartDropdownHidden={cartDropdownHidden}
        setCartDropdownHidden={setCartDropdownHidden}
        checkedTheme={checkedTheme}
        setCheckedTheme={setCheckedTheme}
        theme={theme}
        toggleTheme={toggleTheme}
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
      <Footer
        isOpen={isOpen}
        toggle={toggle}
        checkedTheme={checkedTheme}
        setCheckedTheme={setCheckedTheme}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <style jsx global>
        {`
          html,
          body,
          .base-page {
            background: ${theme.background};
            color: ${theme.fontColor};
            transition: color 0.5s ease-out 0s, background 0.5s ease-out 0s;
          }
        `}
      </style>
    </div>
  );
};

export default BaseLayout;
