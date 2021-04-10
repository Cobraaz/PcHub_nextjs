import { Link, Image } from "helpers/package.import";
import { decrease, increase, numberWithCommas } from "helpers/helper.functions";

const CartItem = ({ item, dispatch, cart, toggleModal }) => {
  const { title, images, price, quantity, _id, inStock } = item;

  return (
    <div className="CheckoutItemContainer">
      <Link href={`/product/${_id}`}>
        <div className="ImageContainer">
          <Image width={500} height={500} src={images[0]} alt="checkout item" />
        </div>
      </Link>
      <span href={`/product/${_id}`} className="TextContainer mr-2">
        <Link href={`/product/${_id}`}>
          <a> {title.split(" ").slice(0, 2).join(" ")}</a>
        </Link>
      </span>
      <div className="HeaderBlockContainer ">
        <div className="QuantityContainer btnArrow">
          <button
            onClick={() => dispatch(decrease(cart, _id))}
            disabled={quantity === 1 ? true : false}
            className="btnArrow"
          >
            &#10094;
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => dispatch(increase(cart, _id))}
            disabled={quantity === inStock ? true : false}
            className="btnArrow"
          >
            &#10095;
          </button>
        </div>
      </div>
      <div className="HeaderBlockContainer font-weight-bold">
        <span>{numberWithCommas(quantity * price)}</span>
      </div>
      <div className="HeaderBlockContainer">
        <div
          onClick={() => {
            toggleModal();
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: cart,
                  id: _id,
                  title: title,
                  type: "ADD_CART",
                },
              ],
            });
          }}
          className="RemoveButtonContainer float-right"
        >
          <i className="ri-close-circle-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
