import {
  motion,
  Image,
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
import classes from "./Product.module.css";

const ProductItem = ({ product, handleCheck }) => {
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
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="card-body-wrapper-Ab card">
            {auth.user && auth.user.role !== "user" && (
              <input
                type="checkbox"
                checked={product.checked}
                className="position-absolute"
                style={{ height: "30px", width: "30px" }}
                onChange={() => handleCheck(product._id)}
              />
            )}
            <motion.div
              variants={fadeInUp}
              onClick={() =>
                router.push(
                  {
                    pathname: `/product/${product._id}`,
                  },
                  null,
                  {
                    scroll: true,
                  }
                )
              }
            >
              <motion.div variants={fadeInUp} className="card-img-top-Ab">
                <Image
                  className="card-img-top-Ab"
                  top="true"
                  src={product.images[0]}
                  alt="Product Image"
                  width={300}
                  height={230}
                  quality={25}
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="card-body">
                <motion.div
                  className="card-title card-title-Ab mb-2"
                  title={product.title}
                >
                  {capitalize(product.title.split(" ").slice(0, 2).join(" "))}
                </motion.div>
                <div>
                  <motion.h6
                    className={`card-subtitle mb-2 text-muted ${classes.text_opacity_subtitle}`}
                  >
                    <motion.div
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
                    </motion.div>
                  </motion.h6>
                  <hr />
                  <motion.p
                    className={`card-text card-text-Ab ${classes.text_opacity_description}`}
                    title={product.description}
                  >
                    {product.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
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
            style={{
              outline: "none",
              right: "45%",
            }}
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
    </>
  );
};

export default ProductItem;
