import { useState, useRouter, useEffect } from "helpers/package.import";

import { filterSearch } from "helpers/helper.functions";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Filter = ({ auth, handleCheckALL, handleDeleteAll, isCheck }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [featured, setFeatured] = useState("Featured");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  const handleSort = (value, name) => {
    setFeatured(name);
    filterSearch({ router, sort: value });
  };
  return (
    <div className="input-group">
      <div className="input-group-prepend col-md-7 px-0">
        {auth.user && auth.user.role !== "user" && (
          <div className="delete_all btn btn-danger mt-2">
            <input
              type="checkbox"
              checked={isCheck}
              onChange={handleCheckALL}
              style={{
                width: "25px",
                height: "25px",
                transform: "translateY(8px)",
              }}
            />

            <button className="btn btn-danger ml-2" onClick={handleDeleteAll}>
              DELETE ALL
            </button>
          </div>
        )}
      </div>
      <form autoComplete="off" className="mt-2 col-md-3 px-2">
        <input
          type="text"
          className="form-control filter-dropdown"
          list="title_product"
          placeholder="Search"
          value={search.toLowerCase()}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="input-group-prepend col-md-2 mt-2 ">
        <div style={{ float: "right", marginLeft: "auto" }}>
          <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
            <DropdownToggle className="filter-dropdown" caret>
              <span style={{ textTransform: "capitalize" }}>
                Sort by: {featured}
              </span>
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem>
                <span
                  className="filter-dropdown-item"
                  onClick={() => handleSort("-createdAt", "Featured")}
                >
                  Featured
                </span>
              </DropdownItem>
              <DropdownItem>
                <span
                  className="filter-dropdown-item"
                  onClick={() => handleSort("-createdAt", "Newest")}
                >
                  Newest
                </span>
              </DropdownItem>
              <DropdownItem>
                <span
                  className="filter-dropdown-item"
                  onClick={() => handleSort("oldest", "Oldest")}
                >
                  Oldest
                </span>
              </DropdownItem>
              <DropdownItem>
                <span
                  className="filter-dropdown-item"
                  onClick={() => handleSort("-sold", "Best sales")}
                >
                  Best sales
                </span>
              </DropdownItem>
              <DropdownItem>
                <span
                  className="filter-dropdown-item"
                  onClick={() => handleSort("-price", "Price: High-Low")}
                >
                  Price: High-Low
                </span>
              </DropdownItem>
              <DropdownItem>
                <span
                  className="filter-dropdown-item"
                  onClick={() => handleSort("price", "Price: Low-High")}
                >
                  Price: Low-High
                </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Filter;
