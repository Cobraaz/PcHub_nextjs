import { Link, Image } from "helpers/package.import";
import { decrease, increase, numberWithCommas } from "helpers/helper.functions";

const CartItem = ({ item, dispatch, cart, toggleModal }) => {
  const { title, images, price, quantity, _id } = item;

  return (
    <div className="CheckoutItemContainer">
      <Link href={`/product/${item._id}`}>
        <div className="ImageContainer">
          <Image width={500} height={500} src={images[0]} alt="item" />
        </div>
      </Link>
      <span href={`/product/${item._id}`} className="TextContainer mr-2">
        <Link href={`/product/${item._id}`}>
          <a> {title.split(" ").slice(0, 2).join(" ")}</a>
        </Link>
      </span>
      <div className="HeaderBlockContainer ">
        <div className="QuantityContainer btnArrow">
          <button
            onClick={() => dispatch(decrease(cart, item._id))}
            disabled={item.quantity === 1 ? true : false}
            className="btnArrow"
          >
            &#10094;
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => dispatch(increase(cart, item._id))}
            disabled={item.quantity === item.inStock ? true : false}
            className="btnArrow"
          >
            &#10095;
          </button>
        </div>
      </div>
      <div className="HeaderBlockContainer font-weight-bold">
        <span>{numberWithCommas(item.quantity * item.price)}</span>
      </div>
      <div className="HeaderBlockContainer">
        <div
          onClick={() => {
            toggleModal();
            dispatch({
              type: "ADD_MODAL",
              payload: {
                data: cart,
                id: item._id,
                title: item.title,
                type: "ADD_CART",
              },
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
