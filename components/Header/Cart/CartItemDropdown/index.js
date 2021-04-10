import React from "react";

import { Image } from "helpers/package.import";
import { numberWithCommas } from "helpers/helper.functions";

const CartItem = ({ item: { images, price, title, quantity } }) => (
  <div className="CartItemDropdownContainer">
    <Image src={images[0]} alt="Cart item" width={90} height={80} />
    <div className="CartItemDropdownDetailsContainer">
      <span>{title.split(" ").slice(0, 2).join(" ")}</span>
      <span>
        {quantity} x {numberWithCommas(price)}
      </span>
    </div>
  </div>
);

export default React.memo(CartItem);
