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
  Modal,
} from "helpers/components.import";

import {
  getData,
  stagger,
  DataContext,
  filterSearch,
} from "helpers/helper.functions";

const PreBuildPc = ({ products: resProducts, status, result }) => {
  const [products, setProducts] = useState(resProducts);
  const [isCheck, setIsCheck] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [page, setPage] = useState(1);
  const router = useRouter();

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

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1, prebuild: true });
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

  return (
    <BaseLayout>
      <BasePage
        className="wrapper"
        header="Pre Build Pc's"
        title="PcHub Pre Build Pc"
      >
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
          {!(products.length === 0) && auth.user && auth.user.role !== "user" && (
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
          <Row className="mt-3 mb-5">
            {products.length === 0 ? (
              <h2>No Products</h2>
            ) : (
              products.map((product, index) => (
                <Col key={index} lg="4" md="6" className="mb-5">
                  <ProductItem
                    key={index}
                    product={product}
                    handleCheck={handleCheck}
                  />
                </Col>
              ))
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

  const { status, result, products } = await getData(
    `product/get_prebuildpc/6079b93dddf2d5405c0b8c35?limit=${page * 6}`
  );

  return {
    props: {
      status,
      result,
      products,
    },
  };
}

export default PreBuildPc;
