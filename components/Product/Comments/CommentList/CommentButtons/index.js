import { Button } from "reactstrap";
import classes from "./comment-button.module.css";
const CommentsButtons = () => {
  return (
    <>
      <span className={classes.blog_likes_text}>
        <span style={{ fontWeight: "500" }}>Likes </span>50
        <div style={{ justifyContent: "space-around" }}>
          <Button
            outline
            color="danger"
            size="sm"
            className={`ml-2 justify-content-end ${classes.blog_delete}`}
          >
            <i className={`ri-delete-bin-2-fill clickable icons `}></i>
          </Button>

          <button
            className={`btn btn-outline-secondary btn-sm ${classes.blog_like_unlike}`}
          >
            <i className={`ri-thumb-up-fill clickable icons `}></i>
          </button>
        </div>
      </span>
    </>
  );
};

export default CommentsButtons;
