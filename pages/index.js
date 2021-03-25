import { useState } from "react";
import { createApi } from "unsplash-js";
import { Row, Col } from "reactstrap";
import { motion } from "framer-motion";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import Masthead from "components/shared/Masthead";
import ProductItem from "components/product/ProductItem";
import { shuffle } from "utils/helper.functions";
// import { productsFromDB } from "pages/api/product/all_products";
import { getData } from "utils/fetchData";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = ({ slideImages, products: resProducts, status }) => {
  const [products] = useState(resProducts);
  if (!status === "success") {
    return (
      <>
        <BaseLayout>
          <BasePage className="signin-page wrapper">
            <div className="errMsg">{status}</div>
          </BasePage>
        </BaseLayout>
        <style jsx>{`
          .errMsg {
            background: rgb(214, 10, 10);
            color: #fff9;
            text-align: center;
            padding: 10px 0;
            letter-spacing: 1.3px;
          }
        `}</style>
      </>
    );
  }
  return (
    <BaseLayout header_bg="transparent" className="blog-listing-page">
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

const getPhotoUnsplash = async () => {
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
    return slideImages;
  }
  return slideImages.unshift(
    ...shuffle([
      "/images/homepage_masthead.jpg",
      "/images/homepage_masthead2.jpg",
      "/images/homepage_masthead3.jpg",
    ])
  );
};

// * This function is called during the build time
// * Improved performance of page,
// * It will create static page with dynamic data

// export async function getStaticProps() {
//   const { status, result, productsResponse: products } = JSON.parse(
//     JSON.stringify(await productsFromDB())
//   );
//   return {
//     props: {
//       slideImages: await getPhotoUnsplash(),
//       status,
//       result,
//       products,
//     },
//     revalidate: 1,
//   };
// }

export async function getStaticProps() {
  const { status, result, products } = await getData("product/all_products");

  return {
    props: {
      slideImages: await getPhotoUnsplash(),
      status,
      result,
      products,
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps() {
//   const { status, result, productsResponse: products } = JSON.parse(
//     JSON.stringify(await productsFromDB())
//   );
//   return {
//     props: {
//       slideImages: await getPhotoUnsplash(),
//       status,
//       result,
//       products,
//     },
//   };
// }

export default Home;
