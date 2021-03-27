import { useContext, useState } from "react";
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
import CartIcon from "components/Header/Cart/CartIcon";
import CartDropdown from "components/Header/Cart/CartDropdown";

const Header = ({
  isOpen,
  toggle,
  header_bg,
  cartDropdownHidden,
  setCartDropdownHidden,
}) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
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

  const HeaderToggler = () => {
    toggle();
    !cartDropdownHidden && setCartDropdownHidden(!cartDropdownHidden);
  };

  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <Navbar
          className={`port-navbar port-default absolute ${header_bg} ${
            width < 768 && isOpen ? "is-open" : "is-close"
          }`}
          dark
          expand="md"
        >
          <BsNavBrand />
          <NavbarToggler onClick={HeaderToggler} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto ml-auto" navbar onClick={HeaderToggler}>
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
              <NavItem className="port-navbar-item">
                <div onClick={() => setCartDropdownHidden(!cartDropdownHidden)}>
                  <CartIcon cartLength={cart.length} />
                </div>
              </NavItem>
              {Object.keys(auth).length === 0 ? (
                <NavItem className="port-navbar-item">
                  <LoginLink />
                </NavItem>
              ) : (
                <LoggedInUser auth={auth} handleLogout={handleLogout} />
              )}
            </Nav>
          </Collapse>
          {cartDropdownHidden ? null : (
            <CartDropdown
              setCartDropdownHidden={setCartDropdownHidden}
              cartDropdownHidden={cartDropdownHidden}
              router={router}
              cartItems={cart}
              HeaderToggler={HeaderToggler}
            />
          )}
        </Navbar>
      )}
    </ReactResizeDetector>
  );
};

export default Header;
