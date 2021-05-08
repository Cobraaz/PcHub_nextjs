import { formatDate } from "utils/helper.functions";
import classes from "./comment-list.module.css";
import { useTheme } from "providers/ThemeProvider";
import CommentsButtons from "./CommentButtons";
const ShowComments = ({
  comments: {
    text,
    name,
    avatar,
    date,
    _id: commentId,
    user: commentUserId,
    likes = [],
  },
  index,
  extra,
  deleteComment,
  productId,
  setCallback,
  callback,
  editComment,
}) => {
  const { theme } = useTheme();
  return (
    <li
      id={`${commentId}-comment-list`}
      className={`${classes.comment} ${
        extra ? classes.author_comment : classes.user_comment
      }`}
    >
      <div className={classes.info}>
        <div href="#">{name}</div>
        <span>{formatDate(date, "LLL")}</span>
      </div>

      <div className={classes.avatar} href="#">
        <img src={avatar} width="35" alt="Profile Avatar" title={name} />
      </div>

      {theme.type === "light" ? (
        <section>
          <div
          //  style={{ width: "50%" }}
          >
            {text}
          </div>
          <CommentsButtons
            deleteComment={deleteComment}
            commentId={commentId || ""}
            commentUserId={commentUserId}
            likes={likes}
            productId={productId}
            setCallback={setCallback}
            callback={callback}
            editComment={editComment}
            commentText={text}
          />
        </section>
      ) : (
        <section className={classes.comment_section}>
          {text}
          <CommentsButtons
            deleteComment={deleteComment}
            commentId={commentId || ""}
            commentUserId={commentUserId}
            likes={likes}
            productId={productId}
            setCallback={setCallback}
            callback={callback}
            editComment={editComment}
            commentText={text}
          />
        </section>
      )}
    </li>
  );
};

export default ShowComments;
