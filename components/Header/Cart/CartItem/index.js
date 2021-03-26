import React from "react";

import { Image } from "helpers/package.import";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className="CartItemContainer">
    <Image src={imageUrl} alt="item" width={70} height={80} />
    <div className="ItemDetailsContainer">
      <span>{name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </div>
    <style jsx>{`
      .CartItemContainer {
        width: 100%;
        display: flex;
        height: 80px;
        margin-bottom: 15px;
      }
      .ItemDetailsContainer {
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 10px 20px;
      }
    `}</style>
  </div>
);

export default React.memo(CartItem);
