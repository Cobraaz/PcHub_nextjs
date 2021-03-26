import CartItem from "components/Header/Cart/CartItem";

const cartItems = [
  {
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/61yUru0KU0L._SL1324_.jpg",
    price: 50000,
    name: "Thermaltake H200",
    quantity: 3,
  },
  {
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/71Ips2b0RVL._SL1500_.jpg",
    price: 70000,
    name: "Gaming PC Computer",
    quantity: 2,
  },
];

export const CartDropdown = (
  {
    //   cartItems,
    // , history, dispatch
  }
) => (
  <div className="CartDropdownContainer">
    <div className="CartItemsContainer">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="EmptyMessageContainer">Your cart is empty</span>
      )}
    </div>
    <button
      className="btn-signin mt-3 btn btn-secondary btn-block"
      //   onClick={() => {
      // history.push("/checkout");
      // dispatch(toggleCartHidden());
      //   }}
    >
      GO TO CHECKOUT
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

// export const CartDropdownContainer = styled.div`
//   position: absolute;
//   width: 240px;
//   height: 340px;
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   border: 1px solid black;
//   background-color: white;
//   top: 90px;
//   right: 40px;
//   z-index: 5;
// `;

// export const CartDropdownButton = styled(CustomButton)`
//   margin-top: auto;
// `;

// CartDropdownButton.displayName = "CartDropdownButton";

// export const EmptyMessageContainer = styled.span`
//   font-size: 18px;
//   margin: 50px auto;
// `;

// EmptyMessageContainer.displayName = "EmptyMessageContainer";

// export const CartItemsContainer = styled.div`
//   height: 240px;
//   display: flex;
//   flex-direction: column;
//   overflow: scroll;
// `;
