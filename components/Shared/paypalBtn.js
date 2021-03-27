import { useEffect, useRef, useContext } from "react";
import { patchData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { updateItem } from "../../store/Actions";

const paypalBtn = ({}) => {
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
                  value: "0.01",
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
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
