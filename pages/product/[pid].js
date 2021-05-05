import {
  useState,
  useContext,
  useEffect,
  Row,
  Col,
  motion,
  Image,
} from "helpers/package.import";
import {
  BaseLayout,
  BasePage,
  ProductItem,
  Modal,
  Comments,
} from "helpers/components.import";
import {
  stagger,
  DataContext,
  fadeInUp,
  getData,
  numberWithCommas,
  countWords,
  addToCart,
  capitalize,
} from "helpers/helper.functions";

const DetailProduct = ({ product, products: resProducts, pid: productId }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const [products] = useState(resProducts);
  const [tab, setTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const isActive = (index) => {
    if (tab === index) return " active-img";
    return "";
  };
  useEffect(() => {
    const id = setInterval(() => {
      setTab(tab >= product.images.length - 1 ? 0 : tab + 1);
    }, 3000);
    return () => clearInterval(id);
  }, [tab]);

  const handleDelete = async (product) => {
    try {
      if (auth.user.role !== "user") {
        toggleModal();
        dispatch({
          type: "ADD_MODAL",
          payload: [
            {
              data: "",
              id: product._id,
              title: product.title,
              type: "DELETE_PRODUCT",
            },
          ],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return null;
  return (
    <BaseLayout>
      <BasePage
        indexPage
        className="product-detail-page"
        title={`${capitalize(
          product.title.split(" ").slice(0, 2).join(" ")
        )} ...`}
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
          className="card-wrapper"
        >
          <div className="card-product-detail">
            {/* <!-- card left --> */}

            <motion.div
              className="img"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className="product-imgs"
            >
              <div className="img-display">
                <div className="img-showcase">
                  <motion.div variants={fadeInUp}>
                    <Image
                      src={product.images[tab]}
                      alt="Product image"
                      width={500}
                      height={400}
                      className="img-product"
                    />
                  </motion.div>
                </div>
                <br />
              </div>
              <div className="img-select">
                {product.images.map((img, index) => (
                  <motion.div
                    className="img-item"
                    data-id="1"
                    key={index}
                    variants={fadeInUp}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      transition={{ delay: 1.5, duration: 2 }}
                      whileHover={{ scale: 1.2 }}
                      className={`img-thumbnail rounded ${isActive(index)} `}
                    >
                      <Image
                        src={img}
                        alt="Product image"
                        onClick={() => setTab(index)}
                        width={120}
                        height={100}
                        quality={25}
                        className="img-product"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* <!-- card right --> */}
            <div className="product-content">
              <motion.h2 variants={fadeInUp} className="product-title">
                {product.title.split(" ").slice(0, 2).join(" ")}
                {countWords(product.title) > 2 && "..."}
              </motion.h2>

              <motion.div variants={fadeInUp} className="product-price">
                <p className="new-price">
                  Price: <span>{numberWithCommas(product.price)}</span>
                </p>
              </motion.div>

              <div className="product-detail">
                <motion.h2 variants={fadeInUp}>about this item: </motion.h2>
                <motion.p variants={fadeInUp}>
                  {product.content.split(" ").slice(0, 40).join(" ")}
                </motion.p>
                <motion.p variants={fadeInUp}>
                  {product.description.split(" ").slice(0, 30).join(" ")}...
                </motion.p>
                <motion.ul variants={fadeInUp}>
                  <li>
                    In Stock:{" "}
                    <span className="text-danger">
                      {product.inStock} pieces
                    </span>
                  </li>
                  <li>
                    Available: <span className="text-info">in stock</span>
                  </li>
                  <li>
                    Sold: <span className="text-danger">{product.sold}</span>
                  </li>
                </motion.ul>
              </div>

              <motion.div variants={fadeInUp} className="purchase-info">
                {/* <input
                  type="number"
                  min="0"
                  //   value="1"
                /> */}
                {!auth.user || auth.user.role === "user" ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="btn"
                    style={{ border: "none" }}
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => {
                      dispatch(addToCart(product, cart));
                      let timer = setTimeout(() => {
                        dispatch({ type: "NOTIFY", payload: {} });
                      }, 0);
                      clearTimeout(timer);
                    }}
                  >
                    Add to Cart{" "}
                    <i
                      className="ri-shopping-cart-fill"
                      style={{
                        fontSize: "1.2em",
                        verticalAlign: "middle",
                      }}
                    ></i>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="btn text-bold"
                    style={{ border: "none" }}
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => handleDelete(product)}
                  >
                    DELETE
                    <i
                      className="ri-delete-bin-line "
                      style={{
                        fontSize: "1.3em",
                        verticalAlign: "middle",
                      }}
                    ></i>
                  </motion.button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
        <Comments comments={product.comments} productId={productId} />
        <motion.h1
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="related-product-title"
        >
          Related Products
        </motion.h1>
        <Row className="mt-3 mb-5">
          {products.length === 0 ? (
            <h2>No Products</h2>
          ) : (
            products.map((product, index) => (
              <Col key={index} lg="4" md="6" className="mb-5">
                <ProductItem key={index} product={product} />
              </Col>
            ))
          )}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  const { status, result, products } = await getData("product");
  const paths = products.map((product) => {
    return {
      params: { pid: product._id },
    };
  });
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { pid } }) {
  const { product } = await getData(`product/get_by_id/${pid}`);
  const { products } = await getData(`product/random_data/${pid}`);

  return { props: { product, products, pid }, revalidate: 1 };
}

// export async function getServerSideProps({ params: { pid } }) {
//   const { product } = await getData(`product/get_by_id/${pid}`); // server side rendering
//   const { products } = await getData(`product/random_data/${pid}`);
//   return {
//     props: { product, products }, // will be passed to the page component as props
//   };
// }

export default DetailProduct;
