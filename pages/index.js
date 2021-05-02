import {
  useState,
  Row,
  Col,
  motion,
  useContext,
  useRouter,
  useEffect,
} from "helpers/package.import";

import {
  BaseLayout,
  BasePage,
  ProductItem,
  ProductListItem,
  Modal,
  Filter,
} from "helpers/components.import";

// import { productsFromDB } from "pages/api/product/all_products";

import {
  getData,
  stagger,
  getPhotoUnsplash,
  DataContext,
  filterSearch,
  fadeInUp,
} from "helpers/helper.functions";

import dynamic from "next/dynamic";
const Masthead = dynamic(() => import("components/Shared/Masthead"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const Home = ({ slideImages, result, products: resProducts, status }) => {
  const [products, setProducts] = useState(resProducts);
  const [isCheck, setIsCheck] = useState(false);
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [page, setPage] = useState(1);
  const [productToggle, setProductToggle] = useState("list");
  const toggleProductToggle = () =>
    setProductToggle((prevState) =>
      prevState === "list" ? "border-all" : "list"
    );
  useEffect(() => {
    setProducts(resProducts);
  }, [resProducts]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckALL = () => {
    products.forEach((product) => (product.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = async () => {
    try {
      if (auth.user.role !== "user") {
        let deleteArr = [];
        products.forEach((product) => {
          if (product.checked) {
            deleteArr.push({
              data: "",
              id: product._id,
              title: "Delete all selected products?",
              type: "DELETE_PRODUCT",
            });
          }
        });
        if (deleteArr.length !== 0) {
          toggleModal();
          dispatch({ type: "ADD_MODAL", payload: deleteArr });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!status === "success") {
    return (
      <>
        <BaseLayout>
          <BasePage className="signin-page wrapper">
            <div className="errMsg">{status}</div>
          </BasePage>
        </BaseLayout>
        <style jsx>{`
          .errMsg {
            background: rgb(214, 10, 10);
            color: #fff9;
            text-align: center;
            padding: 10px 0;
            letter-spacing: 1.3px;
          }
        `}</style>
      </>
    );
  }

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  return (
    <BaseLayout header_bg="transparent">
      <Masthead slideImages={slideImages} />

      <BasePage indexPage className="home-page">
        <Modal
          dispatch={dispatch}
          showModal={showModal}
          toggleModal={toggleModal}
          state={state}
        />

        <motion.div
          initial="initial"
          animate="animate"
          exit={{ opacity: 0 }}
          variants={stagger}
        >
          <motion.div
            className="text-right"
            variants={fadeInUp}
            style={{ marginTop: "15px", marginBottom: "2rem" }}
          >
            <Filter
              auth={auth}
              handleCheckALL={handleCheckALL}
              handleDeleteAll={handleDeleteAll}
              isCheck={isCheck}
              productToggle={productToggle}
              toggleProductToggle={toggleProductToggle}
            />
            <hr />
          </motion.div>
          <Row className="mt-3 mb-5">
            {products.length === 0 ? (
              <h2>No Products</h2>
            ) : (
              products.map((product, index) =>
                productToggle === "list" ? (
                  <Col key={index} lg="4" md="6" className="mb-5">
                    <ProductItem product={product} handleCheck={handleCheck} />
                  </Col>
                ) : (
                  <Col key={index} md="9" className="mb-5">
                    <ProductListItem
                      product={product}
                      handleCheck={handleCheck}
                    />
                  </Col>
                )
              )
            )}
          </Row>
          {result < page * 6 ? (
            ""
          ) : (
            <button
              className="btn btn-outline-info d-block mx-auto mb-4"
              onClick={handleLoadmore}
            >
              Load more
            </button>
          )}
        </motion.div>
      </BasePage>
    </BaseLayout>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";
  const brand = query.brand || "all";

  const { status, result, products } = await getData(
    `product/all_products?limit=${
      page * 6
    }&category=${category}&brand=${brand}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      slideImages: await getPhotoUnsplash(),
      status,
      result,
      products,
    },
  };
}

export default Home;
