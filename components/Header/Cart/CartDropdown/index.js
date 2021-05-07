import CartItem from "components/Header/Cart/CartItemDropdown";
import classes from "./cart-dropdown.module.css";
export const CartDropdown = ({ router, cartItems, HeaderToggler, auth }) => (
  <div>
    <div className={classes.cart_dropdown_container}>
      <div className={`${classes.cart_items_container} text-secondary`}>
        {auth.user &&
        (auth.user.role === "root" || auth.user.role === "admin") ? (
          <span className={`${classes.empty_message_container} text-secondary`}>
            {auth.user &&
              auth.user.role === "root" &&
              "You cannot add item to cart"}
          </span>
        ) : cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem._id} item={cartItem} />
          ))
        ) : (
          <span className={`${classes.empty_message_container} text-secondary`}>
            {auth.user && auth.user.role === "root"
              ? "You cannot add item to cart"
              : "Your cart is empty"}
          </span>
        )}
      </div>
      {auth.user &&
      (auth.user.role === "root" || auth.user.role === "admin") ? (
        <button
          className="btn-signin mt-3 btn btn-secondary btn-block"
          disabled={true}
        >
          NO ITEM IN CART
        </button>
      ) : (
        <button
          className="btn-signin mt-3 btn btn-secondary btn-block"
          disabled={cartItems.length === 0 ? true : false}
          onClick={() => {
            router.push("/checkout");
            HeaderToggler();
          }}
        >
          {cartItems.length === 0 ? "NO ITEM IN CART" : "GO TO CHECKOUT"}
        </button>
      )}
    </div>
  </div>
);

export default CartDropdown;
