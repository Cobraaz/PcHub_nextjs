import classes from "./comment-button.module.css";
import { useContext, Button } from "helpers/package.import";

import { DataContext } from "helpers/helper.functions";
const CommentsButtons = ({ deleteComment, commentId, commentUserId }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const loggedInUserId = (auth.user && auth.user.id) || "";
  return (
    <>
      <span className={classes.blog_likes_text}>
        <span style={{ fontWeight: "500" }}>Likes </span>50
        <div style={{ justifyContent: "space-around" }}>
          {(loggedInUserId === commentUserId || auth.user.role === "root") && (
            <Button
              outline
              color="danger"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                deleteComment(e, commentId);
              }}
              className={`ml-2 justify-content-end ${classes.blog_delete}`}
            >
              <i className={`ri-delete-bin-2-fill clickable icons `}></i>
            </Button>
          )}

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
