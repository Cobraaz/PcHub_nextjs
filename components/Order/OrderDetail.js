import {
  Link,
  Image,
  useEffect,
  useState,
  useRouter,
} from "helpers/package.import";
import { PaypalBtn } from "helpers/components.import";
import {
  patchData,
  updateItem,
  numberWithCommas,
  formatDate,
  getData,
} from "helpers/helper.functions";

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const { auth, orders } = state;
  const [usdTotal, setUsdTotal] = useState(0);
  const router = useRouter();

  const handleDelivered = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      const { paid, dateOfPayment, method, delivered } = res.result;

      dispatch(
        updateItem(
          orders,
          order._id,
          {
            ...order,
            paid,
            dateOfPayment,
            method,
            delivered,
          },
          "ADD_ORDERS"
        )
      );

      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      return router.push("/user/profile");
    });
  };

  useEffect(() => {
    const convertCurrcency = async () => {
      const newTotal = orderDetail[0].total;
      const res = await getData(`order/payment/get_amount/${newTotal}`);
      setUsdTotal(Math.round(res.amount));
    };

    if (orderDetail && orderDetail[0] && !Boolean(orderDetail[0].paid))
      convertCurrcency();
  }, [orderDetail]);

  if (!auth.user) return null;
  return (
    <>
      {orderDetail.map((order) => (
        <div
          key={order._id}
          style={{ margin: "20px auto" }}
          className="row justify-content-around Order-detail-AB"
        >
          <div className="col-md-8 text-secondary">
            <div className="text-uppercase my-3">
              <h2 className="text-break" style={{ fontSize: "16px" }}>
                Order <span className="font-weight-bold">{order._id}</span>
              </h2>

              <div className="mt-4 text-secondary">
                <h3>Shipping</h3>
                <p>Name: {order.user ? order.user.name : "unknown"}</p>
                <p>Email: {order.user ? order.user.email : "unknown"}</p>
                <p>Address: {order.user ? order.user.address : "unknown"}</p>
                <p>Mobile: {order.user ? order.user.mobile : "unknown"}</p>

                <div
                  style={{ maxWidth: "600px" }}
                  className={`alert ${
                    order.delivered ? "alert-success" : "alert-danger"
                  }
                        d-flex justify-content-between align-items-center`}
                  role="alert"
                >
                  {order.delivered
                    ? `Deliverd on ${formatDate(order.updatedAt, "LLLL")}`
                    : "Not Delivered"}
                  {(auth.user.role === "root" || auth.user.role === "admin") &&
                    !order.delivered && (
                      <button
                        className="btn btn-dark text-uppercase"
                        onClick={() => handleDelivered(order)}
                      >
                        Mark as delivered
                      </button>
                    )}
                </div>

                <h3>Payment</h3>
                {order.method && (
                  <h6>
                    Method: <em>{order.method}</em>
                  </h6>
                )}

                {order.paymentId && (
                  <p>
                    PaymentId: <em>{order.paymentId}</em>
                  </p>
                )}

                <div
                  style={{ maxWidth: "600px" }}
                  className={`alert ${
                    order.paid ? "alert-success" : "alert-danger"
                  }
                        d-flex justify-content-between align-items-center`}
                  role="alert"
                >
                  {order.paid
                    ? `Paid on ${formatDate(order.dateOfPayment, "LLLL")}`
                    : "Not Paid"}
                </div>

                <h3>Order Items</h3>
                <div style={{ maxWidth: "600px" }}>
                  <div className="my-3 order-detail-AB-container">
                    <div className="order-detail-AB-header-container">
                      <div className="order-detail-AB-block-container">
                        <span>Product</span>
                      </div>
                      <div className="order-detail-AB-block-container">
                        <span>Description</span>
                      </div>
                      <div className="order-detail-AB-block-container">
                        <span className="ml-3">Quantity</span>
                      </div>
                      <div className="order-detail-AB-block-container">
                        <span className="ml-3">Price</span>
                      </div>
                      <div className="order-detail-AB-block-container">
                        <span style={{ float: "right" }}>Total</span>
                      </div>
                    </div>
                    <div>
                      {order.cart.map((item) => {
                        const {
                          title = "unknown",
                          images = "https://res.cloudinary.com/cobraaz/image/upload/v1595762337/gez4i626tlesoe3plwn7.jpg",
                          price,
                          quantity,
                          _id,
                          inStock,
                        } = item;
                        return (
                          <div
                            key={_id}
                            className="order-detail-AB-item-container"
                          >
                            <Link href={`/product/${_id}`}>
                              <a className="image-container">
                                <Image
                                  width={500}
                                  height={500}
                                  src={images[0]}
                                  alt="Product Image"
                                />
                              </a>
                            </Link>
                            <span
                              href={`/product/${_id}`}
                              className="text-container mr-2"
                            >
                              <Link href={`/product/${_id}`}>
                                <a> {title.split(" ").slice(0, 2).join(" ")}</a>
                              </Link>
                            </span>
                            <div className="order-detail-AB-block-container font-weight-bold">
                              <span className="ml-3">{quantity}</span>
                            </div>
                            <div className="order-detail-AB-block-container font-weight-bold">
                              <span>{numberWithCommas(price)}</span>
                            </div>
                            <div className="order-detail-AB-block-container font-weight-bold">
                              <span style={{ float: "right" }}>
                                {numberWithCommas(price * quantity)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="order-detail-AB-total-container font-weight-bold float-right">
                      <div className="order-detail-AB-block-container "></div>
                      <div className="order-detail-AB-block-container font-weight-bold"></div>
                      <div className="order-detail-AB-block-container font-weight-bold"></div>
                      <div className="order-detail-AB-block-container font-weight-bold"></div>
                      <div
                        style={{ float: "right" }}
                        className="order-detail-AB-block2-container font-weight-bold"
                      >
                        <span
                          style={{
                            float: "right",
                            borderTop: "1px solid darkgrey",
                            borderBottom: "1px solid darkgrey",
                          }}
                          className="ml-3"
                        >
                          {numberWithCommas(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 my-3 text-uppercase text-secondary">
            {!order.paid &&
              (auth.user.role !== "admin" || auth.user.role !== "root") && (
                <div className="p-4">
                  <h2 className="mb-4 text-uppercase">
                    Total: {numberWithCommas(order.total)}
                  </h2>
                  {usdTotal > 0 && <PaypalBtn total={usdTotal} order={order} />}
                </div>
              )}
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
