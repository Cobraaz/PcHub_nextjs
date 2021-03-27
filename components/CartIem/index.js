import { Link, Image } from "helpers/package.import";

const CartItem = ({ item }) => {
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
        <div className="QuantityContainer ">
          <div>&#10094;</div>
          <span>{quantity}</span>
          <div>&#10095;</div>
        </div>
      </div>
      <div className="HeaderBlockContainer font-weight-bold">
        <span>{price}</span>
      </div>
      <div className="HeaderBlockContainer">
        <div className="RemoveButtonContainer float-right">
          <i className="ri-close-circle-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
