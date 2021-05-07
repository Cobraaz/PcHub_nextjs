import classes from "./comment-button.module.css";
import { useContext, Button, useState } from "helpers/package.import";

import { DataContext, putData } from "helpers/helper.functions";
const CommentsButtons = ({
  deleteComment,
  commentId,
  commentUserId,
  likes,
  productId,
  setCallback,
  callback,
}) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [commentLikes, setCommentLikes] = useState(likes);
  const [noOfLikes, setNoOfLikes] = useState(likes.length);

  const loggedInUserId = (auth.user && auth.user.id) || "";

  const likeComment = async () => {
    try {
      if (!auth || !auth.user || !auth.user.name) {
        return dispatch({
          type: "NOTIFY",
          payload: { error: "Please Login first." },
        });
      }
      setNoOfLikes(noOfLikes + 1);
      setCommentLikes([{ user: auth.user.id.toString() }, ...commentLikes]);

      const res = await putData(
        `product/comment/like/${productId}/${commentId}`,
        {},
        auth.token
      );

      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      setNoOfLikes(res.likes.length);
      setCommentLikes(res.likes);
      return setCallback(!callback);
    } catch (err) {
      console.error(err.message);
    }
  };
  const unLikeComment = async () => {
    try {
      if (!auth || !auth.user || !auth.user.name) {
        return dispatch({
          type: "NOTIFY",
          payload: { error: "Please Login first." },
        });
      }
      setNoOfLikes(noOfLikes - 1);
      const removeIndex = await commentLikes
        .map((like) => like.user.toString())
        .indexOf(loggedInUserId);
      if (removeIndex !== -1) {
        setCommentLikes((commentLikes) =>
          commentLikes.filter((_, i) => i !== removeIndex)
        );
      }

      const res = await putData(
        `product/comment/unlike/${productId}/${commentId}`,
        {},
        auth.token
      );

      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      setNoOfLikes(res.likes.length);
      setCommentLikes(res.likes);
      return setCallback(!callback);
    } catch (err) {
      console.error(err.message);
    }
  };
  const ShowLikeUnlikeButton = () => {
    if (
      commentLikes.filter((like) => like.user.toString() === loggedInUserId)
        .length > 0
    ) {
      return (
        <button
          onClick={unLikeComment}
          className={`btn btn-outline-secondary btn-sm ${classes.blog_like_unlike}`}
        >
          <i className={`ri-thumb-down-fill clickable icons `}></i>
        </button>
      );
    }
    return (
      <button
        onClick={likeComment}
        className={`btn btn-outline-secondary btn-sm ${classes.blog_like_unlike}`}
      >
        <i className={`ri-thumb-up-fill clickable icons `}></i>
      </button>
    );
  };
  return (
    <>
      <span className={classes.blog_likes_text}>
        <span style={{ fontWeight: "500" }}>Likes </span>
        {noOfLikes}
        <div style={{ justifyContent: "space-around" }}>
          {(loggedInUserId === commentUserId ||
            (auth && auth.user && auth.user.role === "root")) && (
            <Button
              outline
              color="danger"
              size="sm"
              onClick={() => {
                deleteComment(commentId);
              }}
              className={`ml-2 justify-content-end ${classes.blog_delete}`}
            >
              <i className={`ri-delete-bin-2-fill clickable icons `}></i>
            </Button>
          )}

          <ShowLikeUnlikeButton />
        </div>
      </span>
    </>
  );
};

export default CommentsButtons;
