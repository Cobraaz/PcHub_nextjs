export const CartIcon = ({ cartLength, className }) => (
  <div className="CartIconContainer">
    <img
      src="/shopping-bag.svg"
      style={{
        width: "24px",
        height: "24px",
        color: "white",
      }}
    />
    <span className="CartIconItemCountContainer">{cartLength}</span>
  </div>
);

export default CartIcon;
