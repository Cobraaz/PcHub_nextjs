import { useEffect, useRef, useContext } from "helpers/package.import";
import {
  patchData,
  updateItem,
  DataContext,
  postData,
} from "helpers/helper.functions";

const paypalBtn = ({ order, total }) => {
  const refPaypalBtn = useRef();
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  useEffect(() => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          dispatch({
            type: "NOTIFY",
            payload: { loading: true },
          });
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.

            patchData(`order/${order._id}`, null, auth.token).then((res) => {
              if (res.err)
                dispatch({ type: "NOTIFY", payload: { error: res.err } });

              dispatch(
                updateItem(
                  orders,
                  order._id,
                  {
                    ...order,
                    paid: true,
                    dateOfPayment: details.create_time,
                    paymentId: details.payer.payer_id,
                    method: "Paypal",
                  },
                  "ADD_ORDERS"
                )
              );

              return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
              });
            });
          });
        },
      })
      .render(refPaypalBtn.current);
    //This function displays Smart Payment Buttons on your web page.
  }, []);

  return <div ref={refPaypalBtn}></div>;
};

export default paypalBtn;
