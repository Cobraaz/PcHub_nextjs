import classes from "./hero.module.css";

const Hero = ({ src, name, changeAvatar }) => {
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
      <h1>Welcome {name}</h1>
    </section>
  );
};

export default Hero;
