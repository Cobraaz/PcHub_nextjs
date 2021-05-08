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
  putData,
} from "helpers/helper.functions";
import NewComment from "./NewComment";

function Comments({ comments: resComments, productId }) {
  const { state, dispatch } = useContext(DataContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(resComments || []);
  const [newComment, setNewComment] = useState("");
  const [callback, setCallback] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [editCommentId, setEditCommentId] = useState("");
  const [oldCommentText, setOldCommentText] = useState("");
  const { theme } = useTheme();
  const { auth } = state;

  let interval;

  useEffect(() => {
    setShowComments(false);
    return () => {
      setComments([]);
      setNewComment("");
      setCallback(false);
      setOnEdit(false);
      setEditCommentId("");
      setOldCommentText("");
      setShowComments(false);

      clearInterval(interval);
      window.removeEventListener("focus", refreshComments);
    };
  }, [productId]);
  console.log(onEdit);
  const refreshComments = async () => {
    const res = await getData(`product/comment/${productId}`);
    setComments(res.comment);
  };

  useEffect(async () => {
    if (showComments) {
      const res = await getData(`product/comment/${productId}`);
      setComments(res.comment);
      window.addEventListener("focus", refreshComments);
    }
    interval = setInterval(() => {
      refreshComments();
    }, 10000);
  }, [showComments, callback, productId]);

  useEffect(() => {
    if (newComment === "" && onEdit) {
      setOnEdit(false);
      setEditCommentId("");
      console.log("useEffect", onEdit);
    }
    // return () => {
    //   setOnEdit(false);
    // };
  }, [newComment]);

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
      if (!auth || !auth.user || !auth.user.name) {
        setNewComment("");
        return dispatch({
          type: "NOTIFY",
          payload: { error: "Please Login first." },
        });
      }

      let text = newComment.trim();
      if (!text.endsWith(".")) {
        text = text.concat(".");
      }
      if (onEdit) {
        if (newComment === oldCommentText)
          return dispatch({
            type: "NOTIFY",
            payload: { error: "Please update the comment" },
          });
        const res = await putData(
          `product/comment/edit/${productId}/${editCommentId}`,
          { text },
          auth.token
        );

        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        const el = document.getElementById(`${editCommentId}-comment-list`);
        if (el) {
          const position = getPositionOfElement(el);
          window.scrollTo({
            top: position[1] - 150,
            behavior: "smooth",
          });
        }
        setNewComment("");
        setComments(res.comment);
        dispatch({ type: "NOTIFY", payload: { success: res.msg } });

        return setCallback(!callback);
      }
      setComments([
        {
          text,
          name: auth.user.name,
          avatar: auth.user.avatar,
          date: new Date(),
          likes: [],
        },
        ...comments,
      ]);

      const el = document.getElementById("show_button");
      if (el) {
        const position = getPositionOfElement(el);
        window.scrollTo({
          top: position[1] - 100,
          behavior: "smooth",
        });
      }

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

  const deleteComment = async (commentId) => {
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

  const editComment = (commentId, commentText) => {
    setNewComment(commentText);
    setEditCommentId(commentId);
    setOldCommentText(commentText);
    setOnEdit(true);
    const el = document.getElementById("new_comment_textarea");
    if (el) {
      const position = getPositionOfElement(el);
      window.scrollTo({
        top: position[1] - 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className={classes.comments}>
        <button
          id="show_button"
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
                    extra={Boolean(index % 2)}
                    deleteComment={deleteComment}
                    productId={productId}
                    setCallback={setCallback}
                    callback={callback}
                    editComment={editComment}
                    index={index}
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
