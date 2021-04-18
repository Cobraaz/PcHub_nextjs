import CartItem from "components/Header/Cart/CartItemDropdown";

export const CartDropdown = ({ router, cartItems, HeaderToggler, auth }) => (
  <div>
    <div className="CartDropdownContainer">
      <div className="CartItemsContainer text-secondary">
        {auth.user &&
        (auth.user.role === "root" || auth.user.role === "admin") ? (
          <span className="EmptyMessageContainer text-secondary">
            {auth.user &&
              auth.user.role === "root" &&
              "You cannot add item to cart"}
          </span>
        ) : cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem._id} item={cartItem} />
          ))
        ) : (
          <span className="EmptyMessageContainer text-secondary">
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

//   {cartItems.length === 0
// ? auth.user && auth.user.role === "user"
//   ? "NO ITEM IN CART"
//   : "YOU CANNOT ADD ITEM TO CART"
// : "GO TO CHECKOUT"}
