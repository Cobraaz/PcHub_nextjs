import { useContext } from "react";
import ReactResizeDetector from "react-resize-detector";

import {
  BsNavLink,
  LoginLink,
  Brands,
  BsNavBrand,
  Categories,
  LoggedInUser,
} from "components/Header/Header.helpers";
import { DataContext } from "store/GlobalState";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

const Header = ({ isOpen, toggle }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    Cookie.remove("user");
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "GET_ALL_USERS", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <Navbar
          className={`port-navbar port-default absolute ${
            router.asPath === "/" ? "transparent" : "with-bg"
          } ${width < 768 && isOpen ? "is-open" : "is-close"}`}
          dark
          expand="md"
        >
          <BsNavBrand />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/" title="Home" />
              </NavItem>
              <Brands />
              <Categories />
              <NavItem className="port-navbar-item">
                <BsNavLink href="/blogs" title="Pre build pc" />
              </NavItem>
            </Nav>
            <Nav navbar>
              {Object.keys(auth).length === 0 ? (
                <NavItem className="port-navbar-item">
                  <LoginLink />
                </NavItem>
              ) : (
                <LoggedInUser auth={auth} handleLogout={handleLogout} />
              )}
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </ReactResizeDetector>
  );
};

export default Header;
