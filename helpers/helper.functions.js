import { shuffle } from "utils/helper.functions";
// import { productsFromDB } from "pages/api/product/all_products";
import {
  getData,
  postData,
  patchData,
  deleteData,
  putData,
} from "utils/fetchData";
import { DataContext } from "store/GlobalState";
import { withAuth } from "utils/auth";
import { validateEmail, isLength, isMatch } from "utils/valid";
import valid from "utils/valid";
import { numberWithCommas } from "utils/helper.functions";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};
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

export {
  shuffle,
  getData,
  postData,
  patchData,
  deleteData,
  putData,
  DataContext,
  fadeInUp,
  stagger,
  withAuth,
  valid,
  validateEmail,
  isMatch,
  isLength,
  numberWithCommas,
};
