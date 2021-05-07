import {
  motion,
  useRouter,
  useContext,
  useState,
} from "helpers/package.import";
import { Modal } from "helpers/components.import";
import {
  fadeInUp,
  numberWithCommas,
  DataContext,
  addToCart,
  capitalize,
} from "helpers/helper.functions";
import { CardBody, CardTitle, CardHeader } from "reactstrap";
import classes from "./Product.module.css";

const ProductListItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

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
  return (
    <>
      <Modal
        dispatch={dispatch}
        showModal={showModal}
        toggleModal={toggleModal}
        state={state}
      />

      <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`card-body-wrapper`}
        >
          <div className="card-list-Ab card clickable">
            {auth.user && auth.user.role !== "user" && (
              <input
                type="checkbox"
                checked={product.checked}
                style={{ height: "30px", width: "30px" }}
                onChange={() => handleCheck(product._id)}
              />
            )}
            <div
              onClick={() =>
                router.push("/product/[id]", `/product/${product._id}`)
              }
            >
              <CardHeader className="d-flex flex-row">
                <div>
                  <CardTitle className={classes.card_main_title}>
                    {capitalize(product.title.split(" ").slice(0, 2).join(" "))}
                  </CardTitle>
                  <motion.h6
                    className={`card-subtitle text-muted ${classes.text_opacity_subtitle}`}
                  >
                    <div
                      variants={fadeInUp}
                      className="row justify-content-between mx-0"
                    >
                      <h6 className="text-danger">
                        {numberWithCommas(product.price)}
                      </h6>
                      {product.inStock > 0 ? (
                        <h6 className="text-danger">
                          In Stock: {product.inStock}
                        </h6>
                      ) : (
                        <h6 className="text-danger">Out Stock</h6>
                      )}
                    </div>
                  </motion.h6>
                </div>
              </CardHeader>
              <CardBody>
                <>
                  <div
                    className={`card-text ${classes.text_opacity_description}`}
                  >
                    {product.description.split(" ").slice(0, 7).join(" ")}...
                  </div>
                </>
              </CardBody>
            </div>
            {!auth.user || auth.user.role === "user" ? (
              <motion.button
                whileTap={{ scale: 0.85 }}
                disabled={product.inStock === 0 ? true : false}
                onClick={() => {
                  dispatch(addToCart(product, cart));
                  let timer = setTimeout(() => {
                    dispatch({ type: "NOTIFY", payload: {} });
                  }, 0);
                  clearTimeout(timer);
                }}
                style={{ outline: "none" }}
                className=" card-button-Ab border-0"
              >
                Add to cart
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  disabled={product.inStock === 0 ? true : false}
                  onClick={() =>
                    router.push(
                      "/create_product/[id]",
                      `/create_product/${product._id}`
                    )
                  }
                  style={{ outline: "none", right: "8.6rem" }}
                  className=" card-button-Ab border-0"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  disabled={product.inStock === 0 ? true : false}
                  onClick={() => handleDelete(product)}
                  style={{ outline: "none" }}
                  className=" card-button-Ab border-0"
                >
                  Delete
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProductListItem;
