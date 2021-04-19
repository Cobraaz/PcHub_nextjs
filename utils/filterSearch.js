const filterSearch = ({
  router,
  page,
  category,
  sort,
  search,
  brand,
  prebuild = false,
}) => {
  const path = router.pathname;
  const query = router.query;

  if (category) query.category = category;
  if (page) query.page = page;
  if (search) query.search = search;
  if (sort) query.sort = sort;
  if (brand) query.brand = brand;

  if (prebuild)
    return router.replace(
      {
        pathname: "/pre-build-pc",
        query: query,
      },
      null,
      {
        scroll: false,
      }
    );
  if (path === "/")
    return router.replace(
      {
        pathname: "/",
        query: query,
      },
      null,
      {
        scroll: false,
      }
    );
  else
    return router.push(
      {
        pathname: "/",
        query: query,
      },
      null,
      {
        scroll: false,
      }
    );
};

export default filterSearch;
