export const CartIcon = ({ cartLength }) => (
  <div className="cartContainer">
    <img
      src="/shopping-bag.svg"
      style={{
        width: "24px",
        height: "24px",
        color: "white",
      }}
    />
    <span className="ItemCountContainer">{cartLength}</span>
    <style jsx>{`
      .cartContainer {
        width: 45px;
        height: 45px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .ItemCountContainer {
        position: absolute;
        font-size: 10px;
        font-weight: bold;
        bottom: 12px;
        color: white;
      }
    `}</style>
  </div>
);

export default CartIcon;
