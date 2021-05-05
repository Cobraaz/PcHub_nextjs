import classes from "./hero.module.css";
import { useTheme } from "providers/ThemeProvider";

const Hero = ({ src, name, changeAvatar }) => {
  const { theme } = useTheme();

  return (
    <section className={`${classes.hero}`}>
      <div className={`${classes.image}`}>
        <img src={src} alt="Avatar" />
        <span>
          <i className="ri-camera-2-line" style={{ fontSize: "1.3rem" }}></i>
          <p>Change</p>
          <input
            type="file"
            name="file"
            className={classes.file_up}
            accept="image/*"
            onChange={changeAvatar}
          />
        </span>
      </div>
      {theme.type === "light" ? (
        <h1 className={classes.light_h1}>Welcome {name}</h1>
      ) : (
        <h1 className={classes.dark_h1}>Welcome {name}</h1>
      )}
    </section>
  );
};

export default Hero;
