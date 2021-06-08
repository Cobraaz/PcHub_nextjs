import classes from "./contact-detail.module.css";

type ContactDetailProps = {
  item: {
    name: string;
    email: string;
    phone_no: string;
    message: string;
    avatar: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onDelete: () => void;
};

const ContactDetail: React.FC<ContactDetailProps> = ({
  item,
  onSubmit,
  onDelete,
}) => {
  const { name, email, phone_no, message, avatar } = item;

  const altAvatar =
    "https://res.cloudinary.com/cobraaz/image/upload/v1595762337/gez4i626tlesoe3plwn7.jpg";

  return (
    <section className="row text-secondary my-3">
      <div className="col-md-4">
        <h3 className="text-uppercase font-weight-bold">User Detail</h3>
        <div className={classes.avatar}>
          <img src={avatar ? avatar : altAvatar} alt="Avatar" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={name}
            className="form-control"
            disabled={true}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            defaultValue={email}
            className="form-control"
            disabled={true}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="text"
            name="email"
            defaultValue={phone_no}
            className="form-control"
            disabled={true}
          />
        </div>
      </div>
      <div className="col-md-8">
        <h3 className="text-uppercase font-weight-bold">Message</h3>
        <textarea
          rows={3}
          className="form-control"
          defaultValue={message}
          disabled={true}
        />
        <form onSubmit={onSubmit} className="input-group mt-3">
          <button
            type="submit"
            className="mt-3 btn btn-secondary "
            style={{ backgroundColor: "#f47625", borderStyle: "none" }}
          >
            Send Thank You Mail
          </button>
        </form>
        <div className="input-group text-bold mt-4">
          <em
            style={{ color: "crimson", fontSize: "18px", fontWeight: "bold" }}
          >
            If you have reviewed the problem and want to delete you can delete
            it.
          </em>
        </div>
        <div className="input-group mt-3">
          <button
            onClick={onDelete}
            className="btn btn-secondary btn-danger"
            style={{ borderStyle: "none" }}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactDetail;
