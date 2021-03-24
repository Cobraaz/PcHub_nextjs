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
  return (
    <div>
      <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        // className="card-body-wrapper"
      >
        <Card className="card-body-wrapper-Ab">
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            // className="view overlay"
          >
            <div className="card-img-top-Ab">
              <Image
                className="card-img-top-Ab"
                top="true"
                // width="100%"
                src={product.images[0]}
                alt="Product Image"
                // layout=""
                width={300}
                height={230}
                quality={25}
              />
            </div>
            <CardBody>
              <CardTitle className="card-title-Ab mb-2" title={product.title}>
                {product.title.split(" ").slice(0, 2).join(" ")}
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <div className="row justify-content-between mx-0">
                  <h6 className="text-danger">
                    {numberWithCommas(product.price)}
                  </h6>
                  {product.inStock > 0 ? (
                    <h6 className="text-danger">In Stock: {product.inStock}</h6>
                  ) : (
                    <h6 className="text-danger">Out Stock</h6>
                  )}
                </div>
              </CardSubtitle>
              <CardText className="card-text-Ab" title={product.description}>
                {product.description}
              </CardText>
            </CardBody>
          </motion.div>

          <Link href="/">
            <a className="card-button-Ab">Add to cart</a>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProductItem;
