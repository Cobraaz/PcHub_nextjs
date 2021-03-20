import { useState, useEffect } from "react";
import Head from "next/head";
import { Row, Col } from "reactstrap";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { fakeProductsData } from "populate/FakeData";
import ProductItem from "components/product/ProductItem";
import { numberWithCommas, countWords } from "utils/helper.functions";

const Home = () => {
  const [products] = useState(fakeProductsData);
  const [tab, setTab] = useState(0);
  const product = {
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/61yUru0KU0L._SL1324_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/614JgEzGhdL._SL1360_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61Z5WdyPRRL._SL1416_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/612tmLKVQ9L._SL1500_.jpg",
    ],
    checked: false,
    inStock: 200,
    sold: 10,
    title:
      "Thermaltake H200 Tempered Glass Snow Edition RGB Light Strip ATX Mid Tower Case with One 120mm Rear Fan Pre-Installed CA-1M3-00M6WN-00",
    price: 135000,
    description:
      "The H200 TG RGB is designed for PC builders who want a clean and sleek look but crave for good cooling performance and tempered glass at the same time With an unique RGB light bar, the front panel of H200 TG RGB presents a smooth and elegant style Tempered Glass Window The tempered-glass hinge door is designed with a smart lock security system which secures the inner components of your case",
    content:
      "Superior Hardware Support The H200 TG RGB has outstanding expandability with support for a tower CPU cooler with maximum height 180mm, a dual VGA expansion slot of up to 320mm in length Excellent Cooling Capability Optimized for excellent cooling capability with one 120mm fan preinstalled",
    category: "5faa35a88fdff228384d51d8",
  };

  const isActive = (index) => {
    if (tab === index) return " active-img";
    return "";
  };
  useEffect(() => {
    const id = setInterval(() => {
      setTab(tab > 2 ? 0 : tab + 1);
    }, 3000);
    return () => clearInterval(id);
  }, [tab]);

  return (
    <BaseLayout>
      <BasePage indexPage className="product-detail-page">
        <Head>
          <title>Product Card/Page</title>
        </Head>

        <div className="card-wrapper">
          <div className="card-product-detail">
            {/* <!-- card left --> */}
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  <img
                    src={product.images[tab]}
                    alt={product.images[tab]}
                    alt="shoe image"
                    style={{ height: "450px" }}
                  />
                </div>
              </div>
              <div className="img-select">
                {product.images.map((img, index) => (
                  <div className="img-item" data-id="1" key={index}>
                    <img
                      src={img}
                      alt={img}
                      alt="shoe image"
                      className={`img-thumbnail rounded ${isActive(index)} `}
                      style={{ height: "100px" }}
                      onClick={() => setTab(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <!-- card right --> */}
            <div className="product-content">
              <h2 className="product-title">
                {product.title.split(" ").slice(0, 2).join(" ")}
                {countWords(product.title) > 2 && "..."}
              </h2>

              <div className="product-price">
                <p className="new-price">
                  Price: <span>{numberWithCommas(product.price)}</span>
                </p>
              </div>

              <div className="product-detail">
                <h2>about this item: </h2>
                <p>{product.content.split(" ").slice(0, 40).join(" ")}</p>
                <p>
                  {product.description.split(" ").slice(0, 30).join(" ")}...
                </p>
                <ul>
                  <li>
                    In Stock:{" "}
                    <span className="text-danger">
                      {product.inStock} pieces
                    </span>
                  </li>
                  <li>
                    Available: <span className="text-info">in stock</span>
                  </li>
                  <li>
                    Sold: <span className="text-danger">{product.sold}</span>
                  </li>
                </ul>
              </div>

              <div className="purchase-info">
                <input
                  type="number"
                  min="0"
                  //   value="1"
                />
                <button type="button" className="btn">
                  Add to Cart{" "}
                  <i
                    className="ri-shopping-cart-fill"
                    style={{
                      fontSize: "1.2em",
                      verticalAlign: "middle",
                    }}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <h1 className="related-product-title">Related Products</h1>
        <Row className="mt-3 mb-5">
          {products.length === 0 ? (
            <h2>No Products</h2>
          ) : (
            products.map((product, index) => (
              <Col key={index} lg="4" md="6" className="mb-5">
                <ProductItem key={index} product={product} />
              </Col>
            ))
          )}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Home;
