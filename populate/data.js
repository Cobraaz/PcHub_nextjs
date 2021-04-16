const pc = require("./categories/pc");
const keyboard = require("./categories/keyboard");
const mouse = require("./categories/mouse");
const headphone = require("./categories/headphone");

const data = {
  products: [
    // PC
    ...pc,
    // Keyboard
    ...keyboard,
    // Mouse
    ...mouse,
    // Headphone
    ...headphone,
  ],
};

module.exports = data;
