import { useState, Row, Col, motion, useContext } from "helpers/package.import";

import {
  BaseLayout,
  BasePage,
  Masthead,
  ProductItem,
  Modal,
} from "helpers/components.import";

// import { productsFromDB } from "pages/api/product/all_products";

import {
  shuffle,
  getData,
  stagger,
  getPhotoUnsplash,
  DataContext,
} from "helpers/helper.functions";

const Home = ({ slideImages, products: resProducts, status }) => {
  const [products, setProducts] = useState(resProducts);
  const [isCheck, setIsCheck] = useState(false);

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

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
          {auth.user && auth.user.role !== "user" && (
            <div
              className="delete_all btn btn-danger mt-2"
              style={{ marginBottom: "10px" }}
            >
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
        </motion.div>
      </BasePage>
    </BaseLayout>
  );
};

// * This function is called during the build time
// * Improved performance of page,
// * It will create static page with dynamic data

// export async function getStaticProps() {
//   const { status, result, productsResponse: products } = JSON.parse(
//     JSON.stringify(await productsFromDB())
//   );
//   return {
//     props: {
//       slideImages: await getPhotoUnsplash(),
//       status,
//       result,
//       products,
//     },
//     revalidate: 1,
//   };
// }

export async function getStaticProps() {
  const { status, result, products } = await getData("product/all_products");

  return {
    props: {
      slideImages: await getPhotoUnsplash(),
      status,
      result,
      products,
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps() {
//   const { status, result, products } = await getData("product/all_products");

//   return {
//     props: {
//       slideImages: await getPhotoUnsplash(),
//       status,
//       result,
//       products,
//     },
//   };
// }

export default Home;
