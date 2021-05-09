import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Header from "components/Header";
import Footer from "components/Shared/Footer";
import { useTheme } from "providers/ThemeProvider";
import Modal from "components/Modal/PopUpModal";
import { DataContext } from "store/GlobalState";

const BaseLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartDropdownHidden, setCartDropdownHidden] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [checkedTheme, setCheckedTheme] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { className, children, header_bg = "with-bg" } = props;
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(false);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  // console.log(router);
  useEffect(() => {
    let timing = window.__isModalTiming || 5000;
    const firstLogin = localStorage.getItem("firstLogin");
    let interval;
    if (
      !firstLogin &&
      Object.keys(auth).length === 0 &&
      !auth.user &&
      (router.pathname === "/" ||
        router.pathname === "/product/[pid]" ||
        router.pathname === "/pre-build-pc")
    ) {
      console.log("hello");
      interval = setTimeout(() => {
        window.__isModalTiming = timing * 3;
        console.log(window.__isModalTiming);
        if (window.__isModalTiming > 5000 * 3 * 3) {
          window.__isModalTiming = 10000;
        }

        setShowModal(true);
      }, timing);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [router.asPath]);

  return (
    <div
      className={`layout-container ${theme.type}`}
      onClick={() => showModal && toggleModal()}
    >
      <Modal showModal={showModal} />
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
