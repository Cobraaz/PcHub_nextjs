import "bootstrap/dist/css/bootstrap.min.css";

import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "react-slideshow-image/dist/styles.css";
import "styles/main.scss";
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
