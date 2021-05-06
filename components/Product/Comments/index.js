import CommentList from "./CommentList";

import classes from "./comments.module.css";
import { useTheme } from "providers/ThemeProvider";

import {
  useState,
  useEffect,
  motion,
  useContext,
} from "helpers/package.import";

import {
  fadeInUp,
  postData,
  DataContext,
  getData,
  getPositionOfElement,
  deleteData,
} from "helpers/helper.functions";
import NewComment from "./NewComment";

function Comments({ comments: resComments, productId }) {
  const { state, dispatch } = useContext(DataContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(resComments);
  const [newComment, setNewComment] = useState("");
  const [callback, setCallback] = useState(false);
  const { theme } = useTheme();
  const { auth } = state;

  useEffect(async () => {
    if (showComments) {
      const res = await getData(`product/comment/${productId}`);
      setComments(res.comment);
    }
  }, [showComments, callback]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!newComment || newComment.length === 0)
        return dispatch({
          type: "NOTIFY",
          payload: { error: "Please add a comment." },
        });

      let text = newComment.trim();
      if (!text.endsWith(".")) {
        text = text.concat(".");
      }
      setComments([
        {
          text,
          name: auth.user.name,
          avatar: auth.user.avatar,
          date: new Date(),
        },
        ...comments,
      ]);

      const el = document.getElementById("0-comment-list");
      const position = getPositionOfElement(el);
      window.scrollTo({
        top: position[1] - 150,
        behavior: "smooth",
      });

      const res = await postData(
        `product/comment/${productId}`,
        { text },
        auth.token
      );

      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      setNewComment("");
      setComments(res.comment);
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      return setCallback(!callback);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (e, commentId) => {
    e.stopPropagation();

    const isConfirm = confirm("Are you sure you want to delete this comment?");
    if (isConfirm) {
      setComments(comments.filter((p) => p._id !== commentId));
      const res = await deleteData(
        `product/comment/${productId}/${commentId}`,
        auth.token
      );

      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      setComments(res.comment);
      return setCallback(!callback);
    }
  };

  return (
    <>
      <div className={classes.comments}>
        <button
          type="button"
          className={`btn btn-outline-success ${classes.button}`}
          onClick={toggleCommentsHandler}
        >
          {showComments ? "Hide" : "Show"} Comments
        </button>
      </div>
      {showComments && (
        <div className="product-comment">
          <motion.ul
            variants={fadeInUp}
            className={`${classes.comment_section}`}
          >
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index}>
                  <CommentList
                    comments={comment}
                    index={index}
                    extra={Boolean(index % 2)}
                    deleteComment={deleteComment}
                  />
                </div>
              ))
            ) : theme.type === "light" ? (
              <li className={`${classes.comment} ${classes.user_comment}`}>
                <section>No Comments</section>
              </li>
            ) : (
              <li className={`${classes.comment} ${classes.user_comment}`}>
                <section className={classes.no_comment_section}>
                  No Comments
                </section>
              </li>
            )}
            <NewComment
              newComment={newComment}
              setNewComment={setNewComment}
              handleSubmit={handleSubmit}
            />
          </motion.ul>
        </div>
      )}
    </>
  );
}

export default Comments;
