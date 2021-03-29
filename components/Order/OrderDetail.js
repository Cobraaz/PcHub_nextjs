import { Link, Image, useEffect, useState } from "helpers/package.import";
import { PaypalBtn } from "helpers/components.import";
import {
  patchData,
  updateItem,
  numberWithCommas,
  currcencyConvert,
  formatDate,
} from "helpers/helper.functions";

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const { auth, orders } = state;
  const [usdTotal, setUsdTotal] = useState(0);
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

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };
  // console.log(orderDetail);

  useEffect(() => {
    const convertCurrcency = async () => {
      setUsdTotal(Math.round(await currcencyConvert(orderDetail[0].total)));
    };
    if (orderDetail && orderDetail[0]) convertCurrcency();
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
                <p>Name: {order.user.name}</p>
                <p>Email: {order.user.email}</p>
                <p>Address: {order.address}</p>
                <p>Mobile: {order.mobile}</p>

                <div
                  style={{ maxWidth: "600px" }}
                  className={`alert ${
                    order.delivered ? "alert-success" : "alert-danger"
                  }
                        d-flex justify-content-between align-items-center`}
                  role="alert"
                >
                  {order.delivered
                    ? `Deliverd on ${order.updatedAt}`
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
                          title,
                          images,
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
                              <div className="image-container">
                                <Image
                                  width={500}
                                  height={500}
                                  src={images[0]}
                                  alt="item"
                                />
                              </div>
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
