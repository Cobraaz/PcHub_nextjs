import { NextRouter } from "next/router";

interface FilterSearchProps {
  router: NextRouter;
  page?: number;
  category?: string;
  sort?: string;
  search?: string;
  brand?: string;
  prebuild?: boolean;
}

const filterSearch = ({
  router,
  page,
  category,
  sort,
  search,
  brand,
  prebuild = false,
}: FilterSearchProps) => {
  const path = router.pathname;
  const query = router.query;

  if (category) query.category = category;
  if (page) query.page = page as any;
  if (search) query.search = search;
  if (sort) query.sort = sort;
  if (brand) query.brand = brand;

  if (prebuild)
    return router.replace(
      {
        pathname: "/pre-build-pc",
        query: query,
      },
      undefined,
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
      undefined,
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
      undefined,
      {
        scroll: false,
      }
    );
};

export default filterSearch;
