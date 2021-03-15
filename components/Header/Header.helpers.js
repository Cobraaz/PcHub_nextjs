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
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        <img
          src={auth.user.avatar}
          alt={auth.user.avatar}
          style={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            transform: "translateY(-3px)",
            marginRight: "3px",
          }}
        />
        {auth.user.name}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/profile"
            title="Profile"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="#"
            title="Keyboards"
          />
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={handleLogout}>
          <BsNavLink className="port-dropdown-item" href="" title="Logout" />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

// const loggedRouter = ({ auth }) => {
//   return (
//     <li className="nav-item dropdown">
//       <a
//         className="nav-link dropdown-toggle"
//         href="#"
//         id="navbarDropdownMenuLink"
//         data-toggle="dropdown"
//         aria-haspopup="true"
//         aria-expanded="false"
//       >
//         <img
//           src={auth.user.avatar}
//           alt={auth.user.avatar}
//           style={{
//             borderRadius: "50%",
//             width: "30px",
//             height: "30px",
//             transform: "translateY(-3px)",
//             marginRight: "3px",
//           }}
//         />{" "}
//         {auth.user.name}
//       </a>

//       <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//         <Link href="/profile">
//           <a className="dropdown-item">Profile</a>
//         </Link>
//         <div className="dropdown-divider"></div>
//         <button className="dropdown-item" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </li>
//   );
// };
