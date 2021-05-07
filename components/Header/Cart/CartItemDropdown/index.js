import React from "react";

import { Image, Link } from "helpers/package.import";
import { numberWithCommas } from "helpers/helper.functions";
import classes from "./cart-item-dropdown.module.css";
const CartItem = ({ item: { images, price, title, quantity, _id } }) => (
  <Link href={`/product/${_id}`}>
    <a className={classes.dropdown_container}>
      <Image src={images[0]} alt="Cart item" width={90} height={80} />
      <div className={classes.dropdown_details_container}>
        <span>{title.split(" ").slice(0, 2).join(" ")}</span>
        <span>
          {quantity} x {numberWithCommas(price)}
        </span>
      </div>
    </a>
  </Link>
);

export default React.memo(CartItem);
