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
  <a className="nav-link port-navbar-link" href="/login">
    Login
  </a>
);

export const Brands = ({ brands, router }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [brand, setBrand] = useState("Brands");

  const handleBrand = (value, name) => {
    setBrand(name);
    filterSearch({ router, brand: value });
  };
  return (
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
            onClick={() => handleBrand("all", "Categories")}
            className="port-dropdown-item nav-link port-navbar-link"
          >
            All Products
          </span>
        </DropdownItem>
        {brands.map((item) => (
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
        {categories.map((item) => (
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
  );
};
export const Sort = ({ router }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("Featured");

  const handleSort = (value, name) => {
    setCategory(name);
    filterSearch({ router, sort: value });
  };
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        <span style={{ textTransform: "capitalize" }}>Sort by: {category}</span>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <span
            onClick={() => handleSort("-createdAt", "Featured")}
            className="port-dropdown-item nav-link port-navbar-link"
          >
            Featured
          </span>
        </DropdownItem>
        <DropdownItem>
          <span
            onClick={() => handleSort("-createdAt", "Newest")}
            className="port-dropdown-item nav-link port-navbar-link"
          >
            Newest
          </span>
        </DropdownItem>
        <DropdownItem>
          <span
            onClick={() => handleSort("oldest", "Oldest")}
            className="port-dropdown-item nav-link port-navbar-link"
          >
            Oldest
          </span>
        </DropdownItem>
        <DropdownItem>
          <span
            onClick={() => handleSort("-sold", "Best sales")}
            className="port-dropdown-item nav-link port-navbar-link"
          >
            Best sales
          </span>
        </DropdownItem>
        <DropdownItem>
          <span
            onClick={() => handleSort("-price", "Price: High-Low")}
            className="port-dropdown-item nav-link port-navbar-link"
          >
            Price: High-Low
          </span>
        </DropdownItem>
        <DropdownItem>
          <span
            onClick={() => handleSort("price", "Price: Low-High")}
            className="port-dropdown-item nav-link port-navbar-link"
          >
            Price: Low-High
          </span>
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

export const SearchField = (props) => {
  const { className = "", search, setSearch } = props;

  return (
    <ActiveLink activeClassName="active" href="#">
      <div className={`nav-link port-navbar-link ${className}`}>
        <form autoComplete="off">
          <input
            type="text"
            className="form-control"
            list="title_product"
            placeholder="Search"
            value={search.toLowerCase()}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
    </ActiveLink>
  );
};
