import { useState } from "react";
import { createApi } from "unsplash-js";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import Masthead from "components/shared/Masthead";
import { fakeProductsData } from "populate/FakeData";
import ProductItem from "components/product/ProductItem";
import { shuffle } from "utils/helper.functions";

const Home = ({ slideImages }) => {
  const [products] = useState(fakeProductsData);

  return (
    <BaseLayout className="blog-listing-page">
      <Masthead slideImages={slideImages} />
      <BasePage indexPage className="home-page">
        <div className="cooover">
          <div className="products">
            {products.length === 0 ? (
              <h2>No Products</h2>
            ) : (
              products.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))
            )}
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const api = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
  });
  const slideImages = ["/images/alienware_desktop.jpg"];

  const unsplashResult = await api.search.getPhotos({
    query: "gaming setup",
    orientation: "landscape",
    perPage: 20,
  });
  if (unsplashResult) {
    unsplashResult.response.results.map((photo) =>
      slideImages.push(photo.urls.full)
    );
    shuffle(slideImages);
  }

  return {
    props: { slideImages },
    revalidate: 60,
  };
}

export default Home;
