import { useState } from "react";
import Head from "next/head";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { fakeProductsData } from "populate/FakeData";
import ProductItem from "components/product/ProductItem";

const Home = () => {
  const [products] = useState(fakeProductsData);
  const [tab, setTab] = useState(0);
  const product = {
    images: [
      {
        public_id: "nextjs_media/u8qltexka25minj2rj46",
        url:
          "https://res.cloudinary.com/devatchannel/image/upload/v1605318879/nextjs_media/u8qltexka25minj2rj46.jpg",
      },
      {
        public_id: "nextjs_media/wb5osprab71emsxp3ibm",
        url:
          "https://res.cloudinary.com/devatchannel/image/upload/v1605318910/nextjs_media/wb5osprab71emsxp3ibm.jpg",
      },
      {
        public_id: "nextjs_media/nelvbtwdbk1vjvhufort",
        url:
          "https://res.cloudinary.com/devatchannel/image/upload/v1605318911/nextjs_media/nelvbtwdbk1vjvhufort.jpg",
      },
      {
        public_id: "nextjs_media/bnyeto9vaz40yfts92we",
        url:
          "https://res.cloudinary.com/devatchannel/image/upload/v1605318913/nextjs_media/bnyeto9vaz40yfts92we.jpg",
      },
    ],
    checked: false,
    inStock: 153,
    sold: 5,
    title: "laptop",
    price: 25,
    description:
      "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
    content:
      "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
    category: "5faa35a88fdff228384d51d8",
  };

  const isActive = (index) => {
    if (tab === index) return " active-img";
    return "";
  };

  return (
    <BaseLayout className="">
      <BasePage indexPage className="product-detail-page">
        <Head>
          <title>Product Card/Page</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
            integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
            crossOrigin="anonymous"
          />
        </Head>
        <div>
          <div className="card-wrapper">
            <div className="card">
              {/* <!-- card left --> */}
              <div className="product-imgs">
                <div className="img-display">
                  <div className="img-showcase">
                    <img
                      src={product.images[tab].url}
                      alt={product.images[tab].url}
                      alt="shoe image"
                    />
                  </div>
                </div>
                <div className="img-select">
                  {product.images.map((img, index) => (
                    <div className="img-item" data-id="1" key={index}>
                      <img
                        src={img.url}
                        alt={img.url}
                        alt="shoe image"
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        onClick={() => setTab(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* <!-- card right --> */}
              <div className="product-content">
                <h2 className="product-title">{product.title}</h2>

                <div className="product-price">
                  <p className="new-price">
                    Price: <span>${product.price}</span>
                  </p>
                </div>

                <div className="product-detail">
                  <h2>about this item: </h2>
                  <p>{product.content}</p>
                  <p>{product.description}</p>
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

export default Home;
