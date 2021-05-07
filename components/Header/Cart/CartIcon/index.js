import classes from "./cart-icon.module.css";
export const CartIcon = ({ cartLength, className }) => (
  <div className={classes.cart_icon_container}>
    <img
      src="/shopping-bag.svg"
      style={{
        width: "24px",
        height: "24px",
        color: "white",
      }}
    />
    <span className={classes.item_Count_container}>{cartLength}</span>
  </div>
);

export default CartIcon;
