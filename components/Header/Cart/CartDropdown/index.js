import CartItem from "components/Header/Cart/CartItemDropdown";

export const CartDropdown = ({ router, cartItems, HeaderToggler }) => (
  <div className="CartDropdownContainer">
    <div className="CartItemsContainer">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem._id} item={cartItem} />
        ))
      ) : (
        <span className="EmptyMessageContainer">Your cart is empty</span>
      )}
    </div>
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
    <style jsx>{`
      .CartDropdownContainer {
        position: absolute;
        width: 240px;
        height: 340px;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border: 1px solid black;
        background-color: white;
        top: 90px;
        right: 40px;
        z-index: 5;
      }
      .EmptyMessageContainer {
        font-size: 18px;
        margin: 50px auto;
      }
      .CartItemsContainer {
        height: 240px;
        display: flex;
        flex-direction: column;
        overflow: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .CartDropdownButton {
        background-color: #f47625;
      }

      .CartItemsContainer::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  </div>
);

export default CartDropdown;
