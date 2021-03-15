import "bootstrap/dist/css/bootstrap.min.css";

import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "styles/main.scss";
import { DataProvider } from "store/GlobalState";

const App = ({ Component, pageProps }) => (
  <DataProvider>
    <Component {...pageProps} />
  </DataProvider>
);

export default App;
