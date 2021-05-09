import { useState } from "react";
import Link from "next/link";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import ActiveLink from "components/Header/ActiveLink";
import { filterSearch } from "helpers/helper.functions";

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
  <Link href="/login">
    <a className="nav-link port-navbar-link">Login</a>
  </Link>
);

export const Brands = ({ brands, router }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [brand, setBrand] = useState("Brands");

  const handleBrand = (value, name) => {
    setBrand(name);
    filterSearch({ router, brand: value });
  };
  return (
    <div style={{ width: "8rem" }}>
      <Dropdown
        className="port-navbar-link port-dropdown-menu"
        nav
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      >
        <DropdownToggle className="port-dropdown-toggle" nav caret>
          {brand}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <span
              onClick={() => handleBrand("all", "Brands")}
              className="port-dropdown-item nav-link port-navbar-link"
            >
              All Products
            </span>
          </DropdownItem>
          {brands &&
            brands.map((item) => (
              <DropdownItem key={item._id}>
                <span
                  onClick={() => handleBrand(item._id, item.name)}
                  className="port-dropdown-item nav-link port-navbar-link"
                >
                  {item.name}
                </span>
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export const Categories = ({ categories, router }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("Categories");

  const handleCategory = (value, name) => {
    setCategory(name);
    filterSearch({ router, category: value });
  };
  return (
    <div style={{ width: "10rem" }}>
      <Dropdown
        className="port-navbar-link port-dropdown-menu"
        nav
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      >
        <DropdownToggle className="port-dropdown-toggle" nav caret>
          {category}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <span
              onClick={() => handleCategory("all", "Categories")}
              className="port-dropdown-item nav-link port-navbar-link"
            >
              All Products
            </span>
          </DropdownItem>
          {categories &&
            categories.map((item) => (
              <DropdownItem key={item._id}>
                <span
                  onClick={() => handleCategory(item._id, item.name)}
                  className="port-dropdown-item nav-link port-navbar-link"
                >
                  {item.name}
                </span>
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </div>
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
