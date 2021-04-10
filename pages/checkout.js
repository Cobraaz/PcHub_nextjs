import {
  useContext,
  useState,
  useRouter,
  Link,
  useEffect,
} from "helpers/package.import";
import {
  BaseLayout,
  BasePage,
  CartItem,
  Modal,
} from "helpers/components.import";
import {
  DataContext,
  numberWithCommas,
  getData,
  postData,
} from "helpers/helper.functions";

const Checkout = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders, modal } = state;
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [callback, setCallback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    const getTotal = async () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(
      localStorage.getItem("__next__cart01__cobraaz")
    );
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];

      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/get_by_id/${item._id}`);
          const { _id, title, images, price, inStock, sold } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };

      updateCart();
    }
  }, [callback]);

  const handlePayment = async () => {
    if (!address || !mobile)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add your address and mobile." },
      });

    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/get_by_id/${item._id}`);
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }

    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "The product is out of stock or the quantity is insufficient.",
        },
      });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    postData("order", { address, mobile, cart, total }, auth.token).then(
      (res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        dispatch({ type: "ADD_CART", payload: [] });

        const newOrder = {
          ...res.newOrder,
          user: auth.user,
        };
        dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
        dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        return router.push(`/order/${res.newOrder._id}`);
      }
    );
  };

  if (cart.length === 0)
    return (
      <BaseLayout>
        <div style={{ paddingTop: "150px" }}>
          <BasePage indexPage noWrapper={true}>
            <img
              className="img-responsive w-100"
              src="/empty-cart.jpg"
              alt="Empty cart"
            />
          </BasePage>
        </div>
      </BaseLayout>
    );

  return (
    <div onClick={() => showModal && toggleModal()}>
      <BaseLayout>
        <BasePage className=" wrapper cart-item-AB" title="PcHub Checkout">
          <Modal
            dispatch={dispatch}
            modal={modal}
            showModal={showModal}
            toggleModal={toggleModal}
            state={state}
          />
          <div className="row mx-auto">
            <div className="col-md-8 text-secondary">
              <h2 className="text-uppercase font-weight-bold">Shopping Cart</h2>

              <div className="my-3 CheckoutPageContainer">
                <div className="CheckoutHeaderContainer">
                  <div className="HeaderBlockContainer">
                    <span>Product</span>
                  </div>
                  <div className="HeaderBlockContainer mr-2">
                    <span>Description</span>
                  </div>
                  <div className="HeaderBlockContainer">
                    <span>Quantity</span>
                  </div>
                  <div className="HeaderBlockContainer">
                    <span>Price</span>
                  </div>
                  <div className="HeaderBlockContainer">
                    <span>Remove</span>
                  </div>
                </div>
                <div>
                  {cart.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      dispatch={dispatch}
                      cart={cart}
                      toggleModal={toggleModal}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-4 my-3 text-uppercase text-secondary">
              <h2 className="font-weight-bold pl-2">Shipping</h2>
              <div className="text-right">
                <form>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="form-control mb-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    className="form-control mb-2"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </form>

                <h3>
                  Total:{" "}
                  <span className="text-danger">{numberWithCommas(total)}</span>
                </h3>
                <Link href={auth.user ? "#!" : "/signin"}>
                  <a
                    className="btn btn-dark my-2"
                    onClick={() => {
                      handlePayment();
                    }}
                  >
                    Proceed with payment
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </BasePage>
      </BaseLayout>
    </div>
  );
};

export default Checkout;
