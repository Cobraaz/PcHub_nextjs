import { useState } from "react";
import Link from "next/link";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import ActiveLink from "components/Header/ActiveLink";

export const BsNavLink = (props) => {
  const { href, title, className = "" } = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  );
};

export const BsNavBrand = () => (
  <Link href="/">
    <a className="navbar-brand port-navbar-brand">PcHub</a>
  </Link>
);

export const LoginLink = () => (
  <a className="nav-link port-navbar-link" href="/login">
    Login
  </a>
);

export const Brands = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        Brand
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <BsNavLink className="port-dropdown-item" href="#" title="Razer" />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink className="port-dropdown-item" href="#" title="Asus" />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink className="port-dropdown-item" href="#" title="Corsair" />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="#"
            title="Cooler Master"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink className="port-dropdown-item" href="#" title="HyperX" />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink className="port-dropdown-item" href="#" title="NZXT" />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        Categories
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <BsNavLink className="port-dropdown-item" href="#" title="Mouses" />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="#"
            title="Keyboards"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink className="port-dropdown-item" href="#" title="Cabinets" />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink className="port-dropdown-item" href="#" title="Laptops" />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink className="port-dropdown-item" href="#" title="HyperX" />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="#"
            title="Graphics card"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export const LoggedInUser = ({ auth, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu  mr-3"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        {auth.user.name}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/user/profile"
            title="Profile"
          />
        </DropdownItem>
        {(auth.user.role === "admin" || auth.user.role === "root") && (
          <>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                href="/create_product"
                title="Create Products"
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                href="/categories"
                title="Categories"
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                href="/brand"
                title="Brands"
              />
            </DropdownItem>
          </>
        )}
        <DropdownItem divider />
        <DropdownItem onClick={handleLogout}>
          <BsNavLink className="port-dropdown-item" href="" title="Logout" />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

//<Link href="/users">
//   <a className="dropdown-item">Users</a>
// </Link>
// <Link href="/create">
//   <a className="dropdown-item">Products</a>
// </Link>
// <Link href="/categories">
//   <a className="dropdown-item">Categories</a>
// </Link>
