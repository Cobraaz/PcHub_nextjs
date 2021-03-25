import Link from "next/link";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import Image from "next/image";
import { motion } from "framer-motion";

import { numberWithCommas } from "utils/helper.functions";
import { useRouter } from "next/router";

let easing = [0.6, -0.05, 0.01, 0.99];
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

const ProductItem = ({ product }) => {
  const router = useRouter();
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <motion.div
        variants={fadeInUp}

        // className="card-body-wrapper"
      >
        <div className="card-body-wrapper-Ab card">
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            // className="view overlay"
            onClick={() =>
              router.push("/product/[id]", `/product/${product._id}`)
            }
          >
            <motion.div variants={fadeInUp} className="card-img-top-Ab">
              <Image
                className="card-img-top-Ab"
                top="true"
                src={product.images[0]}
                alt="Product Image"
                width={300}
                height={230}
                quality={25}
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="card-body">
              <motion.div
                className="card-title card-title-Ab mb-2"
                title={product.title}
              >
                {product.title.split(" ").slice(0, 2).join(" ")}
              </motion.div>
              <motion.h6 className="card-subtitle mb-2 text-muted">
                <motion.div
                  variants={fadeInUp}
                  className="row justify-content-between mx-0"
                >
                  <h6 className="text-danger">
                    {numberWithCommas(product.price)}
                  </h6>
                  {product.inStock > 0 ? (
                    <h6 className="text-danger">In Stock: {product.inStock}</h6>
                  ) : (
                    <h6 className="text-danger">Out Stock</h6>
                  )}
                </motion.div>
              </motion.h6>
              <motion.p
                className="card-text card-text-Ab"
                title={product.description}
              >
                {product.description}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* <div> */}
          <motion.a whileTap={{ scale: 0.85 }} className="card-button-Ab">
            Add to cart
          </motion.a>
          {/* </div> */}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductItem;
