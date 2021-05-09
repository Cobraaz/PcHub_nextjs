export function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function numberWithCommas(x) {
  return "₹ " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function countWords(str) {
  str = str.replace(/(^\s*)|(\s*$)/gi, "");
  str = str.replace(/[ ]{2,}/gi, " ");
  str = str.replace(/\n /, "\n");
  return str.split(" ").length;
}

//* CART RELATED FUNCTIONS

export const addToCart = (product, cart) => {
  if (product.inStock === 0)
    return {
      type: "NOTIFY",
      payload: { error: "This product is out of stock." },
    };

  const check = cart.every((item) => {
    return item._id !== product._id;
  });

  if (!check)
    return {
      type: "NOTIFY",
      payload: { error: "The product has been added to cart." },
    };

  return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
};

export const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });

  return { type: "ADD_CART", payload: newData };
};

export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });

  return { type: "ADD_CART", payload: newData };
};

export const deleteItem = (data, id, type) => {
  const newData = data.filter((item) => item._id !== id);
  return { type, payload: newData };
};

export const updateItem = (data, id, post, type) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return { type, payload: newData };
};

// * Moment Library
// * For Data Foramting
import moment from "moment";
export const formatDate = (date, dateFormat = "LL") =>
  date && moment(date).format(dateFormat);

// * Get photo from unsplash
import { createApi } from "unsplash-js";
export const getPhotoUnsplash = async () => {
  const api = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
  });
  const slideImages = [];

  const unsplashResult = await api.search.getPhotos({
    query: "gaming setup",
    orientation: "landscape",
    perPage: 5,
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

// * Capitalize First Letter Of Each Word
export const capitalize = (input) => {
  let words = input.split(" ");
  let CapitalizedWords = [];
  words.forEach((element) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  return CapitalizedWords.join(" ");
};

// * Get postion of element to scroll
export const getPositionOfElement = (elem) => {
  var left = 0,
    top = 0;

  do {
    left += elem.offsetLeft - elem.scrollLeft;
    top += elem.offsetTop - elem.scrollTop;
  } while ((elem = elem.offsetParent));

  return [left, top];
};
