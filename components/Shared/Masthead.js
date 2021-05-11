import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import { Slide } from "react-slideshow-image";

const Masthead = ({ slideImages: resSlideImages }) => {
  const [slideImages, setSlideImages] = useState([
    "/images/homepage_masthead.jpg",
    "/images/homepage_masthead2.jpg",
    "/images/homepage_masthead3.jpg",
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSlideImages([...slideImages, ...resSlideImages]);
    }, 13000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Slide
      duration={5000}
      arrows={false}
      transitionDuration={2400}
      pauseOnHover={false}
    >
      {slideImages.map((slideImage, index) => (
        <div style={{ maxHeight: "500px" }} key={index}>
          <div
            className="masthead"
            style={{ backgroundImage: `url(${slideImage})` }}
          >
            <div className="overlay"></div>
            <Container>
              <Row>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="site-heading">
                    <h1>Welcome to PcHub</h1>
                    <span className="subheading">
                      The better information about the virtual world...
                    </span>
                  </div>
                </div>
              </Row>
            </Container>
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default Masthead;
