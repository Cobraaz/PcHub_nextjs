import Link from "next/link";
import { useContext } from "react";
import { numberWithCommas } from "utils/helper.functions";
import { DataContext } from "../../store/GlobalState";
// import { addToCart } from "../../store/Actions";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <button
          className="btn btn-dark float-right px-3"
          style={{ marginRight: "5px", flex: 1 }}
          disabled={product.inStock === 0 ? true : false}
        >
          Buy
        </button>
      </>
    );
  };

  return (
    <div className="card-Ab" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={product.images[0]}
        alt="Product Image"
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize" title={product.title}>
          {product.title}
        </h5>

        <div className="row justify-content-between mx-0">
          <h6 className="text-danger">{numberWithCommas(product.price)}</h6>
          {product.inStock > 0 ? (
            <h6 className="text-danger">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Out Stock</h6>
          )}
        </div>

        <p className="card-text" title={product.description}>
          {product.description}
        </p>
        <div className=" justify-content-between mx-0 ">{userLink()}</div>
      </div>
    </div>
  );
};

export default ProductItem;
