import { motion } from "helpers/package.import";
import { fadeInUp } from "helpers/helper.functions";
import { useTheme } from "providers/ThemeProvider";

import classes from "./new-comment.module.css";

const NewComment = ({ newComment, setNewComment, handleSubmit }) => {
  const { theme } = useTheme();
  return (
    <motion.li variants={fadeInUp} className={classes.write_new}>
      <form onSubmit={handleSubmit}>
        {theme.type === "light" ? (
          <textarea
            className={classes.write_new_light_textarea}
            placeholder="Write your comment here"
            name="comment"
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        ) : (
          <textarea
            className={classes.write_new_dark_textarea}
            placeholder="Write your comment here"
            name="comment"
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        )}

        <motion.div>
          <button type="submit">Submit</button>
        </motion.div>
      </form>
    </motion.li>
  );
};

export default NewComment;
