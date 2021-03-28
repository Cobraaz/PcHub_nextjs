import { useEffect, useRef } from "react";
import { postData } from "helpers/helper.functions";
const paypalBtn = ({ total, address, mobile, dispatch, state }) => {
  const refPaypalBtn = useRef();
  // const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  console.log("total", total);
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
            // console.log(data);
            postData(
              "order",
              { address, mobile, cart, total },
              auth.token
            ).then((res) => {
              if (res.err)
                dispatch({ type: "NOTIFY", payload: { error: res.err } });

              dispatch({ type: "ADD_CART", payload: [] });
              dispatch({ type: "NOTIFY", payload: { success: res.msg } });
            });
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        },
      })
      .render(refPaypalBtn.current);
    //This function displays Smart Payment Buttons on your web page.
  }, []);

  return <div ref={refPaypalBtn}></div>;
};

export default paypalBtn;
