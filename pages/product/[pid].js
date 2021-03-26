import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Row, Col } from "reactstrap";

import BaseLayout from "components/Layouts/BaseLayout";
import BasePage from "components/Layouts/BasePage";
import { fakeProductsData } from "populate/FakeData";
import ProductItem from "components/Product/ProductItem";
import { numberWithCommas, countWords } from "utils/helper.functions";
import { motion } from "framer-motion";
import { getData } from "utils/fetchData";

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

const DetailProduct = ({ product }) => {
  const [products] = useState(fakeProductsData);
  const [tab, setTab] = useState(0);

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
  if (!product) return null;
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

export async function getStaticPaths() {
  const { status, result, products } = await getData("product/all_products");

  const paths = products.map((product) => {
    return {
      params: { pid: product._id },
    };
  });
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { pid } }) {
  const { product } = await getData(`product/get_by_id/${pid}`);
  // console.log(product);
  return { props: { product }, revalidate: 1 };
}

// export async function getServerSideProps({ params: { id } }) {
//   const { product } = await getData(`product/get_by_id/${id}`);
// server side rendering
//   return {
//     props: { product }, // will be passed to the page component as props
//   };
// }

export default DetailProduct;
