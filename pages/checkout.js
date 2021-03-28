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
  PaypalBtn,
} from "helpers/components.import";
import {
  DataContext,
  numberWithCommas,
  getData,
} from "helpers/helper.functions";

import currency from "currency-converter-module";

const Checkout = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders, modal } = state;

  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const [callback, setCallback] = useState(false);
  const [payment, setPayment] = useState(false);
  const [usdTotal, setUsdTotal] = useState(0);

  const currcencyConvert = async (price) => {
    var convertedValue = await currency.convertCurrencyByCode(
      { value: price, code: "INR" },
      { code: "USD" }
    );
    return await convertedValue;
  };

  useEffect(() => {
    const getTotal = async () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      const usdTotal = Math.round(await currcencyConvert(res));
      setUsdTotal(usdTotal);
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
  }, []);

  const router = useRouter();

  const handlePayment = async () => {
    if (!address || !mobile)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add your address and mobile." },
      });
    setPayment(true);
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
      {/* <Head>
        <script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}
        ></script>
      </Head> */}
      <BaseLayout>
        <BasePage className=" wrapper cart-item-AB ">
          <Modal
            dispatch={dispatch}
            modal={modal}
            showModal={showModal}
            toggleModal={toggleModal}
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
                {payment ? (
                  <PaypalBtn
                    total={usdTotal}
                    address={address}
                    mobile={mobile}
                    dispatch={dispatch}
                    state={state}
                  />
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </BasePage>
      </BaseLayout>
    </div>
  );
};

export default Checkout;
