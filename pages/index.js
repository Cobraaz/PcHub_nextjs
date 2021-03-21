import { useState } from "react";
import { createApi } from "unsplash-js";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import Masthead from "components/shared/Masthead";
import { fakeProductsData } from "populate/FakeData";
import ProductItem from "components/product/ProductItem";
import { shuffle } from "utils/helper.functions";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import { motion } from "framer-motion";
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = ({ slideImages }) => {
  const [products] = useState(fakeProductsData);

  return (
    <BaseLayout className="blog-listing-page">
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <Masthead slideImages={slideImages} />
      </motion.div>
      <BasePage indexPage className="home-page">
        <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
          <motion.div variants={stagger}>
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
          </motion.div>
        </motion.div>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const api = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
  });
  const slideImages = [];

  const unsplashResult = await api.search.getPhotos({
    query: "gaming setup",
    orientation: "landscape",
    perPage: 20,
  });
  if (unsplashResult) {
    unsplashResult.response.results.map((photo) =>
      slideImages.push(photo.urls.regular)
    );
    shuffle(slideImages);
    slideImages.unshift(
      ...shuffle([
        "/images/homepage_masthead.jpg",
        "/images/homepage_masthead2.jpg",
        "/images/homepage_masthead3.jpg",
      ])
    );
  }

  return {
    props: { slideImages },
    revalidate: 60,
  };
}

export default Home;
