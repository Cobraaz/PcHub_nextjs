import Link from "next/link";
import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { numberWithCommas } from "utils/helper.functions";

const CardItem = ({ product }) => {
  return (
    <div>
      <Card className="card-body-wrapper-Ab">
        <CardImg
          className="card-img-top-Ab"
          top
          width="100%"
          src={product.images[0]}
          alt="Product Image"
        />
        <CardBody>
          <CardTitle className="card-title-Ab mb-2" title={product.title}>
            {product.title.split(" ").slice(0, 2).join(" ")}
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            <div className="row justify-content-between mx-0">
              <h6 className="text-danger">{numberWithCommas(product.price)}</h6>
              {product.inStock > 0 ? (
                <h6 className="text-danger">In Stock: {product.inStock}</h6>
              ) : (
                <h6 className="text-danger">Out Stock</h6>
              )}
            </div>
          </CardSubtitle>
          <CardText className="card-text-Ab" title={product.description}>
            {product.description}
          </CardText>
        </CardBody>

        <Link href="/">
          <a className="card-button-Ab">Add to cart</a>
        </Link>
      </Card>
    </div>
  );
};

export default CardItem;
