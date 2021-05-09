import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import classes from "./modal.module.css";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
const Modal = ({ showModal }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className={classes.backdrop}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className={classes.blog_modal} variants={modal}>
            <div className={classes.x_touch}>
              <div className={classes.line1}></div>
              <div className={classes.line2}></div>
            </div>
            <p className={classes.paragraph}>
              Hey, you don't seem to logged in would you like to login?
            </p>
            <Link href="/login">
              <button className={classes.button}>Login</button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
