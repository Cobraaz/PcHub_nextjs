import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Row, Col } from "reactstrap";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { fakeProductsData } from "populate/FakeData";
import ProductItem from "components/product/ProductItem";
import { numberWithCommas, countWords } from "utils/helper.functions";
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

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
      setTab(tab >= product.images.length - 1 ? 0 : tab + 1);
    }, 3000);
    return () => clearInterval(id);
  }, [tab]);

  return (
    <BaseLayout>
      <BasePage indexPage className="product-detail-page">
        <Head>
          <title>Product Card/Page</title>
        </Head>

        <motion.div
          initial="initial"
          animate="animate"
          exit={{ opacity: 0 }}
          variants={stagger}
          className="card-wrapper"
        >
          <div className="card-product-detail">
            {/* <!-- card left --> */}

            <motion.div
              className="img"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className="product-imgs"
            >
              <div className="img-display">
                <div className="img-showcase">
                  <motion.div variants={fadeInUp}>
                    <Image
                      src={product.images[tab]}
                      alt="shoe image"
                      width={500}
                      height={400}
                    />
                  </motion.div>
                </div>
                <br />
              </div>
              <div className="img-select">
                {product.images.map((img, index) => (
                  <motion.div
                    className="img-item"
                    data-id="1"
                    key={index}
                    variants={fadeInUp}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      transition={{ delay: 1.5, duration: 2 }}
                      whileHover={{ scale: 1.2 }}
                      className={`img-thumbnail rounded ${isActive(index)} `}
                    >
                      <Image
                        src={img}
                        alt="shoe image"
                        onClick={() => setTab(index)}
                        width={120}
                        height={100}
                        quality={25}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* <!-- card right --> */}
            <div className="product-content">
              <motion.h2 variants={fadeInUp} className="product-title">
                {product.title.split(" ").slice(0, 2).join(" ")}
                {countWords(product.title) > 2 && "..."}
              </motion.h2>

              <motion.div variants={fadeInUp} className="product-price">
                <p className="new-price">
                  Price: <span>{numberWithCommas(product.price)}</span>
                </p>
              </motion.div>

              <div className="product-detail">
                <motion.h2 variants={fadeInUp}>about this item: </motion.h2>
                <motion.p variants={fadeInUp}>
                  {product.content.split(" ").slice(0, 40).join(" ")}
                </motion.p>
                <motion.p variants={fadeInUp}>
                  {product.description.split(" ").slice(0, 30).join(" ")}...
                </motion.p>
                <motion.ul variants={fadeInUp}>
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
                </motion.ul>
              </div>

              <motion.div variants={fadeInUp} className="purchase-info">
                <input
                  type="number"
                  min="0"
                  //   value="1"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="btn"
                >
                  Add to Cart{" "}
                  <i
                    className="ri-shopping-cart-fill"
                    style={{
                      fontSize: "1.2em",
                      verticalAlign: "middle",
                    }}
                  ></i>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.h1
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="related-product-title"
        >
          Related Products
        </motion.h1>
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
