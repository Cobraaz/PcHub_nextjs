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
  <a className="nav-link port-navbar-link" href="/api/v1/login">
    Login
  </a>
);

export const LogoutLink = () => (
  <a className="nav-link port-navbar-link" href="#">
    Logout
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
