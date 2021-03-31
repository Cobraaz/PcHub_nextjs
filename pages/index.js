import { useState, Row, Col, motion } from "helpers/package.import";

import {
  BaseLayout,
  BasePage,
  Masthead,
  ProductItem,
} from "helpers/components.import";

// import { productsFromDB } from "pages/api/product/all_products";

import {
  shuffle,
  getData,
  stagger,
  getPhotoUnsplash,
} from "helpers/helper.functions";

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
    <BaseLayout header_bg="transparent">
      <Masthead slideImages={slideImages} />
      <BasePage indexPage className="home-page">
        <motion.div
          initial="initial"
          animate="animate"
          exit={{ opacity: 0 }}
          variants={stagger}
        >
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
      </BasePage>
    </BaseLayout>
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
