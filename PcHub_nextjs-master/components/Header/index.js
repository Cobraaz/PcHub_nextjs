import ReactResizeDetector from "react-resize-detector";

import {
  BsNavLink,
  LoginLink,
  LogoutLink,
  Brands,
  BsNavBrand,
  Categories,
} from "components/Header/Header.helpers";

import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

const Header = ({ isOpen, toggle }) => {
  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <Navbar
          className={`port-navbar port-default absolute with-bg ${
            width < 768 && isOpen ? "is-open" : "is-close"
          }`}
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
              <NavItem className="port-navbar-item">
                <LogoutLink />
              </NavItem>

              <NavItem className="port-navbar-item">
                <LoginLink />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </ReactResizeDetector>
  );
};

export default Header;
