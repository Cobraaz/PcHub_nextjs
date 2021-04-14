import "bootstrap/dist/css/bootstrap.min.css";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;
library.add(faSun, faMoon);
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "react-slideshow-image/dist/styles.css";
import "styles/main.scss";
import "react-toggle/style.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { DataProvider } from "store/GlobalState";
import Layout from "components/Layouts";
const App = ({ Component, pageProps }) => (
  <>
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  </>
);

export default App;
