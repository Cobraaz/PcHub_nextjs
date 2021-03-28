const Footer = () => {
  return (
    <footer className="page-footer" onClick={() => isOpen && toggle()}>
      <div className="social-media">
        <a
          href="https://anujbansal.vercel.app"
          target="_"
          className="social-icon nounderline"
        >
          <i
            style={{ fontSize: "1.6em" }}
            className={`ri-chrome-fill clickable icons `}
          ></i>
        </a>

        <a
          href="https://github.com/Cobraaz"
          target="_"
          className="social-icon nounderline"
        >
          <i className={`ri-github-fill clickable icons `}></i>
        </a>

        <a
          href="https://www.facebook.com/anuj.bansal.739"
          target="_"
          className="social-icon nounderline"
        >
          <i
            // style={{ color: "#DB4437" }}
            className={`ri-mail-fill clickable icons`}
          ></i>
        </a>
        <a
          href="https://www.facebook.com/anuj.bansal.739"
          target="_"
          className="social-icon nounderline"
        >
          <i className={`ri-facebook-fill clickable icons`}></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
