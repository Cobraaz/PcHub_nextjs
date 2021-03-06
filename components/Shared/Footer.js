const { default: ThemeToggle } = require("./ThemeToggle");
import ReactResizeDetector from "react-resize-detector";

const Footer = ({
  isOpen,
  toggle,
  checkedTheme,
  setCheckedTheme,
  toggleTheme,
  theme,
}) => {
  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
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
            {width < 768 && (
              <div className="social-icon">
                <ThemeToggle
                  checkedTheme={checkedTheme}
                  setCheckedTheme={setCheckedTheme}
                  onChange={toggleTheme}
                  theme={theme}
                />
              </div>
            )}
          </div>
        </footer>
      )}
    </ReactResizeDetector>
  );
};

export default Footer;
