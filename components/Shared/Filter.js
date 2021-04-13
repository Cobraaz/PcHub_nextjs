import { useState, useRouter, useEffect } from "helpers/package.import";

import { filterSearch } from "helpers/helper.functions";

const Filter = ({ state }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const router = useRouter();

  const { categories, brands } = state;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };
  const handleBrand = (e) => {
    setBrand(e.target.value);
    filterSearch({ router, brand: e.target.value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  return (
    <div className="input-group">
      <div className="input-group-prepend col-md-2 px-0 mt-2">
        <select
          className="custom-select text-capitalize"
          value={category}
          onChange={handleCategory}
        >
          <option value="all">Categories</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group-prepend col-md-2 px-0 mt-2">
        <select
          className="custom-select text-capitalize"
          value={brand}
          onChange={handleBrand}
        >
          <option value="all">Brands</option>

          {brands.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <form autoComplete="off" className="mt-2 col-md-6 px-0">
        <input
          type="text"
          className="form-control"
          list="title_product"
          placeholder="Search"
          value={search.toLowerCase()}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="input-group-prepend col-md-2 px-0 mt-2">
        <select
          className="custom-select text-capitalize"
          value={sort}
          onChange={handleSort}
        >
          <option value="-createdAt">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="-sold">Best sales</option>
          <option value="-price">Price: High-Low</option>
          <option value="price">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
